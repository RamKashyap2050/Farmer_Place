// FullScreenModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const FullScreenModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="full-screen-modal"
      style={{ opacity: 1 }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Full Screen Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the content of the full-screen modal.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FullScreenModal;
