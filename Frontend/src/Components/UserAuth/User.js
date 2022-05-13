import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, Button, Label } from "reactstrap";

import axios from "axios";
import { AccountContext } from "../UserAuth/Accounts";
import { useNavigate } from "react-router-dom";

const User = ({ history }) => {
  const navigate = useNavigate();
  const { getSession, logout } = useContext(AccountContext);
  const [id, setID] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone_number, setPhonenumber] = useState([]);
  const [name, setName] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    setID(localStorage.getItem("id"));
    setEmail(localStorage.getItem("email"));
    setName(localStorage.getItem("name"));
    setPhonenumber(localStorage.getItem("phone_number"));
    setAddress(localStorage.getItem("address"));

    console.log("USER useEffect items", id);
  }, []);
  const [udata, setUdata] = useState("");
  console.log("", email);
  //const id = items;
  return (
    <div>
      <div>
        <div>
          <Card
            style={{ width: "370px", marginLeft: "450px", marginTop: "50px" }}
            className=""
          >
            <CardBody>
              <CardTitle className="font-weight-bold">
                <h4>Your Detailes</h4>
              </CardTitle>

              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Name:</label>

                <label className="col-sm-4 col-form-label">{name}</label>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Email:</label>

                <label className="col-sm-4 col-form-label">{email}</label>
              </div>

              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Phone number:</label>
                <label className="col-sm-4 col-form-label">
                  {phone_number}
                </label>
              </div>

              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Address:</label>
                <label className="col-sm-4 col-form-label">{address}</label>
              </div>
              <div>
                <button
                  className=" btn btn-primary btn-block pt-2"
                  onClick={() => {
                    logout();
                    navigate("/login");
                    localStorage.clear();
                  }}
                >
                  Logout
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;
