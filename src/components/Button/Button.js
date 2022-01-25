import PropTypes from "prop-types";
import s from "./Button.module.css";
function Button({ text, onClick, query, type = "button", className = "btn" }) {
  return (
    <button type={type} className={s[className]} onClick={() => onClick(query)}>
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};
export default Button;
