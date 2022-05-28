import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ image, onImageClick }) {
  const { webformatURL, largeImageURL, tags } = image;
  const onClick = () => {
    onImageClick({ largeImageURL, tags });
  };
  return (
    <li className={s.item} onClick={onClick}>
      <img className={s.img} src={webformatURL} alt={tags} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
