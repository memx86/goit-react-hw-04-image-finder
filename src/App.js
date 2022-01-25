import { Component, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Section from "./components/Section";
import Container from "./components/Container";
import SearchForm from "./components/SearchForm";
import ImageGallery from "./components/ImageGallery";

class App extends Component {
  state = {
    query: "",
  };
  onSearch = (query) => this.setState(() => ({ query }));
  render() {
    const { query } = this.state;
    return (
      <Fragment>
        <Section type="search">
          <Container>
            <SearchForm onFormSubmit={this.onSearch} />
          </Container>
        </Section>
        <Section>
          <ImageGallery query={query} />
        </Section>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Fragment>
    );
  }
}
export default App;
