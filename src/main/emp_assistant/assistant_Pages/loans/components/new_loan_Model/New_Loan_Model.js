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
import "./New_Loan_Model.css";

import db from "../../../../../../config/firebase.js";
import firebase from "firebase";

export default function New_Loan_Model() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [nic, setNic] = useState("");
  const [amount, setAmount] = useState(0);
  const [salaryCut, setSalaryCut] = useState(0);
  const [date, setDate] = useState(null);

  const makeLoan = () => {
    db.collection("loan")
      .add({})
      .then((_) => {});
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Make a New Loan
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={3}>
              First Name
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                size="small"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={3}>
              Last Name
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                autoComplete="lname"
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                size="small"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={3}>
              NIC
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                autoComplete="nic"
                variant="outlined"
                required
                fullWidth
                label="NIC"
                size="small"
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={3}>
              Amount
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                autoComplete="amut"
                variant="outlined"
                required
                fullWidth
                label="Amount"
                type="number"
                size="small"
                value={amount}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  setAmount(parseInt(e.target.value.trim()));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={3}>
              Salary Cut
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                autoComplete="Salary Cut "
                variant="outlined"
                required
                fullWidth
                label="Salary Cut "
                type="number"
                size="small"
                value={salaryCut}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  setSalaryCut(parseInt(e.target.value.trim()));
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
                    setDate(firebase.firestore.Timestamp.fromDate(e.toDate()));
                  }}
                />
              </Space>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={makeLoan}
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
