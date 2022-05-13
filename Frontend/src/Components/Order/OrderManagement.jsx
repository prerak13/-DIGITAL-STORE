// This page will be rendered only for the Admin Users.
// Admin will see all the Pending orders and 2 Buttons: Approve & Decline
import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import constants from "../../constants/constants";

const OrderManagement = () => {
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
    { field: "user_email", headerName: "User Email ID", width: 120 },
    { field: "name", headerName: "Product Name", width: 120 },
    { field: "category", headerName: "Product Category", width: 160 },
    { field: "price", headerName: "Total Amount", width: 120 },
    {
      field: "approve",
      headerName: "Approve Order",
      width: 150,
      sortable: false,
      // https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid
      renderCell: (params) => {
        const onApprove = async () => {
          let data = {
            order_id: params.row.id,
            status: "Approved",
          };
          await axios
            .post(`${constants.API_BASE_URL}/order/update`, data, {
              headers: {
                // Authorization: Cookies.get(constants.authorization_token),
              },
            })
            .then((response) => {
              console.log("Response received: ", response);
              if (response.data.success) {
                console.log("response.data.success", response.data.success);
                alert(
                  `Order with id: ${params.row.id} has been approved successfully`
                );
                setOrderList({
                  success: response.data.success,
                  items: response.data.response,
                });
                let request_data = {
                  order_status: "Approved",
                  user_name: localStorage.getItem("name"),
                };
                axios.post(
                  `${constants.API_BASE_URL}/sendEmail`,
                  request_data,
                  {
                    headers: {
                      // Authorization: Cookies.get(constants.authorization_token),
                    },
                  }
                );
              } else if (!response.data.success) {
                // navigate("/login");
                // navigate("/");
              }
            })
            .catch((err) => {
              console.log("Error:", err);
            });
        };

        return (
          <Button
            onClick={onApprove}
            variant="contained"
            color="primary"
            style={{
              width: "90%",
              textAlign: "center",
            }}
          >
            Approve
          </Button>
        );
      },
    },
    {
      field: "decline",
      headerName: "Decline Order",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onDecline = async () => {
          let data = {
            order_id: params.row.id,
            status: "Declined",
          };
          await axios
            .post(`${constants.API_BASE_URL}/order/update`, data, {
              headers: {
                // Authorization: Cookies.get(constants.authorization_token),
              },
            })
            .then((response) => {
              console.log("Response received: ", response);
              if (response.data.success) {
                console.log("response.data.success", response.data.success);
                alert(
                  `Order with id: ${params.row.id} has been declined successfully`
                );
                setOrderList({
                  success: response.data.success,
                  items: response.data.response,
                });
                let request_data = {
                  order_status: "Declined",
                  user_name: localStorage.getItem("name"),
                };
                axios.post(
                  `${constants.API_BASE_URL}/sendEmail`,
                  request_data,
                  {
                    headers: {
                      // Authorization: Cookies.get(constants.authorization_token),
                    },
                  }
                );
              } else if (!response.data.success) {
                // navigate("/login");
                // navigate("/");
              }
            })
            .catch((err) => {
              console.log("Error:", err);
            });
        };
        return (
          <Button
            onClick={onDecline}
            variant="outlined"
            color="error"
            style={{
              width: "90%",
              textAlign: "center",
            }}
          >
            Decline
          </Button>
        );
      },
    },
  ];

  const [orderList, setOrderList] = useState({
    success: false,
    items: [],
  });

  useEffect(() => {
    axios
      .get(`${constants.API_BASE_URL}/admin/viewOrder`, {
        headers: {
          // Authorization: Cookies.get(constants.authorization_token),
        },
      })
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
      <h1>Order Management</h1>
      <div
        style={{
          height: 423,
          width: "100%",
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
export default OrderManagement;
