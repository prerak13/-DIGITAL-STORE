import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, price, image_url }) => {
  const navigate = useNavigate();
  return (
    <div className="col-xs-6 col-sm-4 col-md-3">
      <Card style={{ marginBottom: "10%" }}>
        <CardImg top height={350} src={image_url} alt={name} />
        <CardBody>
          <CardTitle>Name: {name}</CardTitle>
          <CardSubtitle>Price: {price}</CardSubtitle>

          <br />
          <Button
            onClick={() => navigate(`${id}`, { id, name, price, image_url })}
          >
            View Details
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCard;
