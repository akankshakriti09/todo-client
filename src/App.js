import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreateTask from "./components/CreateTask";
import { useEffect, useState } from "react";
import axios from "axios";
import EditTask from "./components/EditTask";
import DeleteModal from "./components/DeleteModal";

function App() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  const getTodoList = () => {
    axios
      .request({
        method: "get",
        url: `http://localhost:3600/task-list?search=${search}`,
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setTaskList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (show == false || showEdit == false) {
      getTodoList();
    }
  }, [showEdit, show]);

  const searchSubmit = () => {
    getTodoList();
    setSearch("");
  };

  const deleteTaskFunc = () => {
    axios
      .request({
        method: "delete",
        url: `http://localhost:3600/remove-task?id=${deleteId}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        getTodoList();
        setDeleteId(null);
        setShowDelete(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editTaskFunc = (id, status) => {
    axios
      .request({
        method: "patch",
        url: `http://localhost:3600/update-task?id=${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { status: !status },
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        getTodoList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="App">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Todo App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button
                  variant="outline-success"
                  class="p-2 bd-highlight"
                  onClick={() => setShow(true)}
                >
                  Create
                </Button>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <Button
                  variant="outline-success"
                  onClick={() => searchSubmit()}
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody id="mytable">
              {taskList.map((ele, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.status == true ? "COMPLETED" : "PENDING"}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="mx-2"
                      onClick={() => {
                        setSelectedTaskId(ele.id);
                        setShowEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="mx-2"
                      onClick={() => {
                        setShowDelete(true);
                        setDeleteId(ele.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        editTaskFunc(ele.id, ele.status);
                      }}
                    >
                      Update status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateTask show={show} setShow={setShow} />
      <EditTask
        show={showEdit}
        setShow={setShowEdit}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
      />
      <DeleteModal
        show={showDelete}
        setShow={setShowDelete}
        deleteId={deleteId}
        deleteTaskFunc={deleteTaskFunc}
      />
    </>
  );
}

export default App;
