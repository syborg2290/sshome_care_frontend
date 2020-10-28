import React, { useState, useEffect } from "react";
import { List, Radio, Row, Col, Divider, Spin } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";

// styles
import "./SelectedItem_model.css";
// eslint-disable-next-line
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate";

export default function SelectedItem_Model({ itemListProps, closeModel }) {
  const [isLoading, setLoading] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [paymentWay, setpaymentWay] = useState("PayandGo");
  let history = useHistory();

  useEffect(() => {
    var keepData = [];
    var i = 0;
    itemListProps.forEach((ele) => {
      keepData.push({
        i: i,
        id: ele.item.id,
        title: ele.item.data.itemName,
        unitprice: ele.item.data.salePrice,
        qty: ele.qty,
        item: ele.item.data,
      });
      i = i + 1;
    });

    setItemsData(keepData);
    // eslint-disable-next-line
  }, [itemListProps]);

  const removeItems = (i, itemId) => {
    var itemsDataLength = itemsData.length;
    let index = itemsData.indexOf((re) => re.id === itemId);
    itemsData.splice(index, 1);
    setItemsData([...itemsData]);
    itemsDataLength = itemsDataLength - 1;
    if (itemsDataLength === 0) {
      closeModel();
    }
  };

  const nextclick = () => {
    setLoading(true);
    var nextData = [];

    for (var i = 0; i < itemsData.length; i++) {
      let obj = {
        i: i,
        id: itemsData[i].id,
        title: itemsData[i].title,
        unitprice: itemsData[i].unitprice,
        qty: itemsData[i].qty,
        paymentWay: itemsData.length === 1 ? paymentWay : "FullPayment",
        item: itemsData[i].item,
        customer: null,
      };
      nextData.push(obj);
    }
    if (nextData.length === itemsData.length) {
      if (itemsData.length > 1) {
        setLoading(false);
        //sent to direct invoice
        let moveWith = {
          pathname: "/assistant/ui/makeInvoice",
          search: "?query=abc",
          state: { detail: nextData },
        };

        history.push(moveWith);
      } else {
        if (paymentWay === "PayandGo") {
          setLoading(false);
          //sent to add customer
          let moveWith = {
            pathname: "/assistant/ui/addCustomer",
            search: "?query=abc",
            state: { detail: nextData },
          };

          history.push(moveWith);
        } else {
          setLoading(false);
          //sent to direct invoice
          let moveWith = {
            pathname: "/assistant/ui/makeInvoice",
            search: "?query=abc",
            state: { detail: nextData },
          };

          history.push(moveWith);
        }
      }
    }
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
      renderItem={(item) => (
        <div className="selcted_model">
          <List.Item>
            <span className="icons_List">
              <ShoppingCartOutlined twoToneColor="#52c41a" />
            </span>
            <List.Item.Meta
              title={
                <Row>
                  <Col span={5}> {item.title}</Col>
                  <Col span={2}></Col>
                  <Col span={12}>
                    {itemsData.length === 1 ? (
                      <Radio.Group
                        className="radio_btn"
                        defaultValue="PayandGo"
                        buttonStyle="solid"
                        size="small"
                        onChange={(e) => {
                          setpaymentWay(e.target.value);
                        }}
                      >
                        <Radio.Button className="btn_radio" value="PayandGo">
                          Pay and Go
                        </Radio.Button>
                        <Radio.Button className="btn_radio" value="FullPayment">
                          Full Payment
                        </Radio.Button>
                      </Radio.Group>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col span={5}>
                    <span className="icons_Close">
                      <CloseOutlined
                        onClick={() => removeItems(item.i, item.id)}
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
      )}
    ></List>
  );
}