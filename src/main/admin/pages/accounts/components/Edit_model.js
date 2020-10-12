import React, { useState, useEffect } from "react";
import { Form, Input, Layout, Button, Select } from "antd";
import "antd/dist/antd.css";

// styles
import "./Style_accounts.css";

const { Content } = Layout;
const { Option } = Select;

export default function Editmodel() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");

   const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <div>
      <Content>
        <Form className="form">
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
            label="Password "
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
            label="Roll"
            value={roll}
            name="roll"
            rules={[{ required: true, message: "Please input your roll!" }]}
            onChange={(e) => {
              setRoll(e.target.value);
            }}
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
          <Form.Item shouldUpdate={true}>
            <Button
              className="btn"
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
              // onClick={updateUser}
            >
              {/* {loadingSubmit ? (
              <Spin spinning={loadingSubmit} size="large" />
            ) : (
              "Update"
            )} */}
              update
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </div>
  );
}
