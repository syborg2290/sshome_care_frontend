import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import db from "../../../../config/firebase.js";
import firebase from "firebase";

// components

import ArreasHistory from "../arreas/arreas_history_Model/Arreas_History";

//styles
import "./Arreas.css";

// icons
import HistoryIcon from "@material-ui/icons/History";

import { useHistory } from "react-router-dom";

// eslint-disable-next-line
function daysCountOfMonth(month, year) {
  return parseInt(new Date(year, month, 0).getDate());
}

function isDateBeforeToday(date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
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
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Arreas_amount",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Type",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },

    {
      name: "Village",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "MID",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "NIC",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Delayed_Days",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Delayed_Charges",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },

    {
      name: "History",

      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            width: "150px",
            margin: "auto",
            fontSize: "15px",
            color: "black",
            fontWeight: "600"
          }
        })
      }
    }
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

    db.collection("invoice")
      .where("status_of_payandgo", "==", "expired")
      .get()
      .then((onSnap) => {
        onSnap.docs.forEach(async (eachRe) => {
          checkInstallmentsStatusExpired(eachRe);
        });
      });

    db.collection("arrears")
      .orderBy("date", "desc")
      .get()
      .then((onSnap) => {
        var rawData = [];
        var rawAllData = [];
        onSnap.docs.forEach((eachRe) => {
          let reArryaValues = rawData.filter(
            (cont) => cont.InvoiceNo === eachRe.data().invoice_number
          );
          if (reArryaValues.length === 0) {
            rawAllData.push({
              id: eachRe.id,
              data: eachRe.data()
            });

            rawData.push({
              InvoiceNo: eachRe.data().invoice_number,
              Arreas_amount: eachRe.data().arreas_amount,
              Type: eachRe.data().type,
              Village: eachRe.data().villageRoot,
              MID: eachRe.data().mid,
              NIC: eachRe.data().nic,
              Delayed_Days: Math.round(eachRe.data().delayed_days),
              Delayed_Charges: Math.round(eachRe.data().delayed_charges),
              History: <HistoryIcon onClick={showModalArresHistory} />
            });
          }
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

  const checkInstallmentsStatusExpired = async (eachRe) => {
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
    const delayedChargesIn =
      (parseInt(eachRe.data().amountPerInstallment) * 5) / 100;
    let daysCountNode1 =
      (new Date().getTime() -
        new Date(eachRe.data()?.nextDate?.seconds * 1000).getTime()) /
      (1000 * 3600 * 24);
    let daysCountInitial = 0;
    if (!isDateBeforeToday(new Date(eachRe.data()?.nextDate?.seconds * 1000))) {
      daysCountInitial = 0;
    } else {
      daysCountInitial = daysCountNode1;
    }

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
                  arreas_amount: eachRe.data().amountPerInstallment,
                  delayed_days: Math.round(daysCountInitial) - 7,
                  status_of_payandgo: eachRe.data().status_of_payandgo,
                  balance: eachRe.data().balance,
                  delayed_charges:
                    daysCountInitial - 7 <= 7
                      ? 0
                      : (daysCountInitial - 7) / 7 < 2
                      ? delayedChargesIn
                      : (daysCountInitial - 7) / 7 > 2 &&
                        (daysCountInitial - 7) / 7 < 3
                      ? delayedChargesIn * 2
                      : (daysCountInitial - 7) / 7 > 3 &&
                        (daysCountInitial - 7) / 7 < 4
                      ? delayedChargesIn * 3
                      : (daysCountInitial - 7) / 7 > 4 &&
                        (daysCountInitial - 7) / 7 < 5
                      ? delayedChargesIn * 4
                      : (daysCountInitial - 7) / 7 > 5 &&
                        (daysCountInitial - 7) / 7 < 6
                      ? delayedChargesIn * 5
                      : (daysCountInitial - 7) / 7 > 6 &&
                        (daysCountInitial - 7) / 7 < 7
                      ? delayedChargesIn * 6
                      : (daysCountInitial - 7) / 7 > 7 &&
                        (daysCountInitial - 7) / 7 < 8
                      ? delayedChargesIn * 7
                      : (delayedChargesIn * (daysCountInitial - 7)) / 7
                });
            } else {
              db.collection("arrears").add({
                invoice_number: eachRe.data().invoice_number,
                arreas_amount: eachRe.data().amountPerInstallment,
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
                  daysCountInitial - 7 <= 7
                    ? 0
                    : (daysCountInitial - 7) / 7 < 2
                    ? delayedChargesIn
                    : (daysCountInitial - 7) / 7 > 2 &&
                      (daysCountInitial - 7) / 7 < 3
                    ? delayedChargesIn * 2
                    : (daysCountInitial - 7) / 7 > 3 &&
                      (daysCountInitial - 7) / 7 < 4
                    ? delayedChargesIn * 3
                    : (daysCountInitial - 7) / 7 > 4 &&
                      (daysCountInitial - 7) / 7 < 5
                    ? delayedChargesIn * 4
                    : (daysCountInitial - 7) / 7 > 5 &&
                      (daysCountInitial - 7) / 7 < 6
                    ? delayedChargesIn * 5
                    : (daysCountInitial - 7) / 7 > 6 &&
                      (daysCountInitial - 7) / 7 < 7
                    ? delayedChargesIn * 6
                    : (daysCountInitial - 7) / 7 > 7 &&
                      (daysCountInitial - 7) / 7 < 8
                    ? delayedChargesIn * 7
                    : (delayedChargesIn * (daysCountInitial - 7)) / 7,
                date: firebase.firestore.FieldValue.serverTimestamp()
              });
            }
          });
      }
    }
  };

  const afterStateOfArreasCheck = async (instReDoc, eachRe) => {
    let paidAmount = 0;
    instReDoc.forEach((siDoc) => {
      paidAmount = parseInt(paidAmount) + parseInt(siDoc.data()?.amount);
    });
    let totalMonthsOfInst =
      (new Date().getFullYear() -
        new Date(eachRe.data().date.seconds * 1000).getFullYear()) *
        12 +
      (new Date().getMonth() -
        new Date(eachRe.data().date.seconds * 1000).getMonth());

    let dueAmount =
      parseInt(
        totalMonthsOfInst - 1 > eachRe.data().noOfInstallment
          ? eachRe.data().noOfInstallment
          : totalMonthsOfInst - 1
      ) * parseInt(eachRe.data().amountPerInstallment);
    let dueAmountOfArreas =
      parseInt(dueAmount - paidAmount) < 0
        ? 0
        : parseInt(dueAmount - paidAmount);

    const delayedChargesIn =
      (parseInt(eachRe.data().amountPerInstallment) * 5) / 100;
    let daysCountNode2 =
      (new Date().getTime() -
        new Date(eachRe.data()?.nextDate?.seconds * 1000).getTime()) /
      (1000 * 3600 * 24);
    let daysCount = 0;
    if (!isDateBeforeToday(new Date(eachRe.data()?.nextDate?.seconds * 1000))) {
      daysCount = 0;
    } else {
      daysCount = daysCountNode2;
    }

    let instRECheckCount = 0;

    instReDoc.docs.forEach((instCheckRe) => {
      if (instCheckRe.data().delayed > 0) {
        instRECheckCount = instRECheckCount + 1;
      }
    });

    if (dueAmountOfArreas > 0) {
      let statusWeek = await db
        .collection("arrears")
        .where("invoice_number", "==", eachRe.data().invoice_number)
        .get();

      if (statusWeek.docs.length > 0) {
        db.collection("arrears")
          .doc(statusWeek.docs[0].id)
          .update({
            arreas_amount: dueAmountOfArreas,
            delayed_days:
              Math.round(daysCount) - 7 < 0 ? 0 : Math.round(daysCount) - 7,
            status_of_payandgo: eachRe.data().status_of_payandgo,
            balance: eachRe.data().balance,
            delayed_charges:
              daysCount - 7 <= 7
                ? 0
                : (daysCount - 7) / 7 < 2
                ? delayedChargesIn
                : (daysCount - 7) / 7 > 2 && (daysCount - 7) / 7 < 3
                ? delayedChargesIn * 2
                : (daysCount - 7) / 7 > 3 && (daysCount - 7) / 7 < 4
                ? delayedChargesIn * 3
                : (daysCount - 7) / 7 > 4 && (daysCount - 7) / 7 < 5
                ? delayedChargesIn * 4
                : (daysCount - 7) / 7 > 5 && (daysCount - 7) / 7 < 6
                ? delayedChargesIn * 5
                : (daysCount - 7) / 7 > 6 && (daysCount - 7) / 7 < 7
                ? delayedChargesIn * 6
                : (daysCount - 7) / 7 > 7 && (daysCount - 7) / 7 < 8
                ? delayedChargesIn * 7
                : (delayedChargesIn * (daysCount - 7)) / 7
          });
      } else {
        db.collection("arrears").add({
          invoice_number: eachRe.data().invoice_number,
          arreas_amount: dueAmountOfArreas,
          customer_id: eachRe.data().customer_id,
          type: eachRe.data().selectedType,
          villageRoot: eachRe.data().root_village,
          mid: eachRe.data().mid,
          nic: eachRe.data().nic,
          balance: eachRe.data().balance,
          amountPerInstallment: eachRe.data().amountPerInstallment,
          noOfInstallment: eachRe.data().noOfInstallment,
          status_of_payandgo: eachRe.data().status_of_payandgo,
          delayed_days:
            Math.round(daysCount) - 7 < 0 ? 0 : Math.round(daysCount) - 7,
          delayed_charges:
            daysCount - 7 <= 7
              ? 0
              : (daysCount - 7) / 7 < 2
              ? delayedChargesIn
              : (daysCount - 7) / 7 > 2 && (daysCount - 7) / 7 < 3
              ? delayedChargesIn * 2
              : (daysCount - 7) / 7 > 3 && (daysCount - 7) / 7 < 4
              ? delayedChargesIn * 3
              : (daysCount - 7) / 7 > 4 && (daysCount - 7) / 7 < 5
              ? delayedChargesIn * 4
              : (daysCount - 7) / 7 > 5 && (daysCount - 7) / 7 < 6
              ? delayedChargesIn * 5
              : (daysCount - 7) / 7 > 6 && (daysCount - 7) / 7 < 7
              ? delayedChargesIn * 6
              : (daysCount - 7) / 7 > 7 && (daysCount - 7) / 7 < 8
              ? delayedChargesIn * 7
              : (delayedChargesIn * (daysCount - 7)) / 7,
          date: firebase.firestore.FieldValue.serverTimestamp()
        });
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
                  style: { backgroundColor: "#F5F6CE" }
                };
              },
              // selectableRows: false,
              selectableRows: "none",
              customToolbarSelect: () => {},
              filterType: "textField",
              rowHover: false,
              print: true,
              download: true,
              downloadOptions: {
                filename: `Arreas - ${new Date().toDateString()} - ${new Date().toLocaleTimeString(
                  "en-US"
                )}.csv`
              },
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
                  )
                },

                toolbar: {
                  search: "Search",
                  downloadCsv: "Download CSV",
                  print: "Print",
                  viewColumns: "View Columns",
                  filterTable: "Filter Table"
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

//^3.4.1
