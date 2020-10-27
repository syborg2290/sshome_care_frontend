import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CurrencyFormat from "react-currency-format";

//components
import ArreasTable from "../dashboard/dashboard_contents/arreas_Table/Arreas_Table";
import PendingList from "../dashboard/dashboard_contents/pending_Blacklist/Pending_List";
import InvoiceList from "../dashboard/dashboard_contents/invoice_List/Invoice_List";

//icone
import FileCopyIcon from "@material-ui/icons/FileCopy";
import TodayIcon from "@material-ui/icons/Today";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

import firebase from "firebase";
import db from "../../../../config/firebase.js";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const [dueInstallmentsDueToday, setDueInstallmentsDueToday] = useState([]);

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

  const intialStateOfArreasCheck = async (eachRe) => {
    let daysCountInitial =
      (new Date().getTime() -
        new Date(eachRe.data()?.date?.seconds * 1000).getTime()) /
      (1000 * 3600 * 24);
    if (eachRe.data().installmentType === "Monthly") {
      if (31 - daysCountInitial >= 0) {
        // setDelayedDays(0);
        if (31 - daysCountInitial === 0) {
          setDueInstallmentsDueToday((old) => [
            ...old,
            {
              InvoiceNo: eachRe.data()?.invoice_number,
              InstallmentType: eachRe.data()?.installmentType,
              Day_Date: eachRe.data()?.installemtnDayDate,
              Amount: (
                <CurrencyFormat
                  value={eachRe.data()?.items[0]?.amountPerInstallment}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),

              NIC: eachRe.data()?.nic,
              Balance: (
                <CurrencyFormat
                  value={
                    eachRe.data()?.items[0]?.noOfInstallment *
                    eachRe.data()?.items[0]?.amountPerInstallment
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Action: (
                <div>
                  <VisibilityIcon />
                  <span className="icon_Edit">
                    <HistoryIcon />
                  </span>
                </div>
              ),
            },
          ]);
        }
      } else {
        if (daysCountInitial - 31 > 7) {
          db.collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get()
            .then((reArreas) => {
              if (reArreas.docs.length > 0) {
                db.collection("arrears")
                  .doc(reArreas.docs[0].id)
                  .update({
                    delayed_days: Math.round(daysCountInitial) - 31,
                    delayed_charges:
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
                        : 99 * Math.round((daysCountInitial - 31) / 7),
                  });
              } else {
                db.collection("arrears").add({
                  invoice_number: eachRe.data().invoice_number,
                  customer_id: eachRe.data().customer_id,
                  nic: eachRe.data().nic,
                  delayed_days: Math.round(daysCountInitial) - 31,
                   delayed_charges:
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
                        : 99 * Math.round((daysCountInitial - 31) / 7),
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
        }
      }
    } else {
      if (7 - daysCountInitial >= 0) {
        // setDelayedDays(0);
        if (7 - daysCountInitial === 0) {
          setDueInstallmentsDueToday((old) => [
            ...old,
            {
              InvoiceNo: eachRe.data()?.invoice_number,
              InstallmentType: eachRe.data()?.installmentType,
              Day_Date: eachRe.data()?.installemtnDayDate,
              Amount: (
                <CurrencyFormat
                  value={eachRe.data()?.items[0]?.amountPerInstallment}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),

              NIC: eachRe.data()?.nic,
              Balance: (
                <CurrencyFormat
                  value={
                    eachRe.data()?.items[0]?.noOfInstallment *
                    eachRe.data()?.items[0]?.amountPerInstallment
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Action: (
                <div>
                  <VisibilityIcon />
                  <span className="icon_Edit">
                    <HistoryIcon />
                  </span>
                </div>
              ),
            },
          ]);
        }
      } else {
        if (daysCountInitial - 7 > 7) {
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
                        : 99 * Math.round((daysCountInitial - 7) / 7),
                  });
              } else {
                db.collection("arrears").add({
                  invoice_number: eachRe.data().invoice_number,
                  customer_id: eachRe.data().customer_id,
                  nic: eachRe.data().nic,
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
                        : 99 * Math.round((daysCountInitial - 7) / 7),
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
        }
      }
    }
  };

  const afterStateOfArreasCheck = async (instReDoc, eachRe) => {
    let daysCount =
      (new Date().getTime() -
        new Date(
          instReDoc.docs[instReDoc.docs.length - 1].data()?.date?.seconds * 1000
        ).getTime()) /
      (1000 * 3600 * 24);

    if (eachRe.data().installmentType === "Monthly") {
      if (31 - daysCount >= 0) {
        // setDelayedDays(0);

        if (31 - daysCount === 0) {
          setDueInstallmentsDueToday((old) => [
            ...old,
            {
              InvoiceNo: eachRe.data()?.invoice_number,
              InstallmentType: eachRe.data()?.installmentType,
              Day_Date: eachRe.data()?.installemtnDayDate,
              Amount: (
                <CurrencyFormat
                  value={eachRe.data()?.items[0]?.amountPerInstallment}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),

              NIC: eachRe.data()?.nic,
              Balance: (
                <CurrencyFormat
                  value={
                    eachRe.data()?.items[0]?.noOfInstallment *
                      eachRe.data()?.items[0]?.amountPerInstallment -
                    eachRe.data()?.items[0]?.amountPerInstallment *
                      instReDoc.docs.length
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Action: (
                <div>
                  <VisibilityIcon />
                  <span className="icon_Edit">
                    <HistoryIcon />
                  </span>
                </div>
              ),
            },
          ]);
        }
      } else {
        if (daysCount - 31 > 7) {
          let statusMonth = await db
            .collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get();

          if (statusMonth.docs.length > 0) {
            db.collection("arrears")
              .doc(statusMonth.docs[0].id)
              .update({
                delayed_days: daysCount - 31,
                delayed_charges:
                      daysCount - 31 <= 7
                        ? 0
                        : (daysCount - 31) / 7 < 2
                        ? 99
                        : (daysCount - 31) / 7 > 2 &&
                          (daysCount - 31) / 7 < 3
                        ? 198
                        : (daysCount - 31) / 7 > 3 &&
                          (daysCount - 31) / 7 < 4
                        ? 297
                        : (daysCount - 31) / 7 > 4 &&
                          (daysCount - 31) / 7 < 5
                        ? 396
                        : (daysCount - 31) / 7 > 5 &&
                          (daysCount - 31) / 7 < 6
                        ? 495
                        : (daysCount - 31) / 7 > 6 &&
                          (daysCount - 31) / 7 < 7
                        ? 594
                        : (daysCount - 31) / 7 > 7 &&
                          (daysCount - 31) / 7 < 8
                        ? 693
                        : 99 * Math.round((daysCount - 31) / 7),
              });
          } else {
            db.collection("arrears").add({
              invoice_number: eachRe.data().invoice_number,
              customer_id: eachRe.data().customer_id,
              nic: eachRe.data().nic,
              delayed_days: Math.round(daysCount) - 31,
               delayed_charges:
                      daysCount - 31 <= 7
                        ? 0
                        : (daysCount - 31) / 7 < 2
                        ? 99
                        : (daysCount - 31) / 7 > 2 &&
                          (daysCount - 31) / 7 < 3
                        ? 198
                        : (daysCount - 31) / 7 > 3 &&
                          (daysCount - 31) / 7 < 4
                        ? 297
                        : (daysCount - 31) / 7 > 4 &&
                          (daysCount - 31) / 7 < 5
                        ? 396
                        : (daysCount - 31) / 7 > 5 &&
                          (daysCount - 31) / 7 < 6
                        ? 495
                        : (daysCount - 31) / 7 > 6 &&
                          (daysCount - 31) / 7 < 7
                        ? 594
                        : (daysCount - 31) / 7 > 7 &&
                          (daysCount - 31) / 7 < 8
                        ? 693
                        : 99 * Math.round((daysCount - 31) / 7),
              date: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      }
    } else {
      if (7 - daysCount >= 0) {
        // setDelayedDays(0);

        if (7 - daysCount === 0) {
          setDueInstallmentsDueToday((old) => [
            ...old,
            {
              InvoiceNo: eachRe.data()?.invoice_number,
              InstallmentType: eachRe.data()?.installmentType,
              Day_Date: eachRe.data()?.installemtnDayDate,
              Amount: (
                <CurrencyFormat
                  value={eachRe.data()?.items[0]?.amountPerInstallment}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),

              NIC: eachRe.data()?.nic,
              Balance: (
                <CurrencyFormat
                  value={
                    eachRe.data()?.items[0]?.noOfInstallment *
                      eachRe.data()?.items[0]?.amountPerInstallment -
                    eachRe.data()?.items[0]?.amountPerInstallment *
                      instReDoc.docs.length
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Action: (
                <div>
                  <VisibilityIcon />
                  <span className="icon_Edit">
                    <HistoryIcon />
                  </span>
                </div>
              ),
            },
          ]);
        }
      } else {
        if (daysCount - 7 > 7) {
          let statusWeek = await db
            .collection("arrears")
            .where("invoice_number", "==", eachRe.data().invoice_number)
            .get();

          if (statusWeek.docs.length > 0) {
            db.collection("arrears")
              .doc(statusWeek.docs[0].id)
              .update({
                delayed_days: Math.round(daysCount) - 7,
                delayed_charges:
                      daysCount - 7 <= 7
                        ? 0
                        : (daysCount - 7) / 7 < 2
                        ? 99
                        : (daysCount - 7) / 7 > 2 &&
                          (daysCount - 7) / 7 < 3
                        ? 198
                        : (daysCount - 7) / 7 > 3 &&
                          (daysCount - 7) / 7 < 4
                        ? 297
                        : (daysCount - 7) / 7 > 4 &&
                          (daysCount - 7) / 7 < 5
                        ? 396
                        : (daysCount - 7) / 7 > 5 &&
                          (daysCount - 7) / 7 < 6
                        ? 495
                        : (daysCount - 7) / 7 > 6 &&
                          (daysCount - 7) / 7 < 7
                        ? 594
                        : (daysCount - 7) / 7 > 7 &&
                          (daysCount - 7) / 7 < 8
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
                        : (daysCount - 7) / 7 > 2 &&
                          (daysCount - 7) / 7 < 3
                        ? 198
                        : (daysCount - 7) / 7 > 3 &&
                          (daysCount - 7) / 7 < 4
                        ? 297
                        : (daysCount - 7) / 7 > 4 &&
                          (daysCount - 7) / 7 < 5
                        ? 396
                        : (daysCount - 7) / 7 > 5 &&
                          (daysCount - 7) / 7 < 6
                        ? 495
                        : (daysCount - 7) / 7 > 6 &&
                          (daysCount - 7) / 7 < 7
                        ? 594
                        : (daysCount - 7) / 7 > 7 &&
                          (daysCount - 7) / 7 < 8
                        ? 693
                        : 99 * Math.round((daysCount - 7) / 7),
              date: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      }
    }
  };

  //START pay And Go Columns
  const dashboarColomns = [
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
      name: "InstallmentType",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: " Day_Date",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Amount",
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
      name: "Balance",
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

  return (
    <Container component="main" className="main_container">
      <Typography className="titles" variant="h5" gutterBottom>
        DashBoard
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card className="Cardcontent">
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <Typography
                        className="titl"
                        color="textSecondary"
                        gutterBottom
                      >
                        Today
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TodayIcon className="tody_icon" />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <LocalOfferIcon className="tag_icon" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <hr className="card_hr" />
                    </Grid>
                    <Grid item xs={12} sm={8}></Grid>
                    <Grid item xs={12} sm={1}>
                      <FileCopyIcon className="invoice_icon" />
                    </Grid>
                    <Grid item xs={12} sm={11}>
                      <Typography variant="h4" component="h6">
                        Total of Invoices Income
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="pos" color="textSecondary">
                        Full Payment
                        <br />
                        <span>12000</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="pos" color="textSecondary">
                        Pay and Go
                        <br />
                        <span>1000</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="h6">
                      Total :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="h6">
                      15000
                    </Typography>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </form>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <span className="title_Span_blackList">
                Due installments of the day
              </span>
            }
            className="blackList_Table"
            data={dueInstallmentsDueToday}
            columns={dashboarColomns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "textfield",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.rowIndex);
              },
            }}
          />
        </Grid>
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
          <PendingList />
        </Grid>
      </Grid>
      {/*END BlockListPrnding Table */}

      <br />

      {/*START Invoices  Table */}

      <Typography className="today_invoices" variant="h4" component="h6">
        All invoices of issued in today
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
