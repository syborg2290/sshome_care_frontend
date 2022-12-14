import React, { useState, useEffect } from "react";
import { List, Radio, Row, Col, Divider, Spin } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Grid } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

// styles
import "./SelectedItem_model.css";

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
        serialNo: ele.item.data.serialNo,
        modelNo: ele.item.data.modelNo,
        chassisNo: ele.item.data.chassisNo,
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
        serialNo: itemsData[i].serialNo,
        modelNo: itemsData[i].modelNo,
        chassisNo: itemsData[i].chassisNo,
        title: itemsData[i].title,
        unitprice: itemsData[i].unitprice,
        qty: itemsData[i].qty,
        paymentWay: paymentWay,
        item: itemsData[i].item,
        customer: null,
      };
      nextData.push(obj);
    }
    if (nextData.length === itemsData.length) {
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
  };

  return (
    <>
      <Grid container spacing={2}>
        <Typography className="method_title" variant="h5" gutterBottom>
          Select a Payment Method :
        </Typography>
        <Grid className="radioGrid_main" item xs={12} sm={12}>
          <Radio.Group
            className="radio_btn"
            defaultValue="PayandGo"
            buttonStyle="solid"
            size="large"
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
        </Grid>
        <Grid item xs={12} sm={12}>
          <hr />
        </Grid>
      </Grid>
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
                    <Col span={12}></Col>
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
    </>
  );
}
