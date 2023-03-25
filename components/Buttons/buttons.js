import React, { useState } from "react";
import Modal from "react-modal";
import PetForm from "/components/Form/index.js";

Modal.setAppElement("#__next");

function PlussButton() {
  async function handleAddProduct(event) {
    event.preventDefault();
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <button onClick={openModal}> + </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <PetForm onSubmit={handleAddProduct} />
      </Modal>
    </>
  );
}

export default PlussButton;
