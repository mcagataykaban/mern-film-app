import React, { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber, Checkbox, Row, Col } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import _ from "lodash";
import { Rate } from "antd";
import { Redirect } from "react-router-dom";

const NewFilm = (props) => {
  const [genres, setGenres] = useState([]);

  const re = /^[0-9\b]+$/;


  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [formGenres, setFormGenres] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [rate, setRate] = useState(0);
  const formSubmitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/addFilm", {
      method: "post",
      body: JSON.stringify({
        name: name,
        minutes: minutes,
        genres: formGenres,
        imgUrl: imgUrl,
        rate: rate,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        props.setFilms([...props.films, data])
        props.setisNewFilm(false)
      });
  };
  const nameInputHandler = (e) => {
    setName(e.target.value);
  };
  const imgInputHandler = (e) => {
    setImgUrl(e.target.value);
  };
  const minInputHandler = (e) => {
    if (re.test(e.target.value)) {
      setMinutes(e.target.value);
    }
  };
  const rateInputHandler = (e) => {
    if (re.test(e.target.value)) {
      setRate(e.target.value);
    }
  };
  const genreInputHandler = (isChecked, _id) => {
    if (isChecked) {
      setFormGenres([...formGenres, _id]);
    } else {
      setFormGenres(formGenres.filter((a) => a !== _id));
    }
  };

  const backFilmsHandler = () => {
    props.setisNewFilm(false);
  };

  useEffect(() => {
    fetch("http://localhost:4000/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);


  return (
    <div className="container">
      <div className="d-flex justify-content-between m-3">
        <h5>New Film</h5>
        <Button
          className="d-flex align-items-baseline"
          onClick={backFilmsHandler}
          type="primary"
        >
          <RollbackOutlined /> Back
        </Button>
      </div>
      <Form>
        <Form.Item label="Film Name">
          <Input onChange={nameInputHandler} value={name} />
        </Form.Item>
        <Form.Item label="Img Url">
          <Input onChange={imgInputHandler} value={imgUrl} />
        </Form.Item>
        <Form.Item label="Minutes">
          <input type="number" onChange={minInputHandler} value={minutes} />
        </Form.Item>
        <Form.Item name="checkbox-group" label="Genres">
          <Checkbox.Group>
            <Row>
              {genres.map((g) => {
                return (
                  <Col key={g._id} span={8}>
                    <Checkbox
                      onChange={(e) =>
                        genreInputHandler(e.target.checked, g._id)
                      }
                      value={g._id}
                      style={{ lineHeight: "32px" }}
                    >
                      {g.name}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <div className="d-flex justify-content-between">
          <Form.Item label="Rate">
            <input value={rate} onChange={rateInputHandler} />
          </Form.Item>
          <Button type="primary" onClick={formSubmitHandler}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewFilm;
