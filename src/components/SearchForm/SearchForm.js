import { useState } from "react";
import PropTypes from "prop-types";
import s from "./SearchForm.module.css";
import IconButton from "components/IconButton";

function SearchForm({ onFormSubmit }) {
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    onFormSubmit(query);
    reset();
  };
  const reset = () => setQuery("");

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        <span className={s.btn}>
          <IconButton type="submit" icon="search" />
        </span>
        <input
          className={s.input}
          type="text"
          name="query"
          placeholder="Search images and photos"
          required
          value={query}
          onInput={handleInputChange}
        />
      </label>
    </form>
  );
}

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
