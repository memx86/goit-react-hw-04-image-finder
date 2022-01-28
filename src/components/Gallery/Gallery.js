import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Section from "components/Section";
import ImageGallery from "components/ImageGallery";
import Button from "components/Button";
import Loader from "components/Loader";
import PixabayApiService from "js/PixabayApiService";
import s from "./Gallery.module.css";

const pixabayApiService = new PixabayApiService();
const initialState = {
  images: [],
  status: "idle",
  error: "",
  more: false,
};
function reducer(state, action) {
  const { type, payload } = action;
  const { images } = state;
  switch (type) {
    case "status":
      return { ...state, status: payload };
    case "images":
      return { ...state, images: [...images, ...payload] };
    case "clear":
      return { ...state, images: [] };
    case "error":
      return { ...state, error: payload };
    case "more":
      return { ...state, more: payload };
    default:
      throw new Error(`Unsupported action type: ${type}`);
  }
}

function Gallery({ query, onImageClick }) {
  const [state, dispatch] = useReducer(reducer, {}, () => initialState);
  const { status, images, error, more } = state;
  useEffect(() => {
    if (!query) return;
    dispatch({ type: "clear" });
    pixabayApiService.resetPage();
    getImages(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function getImages(query) {
    if (error) {
      dispatch({ type: "status", payload: "loading" });
      dispatch({ type: "error", payload: "" });
    }
    dispatch({ type: "more", payload: true });
    pixabayApiService.query = query;
    try {
      const response = await pixabayApiService.getImages();
      onSuccess(response);
    } catch (response) {
      onError(response);
    }
    dispatch({ type: "more", payload: false });
  }
  const onSuccess = (response) => {
    const totalHits = response.totalHits;
    if (!totalHits) {
      const error = "Can't find image";
      dispatch({ type: "status", payload: "error" });
      dispatch({ type: "error", payload: error });
      return;
    }

    const newImages = response.hits;

    if (newImages.length === 0 && totalHits !== 0) {
      const error =
        "We're sorry, but you've reached the end of search results.";
      toast.error(error);
      dispatch({ type: "status", payload: "error" });
      dispatch({ type: "error", payload: error });
      return;
    }

    if (pixabayApiService.page === 2) {
      toast.success(`We found ${totalHits} images!`);
    }
    dispatch({ type: "images", payload: newImages });
    dispatch({ type: "status", payload: "success" });
    if (!error) setTimeout(scrollCard, 500);
  };
  const onError = (error) => {
    const errorMsg =
      error.response.status === 400
        ? "We're sorry, but you've reached the end of search results."
        : "Sorry, there is no response from server. Please try again.";
    toast.error(errorMsg);
    dispatch({ type: "status", payload: "error" });
    dispatch({ type: "error", payload: errorMsg });
  };
  function scrollCard() {
    const { height: cardHeight } = document
      .querySelector("#gallery")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 3,
      behavior: "smooth",
    });
  }

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
      <Section>
        <ImageGallery images={images} onImageClick={onImageClick} />
        {more && <Loader />}
        {!more && !error && (
          <Button
            type="button"
            text="Load more"
            className="center"
            query={query}
            onClick={getImages}
          />
        )}
      </Section>
    );
  }
}

Gallery.propTypes = {
  query: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default Gallery;
