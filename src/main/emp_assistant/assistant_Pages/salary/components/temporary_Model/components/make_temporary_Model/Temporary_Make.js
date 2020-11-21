import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import CurrencyFormat from "react-currency-format";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

// styles
import "./Temporary_Make.css";

import db from "../../../../../../../../config/firebase.js";
import firebase from "firebase";

export default function Temporary_Make() {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [date, setDate] = useState(null);

  // useEffect(() => {
  //   db.collection("employee").get();
  // }, []);

  // const makeTemporary = () => {};

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Temporary
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Amount(LKR)
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
                value={amount}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setAmount(e.target.value);
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Balance(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>
                <CurrencyFormat
                  value={10000}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Date
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                <DatePicker
                  onChange={(e) => {
                    if (e !== null) {
                      setDate(
                        firebase.firestore.Timestamp.fromDate(e.toDate())
                      );
                    } else {
                      setDate(null);
                    }
                  }}
                />
              </Space>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                // onClick={makeTemporary}
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
