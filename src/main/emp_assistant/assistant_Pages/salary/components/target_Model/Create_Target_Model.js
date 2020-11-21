import React, { useState, useEffect } from "react";
import { DatePicker, Space, Radio } from "antd";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Select,
  FormControl,
} from "@material-ui/core";
import { Spin } from "antd";

import db from "../../../../../../config/firebase.js";

function daysCountOfMonth(month, year) {
  return parseInt(new Date(year, month, 0).getDate());
}

export default function Create_Target_Model() {
  const [allRoot, setAllRoot] = useState([]);
  const [sale_taregt_amount, setSaleAmount] = useState(0);
  const [cash_taregt_amount, setCashAmount] = useState(0);
  const [selectedType, setSelectedType] = useState("shop");
  const [targetType, setTargetType] = useState("sale_target");

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const getAllCashTargetAmount = () => {};

  const getAllSaleTargetAmount = () => {
    let daysCount = daysCountOfMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    let fromT = new Date(new Date().setDate(new Date() - daysCount));
    db.collection("invoice")
      .get()
      .then((reInvoice) => {
        // reInvoice.docs
      });
  };

  useEffect(() => {
    db.collection("root")
      .get()
      .then((re) => {
        var rawRoot = [];
        re.docs.forEach((each) => {
          rawRoot.push(each.data().root);
        });
        setAllRoot(rawRoot);
      });
  }, []);

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Make Salary
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Target Amount(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="bsly"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Target Amount"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={
                  targetType === "sale_target"
                    ? sale_taregt_amount
                    : cash_taregt_amount
                }
                onChange={(e) => {
                  if (targetType === "sale_target") {
                    setSaleAmount(parseInt(e.target.value.trim()));
                  } else {
                    setCashAmount(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Type
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                <FormControl variant="outlined" className="fcontrol">
                  <Select
                    className="roll_selector"
                    size="small"
                    native
                    onChange={handleChange}
                    value={selectedType}
                  >
                    <option onChange={handleChange} value={"shop"}>
                      shop
                    </option>
                    {allRoot.map((each) => (
                      <option onChange={handleChange} key={each} value={each}>
                        {each}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Space>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Start Date
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                <DatePicker />
              </Space>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              End Date
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                <DatePicker />
              </Space>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Target Type
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Radio.Group
                defaultValue="sale_target"
                buttonStyle="solid"
                onChange={(e) => {
                  setTargetType(e.target.value);
                }}
              >
                <Radio.Button value="sale_target">Sale Target</Radio.Button>
                <Radio.Button value="cash_target">Cash Target</Radio.Button>
              </Radio.Group>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                // onClick={btnUpdate}
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
