import React, { Component, useState, useEffect } from "react";
import constants from "../../constants/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
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

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState({
    success: false,
    detail: {},
  });
  let productID;
  const param = useParams();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    let data = {
      product_id: param.id,
      user_email: localStorage.getItem("email"),
    };
    await axios
      .post(`${constants.API_BASE_URL}/order/add`, data, {
        headers: {
          // Authorization: Cookies.get(constants.authorization_token),
        },
      })
      .then((response) => {
        console.log("Response received: ", response);
        if (response.data.success) {
          console.log("response.data.success", response.data.success);
          productID = response.data.product_id;
          alert(
            `Product with ID: ${productID} is ordered and is pending for confirmation with the admin`
          );
          navigate("/products");
        } else if (!response.data.success) {
          navigate("/login");
          // navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  useEffect(() => {
    axios
      .get(`${constants.API_BASE_URL}/product/view`, {
        headers: {
          // Authorization: Cookies.get(constants.authorization_token),
        },
      })
      .then((response) => {
        console.log("Response received: ", response);
        if (response.data.success) {
          console.log("response.data.success", response.data.response);

          console.log("param.id", param.id);

          const product_details = response.data.response || [];
          setProductDetail({
            success: response.data.success,
            detail: product_details.filter((x) => x.id == param.id)[0],
          });
        } else if (!response.data.success) {
          // navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);
  console.log("Products are :", productDetail);

  return (
    <div className="col-xs-6 col-sm-4 col-md-3">
      <Card style={{ marginBottom: "10%" }}>
        <CardImg
          top
          height={350}
          src={productDetail.detail.image_url}
          alt={productDetail.detail.name}
        />
        <CardBody>
          <CardTitle>Name: {productDetail.detail.name}</CardTitle>
          <CardSubtitle>Category: {productDetail.detail.category}</CardSubtitle>
          <CardText>Description: {productDetail.detail.description}</CardText>
          <CardText>Price: {productDetail.detail.price}</CardText>
          <br />
          {localStorage.getItem("isAdmin") === "true" ? (
            ""
          ) : (
            <Button onClick={handleClick}>Order Now</Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductDetails;
