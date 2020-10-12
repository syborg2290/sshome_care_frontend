import React, { useState } from "react";
import { Form, Input, Layout, Button, Select  } from "antd";
import "antd/dist/antd.css";


const { Content } = Layout;
const { Option } = Select;

export default function NewUser_model() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");

    return (
     <div>
      <Content>
        <Form className="form">
          <Form.Item label="* User Name">
            <Input
              allowClear
              value={userName}
              placeholder="Enter user name"
            />
          </Form.Item>
         
          <Form.Item label="* Password ">
            <Input.Password
              allowClear
              value={password}
              placeholder="Enter new Password"
            />
          </Form.Item>
           <Form.Item
          name="Roll"
          label="Roll"
          value={roll}
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

            Submit
          </Button>
        </Form>

      </Content>
    </div>
       

    )
}
