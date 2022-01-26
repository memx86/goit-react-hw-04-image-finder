import PropTypes from "prop-types";
import s from "./Modal.module.css";

function Modal(props) {
  const children = props.children;
  return (
    <div className={s.backdrop}>
      <div className={s.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
