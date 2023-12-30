import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, setShow, deleteId, deleteTaskFunc }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task !!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure, You want to delete this task?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteTaskFunc(deleteId);
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
