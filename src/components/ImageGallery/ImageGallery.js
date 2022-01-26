import { Component, Fragment } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import ImageGalleryItem from "components/ImageGalleryItem";
import Button from "components/Button";
import Loader from "components/Loader";
import PixabayApiService from "js/PixabayApiService";
import s from "./ImageGallery.module.css";

const pixabayApiService = new PixabayApiService();

export default class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };
  state = {
    images: [],
    status: "idle",
    error: "",
    more: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const query = this.props.query;
    if (prevQuery !== query) {
      this.setState({ images: [] });
      pixabayApiService.resetPage();
      this.getImages(query);
    }
  }
  getImages = async (query) => {
    this.setState({ more: true });
    pixabayApiService.query = query;
    try {
      const response = await pixabayApiService.getImages();
      this.onSuccess(response);
    } catch (error) {
      console.log(error);
    }
    this.setState({ more: false });
  };
  onSuccess = (response) => {
    const totalHits = response.totalHits;
    if (!totalHits) {
      const error = "Can't find image";
      this.setState({ status: "error", error });
      return;
    }

    const newImages = response.hits;

    if (newImages.length === 0 && totalHits !== 0) {
      const error =
        "We're sorry, but you've reached the end of search results.";
      toast.error(error);
      this.setState({ error });
      return;
    }

    if (pixabayApiService.page === 2) {
      toast.success(`We found ${totalHits} images!`);
    }

    this.setState((prevState) => {
      const images = [...prevState.images, ...newImages];
      return { status: "success", images };
    });
  };
  onError = (error) => {
    const errorMsg =
      error.response.status === 400
        ? "We're sorry, but you've reached the end of search results."
        : "Sorry, there is no response from server. Please try again.";
    toast.error(errorMsg);
    this.setState({ error: errorMsg });
  };
  render() {
    const { status, images, error, more } = this.state;
    const { query } = this.props;

    if (status === "idle") return <div></div>;

    if (status === "loading") return <Loader />;

    if (status === "error") {
      return (
        <p className={s.error}>
          {error}: {query}
        </p>
      );
    }

    if (status === "success") {
      return (
        <Fragment>
          <ul className={s.list}>
            {images.map((image) => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ul>
          {more && <Loader />}
          {!more && (
            <Button
              type="button"
              text="Load more"
              className="center"
              query={query}
              onClick={this.getImages}
            />
          )}
        </Fragment>
      );
    }
  }
}
