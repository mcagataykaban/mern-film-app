import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";

const AdminPage = (props) => {
  const text = "Are you sure to delete this task?";

  function confirm(id) {
    console.log(id);
    fetch(`http://localhost:4000/deleteFilm/${id}`, {
      method: "POST",
    })
      .then((resp) => {
        if (resp.ok) {
          props.setFilms(
            _.remove(props.films, function(n) {
              return n._id !== id;
            })
          );
          message.info("Film deleted");
        }
      })
      .catch((err) => {
        console.log(err);
        message.info("Something went wrong");
      });
  }

  const deleteFilm = (id) => {
    //   setIsModalVisible(true)
    // console.log(id);
  };

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
            <Button onClick={() => deleteFilm(_id)}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div className="container">
      <h5 className="mt-3">Films</h5>
      <Table dataSource={props.films} columns={columns}></Table>
    </div>
  );
};

export default AdminPage;
