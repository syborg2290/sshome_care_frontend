import React, { useState, useEffect } from "react";
import { Form, Input, Layout, Button } from "antd";
import "antd/dist/antd.css";

// styles
import "./Settings.css";

const { Content } = Layout;

export default function Settings() {
  const [userName, setUserName] = useState("");
  const [currntPassword, setCurrntPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <div>
      <Content>
        <Form className="form_Settings">
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              allowClear
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Enter user name"
            />
          </Form.Item>

          <Form.Item
            label="Current Password "
            name="cPassword"
            rules={[
              {
                required: true,
                message: "Please input your Current Password!",
              },
            ]}
          >
            <Input.Password
              allowClear
              value={currntPassword}
              onChange={(e) => {
                setCurrntPassword(e.target.value);
              }}
              placeholder="Enter Current Password"
            />
          </Form.Item>

          <Form.Item
            label="New Password "
            name="nPassword"
            rules={[
              { required: true, message: "Please input your New Password!" },
            ]}
          >
            <Input.Password
              allowClear
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="Enter new Password"
            />
          </Form.Item>

          <Button
            // disabled={
            //   !loadingSubmit &&
            //   (itemName ||
            //     name ||
            //     password ||
            //     roll ||
            //     ? false
            //     : true
            // }

            className="btn"
            type="primary"

            //   onClick={updateUser}
          >
            {/* {loadingSubmit ? (
              <Spin spinning={loadingSubmit} size="large" />
            ) : (
              "Update"
            )} */}
            update
          </Button>
        </Form>
      </Content>
    </div>
  );
}
