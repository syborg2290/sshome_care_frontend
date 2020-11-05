import React from "react";
import { Radio, Modal } from "antd";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

import "./Gass_Model.css";

// icon
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function Gass_Model() {
  const { confirm } = Modal;

  let history = useHistory();

  const showConfirm = () => {
    confirm({
      title: "Do you Want to Print a Recipt?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        history.push("/showroom/gass/gass_Model/make_recipt/Gass_recipt");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Sell
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Type
            </Grid>
            <Grid item xs={12} sm={9}>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button className="btn_sellRdio" value="a">
                  2.5 kg
                </Radio.Button>
                <Radio.Button className="btn_sellRdio" value="b">
                  5 kg
                </Radio.Button>
                <Radio.Button className="btn_sellRdio" value="c">
                  12.5 kg
                </Radio.Button>
              </Radio.Group>
            </Grid>
            <Grid className="lbl_qty" item xs={12} sm={3}>
              Qty
            </Grid>
            <Grid className="qq" item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                type="number"
                fullWidth
                label="Qty"
                name="qty"
                autoComplete="qty"
                size="small"
                className="txt_qtyGas"
              />
            </Grid>
            <Grid className="qq2" item xs={12} sm={2}>
              <TextField
                variant="outlined"
                id="txt_5"
                required
                type="number"
                fullWidth
                label="Qty"
                name="qty"
                autoComplete="qty"
                size="small"
                className="txt_qtyGas2"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                required
                type="number"
                fullWidth
                label="Qty"
                name="qty"
                autoComplete="qty"
                size="small"
                className="txt_qtyGas"
              />
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Tot(LKR)
            </Grid>
            <Grid item xs={12} sm={3}>
              <p>
                {" "}
                <CurrencyFormat
                  value={" 2500"}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid item xs={12} sm={2}>
              <p className="lbl_qtyGas2tot">
                <CurrencyFormat
                  value={"2200"}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid item xs={12} sm={2}>
              <p>
                {" "}
                <CurrencyFormat
                  value={"3200"}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Total Price(LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <p className="price">
                {" "}
                <CurrencyFormat
                  value={"11200"}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_updateGass"
                onClick={showConfirm}
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
