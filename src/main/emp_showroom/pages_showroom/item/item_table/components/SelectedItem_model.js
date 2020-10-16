import React, { useState, useEffect } from "react";
import { List, Radio, Row, Col, Divider, Spin } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import db from "../../../../../../config/firebase.js";

// styles
import "./SelectedItem_model.css";

export default function SelectedItem_Model({ itemListProps, closeModel }) {
  const [isLoading, setLoading] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [inputs, setInputs] = useState({});
  const [paymentWay, setpaymentWay] = useState({});

  useEffect(() => {
    var keepData = [];

    itemListProps.forEach((ele) => {
      setInputs({ ...inputs, [Object.keys(inputs).length]: ele.qty });
      setpaymentWay({
        ...paymentWay,
        [Object.keys(paymentWay).length]: ele.paymentWay,
      });
      keepData.push({
        id: ele.item.id,
        title: ele.item.data.itemName,
        unitprice: ele.item.data.salePrice,
        qty: ele.qty,
        paymentWay: ele.paymentWay,
        item: ele.item.data,
      });
    });

    setItemsData(keepData);
    // eslint-disable-next-line
  }, [itemListProps]);

  const handleChange = (qty, i, itemId) => {
    try {
      db.collection("item")
        .doc(itemId)
        .get()
        .then((doc) => {
          if (doc.data().qty >= qty) {
            setInputs({ ...inputs, [i]: qty });
          } else {
            NotificationManager.warning("Out Of Stock");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const removeItems = (itemId) => {
    itemsData.forEach((ele) => {
      if (ele.id === itemId) {
        itemsData.splice(
          itemsData.indexOf((x) => x.id === itemId),
          1
        );
        if (itemsData.length === 0) {
          closeModel();
        }
      }
    });
  };

  const nextclick = () => {
    setLoading(true);
    var nextData = [];
    for (var i = 0; i < itemsData.length; i++) {
      var obj = {
        id: itemsData[i].id,
        title: itemsData[i].title,
        unitprice: itemsData[i].unitprice,
        qty: inputs[i],
        paymentWay: paymentWay[i],
        item: itemsData[i].item,
      };
      nextData.push(obj);
    }
    if (nextData.some((ob) => ob.paymentWay === "PayandGo")) {
      setLoading(false);
      //sent to add customer
    } else {
      setLoading(false);
      //sent to direct invoice
    }
  };

  const createInputs = (item) => {
    return Object.keys(inputs).map((i) => (
      <div key={i}>
        <List.Item id={i}>
          <span className="icons_List">
            <ShoppingCartOutlined twoToneColor="#52c41a" />
          </span>
          <List.Item.Meta
            title={
              <Row>
                <Col span={7}> {item.title}</Col>
                <Col span={3}>
                  {" "}
                  {
                    <TextField
                      className="txt_Sitem"
                      autoComplete="item"
                      name="iitem_selected"
                      variant="outlined"
                      size="small"
                      key={i}
                      id={i}
                      value={inputs[i]}
                      onChange={(e) => handleChange(e.target.value, i, item.id)}
                      required
                      fullWidth
                      label="Qty"
                      type="number"
                      min={1}
                    />
                  }
                </Col>
                <Col span={12}>
                  <Radio.Group
                    className="radio_btn"
                    defaultValue="PayandGo"
                    buttonStyle="solid"
                    size="small"
                    onChange={(e) => {
                      setpaymentWay({
                        ...paymentWay,
                        [e.target.id]: e.target.value,
                      });
                    }}
                  >
                    <Radio.Button className="btn_radio" value="PayandGo">
                      Pay and Go
                    </Radio.Button>
                    <Radio.Button className="btn_radio" value="FullPayment">
                      Full Payment
                    </Radio.Button>
                  </Radio.Group>
                </Col>
                <Col span={2}>
                  <span className="icons_Close">
                    <CloseOutlined
                      onClick={() => {
                        removeItems(i, item.id);
                      }}
                    />
                  </span>
                </Col>
              </Row>
            }
            description={<span>LKR {item.unitprice}</span>}
          />
        </List.Item>
        <Divider />
      </div>
    ));
  };

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
          onClick={nextclick}
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <Spin className="tblSpinner" size="large" spinning="true" />
          ) : (
            "Next"
          )}
        </Button>
      }
      itemLayout="horizontal"
      dataSource={itemsData}
      renderItem={(item) => createInputs(item)}
    >
      <NotificationContainer />
    </List>
  );
}
