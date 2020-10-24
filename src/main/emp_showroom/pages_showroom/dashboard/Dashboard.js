import React, { useEffect } from "react";

import firebase from "firebase";
import db from "../../../../config/firebase.js";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    db.collection("invoice")
      .where("status_of_payandgo", "==", "onGoing")
      .onSnapshot((onSnap) => {
        onSnap.docs.forEach((eachRe) => {
          db.collection("installment")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get()
            .then((instReDoc) => {
              instReDoc.docs.forEach((eachInst) => {
                if (instReDoc.docs.length === 0) {
                  let daysCountInitial =
                    (new Date().getTime() -
                      new Date(eachRe.data().date.seconds * 1000).getTime()) /
                    (1000 * 3600 * 24);
                  if (eachRe.data().installmentType === "Monthly") {
                    if (30 - daysCountInitial >= 0) {
                      // setDelayedDays(0);
                    } else {
                      db.collection("arrears")
                        .where(
                          "invoice_number",
                          "==",
                          eachRe.data().invoice_number
                        )
                        .get()
                        .then((reArreas) => {
                          if (reArreas.docs.length > 0) {
                            db.collection("arrears")
                              .doc(reArreas.docs[0].id)
                              .update({
                                delayed_days: daysCountInitial - 30,
                                delayed_charges:
                                  99 * Math.round((daysCountInitial - 30) / 7),
                              });
                          } else {
                            db.collection("arrears").add({
                              invoice_number: eachRe.data().invoice_number,
                              customer_id: eachRe.data().customer_id,
                              delayed_days: daysCountInitial - 30,
                              delayed_charges:
                                99 * Math.round((daysCountInitial - 30) / 7),
                              date: firebase.firestore.FieldValue.serverTimestamp(),
                            });
                          }
                        });
                    }
                  } else {
                    if (7 - daysCountInitial >= 0) {
                      // setDelayedDays(0);
                    } else {
                      db.collection("arrears")
                        .where(
                          "invoice_number",
                          "==",
                          eachRe.data().invoice_number
                        )
                        .get()
                        .then((reArreas) => {
                          if (reArreas.docs.length > 0) {
                            db.collection("arrears")
                              .doc(reArreas.docs[0].id)
                              .update({
                                delayed_days: daysCountInitial - 7,
                                delayed_charges:
                                  99 * Math.round((daysCountInitial - 7) / 7),
                              });
                          } else {
                            db.collection("arrears").add({
                              invoice_number: eachRe.data().invoice_number,
                              customer_id: eachRe.data().customer_id,
                              delayed_days: daysCountInitial - 7,
                              delayed_charges:
                                99 * Math.round((daysCountInitial - 7) / 7),
                              date: firebase.firestore.FieldValue.serverTimestamp(),
                            });
                          }
                        });
                    }
                  }
                } else {
                  let daysCount =
                    (new Date().getTime() -
                      new Date(
                        instReDoc.docs[instReDoc.docs.length - 1]?.date
                          ?.seconds * 1000
                      ).getTime()) /
                    (1000 * 3600 * 24);
                  if (eachRe.data().installmentType === "Monthly") {
                    if (30 - daysCount >= 0) {
                      // setDelayedDays(0);
                    } else {
                      db.collection("arrears")
                        .where(
                          "invoice_number",
                          "==",
                          eachRe.data().invoice_number
                        )
                        .get()
                        .then((reArreas) => {
                          if (reArreas.docs.length > 0) {
                            console.log(daysCount);
                            console.log(daysCount - 30);
                            db.collection("arrears")
                              .doc(reArreas.docs[0].id)
                              .update({
                                delayed_days: daysCount - 30,
                                delayed_charges:
                                  99 * Math.round((daysCount - 30) / 7),
                              });
                          } else {
                            db.collection("arrears").add({
                              invoice_number: eachRe.data().invoice_number,
                              customer_id: eachRe.data().customer_id,
                              delayed_days: daysCount - 30,
                              delayed_charges:
                                99 * Math.round((daysCount - 30) / 7),
                              date: firebase.firestore.FieldValue.serverTimestamp(),
                            });
                          }
                        });
                    }
                  } else {
                    if (7 - daysCount >= 0) {
                      // setDelayedDays(0);
                    } else {
                      db.collection("arrears")
                        .where(
                          "invoice_number",
                          "==",
                          eachRe.data().invoice_number
                        )
                        .get()
                        .then((reArreas) => {
                          if (reArreas.docs.length > 0) {
                            db.collection("arrears")
                              .doc(reArreas.docs[0].id)
                              .update({
                                delayed_days: daysCount - 7,
                                delayed_charges:
                                  99 * Math.round((daysCount - 7) / 7),
                              });
                          } else {
                            db.collection("arrears").add({
                              invoice_number: eachRe.data().invoice_number,
                              customer_id: eachRe.data().customer_id,
                              delayed_days: daysCount - 7,
                              delayed_charges:
                                99 * Math.round((daysCount - 7) / 7),
                              date: firebase.firestore.FieldValue.serverTimestamp(),
                            });
                          }
                        });
                    }
                  }
                }
              });
            });
        });
      });
  }, []);

  return <div className="fff">DASHBOARD</div>;
}
