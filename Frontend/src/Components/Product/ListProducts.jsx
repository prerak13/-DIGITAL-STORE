import React, { Component, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProduct";
import axios from "axios";
import constants from "../../constants/constants";
import { useNavigate } from "react-router-dom";

function ListProducts() {
  const [productList, setProductList] = useState({
    success: false,
    items: [],
  });

  const navigate = useNavigate();

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
          console.log("response.data.success", response.data.success);
          setProductList({
            success: response.data.success,
            items: response.data.response,
          });
        } else if (!response.data.success) {
          // navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);
  console.log("Products are :", productList);

  return (
    <>
      <h1>Product Page</h1>
      <div className="container">
        <div className="row">
          {productList.items.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListProducts;
