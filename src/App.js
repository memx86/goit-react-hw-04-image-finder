import { Component, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Section from "./components/Section";
import Container from "./components/Container";
import SearchForm from "./components/SearchForm";
import ImageGallery from "./components/ImageGallery";
import Modal from "components/Modal";

class App extends Component {
  state = {
    query: "",
    image: {},
    showModal: false,
  };
  onSearch = (query) => this.setState(() => ({ query }));
  onImageOpen = (e) => {
    const src = e.target.dataset.src;
    const alt = e.target.alt;
    const image = { src, alt };
    this.setState(() => ({ image, showModal: true }));
  };
  closeModal = () => {
    this.setState(() => ({ showModal: false }));
  };
  render() {
    const { query, image, showModal } = this.state;
    const { src, alt } = image;
    return (
      <Fragment>
        <Section type="search">
          <Container>
            <SearchForm onFormSubmit={this.onSearch} />
          </Container>
        </Section>
        <Section>
          <ImageGallery query={query} onImageClick={this.onImageOpen} />
        </Section>
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={src} alt={alt} />
          </Modal>
        )}
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
