import { Fragment, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Search from "components/Search";
import Gallery from "components/Gallery";
import Modal from "components/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onImageOpen = (image) => {
    setImage(image);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const { largeImageURL, tags } = image;
  return (
    <Fragment>
      <Search onFormSubmit={setQuery} />
      <Gallery query={query} onImageClick={onImageOpen} />
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={tags} />
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

export default App;
