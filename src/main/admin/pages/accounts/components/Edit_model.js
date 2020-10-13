import React, { useState } from "react";
import { Form, Input, Layout, Button, Spin } from "antd";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import db from "../../../../../config/firebase.js";
import "antd/dist/antd.css";

// styles
import "./Style_accounts.css";

const { Content } = Layout;

export default function Editmodel({ editModalClose,usernameProp,docid }) {
  const [username, setUsername] = useState(usernameProp);
  const [password, setPassword] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [usernameClick, setusernameClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  
  
  const updateUser = async(e) => {
     e.preventDefault();
    setPasswordClick(true);
    setusernameClick(true);
    if (username !== "") {
      if (password !== "") {
        setLoadingSubmit(true);
        let variable = {
          username: username,
          password: password,
        };

        await db.collection("user").doc(docid).update(variable);
        setLoadingSubmit(false);
        NotificationManager.success("User updated!", "Done");
        editModalClose();
      }
    }
  }

  return (
    <div>
      <Content>
        <Form className="form">
          <Form.Item label="* Username">
            <Input
              allowClear
              required={true}
              value={username}
              onClick={() => {
                setusernameClick(true);
              }}
               onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
            />
          </Form.Item>

          <Form.Item label="* Password ">
            <Input.Password
              allowClear
              required={true}
              value={password}
              onClick={() => {
                setPasswordClick(true);
              }}
               onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter new password"
            />
          </Form.Item>
          {username !== "" || !usernameClick ? (
            ""
          ) : (
            <p>Username is required!</p>
          )}
          {password !== "" || !passwordClick ? (
            ""
          ) : (
            <p>Password is required!</p>
          )}

          <Button
            className="btn"
            type="primary"
            disabled={!loadingSubmit ? false : true}
            onClick={updateUser}
          >
            {loadingSubmit ? (
              <Spin spinning={loadingSubmit} size="large" />
            ) : (
              "Update"
            )}
          </Button>
        </Form>
         <NotificationContainer />
      </Content>
    </div>
  );
}
