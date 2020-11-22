import React, { useState, useEffect } from "react";
import { DatePicker, Space, Spin } from "antd";
import CurrencyFormat from "react-currency-format";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

// styles
import "./Advance_Model.css";

import db from "../../../../../../../../config/firebase.js";
import firebase from "firebase";

export default function Advance_Model({ docId, nic, fname, lname }) {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [intialBalance, setInitialBalance] = useState(0);
  const [date, setDate] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.collection("employee")
      .doc(docId)
      .get()
      .then((reEmp) => {
        db.collection("salary_advance")
          .where("nic", "==", nic)
          .get()
          .then((reAd) => {
            var unpaidamount = 0;

            reAd.docs.forEach((reEach) => {
              if (reEach.data().status === "unpaid") {
                unpaidamount = unpaidamount + parseInt(reEach.data().amount);
              }
            });
            setBalance(parseInt(reEmp.data().basic) - parseInt(unpaidamount));
            setInitialBalance(
              parseInt(reEmp.data().basic) - parseInt(unpaidamount)
            );
            setLoading(false);
          });
      });
  }, [docId, nic]);

  const makeAdvance = () => {
    setLoading(true);
    db.collection("salary_advance")
      .add({
        name: fname + " " + lname,
        nic: nic,
        emp_docId: docId,
        amount: amount,
        balance: balance,
        date: date,
        status: "unpaid",
      })
      .then((_) => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Salary Advance
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
                    if (balance >= parseInt(e.target.value.trim())) {
                      if (parseInt(e.target.value.trim()) === 0) {
                        setBalance(intialBalance);
                      } else {
                        setBalance(
                          intialBalance - parseInt(e.target.value.trim())
                        );
                      }

                      setAmount(parseInt(e.target.value.trim()));
                    }
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
                  value={balance}
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
                onClick={makeAdvance}
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
