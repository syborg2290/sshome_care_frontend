import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import firebase from "firebase";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import db from "../../../../../../../config/firebase.js";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

// styles
import "./Update_Model.css";

export default function Update_Model({
  invoice_no,
  instAmountProp,
  instCount,
  customer_id,
  closeModal,
}) {
  const [installments, setInstallments] = useState([]);
  const [delayedDays, setDelayedDays] = useState(0);
  const [delayedCharges, setDelayedCharges] = useState(0);
  const [updatingInstallmentCount, setUpdatingInstallmentCount] = useState(1);
  const [customer, setCustomer] = useState({});

  const { confirm } = Modal;

  let history = useHistory();

  useEffect(() => {
    db.collection("customer")
      .doc(customer_id)
      .get()
      .then((custDocRe) => {
        setCustomer(custDocRe.data());
      });

    db.collection("installment")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((instReDoc) => {
        instReDoc.docs.forEach((each) => {
          setInstallments((old) => [...old, each.data()]);
        });
      });

    if (installments.length === 0) {
      db.collection("invoice")
        .where("invoice_number", "==", invoice_no)
        .get()
        .then((inReDoc) => {
          setDelayedDays(
            (new Date().getTime() -
              new Date(inReDoc.docs[0].data().date.seconds * 1000).getTime()) /
              (1000 * 3600 * 24)
          );
        });
    } else {
      setDelayedDays(
        (new Date().getTime() -
          new Date(installments[0].date.seconds * 1000).getTime()) /
          (1000 * 3600 * 24)
      );
    }

    setDelayedCharges(99 * Math.round(delayedDays / 7));

    // eslint-disable-next-line
  }, [invoice_no]);

  const updateInstallment = async () => {
    for (var i = 1; i <= Math.round(updatingInstallmentCount); i++) {
      await db.collection("installment").add({
        invoice_number: invoice_no,
        amount: Math.round(instAmountProp),
        delayed: delayedCharges === "" ? 0 : Math.round(delayedCharges),
        balance: Math.round(instAmountProp) * (Math.round(instCount) - i),
        date: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    if (
      Math.round(instCount) -
        (updatingInstallmentCount + installments.length) ===
      0
    ) {
      await db
        .collection("invoice")
        .where("invoice_number", "==", invoice_no)
        .get()
        .then((reIn) => {
          db.collection("invoice").doc(reIn.docs[0].id).update({
            status_of_payandgo: "Done",
          });
        });
    }
  };

  const showConfirm = async () => {
    confirm({
      title: "Do you Want to Print a Recipt?",
      icon: <ExclamationCircleOutlined />,

      async onOk() {
        await updateInstallment();
        let passingWithCustomerObj = {
          invoice_number: invoice_no,
          customerDetails: customer,
          total:
            Math.round(instAmountProp) * Math.round(updatingInstallmentCount) +
            Math.round(delayedCharges),
          delayedCharges: Math.round(delayedCharges),
        };

        let moveWith = {
          pathname:
            "/showroom/invoice_history/payAndGo/updateModel/PrintReceipt",
          search: "?query=abc",
          state: { detail: passingWithCustomerObj },
        };
        history.push(moveWith);
      },
      async onCancel() {
        await updateInstallment();
        closeModal();
        NotificationManager.success("Installment updated ! )");
      },
    });
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Update Installment
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Invoice No
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{invoice_no}</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Amount of Installment(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <CurrencyFormat
                value={
                  Math.round(instAmountProp) *
                  Math.round(updatingInstallmentCount)
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Updating Installment Count
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                variant="outlined"
                required
                fullWidth
                label="Count"
                size="small"
                value={updatingInstallmentCount}
                onChange={(e) => {
                  if (
                    Math.round(instCount) - Math.round(installments.length) >=
                    e.target.value
                  ) {
                    setUpdatingInstallmentCount(e.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Due Installment Count
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{Math.round(instCount) - Math.round(installments.length)}</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Paid Amount(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <CurrencyFormat
                value={
                  Math.round(instAmountProp) *
                  Math.round(Math.round(installments.length))
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {" "}
                {moment(firebase.firestore.FieldValue.serverTimestamp()).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Delayed Charges(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                autoComplete="delayed"
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                required
                fullWidth
                label="Delayed"
                size="small"
                value={delayedCharges}
                onChange={(e) => {
                  setDelayedCharges(e.target.value.trim());
                }}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Delayed Days
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{Math.round(delayedDays)} days delayed !</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Total(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <CurrencyFormat
                value={
                  Math.round(instAmountProp) * updatingInstallmentCount +
                  Math.round(delayedCharges)
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={showConfirm}
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <NotificationContainer />
    </Container>
  );
}
