import { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem";
import PixabayApiService from "js/PixabayApiService";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: "idle",
    error: "",
  };
  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const query = this.props.query;
    if (prevQuery !== query) {
      const pixabayApiService = new PixabayApiService();
      pixabayApiService.query = query;
      pixabayApiService.resetPage();
      try {
        const response = await pixabayApiService.getImages();
        this.onSuccess(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  onSuccess = (response) => {
    if (!response.totalHits) {
      const error = "Can't find image";
      this.setState({ status: "error", error });
      return;
    }
    const images = response.hits;
    this.setState({ status: "success", images });
  };
  render() {
    const { status, images, error } = this.state;
    const { query } = this.props;

    if (status === "idle") return <div></div>;

    if (status === "loading") {
      return <div></div>;
    }

    if (status === "error") {
      return (
        <p>
          {error}:{query}
        </p>
      );
    }

    if (status === "success") {
      return (
        <ul className={s.list}>
          {images.map((image) => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ul>
      );
    }
  }
}
