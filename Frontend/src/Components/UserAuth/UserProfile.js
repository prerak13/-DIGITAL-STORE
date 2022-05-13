import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, Button, Label } from "reactstrap";

import axios from "axios";
import Pool from "./UserPool";
import { Navigate, useNavigate } from "react-router-dom";
import { AccountContext } from "../UserAuth/Accounts";
import Login from "./Login";

const UserProfile = (props) => {
  const { getSession, logout } = useContext(AccountContext);
  const [session, setSession] = useState();
  const [udata, setUdata] = useState("");
  const [id, setID] = useState("");
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const [status, setStatus] = useState(false);
  useEffect(() => {
    getSession().then((session) => {
      setSession(session);

      setStatus(true);
    });
  }, [items]);

  return (
    <div>
      <div>{status ? navigate("/user") : <Login />}</div>
    </div>
  );
};

export default UserProfile;
