import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from "prop-types";
import s from "./IconButton.module.css";

function IconButton({ type = "button", icon }) {
  switch (icon) {
    case "search":
      return (
        <button type={type} className={s.search} aria-label="search">
          <AiOutlineSearch style={{ width: "40" }} />
        </button>
      );
    default:
      return <button type={type} aria-label="button"></button>;
  }
}

IconButton.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
};

export default IconButton;
