import React from "react";
import { List, Radio, Row, Col } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// styles
import "./SelectedItem_model.css";

export default function SelectedItem_Model() {
  const data = [
    {
      title: "Gass Coocker",
    },

    {
      title: "Television",
    },
  ];

  return (
    <List
      className="model_List"
      footer={
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="btn_ModelSelectedItem"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      }
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <span className="icons_List">
            <ShoppingCartOutlined twoToneColor="#52c41a" />
          </span>
          <List.Item.Meta
            title={
              <Row>
                <Col span={7}> {item.title}</Col>
                <Col span={3}>
                  {" "}
                  <TextField
                    className="txt_Sitem"
                    autoComplete="item"
                    name="iitem_selected"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    label="Qty"
                    autoFocus
                  />
                </Col>
                <Col span={12}>
                  <Radio.Group
                    className="radio_btn"
                    defaultValue="a"
                    buttonStyle="solid"
                    size="small"
                  >
                    <Radio.Button className="btn_radio" value="a">
                      Pay and Go
                    </Radio.Button>
                    <Radio.Button className="btn_radio" value="b">
                      Full Payment
                    </Radio.Button>
                  </Radio.Group>
                </Col>
                <Col span={2}>
                  <span className="icons_Close">
                    <CloseOutlined />
                  </span>
                </Col>
              </Row>
            }
            description="1499.00"
          />
        </List.Item>
      )}
    />
  );
}
