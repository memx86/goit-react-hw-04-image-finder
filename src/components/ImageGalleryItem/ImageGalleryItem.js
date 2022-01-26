import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ image, onClick }) {
  const { webformatURL, largeImageURL, tags } = image;
  return (
    <li className={s.item} onClick={onClick}>
      <img src={webformatURL} alt={tags} data-src={largeImageURL} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
