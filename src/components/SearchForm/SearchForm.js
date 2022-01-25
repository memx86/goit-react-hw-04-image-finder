import { Component } from "react";
import PropTypes from "prop-types";
import s from "./SearchForm.module.css";

class ContactForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };
  state = {
    query: "",
  };
  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState({ query: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { onFormSubmit } = this.props;
    const query = e.target.query.value;
    onFormSubmit(query);
    this.reset();
  };
  reset = () =>
    this.setState(() => ({
      query: "",
    }));

  render() {
    const { query } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <button className={s.btn} type="submit">
          Search
        </button>
        <label className={s.label}>
          <input
            className={s.input}
            type="text"
            name="query"
            placeholder=" "
            required
            value={query}
            onInput={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
export default ContactForm;
