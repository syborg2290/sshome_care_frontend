import React, { useState, useEffect } from "react";
import { Radio, Spin } from "antd";
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

import db from "../../../../../config/firebase.js";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

// styles
import "./Arreas_update.css";

export default function Arreas_update({ invoice_no, nic, close }) {
  const [installments, setInstallments] = useState(0);
  const [delayedDays, setDelayedDays] = useState(0);
  const [allInstallment, setAllInstallment] = useState(0);
  const [delayedCharges, setDelayedCharges] = useState(0);
  const [updatingInstallmentCount, setUpdatingInstallmentCount] = useState(1);
  const [customer, setCustomer] = useState({});
  const [currentStatus, setCurrentStatus] = useState("a");
  const [instCount, setInstCount] = useState(0);
  const [instAmountProp, setInstAmountProp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { confirm } = Modal;

  let history = useHistory();

  useEffect(() => {
    db.collection("customer")
      .where("nic", "==", nic)
      .get()
      .then((th) => {
        if (th.docs.length > 0) {
          db.collection("customer")
            .doc(th.docs[0]?.id)
            .get()
            .then((custDocRe) => {
              setCustomer(custDocRe.data());
            });
        }
      });

    db.collection("installment")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((instReDoc) => {
        setInstallments(instReDoc.docs.length);
      });

    db.collection("invoice")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((inReDoc) => {
        setInstCount(inReDoc.docs[0].data().items[0].noOfInstallment);
        setInstAmountProp(inReDoc.docs[0].data().items[0].amountPerInstallment);
        db.collection("installment")
          .where("invoice_number", "==", invoice_no)
          .get()
          .then((instReDoc) => {
            if (instReDoc.docs.length === 0) {
              let daysCountInitial =
                (new Date().getTime() -
                  new Date(
                    inReDoc.docs[0].data().date.seconds * 1000
                  ).getTime()) /
                (1000 * 3600 * 24);

              if (inReDoc.docs[0].data().installmentType === "Monthly") {
                if (30 - daysCountInitial >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCountInitial - 31);
                  if (daysCountInitial / 31 > 0) {
                    setAllInstallment((daysCountInitial - 7) / 31);
                  }

                  setDelayedCharges(
                    daysCountInitial - 31 <= 7
                      ? 0
                      : (daysCountInitial - 31) / 7 < 2
                      ? 99
                      : (daysCountInitial - 31) / 7 > 2 &&
                        (daysCountInitial - 31) / 7 < 3
                      ? 198
                      : (daysCountInitial - 31) / 7 > 3 &&
                        (daysCountInitial - 31) / 7 < 4
                      ? 297
                      : (daysCountInitial - 31) / 7 > 4 &&
                        (daysCountInitial - 31) / 7 < 5
                      ? 396
                      : (daysCountInitial - 31) / 7 > 5 &&
                        (daysCountInitial - 31) / 7 < 6
                      ? 495
                      : (daysCountInitial - 31) / 7 > 6 &&
                        (daysCountInitial - 31) / 7 < 7
                      ? 594
                      : (daysCountInitial - 31) / 7 > 7 &&
                        (daysCountInitial - 31) / 7 < 8
                      ? 693
                      : 693
                  );
                }
              } else {
                if (7 - daysCountInitial >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCountInitial - 7);
                  if (daysCountInitial / 7 > 0) {
                    setAllInstallment(Math.round((daysCountInitial - 7) / 7));
                  }
                  setDelayedCharges(
                    daysCountInitial - 7 <= 7
                      ? 0
                      : (daysCountInitial - 7) / 7 < 2
                      ? 99
                      : (daysCountInitial - 7) / 7 > 2 &&
                        (daysCountInitial - 7) / 7 < 3
                      ? 198
                      : (daysCountInitial - 7) / 7 > 3 &&
                        (daysCountInitial - 7) / 7 < 4
                      ? 297
                      : (daysCountInitial - 7) / 7 > 4 &&
                        (daysCountInitial - 7) / 7 < 5
                      ? 396
                      : (daysCountInitial - 7) / 7 > 5 &&
                        (daysCountInitial - 7) / 7 < 6
                      ? 495
                      : (daysCountInitial - 7) / 7 > 6 &&
                        (daysCountInitial - 7) / 7 < 7
                      ? 594
                      : (daysCountInitial - 7) / 7 > 7 &&
                        (daysCountInitial - 7) / 7 < 8
                      ? 693
                      : 693
                  );
                }
              }
            } else {
              let daysCount =
                (new Date().getTime() -
                  new Date(
                    instReDoc.docs[instReDoc.docs.length - 1].data()?.date
                      ?.seconds * 1000
                  ).getTime()) /
                (1000 * 3600 * 24);

              if (inReDoc.docs[0].data().installmentType === "Monthly") {
                if (30 - daysCount >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCount - 31);
                  if (daysCount / 31 > 0) {
                    setAllInstallment((daysCount - 7) / 31);
                  }
                  setDelayedCharges(
                    daysCount - 31 <= 7
                      ? 0
                      : (daysCount - 31) / 7 < 2
                      ? 99
                      : (daysCount - 31) / 7 > 2 && (daysCount - 31) / 7 < 3
                      ? 198
                      : (daysCount - 31) / 7 > 3 && (daysCount - 31) / 7 < 4
                      ? 297
                      : (daysCount - 31) / 7 > 4 && (daysCount - 31) / 7 < 5
                      ? 396
                      : (daysCount - 31) / 7 > 5 && (daysCount - 31) / 7 < 6
                      ? 495
                      : (daysCount - 31) / 7 > 6 && (daysCount - 31) / 7 < 7
                      ? 594
                      : (daysCount - 31) / 7 > 7 && (daysCount - 31) / 7 < 8
                      ? 693
                      : 693
                  );
                }
              } else {
                if (7 - daysCount >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCount - 7);
                  if (daysCount / 7 > 0) {
                    setAllInstallment(Math.round((daysCount - 7) / 7));
                  }
                  setDelayedCharges(
                    daysCount - 7 <= 7
                      ? 0
                      : (daysCount - 7) / 7 < 2
                      ? 99
                      : (daysCount - 7) / 7 > 2 && (daysCount - 7) / 7 < 3
                      ? 198
                      : (daysCount - 7) / 7 > 3 && (daysCount - 7) / 7 < 4
                      ? 297
                      : (daysCount - 7) / 7 > 4 && (daysCount - 7) / 7 < 5
                      ? 396
                      : (daysCount - 7) / 7 > 5 && (daysCount - 7) / 7 < 6
                      ? 495
                      : (daysCount - 7) / 7 > 6 && (daysCount - 7) / 7 < 7
                      ? 594
                      : (daysCount - 7) / 7 > 7 && (daysCount - 7) / 7 < 8
                      ? 693
                      : 693
                  );
                }
              }
            }
          });
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [invoice_no]);

  const updateInstallment = async () => {
    var j = 0;
    let plussForLoop = allInstallment + Math.round(updatingInstallmentCount);

    for (var i = 1; i <= plussForLoop; i++) {
      await db
        .collection("installment")
        .where("invoice_number", "==", invoice_no)
        .get()
        // eslint-disable-next-line
        .then(async (reInst) => {
          await db.collection("installment").add({
            invoice_number: invoice_no,
            amount: Math.round(instAmountProp),
            delayed:
              delayedCharges === ""
                ? 0
                : j === 0
                ? Math.round(delayedCharges)
                : 0,
            balance:
              Math.round(instAmountProp) *
              (Math.round(instCount) - (reInst.docs.length + 1)),
            date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      j++;
    }

    if (allInstallment > 0) {
      await db
        .collection("arrears")
        .where("invoice_number", "==", invoice_no)
        .get()
        .then(async (arrRe) => {
          if (arrRe.docs.length > 0) {
            await db.collection("arrears").doc(arrRe.docs[0].id).delete();
          }
        });
    }

    let allPlus =
      Math.round(updatingInstallmentCount) + installments + allInstallment;

    if (instCount - allPlus <= 0) {
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
          total: totalPlusRed(),

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
        close();
        window.location.reload();
      },
    });
  };

  const dueInstallmentsCount = () => {
    let allPlusss = Math.round(updatingInstallmentCount) + installments;
    let againallPlusss = allPlusss + Math.round(allInstallment);
    let rest = instCount - againallPlusss;
    return rest < 0 ? 0 : rest;
  };

  const totalPlusRed = () => {
    let allPlusss = Math.round(updatingInstallmentCount);
    let countAllPrevInstallments =
      (allInstallment < 0 || allInstallment) < 1
        ? 0
        : (allInstallment < 1 || allInstallment) < 2
        ? 1
        : (allInstallment < 2 || allInstallment) < 3
        ? 2
        : allInstallment;

    let againPreve =
      countAllPrevInstallments <= instCount
        ? countAllPrevInstallments
        : instCount;

    let agianSo = countAllPrevInstallments >= instCount ? 0 : allPlusss;

    let againallPlusss = agianSo + againPreve;
    let rest = instAmountProp * againallPlusss;
    let totFinalRe = delayedCharges >= 693 ? 693 : delayedCharges;
    let finalTot = rest + totFinalRe;
    return finalTot;
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Update Installment
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      {isLoading ? (
        <Spin className="spinner" />
      ) : (
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
                  value={Math.round(instAmountProp)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </Grid>

              {delayedDays > 7 ? (
                <Grid className="lbl_topi_radio" item xs={12} sm={4}>
                  Current Installment
                </Grid>
              ) : (
                <Grid className="lbl_topi_radio_not" item xs={12} sm={4}></Grid>
              )}
              {delayedDays > 7 ? (
                <Grid className="lbl_topi_radio" item xs={12} sm={2}>
                  :
                </Grid>
              ) : (
                <Grid className="lbl_topi_radio_not" item xs={12} sm={2}></Grid>
              )}
              {delayedDays > 7 ? (
                <Grid className="invoHisty_radio" item xs={12} sm={6}>
                  <Radio.Group
                    value={currentStatus}
                    onChange={(e) => {
                      if (e.target.value === "b") {
                        setUpdatingInstallmentCount(0);
                        setCurrentStatus("b");
                      } else {
                        setUpdatingInstallmentCount(1);
                        setCurrentStatus("a");
                      }
                    }}
                    defaultValue="a"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="a">Include</Radio.Button>
                    <Radio.Button value="b">Not Include</Radio.Button>
                  </Radio.Group>
                </Grid>
              ) : (
                <Grid className="lbl_topi_radio_not" item xs={12} sm={4}></Grid>
              )}

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
                  disabled={currentStatus === "a" ? false : true}
                  label="Count"
                  size="small"
                  value={updatingInstallmentCount}
                  onChange={(e) => {
                    if (
                      instCount - (allInstallment + installments) >=
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
                <p>{dueInstallmentsCount()}</p>
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
                    Math.round(Math.round(installments))
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
                  {moment(
                    firebase.firestore.FieldValue.serverTimestamp()
                  ).format("dddd, MMMM Do YYYY, h:mm:ss a")}
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
                  variant="outlined"
                  required
                  fullWidth
                  label="Delayed"
                  size="small"
                  value={Math.round(delayedCharges)}
                  onChange={(e) => {
                    if (Math.round(e.target.value) >= 0) {
                      setDelayedCharges(Math.round(e.target.value));
                    }
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
                {delayedDays > 7 ? (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {Math.round(delayedDays)} days delayed !
                  </p>
                ) : (
                  <p>{Math.round(delayedDays)} days delayed !</p>
                )}
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
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <CurrencyFormat
                    value={totalPlusRed()}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" Rs. "}
                  />
                  /=
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "grey",
                  }}
                >
                  (
                  {delayedDays > 0
                    ? "  " +
                      Math.round(instAmountProp) +
                      " X (" +
                      (allInstallment < 0 || allInstallment < 1
                        ? 0
                        : allInstallment < 1 || allInstallment < 2
                        ? 1
                        : allInstallment < 2 || allInstallment < 3
                        ? 2
                        : allInstallment) +
                      " + " +
                      (dueInstallmentsCount() > 0
                        ? updatingInstallmentCount
                        : 0) +
                      ") + " +
                      Math.round(delayedCharges) +
                      " "
                    : "  " +
                      Math.round(instAmountProp) +
                      " X " +
                      (updatingInstallmentCount +
                        " + " +
                        Math.round(delayedCharges)) +
                      " "}
                  )
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}></Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={totalPlusRed() > 0 ? false : true}
                  className="btn_update"
                  onClick={showConfirm}
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
}