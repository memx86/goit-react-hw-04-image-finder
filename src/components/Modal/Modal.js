import { Component } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  componentDidMount() {
    document.addEventListener("keydown", this.onEsc);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEsc);
  }
  onEsc = (e) => {
    if (e.code === "Escape") this.props.closeModal();
  };
  onBackdropClick = (e) => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };
  render() {
    const { children } = this.props;
    return (
      <div className={s.backdrop} onClick={this.onBackdropClick}>
        <div className={s.modal}>{children}</div>
      </div>
    );
  }
}

export default Modal;
