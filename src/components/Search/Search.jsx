import PropTypes from "prop-types";
import Section from "components/Section";
import Container from "components/Container";
import SearchForm from "components/SearchForm";

function Search({ onFormSubmit }) {
  return (
    <Section type="search">
      <Container>
        <SearchForm onFormSubmit={onFormSubmit} />
      </Container>
    </Section>
  );
}

Search.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Search;
