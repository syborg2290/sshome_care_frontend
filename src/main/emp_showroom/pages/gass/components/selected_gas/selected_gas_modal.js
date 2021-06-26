import React, { useState, useEffect } from "react";
import { List, Radio, Row, Col, Divider, Spin } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Grid } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import db from "../../../../../../config/firebase.js";

export default function SelectedGas_Model({ gasListProps }) {
  const [isLoading, setLoading] = useState(false);
  const [gasData, setGasData] = useState([]);
  const [paymentWay, setpaymentWay] = useState("PayandGo");
   const [gasType, setGasType] = useState("fullgas");
  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    let gasListFromProp = gasListProps;

    setGasData(gasListFromProp);
    // eslint-disable-next-line
  }, [gasListProps]);

  const nextclick = () => {
    setLoading(true);

    db.collection("gas")
      .get()
      .then((eachGasDoc) => {
        let allGas = eachGasDoc.docs;
        let nextGas = [];

        for (var i = 0; i < gasData.length; i++) {
          let textWeight = gasData[i].substr(0, gasData[i].indexOf(" "));

          let filGas = allGas.filter((ob) => ob.data().weight === textWeight);

          nextGas.push({
            id: filGas[0]?.id,
            data: filGas[0]?.data(),
            qty: 1,
            paymentWay: paymentWay,
            gasType:gasType,
            empty_weight:null,
            customer: null,
            withCylinder: true,
          });
        }

        if (nextGas.length === gasData.length) {
          if (paymentWay === "PayandGo") {
            setLoading(false);
            //sent to add customer
            let moveWith = {
              pathname: "/showroom/ui/Gass_customer",
              search: "?query=abc",
              state: { detail: nextGas },
            };

            history.push(moveWith);
          } else {
            setLoading(false);
            //sent to direct invoice
            let moveWith = {
              pathname: "/showroom/ui/Gass_invoice",
              search: "?query=abc",
              state: { detail: nextGas },
            };

            history.push(moveWith);
          }
        }
      });
  };

  const removeGas = (gas_weight) => {
    var gasDataLength = gasData.length;
    let index = gasData.indexOf(gas_weight);
    gasData.splice(index, 1);
    setGasData([...gasData]);
    gasDataLength = gasDataLength - 1;
    if (gasDataLength === 0) {
      window.location.reload();
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid className="radioGrid_main" item xs={12} sm={12}>
          <Typography className="method_title" variant="h5" gutterBottom>
            Select A Payment Method :
          </Typography>
        </Grid>
        <Grid className="hr_rGrid_main" item xs={12} sm={4}>
          <hr />
        </Grid>
        <Grid className="radioGrid_main" item xs={12} sm={8}></Grid>
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
              Easy Payment
            </Radio.Button>
            <Radio.Button className="btn_radio" value="FullPayment">
              Full Payment
            </Radio.Button>
          </Radio.Group>
        </Grid>
        <Grid item xs={12} sm={12}>
          <hr />
        </Grid>
         <Grid className="radioGrid_main" item xs={12} sm={12}>
          <Typography className="method_title" variant="h5" gutterBottom>
            Select Gas(Full/Empty) :
          </Typography>
        </Grid>
        <Grid className="hr_rGrid_main" item xs={12} sm={4}>
          <hr />
        </Grid>
        <Grid className="radioGrid_main" item xs={12} sm={8}></Grid>
        <Grid className="radioGrid_main" item xs={12} sm={12}>
          <Radio.Group
            className="radio_btn"
            defaultValue="fullgas"
            buttonStyle="solid"
            size="large"
            onChange={(e) => {
              setGasType(e.target.value);
            }}
          >
            <Radio.Button className="btn_radio" value="fullgas">
              Full Gas
            </Radio.Button>
            <Radio.Button className="btn_radio" value="emptygas">
              Empty Gas
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
        dataSource={gasData}
        renderItem={(gas) => (
          <div className="selcted_model">
            <List.Item>
              <span className="icons_List">
                <ShoppingCartOutlined twoToneColor="#52c41a" />
              </span>
              <List.Item.Meta
                title={
                  <Row>
                    <Col span={5}> {gas}</Col>
                    <Col span={2}></Col>
                    <Col span={12}></Col>
                    <Col span={5}>
                      <span className="icons_Close">
                        <CloseOutlined onClick={() => removeGas(gas)} />
                      </span>
                    </Col>
                  </Row>
                }
              />
            </List.Item>
            <Divider />
          </div>
        )}
      ></List>
    </>
  );
}
