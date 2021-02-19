import React from "react";
import { Card,Rate } from "antd";

const { Meta } = Card;

const Film = (props) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
        height={355}
          alt="example"
          src={props.imgUrl}
        />
      }
    >
      <Meta title={props.name} description={props.minutes+ "m"} />
      <Rate allowHalf value={props.rate} />
    </Card>
  );
};

export default Film;
