import React, { useState, useEffect } from "react";
import { Spin, Checkbox, DatePicker } from "antd";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import firebase from "firebase";



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
  balanceProp,
  isEx,
}) {
  const [installments, setInstallments] = useState(0);
  // eslint-disable-next-line
  const [intialBalance, setInitialBalance] = useState(balanceProp);
  // eslint-disable-next-line
  const [balance, setBalance] = useState(balanceProp);
  const [serialNo, setSerialNo] = useState("");
  const [delayedDays, setDelayedDays] = useState(0);
  const [installmentAmount, setInstallmentAmount] = useState(instAmountProp);
  const [allInstallment, setAllInstallment] = useState(0);
  const [delayedCharges, setDelayedCharges] = useState(0);
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

  const { confirm } = Modal;

  let history = useHistory();

  useEffect(() => {
    db.collection("invoice")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((reInvoice) => {
        setSerialNo(reInvoice.docs[0].data().items[0].serialNo);
      });

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
        setInstallments(instReDoc.docs.length);
      });
    

    db.collection("invoice")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((inReDoc) => {
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
              
              if (inReDoc.docs[0].data().installmentType === "shop") {
                if (7 - daysCountInitial >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCountInitial - 7);
                  if (daysCountInitial / 7 > 0) {
                    setAllInstallment((daysCountInitial - 7) / 7);
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
              } else {
                if (14 - daysCountInitial >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCountInitial - 14);
                  if (daysCountInitial / 7 > 0) {
                    setAllInstallment(Math.round((daysCountInitial - 14) / 7));
                  }
                  setDelayedCharges(
                    daysCountInitial - 14 <= 7
                      ? 0
                      : (daysCountInitial - 14) / 7 < 2
                      ? 99
                      : (daysCountInitial - 14) / 7 > 2 &&
                        (daysCountInitial - 14) / 7 < 3
                      ? 198
                      : (daysCountInitial - 14) / 7 > 3 &&
                        (daysCountInitial - 14) / 7 < 4
                      ? 297
                      : (daysCountInitial - 14) / 7 > 4 &&
                        (daysCountInitial - 14) / 7 < 5
                      ? 396
                      : (daysCountInitial - 14) / 7 > 5 &&
                        (daysCountInitial - 14) / 7 < 6
                      ? 495
                      : (daysCountInitial - 14) / 7 > 6 &&
                        (daysCountInitial - 14) / 7 < 7
                      ? 594
                      : (daysCountInitial - 14) / 7 > 7 &&
                        (daysCountInitial - 14) / 7 < 8
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
            

              if (inReDoc.docs[0].data().installmentType === "shop") {
                if (7 - daysCount >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCount - 7);
                  if (daysCount / 7 > 0) {
                    setAllInstallment((daysCount - 7) / 7);
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
              } else {
                if (14 - daysCount >= 0) {
                  setDelayedDays(0);
                } else {
                  setDelayedDays(daysCount - 14);
                  if (daysCount / 7 > 0) {
                    setAllInstallment(Math.round((daysCount - 14) / 7));
                  }
                  setDelayedCharges(
                    daysCount - 14 <= 7
                      ? 0
                      : (daysCount - 14) / 7 < 2
                      ? 99
                      : (daysCount - 14) / 7 > 2 && (daysCount - 14) / 7 < 3
                      ? 198
                      : (daysCount - 14) / 7 > 3 && (daysCount - 14) / 7 < 4
                      ? 297
                      : (daysCount - 14) / 7 > 4 && (daysCount - 14) / 7 < 5
                      ? 396
                      : (daysCount - 14) / 7 > 5 && (daysCount - 14) / 7 < 6
                      ? 495
                      : (daysCount - 14) / 7 > 6 && (daysCount - 14) / 7 < 7
                      ? 594
                      : (daysCount - 14) / 7 > 7 && (daysCount - 14) / 7 < 8
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
    await db
      .collection("installment")
      .where("invoice_number", "==", invoice_no)
      .get()
      // eslint-disable-next-line
      .then(async (reInst) => {
        let tot=parseInt(installmentAmount) + parseInt(gamisaraniamount)
        await db.collection("installment").add({
          invoice_number: invoice_no,
          serialNo: serialNo,
          amount: parseInt(installmentAmount) + parseInt(gamisaraniamount),
          delayed: delayedCharges === "" ? 0 : parseInt(delayedCharges),
          isExpired: isEx,
          balance:
            balance -
              tot <=
            0
              ? 0
              : balance -
                tot,
          gamisarani_amount: parseInt(gamisaraniamount),
          date: updateTimestamp,
        });
      });

    await db
      .collection("invoice")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then(async (reBalance) => {
        let totot = parseInt(installmentAmount) + parseInt(gamisaraniamount);
        await db
          .collection("invoice")
          .doc(reBalance.docs[0].id)
          .update({
            balance:
              reBalance.docs[0].data().balance -
                totot <=
              0
                ? 0
                : reBalance.docs[0].data().balance -
                  totot,
          });
      });

    if (gamisarani && gamisaraniamount > 0) {
      db.collection("gami_sarani")
        .doc(gamisaraniId)
        .get()
        .then((getRe) => {
          db.collection("gami_sarani")
            .doc(gamisaraniId)
            .update({
              currentDeposit:
                getRe.data().currentDeposit - gamisaraniamount < 0
                  ? 0
                  : getRe.data().currentDeposit - gamisaraniamount,
            })
            .then((re) => {
              db.collection("gami_sarani_withdrawhistory").add({
                gami_nic: gamisaraniNic,
                docId: gamisaraniId,
                withdraw: gamisaraniamount,
                balance: getRe.data().currentDeposit - gamisaraniamount,
                date: updateTimestamp,
              });
            });
        });
    }

    if (balance - (installmentAmount + gamisaraniamount) > 0) {
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

    if (balance - (installmentAmount + gamisaraniamount) <= 0) {
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
          serialNo: serialNo,
          customerDetails: customer,
          total: totalPlusRed(),
          balance:
            balance -
              (parseInt(installmentAmount) + parseInt(gamisaraniamount)) <=
            0
              ? 0
              : balance -
                (parseInt(installmentAmount) + parseInt(gamisaraniamount)),
          gamisarani_amount: parseInt(gamisaraniamount),
          date: updateTimestamp,
          delayedCharges: Math.round(delayedCharges),
        };

        let moveWith = {
          pathname:
            "/assistant/invoice_history/payAndGo/updateModel/PrintReceipt",
          search: "?query=abc",
          state: { detail: passingWithCustomerObj },
        };
        history.push(moveWith);
      },
      async onCancel() {
        await updateInstallment();
        closeModal();
        window.location.reload();
      },
    });
  };

  const dueInstallmentsCount = () => {
    let allPlusss = 1 + installments;
    let againallPlusss = allPlusss + Math.round(allInstallment);
    let rest = instCount - againallPlusss;
    return rest < 0 ? 0 : rest;
  };

  const totalPlusRed = () => {
    let totFinalRe = delayedCharges >= 693 ? 693 : delayedCharges;

    let finalTot =
      balance <= installmentAmount + gamisaraniamount
        ? balance + totFinalRe
        : installmentAmount + gamisaraniamount + totFinalRe;
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
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Serial No
              </Grid>
              <Grid item xs={12} sm={2}>
                :
              </Grid>
              <Grid item xs={12} sm={6}>
                <p>{serialNo}</p>
              </Grid>

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
                      gamisaraniInitialAmount >= parseInt(e.target.value.trim())
                    ) {
                      setGamisaraniamount(parseInt(e.target.value.trim()));
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
                  label="Delayed"
                  size="small"
                  value={installmentAmount}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    if (balance >= parseInt(e.target.value.trim())) {
                      setInstallmentAmount(parseInt(e.target.value));
                    }
                  }}
                />
              </Grid>

              {/* <Grid item xs={12} sm={3}></Grid> */}
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
                <CurrencyFormat
                  value={
                    gamisaraniamount + installmentAmount === 0
                      ? intialBalance
                      : balance - (gamisaraniamount + installmentAmount)
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
                <DatePicker
                  onChange={(e) => {
                    setTimestamp(
                      firebase.firestore.Timestamp.fromDate(e.toDate())
                      );
                      console.log(firebase.firestore.Timestamp.fromDate(e.toDate()))
                  }}
                />
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
                      (dueInstallmentsCount() > 0 ? 1 : 0) +
                      ") + " +
                      gamisaraniamount +
                      " + " +
                      Math.round(delayedCharges) +
                      " "
                    : "  " +
                      Math.round(instAmountProp) +
                      " X " +
                      (1 +
                        " + " +
                        gamisaraniamount +
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
                  disabled={
                    totalPlusRed() > 0 || updateTimestamp !== null
                      ? false
                      : true
                  }
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
