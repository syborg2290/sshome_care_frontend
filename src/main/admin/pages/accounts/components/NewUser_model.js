import React, { useState } from "react";
import { Form, Input, Layout, Button, Select, Spin } from "antd";
import "antd/dist/antd.css";
import firebase from "firebase";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import db from "../../../../../config/firebase.js";

// styles
import "./Style_accounts.css";

const { Content } = Layout;
const { Option } = Select;

export default function NewUsermodel({ newUserModal }) {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [usernameClick, setusernameClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);

  const addUser = async (e) => {
    e.preventDefault();
    setPasswordClick(true);
    setusernameClick(true);
    if (userName !== "") {
      if (password !== "") {
        setLoadingSubmit(true);
        var allUsers = await db.collection("user").get();

        if (
          allUsers.docs.some(
            (ob) =>
              ob.data().username === userName.trim() &&
              ob.data().password === password.trim()
          )
        ) {
          setLoadingSubmit(false);
          NotificationManager.info("User already exist!");
        } else {
          let variable = {
            username: userName.trim(),
            password: password.trim(),
            role: role,
            lastlog: firebase.firestore.FieldValue.serverTimestamp(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };

          await db.collection("user").add(variable);
          setLoadingSubmit(false);
          NotificationManager.success("User creation successfully!", "Done");
          newUserModal();
        }
      }
    }
  };

  return (
    <div>
      <Content>
        <Form className="form">
          <Form.Item label="* Username">
            <Input
              allowClear
              required={true}
              value={userName}
              onClick={() => {
                setusernameClick(true);
              }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Enter username"
            />
          </Form.Item>

          <Form.Item label="* Password">
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
              placeholder="Enter new Password"
            />
          </Form.Item>
          <Form.Item label="* Role">
            <Select
              placeholder="Select a option and change input text above"
              value={role}
              onChange={(e) => {
                setRole(e);
              }}
            >
              <Option value="assistant">Assistant</Option>
              <Option value="Showroom">Showroom</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          {userName !== "" || !usernameClick ? (
            ""
          ) : (
            <p className="name_Msg">Username is required!</p>
          )}
          {password !== "" || !passwordClick ? (
            ""
          ) : (
            <p className="pw_Msg">Password is required!</p>
          )}

          <Button
            className="btn"
            type="primary"
            disabled={!loadingSubmit ? false : true}
            onClick={addUser}
          >
            {loadingSubmit ? (
              <Spin spinning={loadingSubmit} size="large" />
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
        <NotificationContainer />
      </Content>
    </div>
  );
}
