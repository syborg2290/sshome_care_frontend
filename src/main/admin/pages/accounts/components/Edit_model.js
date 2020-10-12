import React, { useState } from "react";
import { Form, Input, Layout, Button, Select } from "antd";
import "antd/dist/antd.css";

// styles
import "./Style_accounts.css";

const { Content } = Layout;
const { Option } = Select;

export default function Edit_model() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");

  return (
    <div>
      <Content>
        <Form className="form">
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
            name="Password"
            label="Password "
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              allowClear
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter new Password"
            />
          </Form.Item>
          <Form.Item
            name="Roll"
            label="Roll"
            value={roll}
            onChange={(e) => {
              setRoll(e.target.value);
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="assistant">Assistant</Option>
              <Option value="Showroom">Showroom</Option>
              <Option value="admin">Admin</Option>
            </Select>
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
