import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Checkbox, DatePicker, Spin } from "antd";
import firebase from "firebase";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import db from "../../../../../../../../../config/firebase.js";
// styles
import "./update_modal.css";

function isDateBeforeNextDate(date1, date2, nextD) {
  let seeBool =
    new Date(date2) >= new Date(date1) && new Date(date2) <= new Date(nextD);

  return seeBool;
}
// eslint-disable-next-line
function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

// eslint-disable-next-line
function daysCountOfMonth(month, year) {
  return parseInt(new Date(year, month, 0).getDate());
}

export default function Update_Model({
  invoice_no,
  instAmountProp,
  instCount,
  customer_id,
  closeModal,
  type,
  isEx,
}) {
  const [installments, setInstallments] = useState(0);
  // eslint-disable-next-line
  const [intialBalance, setInitialBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  // eslint-disable-next-line
  const [nextDate, setNextDate] = useState(null);
  // eslint-disable-next-line
  const [delayedDays, setDelayedDays] = useState(0);
  const [installmentAmount, setInstallmentAmount] = useState(instAmountProp);
  // eslint-disable-next-line
  const [allInstallment, setAllInstallment] = useState(0);
  // eslint-disable-next-line
  const [delayedMonths, setDelayedMonths] = useState(0);
  // eslint-disable-next-line
  const [delayedCharges, setDelayedCharges] = useState(0);
  // eslint-disable-next-line
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [gamisarani, setGamisarani] = useState(false);
  const [gamisaraniInitialAmount, setGamisaraniInitialAmount] = useState(0);
  const [gamisaraniamount, setGamisaraniamount] = useState(0);
  // eslint-disable-next-line
  const [gamisaraniId, setGamisaraniId] = useState("");
  const [gamisaraniNic, setGamisaraniNic] = useState("");

  const [loadingNicsubmit, setLoadingNicSubmit] = useState(false);
  const [updateTimestamp, setTimestamp] = useState(null);

  const [validation, setValidation] = useState("");
  const [validationDate, setValidationDate] = useState("");

  const [shortage, setShortage] = useState(0);

  let history1 = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history1.push("/connection_lost");
    });
    db.collection("gas_customer")
      .doc(customer_id)
      .get()
      .then((custDocRe) => {
        setCustomer(custDocRe.data());
      });

    db.collection("gas_installment")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((instReDoc) => {
        setInstallments(instReDoc.docs.length);
      });

    setIsLoading(false);
    // eslint-disable-next-line
  }, [invoice_no, isEx, instAmountProp, instCount, customer_id]);

  const updateInstallment = async () => {
    setIsLoading(true);
    db.collection("gas_invoice")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((reInvoice) => {
        var reTotCal = parseInt(installmentAmount) + parseInt(gamisaraniamount);

        var reCalMult =
          reTotCal / parseInt(reInvoice.docs[0].data()?.amountPerInstallment);

        if (reCalMult >= 1) {
          db.collection("gas_invoice")
            .doc(reInvoice.docs[0].id)
            .update({
              nextDate: firebase.firestore.Timestamp.fromDate(
                new Date(
                  new Date(
                    reInvoice.docs[0].data()?.nextDate.seconds * 1000
                  ).setMonth(
                    new Date(
                      reInvoice.docs[0].data()?.nextDate.seconds * 1000
                    ).getMonth() + reCalMult
                  )
                )
              ),
            })
            .then((_) => {});
        } else {
          db.collection("gas_installment")
            .where("invoice_number", "==", invoice_no)
            .get()
            .then((reInst) => {
              var totalPlusInsAmount = 0;
              // var monthCount = monthDiff(
              //   new Date(reInvoice.docs[0].data()?.date.seconds * 1000),
              //   new Date(reInvoice.docs[0].data()?.nextDate.seconds * 1000)
              // );
              var nestSee = new Date(
                reInvoice.docs[0].data()?.nextDate.seconds * 1000
              );

              var last31 = nestSee.setMonth(nestSee.getMonth() - 1);

              reInst.docs.forEach((reInstallmentCom) => {
                if (
                  isDateBeforeNextDate(
                    new Date(last31),
                    new Date(reInstallmentCom.data()?.date.seconds * 1000),
                    new Date(reInvoice.docs[0].data()?.nextDate.seconds * 1000)
                  )
                ) {
                  totalPlusInsAmount =
                    parseInt(totalPlusInsAmount) +
                    parseInt(reInstallmentCom.data()?.amount);
                }
              });

              let seeToot = parseInt(totalPlusInsAmount) + reTotCal;

              if (
                parseInt(seeToot) >=
                parseInt(reInvoice.docs[0].data()?.amountPerInstallment)
              ) {
                db.collection("gas_invoice")
                  .doc(reInvoice.docs[0].id)
                  .update({
                    nextDate: firebase.firestore.Timestamp.fromDate(
                      new Date(
                        new Date(
                          reInvoice.docs[0].data()?.nextDate.seconds * 1000
                        ).setMonth(
                          new Date(
                            reInvoice.docs[0].data()?.nextDate.seconds * 1000
                          ).getMonth() + Math.round(seeToot)
                        )
                      )
                    ),
                  })
                  .then((_) => {});
              }
            });
        }
      });

    await db
      .collection("gas_installment")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then(async (reInst) => {
        // let tot = parseInt(installmentAmount) + parseInt(gamisaraniamount);
        await db.collection("gas_installment").add({
          invoice_number: invoice_no,
          amount: parseInt(installmentAmount) + parseInt(gamisaraniamount),
          delayed: delayedCharges === "" ? 0 : parseInt(delayedCharges),
          isExpired: isEx,
          balance: balance <= 0 ? 0 : balance,
          gamisarani_amount: parseInt(gamisaraniamount),
          shortage: shortage === "" ? 0 : shortage,
          type: type,
          date: updateTimestamp,
        });
      });

    await db
      .collection("gas_invoice")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then(async (reBalance) => {
        // let totot = parseInt(installmentAmount) + parseInt(gamisaraniamount);
        await db
          .collection("gas_invoice")
          .doc(reBalance.docs[0].id)
          .update({
            balance: balance <= 0 ? 0 : balance,
          });
      });

    if (gamisarani && parseInt(gamisaraniamount) > 0) {
      db.collection("gami_sarani")
        .doc(gamisaraniId)
        .get()
        .then((getRe) => {
          db.collection("gami_sarani")
            .doc(gamisaraniId)
            .update({
              currentDeposit:
                parseInt(getRe.data().currentDeposit) -
                  parseInt(gamisaraniamount) <
                0
                  ? 0
                  : parseInt(getRe.data().currentDeposit) -
                    parseInt(gamisaraniamount),
            })
            .then((re) => {
              db.collection("gami_sarani_withdrawhistory").add({
                gami_nic: gamisaraniNic,
                docId: gamisaraniId,
                withdraw: parseInt(gamisaraniamount),
                balance:
                  parseInt(getRe.data().currentDeposit) -
                  parseInt(gamisaraniamount),
                date: updateTimestamp,
              });
            });
        });
    }

    if (
      parseInt(balance) -
        (parseInt(installmentAmount) + parseInt(gamisaraniamount)) <=
      0
    ) {
      await db
        .collection("gas_arrears")
        .where("invoice_number", "==", invoice_no)
        .get()
        .then(async (arrRe) => {
          if (arrRe.docs.length > 0) {
            await db.collection("gas_arrears").doc(arrRe.docs[0].id).delete();
          }
        });
    }

    if (parseInt(balance) <= 0) {
      await db
        .collection("gas_invoice")
        .where("invoice_number", "==", invoice_no)
        .get()
        .then((reIn) => {
          db.collection("gas_invoice").doc(reIn.docs[0].id).update({
            status_of_payandgo: "Done",
          });
        });
    }
  };

  const showConfirm = async () => {
    if (updateTimestamp === null) {
      setValidationDate("Please select the date of installment!");
    } else {
      await updateInstallment().then((_) => {
        window.location.reload();
      });
    }
  };

  const dueInstallmentsCount = () => {
    let allPlusss = 1 + installments;
    //let againallPlusss = allPlusss + Math.round(allInstallment);
    let rest = instCount - allPlusss;
    return rest < 0 ? 0 : rest;
  };

  const totalPlusRed = () => {
    let totFinalRe = delayedCharges >= 693 ? 693 : delayedCharges;

    let finalTot = installmentAmount + gamisaraniamount + totFinalRe;
    return finalTot;
  };

  const getCurrentBalanceFromGami = () => {
    setLoadingNicSubmit(true);
    db.collection("gami_sarani")
      .where("nic", "==", gamisaraniNic)
      .get()
      .then((reGami) => {
        if (reGami.docs.length > 0) {
          setGamisaraniId(reGami.docs[0].id);
          setGamisaraniInitialAmount(reGami.docs[0].data().currentDeposit);
          setGamisaraniamount(reGami.docs[0].data().currentDeposit);
          setLoadingNicSubmit(false);
        } else {
          setLoadingNicSubmit(false);
          setValidation("Any gamisarani customer not found from this NIC!");
        }
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
      {isLoading ? (
        <Spin className="spinner" />
      ) : (
        <div className="paper">
          <form className="form" noValidate>
            <Grid container spacing={2}>
              <Grid className="lbl_topi-gami" item xs={12} sm={12}>
                -Gamisarani Customers-
                <br />
                <hr />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Gamisarani
              </Grid>

              <Grid item xs={12} sm={2}>
                :
              </Grid>
              <Grid item xs={12} sm={6}>
                <Checkbox
                  checked={gamisarani}
                  onChange={(e) => {
                    if (gamisarani) {
                      setGamisarani(false);
                      setGamisaraniId("");
                      setGamisaraniInitialAmount(0);
                      setGamisaraniamount(0);
                      setGamisaraniNic("");
                    } else {
                      setGamisarani(true);
                    }
                  }}
                />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                NIC
              </Grid>
              <Grid item xs={12} sm={2}>
                :
              </Grid>
              <Grid className="nIc" item xs={12} sm={4}>
                <TextField
                  className="nic_"
                  variant="outlined"
                  required
                  fullWidth
                  label="NIC"
                  name="nic"
                  autoComplete="nic"
                  size="small"
                  disabled={!gamisarani ? true : false}
                  value={gamisaraniNic}
                  onChange={(e) => {
                    setGamisaraniNic(e.target.value.trim());
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={
                    !gamisarani ||
                    loadingNicsubmit ||
                    gamisaraniNic.length === 0
                      ? true
                      : false
                  }
                  onClick={getCurrentBalanceFromGami}
                >
                  {loadingNicsubmit ? <Spin size="large" /> : "Fetch"}
                </Button>
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Amount
              </Grid>
              <Grid item xs={12} sm={2}>
                :
              </Grid>
              <Grid className="amouNt" item xs={12} sm={5}>
                <TextField
                  className="amouNT"
                  variant="outlined"
                  required
                  fullWidth
                  label="Amount"
                  name="amount"
                  autoComplete="amount"
                  size="small"
                  type="number"
                  disabled={
                    !gamisarani || gamisaraniInitialAmount === 0 ? true : false
                  }
                  InputProps={{ inputProps: { min: 0 } }}
                  value={gamisaraniamount}
                  onChange={(e) => {
                    if (
                      Math.round(e.target.value) >= 0 &&
                      e.target.value !== "" &&
                      intialBalance >=
                        parseInt(e.target.value.trim()) + gamisaraniamount
                    ) {
                      setGamisaraniamount(parseInt(e.target.value.trim()));
                      if (parseInt(e.target.value) === 0) {
                        setBalance(intialBalance);
                      } else {
                        let reC2 = parseInt(e.target.value) + installmentAmount;
                        setBalance(intialBalance - reC2);
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={12}>
                <p className="validate_updateEmployee">{validation}</p>
                <hr />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Amount of Installment(LKR)
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
                  label="Installment Amount"
                  size="small"
                  value={installmentAmount}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    if (
                      Math.round(e.target.value) >= 0 &&
                      e.target.value !== "" &&
                      intialBalance >=
                        parseInt(e.target.value.trim()) + gamisaraniamount
                    ) {
                      setInstallmentAmount(parseInt(e.target.value));
                      if (parseInt(e.target.value) === 0) {
                        setBalance(intialBalance);
                      } else {
                        let reCl = parseInt(e.target.value) + gamisaraniamount;
                        setBalance(intialBalance - reCl);
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
            {delayedMonths > 1 ? (
              <>
                <br />
                <hr />

                <Grid container spacing={2} className="arriGrid">
                  <Grid className="lbl_topi-txt" item xs={12} sm={8}>
                    Amount of Installment Arrears(LKR):
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <p className="lbl_arr">
                      {instAmountProp * delayedMonths} ({instAmountProp} X{" "}
                      {delayedMonths})
                    </p>
                  </Grid>
                </Grid>
                <hr />
                <br />
              </>
            ) : (
              ""
            )}

            <Grid container spacing={2}>
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
                Balance(LKR)
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
                  label="Balance"
                  size="small"
                  value={balance <= 0 ? 0 : balance}
                  onChange={(e) => {
                    if (
                      Math.round(e.target.value) >= 0 &&
                      e.target.value !== ""
                    ) {
                      if (installmentAmount + gamisaraniamount > 0) {
                        setBalance(parseInt(e.target.value.trim()));
                      }
                    }
                  }}
                />
              </Grid>

              <Grid className="lbl_topi" item xs={12} sm={4}>
                Date
              </Grid>
              <Grid item xs={12} sm={2}>
                :
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>

              {/* <Grid className="lbl_topi" item xs={12} sm={4}>
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
              </Grid> */}

              <Grid className="lbl_topi" item xs={12} sm={4}>
                Shortage(LKR)
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
                  label="Shortage"
                  size="small"
                  value={shortage}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setShortage(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>

              <Grid className="lbl_topi" item xs={12} sm={12}>
                <hr />
              </Grid>
              {/* <Grid className="lbl_topi" item xs={12} sm={6}></Grid> */}

              <Grid className="lbl_topi" item xs={12} sm={4}>
                Next Installment Date
              </Grid>
              <Grid item xs={12} sm={2}>
                :
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className="next_date">
                  {" "}
                  {nextDate === null
                    ? ""
                    : moment(nextDate?.toDate()).format("dddd, MMMM Do YYYY")}
                </p>
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
                  {"  " +
                    parseInt(installmentAmount) +
                    " + " +
                    gamisaraniamount +
                    " + " +
                    Math.round(delayedCharges) +
                    " "}
                  )
                </div>
              </Grid>
            </Grid>
            <p className="validate_updateEmployee">{validationDate}</p>
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
