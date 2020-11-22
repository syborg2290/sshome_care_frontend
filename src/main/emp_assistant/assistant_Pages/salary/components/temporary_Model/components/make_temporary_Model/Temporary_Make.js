import React, { useState } from "react";
import { DatePicker, Space, Spin } from "antd";

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
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const makeTemporary = () => {
    setLoading(true);
    db.collection("temporary")
      .add({
        reason: reason,
        amount: amount,
        date: date,
      })
      .then((_) => {
        setLoading(false);
        window.location.reload();
      });
  };

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
                    setAmount(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Reason
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
                label="Target Amount"
                size="small"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value.trim());
                }}
              />
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
                onClick={makeTemporary}
                disabled={date === null || isLoading}
              >
                {isLoading ? <Spin size="small" /> : "Done"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
