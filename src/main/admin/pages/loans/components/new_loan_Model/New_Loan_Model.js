import React, { useState, useEffect } from "react";
import { DatePicker, Space, Spin } from "antd";
import { useHistory } from "react-router-dom";
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

async function loanStatus(docs) {
  let status = false;
  for (var i = 0; i < docs.length; i++) {
    if (docs[i].data().status === "ongoing") {
      status = true;
    }
  }
  return status;
}

export default function New_Loan_Model() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [nic, setNic] = useState("");
  const [amount, setAmount] = useState(0);
  const [salaryCut, setSalaryCut] = useState(0);
  const [date, setDate] = useState(null);
  const [validation, setValidation] = useState("");
  const [isLoading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
      // eslint-disable-next-line
      }, []);


  const makeLoan = () => {
    setLoading(true);
    db.collection("employee")
      .where("nic", "==", nic.trim())
      .get()
      .then((reEmp) => {
        if (reEmp.docs.length > 0) {
          db.collection("loans")
            .where("nic", "==", nic.trim())
            .get()
            .then((reD) => {
              if (reD.docs.length > 0) {
                let status = loanStatus(reD.docs);

                if (!status) {
                  db.collection("loans")
                    .add({
                      fname: fname.trim(),
                      lname: lname.trim(),
                      nic: nic.trim(),
                      amount: amount === "" ? 0 : amount,
                      balance: amount === "" ? 0 : amount,
                      salary_cut: salaryCut === "" ? 0 : salaryCut,
                      date: date,
                      status: "Ongoing",
                    })
                    .then((_) => {
                      setLoading(false);
                      window.location.reload();
                    });
                } else {
                  setLoading(false);
                  setValidation(
                    "Already using loan service that not completed ! "
                  );
                }
              } else {
                db.collection("loans")
                  .add({
                    fname: fname.trim(),
                    lname: lname.trim(),
                    nic: nic.trim(),
                    amount: amount === "" ? 0 : amount,
                    balance: amount === "" ? 0 : amount,
                    salary_cut: salaryCut === "" ? 0 : salaryCut,
                    date: date,
                    status: "Ongoing",
                  })
                  .then((_) => {
                    setLoading(false);
                    window.location.reload();
                  });
              }
            });
        } else {
          setLoading(false);
          setValidation("Could not found any employee as the entered NIC ! ");
        }
      });
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
                  setNic(e.target.value.trim());
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
                  if (e.target.value !== "") {
                    setAmount(parseInt(e.target.value.trim()));
                  }
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
                  if (e.target.value !== "") {
                    setSalaryCut(parseInt(e.target.value.trim()));
                  }
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
                onClick={makeLoan}
                disabled={
                  date === null ||
                  fname.length === 0 ||
                  lname.length === 0 ||
                  nic.length === 0 ||
                  amount.length === 0 ||
                  salaryCut.length === 0 ||
                  isLoading
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
