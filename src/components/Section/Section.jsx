import PropTypes from "prop-types";
import s from "./Section.module.css";

function Section({ type = "section", children }) {
  return <section className={s[type]}>{children}</section>;
}

Section.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Section;
