import React, { Component, useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Form, FormGroup } from "reactstrap";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    var attributeList = [
      new CognitoUserAttribute({ Name: "address", Value: address }),
      new CognitoUserAttribute({ Name: "phone_number", Value: phone_number }),
      new CognitoUserAttribute({ Name: "name", Value: name }),
    ];

    event.preventDefault();
    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
      } else {
        const userdetails = {
          users: [
            {
              id: data.userSub,
              name: name,
              email: email,
              phonenumber: phone_number,
              address: address,
            },
          ],
        };

        alert("Please check your email for confirmation link.");
        navigate("/login");
      }
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Form onSubmit={onSubmit}>
          <Card
            style={{ width: "370px", marginLeft: "450px", marginTop: "50px" }}
            className=""
          >
            <CardBody>
              <div className="form-group row">
                <label class="col-sm-4 col-form-label">Name:</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form-group row">
                <label class="col-sm-4 col-form-label">Email:</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group row">
                <label class="col-sm-4 col-form-label">Phone number:</label>
                <input
                  value={phone_number}
                  onChange={(event) => setPhonenumber(event.target.value)}
                />
              </div>

              <div className="form-group row">
                <label class="col-sm-4 col-form-label">Address:</label>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>

              <div className="form-group row">
                <label class="col-sm-4 col-form-label">Password:</label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="form=control"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block pt-2"
                style={{ width: "100px", align: "center" }}
              >
                Signup
              </button>

              <div className="form-group row">
                <label>Already registered?</label>{" "}
                <Link to="/login">Login</Link>
              </div>
            </CardBody>
          </Card>
        </Form>
      </div>
    </div>
    // </div>
  );
};
