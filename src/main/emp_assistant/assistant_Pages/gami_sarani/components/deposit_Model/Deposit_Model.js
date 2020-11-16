import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { DatePicker, Space, Spin } from "antd";
import CurrencyFormat from "react-currency-format";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "react-notifications/lib/notifications.css";

// style
import "./Deposit_Model.css";

import firebase from "firebase";
import db from "../../../../../../config/firebase.js";

export default function Deposit_Model({ midProp, nicProp, close_model }) {
  const [nic, setNic] = useState(nicProp);
  const [mid, setMId] = useState(midProp);
  const [deposit, setDeposit] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [saveTimestamp, setTimestamp] = useState(null);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [validation, setValidation] = useState("");

  useEffect(() => {
    db.collection("gami_sarani")
      .where("mid", "==", midProp)
      .get()
      .then((re) => {
        setCurrentBalance(re.docs[0].data().currentDeposit);
      });
  }, [midProp]);

  const depositSubmit = () => {
    setLoadingSubmit(true);

    db.collection("gami_sarani")
      .where("nic", "==", nic)
      .get()
      .then((nicRe) => {
        if (nicRe.docs.length > 0) {
          if (nicRe.docs[0].data().mid === mid) {
            db.collection("gami_sarani")
              .where("mid", "==", mid)
              .get()
              .then(async (midRe) => {
                if (midRe.docs.length > 0) {
                  db.collection("gami_sarani_deposit")
                    .add({
                      nic: nic.trim(),
                      mid: mid.trim(),
                      deposit_amount: parseInt(deposit.trim()),
                      current_Balance:
                        parseInt(deposit.trim()) + currentBalance,
                      date: saveTimestamp,
                    })
                    .then((_) => {
                      db.collection("gami_sarani")
                        .where("mid", "==", mid.trim())
                        .get()
                        .then((re) => {
                          db.collection("gami_sarani")
                            .doc(re.docs[0].id)
                            .update({
                              currentDeposit:
                                parseInt(deposit.trim()) +
                                re.docs[0].data().currentDeposit,
                            })
                            .then((_) => {
                              setLoadingSubmit(false);
                              close_model();
                            });
                        });
                    });
                } else {
                  setLoadingSubmit(false);
                  setValidation("Entered MID not found!");
                }
              });
          } else {
            setLoadingSubmit(false);
            setValidation("Entered MID and NIC not matched!");
          }
        } else {
          setLoadingSubmit(false);
          setValidation("Entered NIC not found!");
        }
      });
  };

  return (
    <Container component="main" className="main_container_deposit">
      <Typography className="title_deposit" variant="h5" gutterBottom>
        Deposit
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_sarani" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              NIC Number :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="txtt_nic"
                autoComplete="nic"
                name="nic"
                variant="outlined"
                required
                fullWidth
                id="nic"
                label="NIC"
                autoFocus
                size="small"
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Member ID :
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="mid"
                name="mid"
                variant="outlined"
                required
                fullWidth
                id="mid"
                label="Member ID"
                size="small"
                value={mid}
                onChange={(e) => {
                  setMId(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Date :
            </Grid>
            <Grid item xs={12} sm={5}>
              <Space direction="vertical">
                <DatePicker
                  onChange={(e) => {
                    if (e !== null) {
                      setTimestamp(
                        firebase.firestore.Timestamp.fromDate(e.toDate())
                      );
                    } else {
                      setTimestamp(null);
                    }
                  }}
                />
              </Space>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Deposit Amount :
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="dAmount"
                name="dAmount"
                variant="outlined"
                required
                fullWidth
                id="dAmount"
                label="Deposit Amount"
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={deposit}
                onChange={(e) => {
                  setDeposit(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="txt_LabelsDepo" item xs={12} sm={7}>
              Current Balance(LKR) :
            </Grid>
            <Grid item xs={12} sm={4}>
              <p className="lbl_blnce">
                {" "}
                <CurrencyFormat
                  value={currentBalance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={1}></Grid>
          </Grid>
          <p className="validate_Edit">{validation}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_diposit"
                onClick={depositSubmit}
                disabled={
                  nic.length === 0 ||
                  mid.length === 0 ||
                  deposit.length === 0 ||
                  saveTimestamp === null
                }
              >
                {isLoadingSubmit ? <Spin size="large" /> : "Deposit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
