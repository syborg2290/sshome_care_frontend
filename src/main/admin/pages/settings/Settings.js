import React, { useState } from "react";
import { Form, Input, Layout, Button, } from "antd";
import "antd/dist/antd.css";

// styles
import "./Settings.css";

const { Content } = Layout;


export default function Settings() {
  const [userName, setUserName] = useState("");
  const [currntPassword, setCurrntPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  return (
    <div>
      <Content>
        <Form className="form_Settings">
          <Form.Item
            name="User Name"
            label="User Name"
            rules={[
              {
                required: true,
              },
            ]}
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
            name="currentPassword"
            label="Current Password "
            rules={[
              {
                required: true,
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
            name="newPassword"
            label="New Password "
            rules={[
              {
                required: true,
              },
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
