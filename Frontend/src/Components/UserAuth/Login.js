import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";
// import Status from './Status';
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import constants from "../../constants/constants";

import { Card, CardBody, Form } from "reactstrap";
export default () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    if (email == "admin" && password == "admin") {
      localStorage.setItem("isAdmin", true);
      navigate("/products");
    } else {
      localStorage.setItem("isAdmin", false);
      authenticate(email, password)
        .then((data) => {
          localStorage.setItem("id", data.idToken.payload.sub);
          localStorage.setItem("email", data.idToken.payload.email);
          localStorage.setItem("name", data.idToken.payload.name);
          localStorage.setItem(
            "phone_number",
            data.idToken.payload.phone_number
          );
          localStorage.setItem(
            "address",
            data.idToken.payload.address.formatted
          );
          let request_data = {
            user_email: localStorage.getItem("email"),
          };
          axios.post(
            `${constants.API_BASE_URL}/subscribeNotification`,
            request_data,
            {
              headers: {
                // Authorization: Cookies.get(constants.authorization_token),
              },
            }
          );
          navigate("/products");
        })
        .catch((err) => {
          alert("Incorrect ID or password.");
          console.error("Failed to login!", err);
        });
    }

    //localStorage.setItem('items', JSON.parse(session));
  };

  const { getSession, logout } = useContext(AccountContext);

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* <div className='container h-100' > */}
        {/* <div className='w-200 d-lg-inline-flex align-items-center justify-content-center h-100 text-left ' style={{ marginTop: "5%" }}></div> */}

        <Form onSubmit={onSubmit}>
          <Card
            style={{ width: "370px", marginLeft: "450px", marginTop: "50px" }}
            className=""
          >
            <CardBody>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Email:</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Password:</label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block pt-2"
                style={{ width: "100px", align: "center" }}
              >
                Login
              </button>

              <div className="form-group row">
                <label>Not registered?</label> <Link to="/signup">SignUp</Link>
              </div>
            </CardBody>
          </Card>
        </Form>
      </div>
    </div>
  );
};
