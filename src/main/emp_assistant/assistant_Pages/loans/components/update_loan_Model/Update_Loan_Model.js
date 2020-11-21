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
import "./Update_Loan_Model.css";

import db from "../../../../../../config/firebase.js";
import firebase from "firebase";

export default function Update_Loan_Model({ docId, balance, amountSe }) {
  const [amount, setAmount] = useState(balance);
  const [date, setDate] = useState(null);
  const [validation, setValidation] = useState("");
  const [isLoading, setLoading] = useState(false);

  const updateLoan = () => {
    setLoading(true);
    if (amount > 0) {
      db.collection("loans")
        .doc(docId)
        .get()
        .then((reCu) => {
          db.collection("loans")
            .doc(docId)
            .update({
              balance:
                parseInt(reCu.data().balance) - parseInt(amount) <= 0
                  ? 0
                  : parseInt(reCu.data().balance) - parseInt(amount),
              status:
                parseInt(reCu.data().balance) - parseInt(amount) <= 0
                  ? "Done"
                  : "Ongoing",
            })
            .then((_) => {
              db.collection("loan_history")
                .add({
                  docId: docId,
                  date: date,
                  amount: amountSe,
                  balance:
                    parseInt(reCu.data().balance) - parseInt(amount) <= 0
                      ? 0
                      : parseInt(reCu.data().balance) - parseInt(amount),
                })
                .then((_) => {
                  setLoading(false);
                  window.location.reload();
                });
            });
        });
    } else {
      setLoading(false);
      setValidation("Amount must be higher than 0 !");
    }
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Pay Loan
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={3}>
              Amount(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                autoComplete="amount"
                variant="outlined"
                required
                fullWidth
                label="Amount"
                size="small"
                value={amount}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  setAmount(parseInt(e.target.value.trim()));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={3}>
              Date
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
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
            <Grid item xs={12} sm={3}></Grid>
          </Grid>
          <p className="validate_updateEmployee">{validation}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={updateLoan}
                disabled={
                  parseInt(amount) === 0 || date === null || isLoading
                    ? true
                    : false
                }
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
