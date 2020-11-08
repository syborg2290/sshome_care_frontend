import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//components
import ArreasTable from "../dashboard/dashboard_contents/arreas_Table/Arreas_Table";
import PendingList from "../dashboard/dashboard_contents/pending_Blacklist/Pending_List";
import InvoiceList from "../dashboard/dashboard_contents/invoice_List/Invoice_List";

import firebase from "firebase";
import db from "../../../../config/firebase.js";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  // eslint-disable-next-line
  const [pendingBlackList, setPendingBlackList] = useState([]);

  useEffect(() => {
    db.collection("invoice")
      .where("status_of_payandgo", "==", "onGoing")
      .get()
      .then((onSnap) => {
        onSnap.docs.forEach((eachRe) => {
          checkInstallmentsStatus(eachRe);
        });
      });
    // eslint-disable-next-line
  }, []);

  const checkInstallmentsStatus = async (eachRe) => {
    const installmentStatus = await db
      .collection("installment")
      .where("invoice_number", "==", eachRe.data().invoice_number)
      .get();

    if (installmentStatus.docs.length === 0) {
      intialStateOfArreasCheck(eachRe);
    } else {
      afterStateOfArreasCheck(installmentStatus, eachRe);
    }
  };

  function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  const intialStateOfArreasCheck = async (eachRe) => {
    let daysCountInitial =
      (new Date().getTime() -
        new Date(eachRe.data()?.date?.seconds * 1000).getTime()) /
      (1000 * 3600 * 24);
    if (eachRe.data().installmentType === "shop") {
      if (7 - daysCountInitial >= 0) {
      } else {
        if (daysCountInitial - 7 > 7) {
          if (Math.round(daysCountInitial) - 7 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }

          db.collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get()
            .then((reArreas) => {
              if (reArreas.docs.length > 0) {
                db.collection("arrears")
                  .doc(reArreas.docs[0].id)
                  .update({
                    delayed_days: Math.round(daysCountInitial) - 7,
                    delayed_charges:
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
                        : 693,
                  });
              } else {
                db.collection("arrears").add({
                  invoice_number: eachRe.data().invoice_number,
                  customer_id: eachRe.data().customer_id,
                  nic: eachRe.data().nic,
                  delayed_days: Math.round(daysCountInitial) - 31,
                  delayed_charges:
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
                      : 693,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
        }
      }
    } else {
      if (14 - daysCountInitial >= 0) {
      } else {
        if (daysCountInitial - 14 > 7) {
          if (Math.round(daysCountInitial) - 14 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }
          db.collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get()
            .then((reArreas) => {
              if (reArreas.docs.length > 0) {
                db.collection("arrears")
                  .doc(reArreas.docs[0].id)
                  .update({
                    delayed_days: Math.round(daysCountInitial) - 14,
                    delayed_charges:
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
                        : 693,
                  });
              } else {
                db.collection("arrears").add({
                  invoice_number: eachRe.data().invoice_number,
                  customer_id: eachRe.data().customer_id,
                  nic: eachRe.data().nic,
                  delayed_days: Math.round(daysCountInitial) - 7,
                  delayed_charges:
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
                      : 693,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
        }
      }
    }

    let isBeforeDate = isDateBeforeToday(
      new Date(eachRe.data()?.deadlineTimestamp?.seconds * 1000)
    );
    if (!isBeforeDate) {
      setPendingBlackList([
        ...pendingBlackList,
        {
          invoice_number: eachRe.data().invoice_number,
          nic: eachRe.data()?.nic,
        },
      ]);
    }
  };

  // const getDateCheck = (value, arr, prop) => {
  //   for (var i = 0; i < arr.length; i++) {
  //     if (new Date(arr[i].data()[prop].seconds * 1000) === value) {
  //       return true;
  //     }
  //   }
  //   return false; //to handle the case where the value doesn't exist
  // };

  const afterStateOfArreasCheck = async (instReDoc, eachRe) => {
    let daysCount =
      (new Date().getTime() -
        new Date(
          instReDoc.docs[instReDoc.docs.length - 1].data()?.date?.seconds * 1000
        ).getTime()) /
      (1000 * 3600 * 24);

    let instRECheckCount = 0;

    instReDoc.docs.forEach((instCheckRe) => {
      if (instCheckRe.data().delayed > 0) {
        instRECheckCount = instRECheckCount + 1;
      }
    });

    if (instRECheckCount >= 7) {
      setPendingBlackList([
        ...pendingBlackList,
        {
          invoice_number: eachRe.data()?.invoice_number,
          nic: eachRe.data()?.nic,
        },
      ]);
    }

    if (eachRe.data().installmentType === "shop") {
      if (7 - daysCount >= 0) {
      } else {
        if (daysCount - 7 > 7) {
          if (Math.round(daysCount) - 7 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }

          let statusMonth = await db
            .collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get();

          if (statusMonth.docs.length > 0) {
            db.collection("arrears")
              .doc(statusMonth.docs[0].id)
              .update({
                delayed_days: daysCount - 7,
                delayed_charges:
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
                    : 99 * Math.round((daysCount - 7) / 7),
              });
          } else {
            db.collection("arrears").add({
              invoice_number: eachRe.data().invoice_number,
              customer_id: eachRe.data().customer_id,
              nic: eachRe.data().nic,
              delayed_days: Math.round(daysCount) - 7,
              delayed_charges:
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
                  : 99 * Math.round((daysCount - 7) / 7),
              date: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      }
    } else {
      if (14 - daysCount >= 0) {
      } else {
        if (daysCount - 14 > 7) {
          if (Math.round(daysCount) - 14 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }

          let statusWeek = await db
            .collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get();

          if (statusWeek.docs.length > 0) {
            db.collection("arrears")
              .doc(statusWeek.docs[0].id)
              .update({
                delayed_days: Math.round(daysCount) - 14,
                delayed_charges:
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
                    : 99 * Math.round((daysCount - 14) / 7),
              });
          } else {
            db.collection("arrears").add({
              invoice_number: eachRe.data().invoice_number,
              customer_id: eachRe.data().customer_id,
              nic: eachRe.data().nic,
              delayed_days: Math.round(daysCount) - 14,
              delayed_charges:
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
                  : 99 * Math.round((daysCount - 14) / 7),
              date: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      }
    }

    let isBeforeDate = isDateBeforeToday(
      new Date(eachRe.data()?.deadlineTimestamp?.seconds * 1000)
    );
    if (!isBeforeDate) {
      setPendingBlackList([
        ...pendingBlackList,
        {
          invoice_number: eachRe.data().invoice_number,
          nic: eachRe.data()?.nic,
        },
      ]);
    }
  };

  return (
    <Container component="main" className="main_container">
      <Typography className="titles" variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr" />
      </Grid>

      {/*START Arreas Table */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ArreasTable />
        </Grid>
      </Grid>
      {/* END Arreas Table */}

      {/*START BlockListPrnding Table */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PendingList pendingBlackList={pendingBlackList} />
        </Grid>
      </Grid>
      {/*END BlockListPrnding Table */}

      <br />

      {/*START Invoices  Table */}

      <Typography className="today_invoices" variant="h4" component="h6">
        All invoices of issued in recently
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InvoiceList />
        </Grid>
      </Grid>
      {/*END Invoices  Table */}
    </Container>
  );
}
