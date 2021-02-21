import React, { useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import NewFilm from "../components/NewFilm";

const AdminPage = (props) => {
  const [isNewFilm, setisNewFilm] = useState(false);
  const text = "Are you sure to delete this task?";
  const newFilmHandler = () => {
    setisNewFilm(true);
  };
  function confirm(id) {
    console.log(id);
    fetch("http://localhost:4000/deleteFilm", {
      method: "POST",
      body: JSON.stringify({ _id: id }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        props.setFilms(
          _.remove(props.films, function(n) {
            return n._id !== id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
        message.info("Something went wrong");
      });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Minutes",
      dataIndex: "minutes",
      key: "minutes",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <div key={_id}>
          <Button className="mr-2">
            <EditOutlined />
          </Button>
          <Popconfirm
            placement="top"
            title={text}
            onConfirm={() => confirm(_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div className="container">
      {isNewFilm === false ? (
        <div>
          <div className="d-flex justify-content-between m-3">
            <h5>Films</h5>
            <Button onClick={newFilmHandler} type="primary">
              New Film
            </Button>
          </div>
          <Table dataSource={props.films} columns={columns}></Table>
        </div>
      ) : <NewFilm films={props.films} setFilms={props.setFilms} setisNewFilm={setisNewFilm} />}
    </div>
  );
};

export default AdminPage;
