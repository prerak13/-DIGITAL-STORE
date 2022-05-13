// This page will be rendered only for the Normal Users who will be ordering products.
import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import constants from "../../constants/constants";

const ViewOrders = () => {
  //I referred the following Datagrid components from:
  // https://mui.com/components/data-grid/
  const adminCols = [
    // { field: "id", headerName: "Sr. No.", width: 60 },
    { field: "id", headerName: "Order ID", width: 120 },
    {
      field: "date",
      headerName: "Order Date",
      type: "date",
      width: 150,
    },
    // { field: "user_id", headerName: "User ID", width: 120 },
    { field: "name", headerName: "Product Name", width: 120 },
    { field: "category", headerName: "Product Category", width: 160 },
    { field: "price", headerName: "Total Amount", width: 120 },
    { field: "status", headerName: "Order Status", width: 120 },
  ];

  const [orderList, setOrderList] = useState({
    success: false,
    items: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    }

    axios
      .get(
        `${
          constants.API_BASE_URL
        }/user/viewOrder?user_email=${localStorage.getItem("email")}`,
        {
          headers: {
            // Authorization: Cookies.get(constants.authorization_token),
          },
        }
      )
      .then((response) => {
        console.log("Response received: ", response);
        if (response.data.success) {
          console.log("response.data.success", response.data.success);
          setOrderList({
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
  console.log("Orders are :", orderList);

  return (
    <div>
      <h1>My Orders</h1>
      <div
        style={{
          height: 423,
          width: "60%",
          margin: "2% 10%",
        }}
      >
        <DataGrid
          rows={orderList.items}
          columns={adminCols}
          pageSize={6}
          disableSelectionOnClick
        ></DataGrid>
      </div>
    </div>
  );
};
export default ViewOrders;
