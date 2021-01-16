import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
// eslint-disable-next-line
import CurrencyFormat from "react-currency-format";
import moment from "moment";

import db from "../../../../config/firebase.js";
import firebase from "firebase";

// components

import ArreasHistory from "../arreas/arreas_history_Model/Arreas_History";

//styles
import "./Arreas.css";

// icons
import HistoryIcon from "@material-ui/icons/History";

import { useHistory } from "react-router-dom";

function daysCountOfMonth(month, year) {
  return parseInt(new Date(year, month, 0).getDate());
}

export default function Areas() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndx, setCurrentIndx] = useState(0);

  const [arresHistory, setArresHistory] = useState(false); //  table models
  const [arreasTableData, setArreasTableData] = useState([]);
  // eslint-disable-next-line
  const [arreasAllData, setArreasAllData] = useState([]);

  let history = useHistory();

  const showModalArresHistory = () => {
    setArresHistory(true);
  };

  //START pay And Go Columns
  const arreasTableColomns = [
    {
      name: "InvoiceNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Type",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Village",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "MID",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "NIC",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Delayed_Days",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Delayed_Charges",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Date",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },

    {
      name: "Action",

      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            width: "150px",
            margin: "auto",
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("invoice")
      .where("status_of_payandgo", "==", "onGoing")
      .get()
      .then((onSnap) => {
        onSnap.docs.forEach(async (eachRe) => {
          checkInstallmentsStatus(eachRe);
        });
      });

    db.collection("arrears")
      .orderBy("date", "desc")
      .get()
      .then((onSnap) => {
        var rawData = [];
        var rawAllData = [];
        onSnap.docs.forEach((eachRe) => {
          rawAllData.push({
            id: eachRe.id,
            data: eachRe.data(),
          });

          rawData.push({
            InvoiceNo: eachRe.data().invoice_number,
            Type: eachRe.data().type,
            Village: eachRe.data().villageRoot,
            MID: eachRe.data().mid,
            NIC: eachRe.data().nic,
            Delayed_Days: Math.round(eachRe.data().delayed_days),
            Delayed_Charges: (
              <CurrencyFormat
                value={Math.round(eachRe.data().delayed_charges)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Date: moment(eachRe.data()?.date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Action: <HistoryIcon onClick={showModalArresHistory} />,
          });
        });
        setArreasTableData(rawData);
        setArreasAllData(rawAllData);
      });

    setIsLoading(false);
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

  const intialStateOfArreasCheck = async (eachRe) => {
    let daysCountNode1 =
      (new Date().getTime() -
        new Date(eachRe.data()?.date?.seconds * 1000).getTime()) /
      (1000 * 3600 * 24);
    let daysCountInitial = daysCountNode1;
    if (eachRe.data().selectedType === "shop") {
      if (7 - daysCountInitial >= 0) {
      } else {
        if (daysCountInitial - 7 > 7) {
          if (Math.round(daysCountInitial) - 7 >= 49) {
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
                    status_of_payandgo: eachRe.data().status_of_payandgo,
                    balance: eachRe.data().balance,
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
                  type: eachRe.data().selectedType,
                  villageRoot: eachRe.data().root_village,
                  mid: eachRe.data().mid,
                  customer_id: eachRe.data().customer_id,
                  nic: eachRe.data().nic,
                  balance: eachRe.data().balance,
                  amountPerInstallment: eachRe.data().amountPerInstallment,
                  noOfInstallment: eachRe.data().noOfInstallment,
                  status_of_payandgo: eachRe.data().status_of_payandgo,
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
                    status_of_payandgo: eachRe.data().status_of_payandgo,
                    balance: eachRe.data().balance,
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
                  type: eachRe.data().selectedType,
                  villageRoot: eachRe.data().root_village,
                  mid: eachRe.data().mid,
                  nic: eachRe.data().nic,
                  balance: eachRe.data().balance,
                  amountPerInstallment: eachRe.data().amountPerInstallment,
                  noOfInstallment: eachRe.data().noOfInstallment,
                  status_of_payandgo: eachRe.data().status_of_payandgo,
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
  };

  const afterStateOfArreasCheck = async (instReDoc, eachRe) => {
    let daysCountNode2 =
      (new Date().getTime() -
        new Date(
          instReDoc.docs[0].data()?.nextDate?.seconds * 1000
        ).getTime()) /
      (1000 * 3600 * 24);
    let daysCount =
      daysCountNode2 +
      daysCountOfMonth(new Date().getMonth(), new Date().getFullYear());

    let instRECheckCount = 0;

    instReDoc.docs.forEach((instCheckRe) => {
      if (instCheckRe.data().delayed > 0) {
        instRECheckCount = instRECheckCount + 1;
      }
    });

    if (eachRe.data().selectedType === "shop") {
      if (7 - daysCount >= 0) {
      } else {
        if (daysCount - 7 > 7) {
          let statusMonth = await db
            .collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get();

          if (statusMonth.docs.length > 0) {
            db.collection("arrears")
              .doc(statusMonth.docs[0].id)
              .update({
                delayed_days: daysCount - 7,
                status_of_payandgo: eachRe.data().status_of_payandgo,
                balance: eachRe.data().balance,
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
              type: eachRe.data().selectedType,
              villageRoot: eachRe.data().root_village,
              mid: eachRe.data().mid,
              nic: eachRe.data().nic,
              balance: eachRe.data().balance,
              amountPerInstallment: eachRe.data().amountPerInstallment,
              noOfInstallment: eachRe.data().noOfInstallment,
              status_of_payandgo: eachRe.data().status_of_payandgo,
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
          let statusWeek = await db
            .collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get();

          if (statusWeek.docs.length > 0) {
            db.collection("arrears")
              .doc(statusWeek.docs[0].id)
              .update({
                delayed_days: Math.round(daysCount) - 14,
                status_of_payandgo: eachRe.data().status_of_payandgo,
                balance: eachRe.data().balance,
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
              type: eachRe.data().selectedType,
              villageRoot: eachRe.data().root_village,
              mid: eachRe.data().mid,
              nic: eachRe.data().nic,
              balance: eachRe.data().balance,
              amountPerInstallment: eachRe.data().amountPerInstallment,
              noOfInstallment: eachRe.data().noOfInstallment,
              status_of_payandgo: eachRe.data().status_of_payandgo,
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
  };

  return (
    <div>
      {/*Start Arreas Model History */}

      <Modal
        visible={arresHistory}
        className="arreas_history_Model"
        footer={null}
        onCancel={() => {
          setArresHistory(false);
        }}
      >
        <div className="arreas_History">
          <div className="arreas_History_Model_Main">
            <div className="arreas_History_Modell_Detail">
              <ArreasHistory
                key={arreasAllData[currentIndx]?.id}
                invoice_no={arreasAllData[currentIndx]?.data?.invoice_number}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/*END Arreas Model History */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span_arries">ARREAS LIST</span>}
            className="arreas_Table"
            data={arreasTableData}
            columns={arreasTableColomns}
            options={{
              setRowProps: (row, rowIndex) => {
                return {
                  style: { backgroundColor: "#F5F6CE" },
                };
              },
              // selectableRows: false,
              selectableRows: "none",
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              rowHover: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    ""
                  ),
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
