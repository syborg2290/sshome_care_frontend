import React, { useState, useEffect } from "react";
import { List, Radio, Row, Col, Divider, Spin } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();

  useEffect(() => {
    var keepData = [];
    var keepDataQTY = {};
    var keepDataPaymentway = {};
    var i = 0;
    itemListProps.forEach((ele) => {
      console.log(i);
      keepDataQTY[i] = ele.qty;
      keepDataPaymentway[i] = ele.paymentWay;
      keepData.push({
        i:i,
        id: ele.item.id,
        title: ele.item.data.itemName,
        unitprice: ele.item.data.salePrice,
        qty: ele.qty,
        paymentWay: ele.paymentWay,
        item: ele.item.data,
      });
       i = i + 1;
    });
    
    setInputs(keepDataQTY);
    setpaymentWay(keepDataPaymentway);
    setItemsData(keepData);
    // eslint-disable-next-line
  }, [itemListProps]);

  const handleChange = (e, itemid, i) => {
    try {
      const { value } = e.target;
      db.collection("item")
        .doc(itemid)
        .get()
        .then((doc) => {
          console.log(doc.data());
          if (doc.data().qty >= value) {
            setInputs({
              ...inputs,
              [i]: value,
            });
          } else {
            NotificationManager.warning("Out Of Stock");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const removeItems = (i, itemId) => {
    itemsData.forEach((ele) => {
      if (ele.id === itemId) {
        itemsData.splice(i, 1);
        setInputs({ ...inputs, [i]: 0 });
        if (itemsData.length === 0) {
          closeModel();
        }
      }
    });
  };

  const nextclick = () => {
    console.log(inputs);
    console.log(paymentWay);
    setLoading(true);
    var nextData = [];
    for (var i = 0; i < itemsData.length; i++) {
      let obj = {
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
      let moveWith = {
        pathname: "/showroom/invoice/addCustomer",
        search: "?query=abc",
        state: { detail: nextData },
      };

      history.push(moveWith);
    } else {
      setLoading(false);
      //sent to direct invoice
      let moveWith = {
        pathname: "/showroom/ui/makeInvoice",
        search: "?query=abc",
        state: { detail: nextData },
      };

      history.push(moveWith);
    }
  };

  const createInputs = (item) => {
    return itemsData.map((i) =>
      (
        <div key={i.i}>
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
                    {
                      <TextField
                        key={i.i}
                        id={i.i}
                        className="txt_Sitem"
                        autoComplete="item"
                        name="iitem_selected"
                        variant="outlined"
                        size="small"
                        // value={inputs[i]}
                        onChange={(e) => handleChange(e, item.id, i.i)}
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
                          [i.i]: e.target.value,
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
                      <CloseOutlined onClick={() => removeItems(i.i, item.id)} />
                    </span>
                  </Col>
                </Row>
              }
              description={<span>LKR {item.unitprice}</span>}
            />
          </List.Item>
          <Divider />
        </div>
      ) 
    );
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
