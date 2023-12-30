import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditTask = ({ show, setShow, selectedTaskId, setSelectedTaskId }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedTaskId != null) {
      axios
        .request({
          method: "get",
          url: `http://localhost:3600/view-task?id=${selectedTaskId}`,
        })
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setName(response?.data?.data?.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedTaskId]);

  const editTaskFunc = () => {
    axios
      .request({
        method: "patch",
        url: `http://localhost:3600/update-task?id=${selectedTaskId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { name },
      })
      .then((response) => {
        setShow(false);
        console.log(JSON.stringify(response.data));
        setShow(false);
        setSelectedTaskId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            editTaskFunc();
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your task"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
