import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateTask = ({ show, setShow }) => {
  const [name, setName] = useState("");
  const addNewTask = () => {
    axios
      .request({
        method: "post",
        url: "http://localhost:3600/add-task",
        headers: {
          "Content-Type": "application/json",
        },
        data: { name },
      })
      .then((response) => {
        setShow(false);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addNewTask();
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your task"
              onChange={(e) => setName(e.target.value)}
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

export default CreateTask;
