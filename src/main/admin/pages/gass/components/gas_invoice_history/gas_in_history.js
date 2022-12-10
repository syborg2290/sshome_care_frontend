import { AppBar, Box, Button, Grid, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HistoryIcon from "@material-ui/icons/History";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Modal, Spin, DatePicker } from "antd";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import db from "../../../../../../config/firebase.js";
import InstallmentHistory from "./components/Easypayment/history_modal/history_modal";
import firebase from "firebase";
// components
import UpdateInstallment from "./components/Easypayment/update_modal/update_modal";
import InstallmentView from "./components/Easypayment/view_modal/view_modal";
import InstallmentFullPayment from "./components/Fullpayment/full_payment_modal";
// styles
import "./gas_in_history.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#222A44"
  }
}));

function isDateBeforeToday(date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

export default function Gas_Invoice_history() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMovedLoading, setIsMovedLoading] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [currentIndx2, setCurrentIndx2] = useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [payangoTableData, setpayangoTableData] = useState([]);
  const [payangoAllData, setpayangoAllData] = useState([]);
  const [fullPaymentTableData, setFullPaymentTableData] = useState([]);
  const [fullPaymentAllData, setFullPaymentAllData] = useState([]);

  const [installmentUpdate, setInstallmentUpdate] = useState(false); //  table models
  const [installmentvisible, setInstallmentVisible] = useState(false); //  table models
  const [installmentHistory, setInstallmentHistory] = useState(false); //  table models
  const [installmentFullPayment, setInstallmentFullPayment] = useState(false); //  table models

  const [payangoDate1, setPayangoDate1] = useState(null);
  const [payangoDate2, setPayangoDate2] = useState(null);
  const [fullDate1, setFullDate1] = useState(null);
  const [fullDate2, setFullDate2] = useState(null);

  let history2 = useHistory();
  const { confirm } = Modal;

  const [rowsCount, setRowsCount] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showModalUpdate = () => {
    setInstallmentUpdate(true);
  };

  const closeModalUpdate = () => {
    setInstallmentUpdate(false);
  };

  const showModalHistory = () => {
    setInstallmentHistory(true);
  };

  const showInstallmentView = () => {
    setInstallmentVisible(true);
  };

  const showInstallmentFullPayment = () => {
    setInstallmentFullPayment(true);
  };

  //START pay And Go Columns
  const payAndGoColumns = [
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
      name: "Date",
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
      name: "Total_Discount",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
            minWidth: "15px"
          }
        })
      }
    },

    {
      name: "Balance",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Filter_Status",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },

    {
      name: "Status",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Action",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
            minWidth: "215px"
            // maxWidth: "800px",
          }
        })
      }
    }
  ];
  //END pay And Go Columns

  //START Full Payment Columns
  const fullPaymentColumns = [
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
      name: "Date",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },

    {
      name: "Total_Discount",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Full_Payment",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" }
        })
      }
    },
    {
      name: "Action",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600"
          }
        })
      }
    }
  ];

  //END Full Payment Columns

  //START pay And Go Rows

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history2.push("/connection_lost");
    });

    db.collection("gas_invoice")
      .where("status_of_payandgo", "==", "onGoing")
      .get()
      .then((custIn) => {
        custIn.docs.forEach((siDoc) => {
          let isBeforeDate = isDateBeforeToday(
            new Date(siDoc.data()?.deadlineTimestamp?.seconds * 1000)
          );
          if (isBeforeDate) {
            db.collection("gas_invoice").doc(siDoc.id).update({
              status_of_payandgo: "expired"
            });
          }
        });
      });

    let rowsCountUse = rowsCount + 25;
    setRowsCount(rowsCountUse);

    db.collection("gas_invoice")
      // .orderBy("customer_id", "desc")
      .where("customer_id", "!=", null)
      // .orderBy("date", "desc")
      // .limit(25)
      .get()
      .then((cust) => {
        var rawData = [];
        var rawAllData = [];

        var reArray = cust.docs;
        reArray.sort((a, b) => {
          if (
            new Date(a.data().date.seconds * 1000).getFullYear() >=
              new Date(b.data().date.seconds * 1000).getFullYear() &&
            new Date(a.data().date.seconds * 1000).getMonth() >=
              new Date(b.data().date.seconds * 1000).getMonth() &&
            new Date(a.data().date.seconds * 1000).getDate() >=
              new Date(b.data().date.seconds * 1000).getDate()
          ) {
            return -1;
          } else {
            return 1;
          }
        });

        reArray.forEach((siDoc) => {
          rawAllData.push({
            id: siDoc.id,
            data: siDoc.data()
          });

          rawData.push({
            InvoiceNo: siDoc.data().invoice_number,
            // SerialNo: siDoc.data().items[0].serialNo,
            Type: siDoc.data().selectedType,
            Village: siDoc.data().root_village,
            Date: moment(siDoc.data()?.date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            MID: siDoc.data().mid,
            NIC: siDoc.data().nic,
            Total_Discount: (
              <CurrencyFormat
                value={siDoc.data().discount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),

            Balance: (
              <CurrencyFormat
                value={siDoc.data().balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Filter_Status: siDoc.data().status_of_payandgo,
            Status:
              siDoc.data().status_of_payandgo === "onGoing" ? (
                <span
                  style={{
                    color: "black",
                    backgroundColor: "#e6e600",
                    padding: "6px",
                    borderRadius: "20px",
                    font: "10px"
                  }}
                >
                  Ongoing
                </span>
              ) : siDoc.data().status_of_payandgo === "Done" ? (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "#009900",
                    padding: "6px",
                    borderRadius: "20px",
                    width: "100%"
                  }}
                >
                  Done
                </span>
              ) : siDoc.data().status_of_payandgo === "expired" ? (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "#ff8c00",
                    padding: "6px",
                    borderRadius: "20px",
                    width: "100%"
                  }}
                >
                  Expired
                </span>
              ) : (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    padding: "6px",
                    borderRadius: "20px",
                    width: "100%"
                  }}
                >
                  Blacklist
                </span>
              ),
            Action: (
              <div>
                {siDoc.data().status_of_payandgo === "onGoing" ||
                siDoc.data().status_of_payandgo === "expired" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="btn_pay"
                    onClick={showModalUpdate}
                  >
                    Update
                  </Button>
                ) : (
                  ""
                )}
                <span className="icon_visibl">
                  <HistoryIcon onClick={showModalHistory} />
                </span>
                <span className="icon_Edit">
                  <VisibilityIcon onClick={showInstallmentView} />
                </span>
              </div>
            )
          });
        });
        setpayangoAllData(rawAllData);
        setpayangoTableData(rawData);
      });
    //End pay And Go Rows

    //START Full Payment Rows
    db.collection("gas_invoice")
      // .orderBy("customer_id", "desc")
      .orderBy("date", "desc")
      .where("customer_id", "==", null)
      .get()
      .then((cust) => {
        var rawDataFull = [];
        var rawAllDataFull = [];
        cust.docs.forEach((siDoc) => {
          rawAllDataFull.push({
            id: siDoc.id,
            data: siDoc.data()
          });
          rawDataFull.push({
            InvoiceNo: siDoc.data().invoice_number,
            Type: siDoc.data().selectedType,
            Village: siDoc.data().root_village,
            Date: moment(siDoc.data()?.date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Total_Discount: (
              <CurrencyFormat
                value={siDoc.data().discount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Full_Payment: (
              <CurrencyFormat
                value={siDoc.data().total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Action: (
              <div>
                <span className="icon_visibl">
                  <VisibilityIcon onClick={showInstallmentFullPayment} />
                </span>
              </div>
            )
          });
        });

        setFullPaymentAllData(rawAllDataFull);
        setFullPaymentTableData(rawDataFull);
      });
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  //End Full Payment Rows

  const moveAllDoneConfirm = (ifPayandgo) => {
    confirm({
      title: <h5 className="confo_title">Are you sure to continue ?</h5>,
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        setIsMovedLoading(true);
        if (ifPayandgo) {
          if (payangoDate1 !== null) {
            if (payangoDate2 !== null) {
              db.collection("gas_invoice")
                .where("customer_id", "!=", null)
                .get()
                .then((cust) => {
                  cust.docs.forEach((eachDoc) => {
                    if (eachDoc.data().status_of_payandgo === "Done") {
                      let seeBool1 =
                        new Date(eachDoc.data()?.date.seconds * 1000) >
                          new Date(payangoDate1.seconds * 1000) &&
                        new Date(eachDoc.data()?.date.seconds * 1000) <=
                          new Date(payangoDate2.seconds * 1000);

                      if (seeBool1) {
                        db.collection("moved_gas_invoice")
                          .add(eachDoc.data())
                          .then(() => {
                            db.collection("gas_installment")
                              .where(
                                "invoice_number",
                                "==",
                                eachDoc.data().invoice_number
                              )
                              .get()
                              .then((installRe) => {
                                let count = 0;
                                if (installRe.docs.length > 0) {
                                  installRe.docs.forEach((eachIntsll) => {
                                    db.collection("moved_gas_installment")
                                      .add(eachIntsll.data())
                                      .then(() => {
                                        db.collection("gas_installment")
                                          .doc(eachIntsll.id)
                                          .delete()
                                          .then(() => {});
                                        count = count + 1;
                                      });
                                  });
                                  if (count >= installRe.docs.length) {
                                    db.collection("gas_invoice")
                                  .doc(eachDoc.id)
                                  .delete()
                                  .then(() => {});
                                    setIsMovedLoading(false);
                                  }
                                } else {
                                   db.collection("gas_invoice")
                                  .doc(eachDoc.id)
                                  .delete()
                                  .then(() => {});
                                  setIsMovedLoading(false);
                                }

                               
                              });
                          });
                      }
                    }
                  });
                });
            }
          }
        } else {
          if (fullDate1 !== null) {
            if (fullDate2 !== null) {
              db.collection("gas_invoice")
                .where("customer_id", "==", null)
                .get()
                .then((cust) => {
                  cust.docs.forEach((eachDoc) => {
                    if (eachDoc.data().status_of_payandgo === "Done") {
                      let seeBool1 =
                        new Date(eachDoc.data()?.date.seconds * 1000) >
                          new Date(fullDate1.seconds * 1000) &&
                        new Date(eachDoc.data()?.date.seconds * 1000) <=
                          new Date(fullDate2.seconds * 1000);

                      if (seeBool1) {
                        db.collection("moved_gas_invoice")
                          .add(eachDoc.data())
                          .then(() => {
                            db.collection("gas_invoice")
                              .doc(eachDoc.id)
                              .delete()
                              .then(() => {
                                setIsMovedLoading(false);
                              });
                          });
                      }
                    }
                  });
                });
            }
          }
        }
      }
    });
  };

  return (
    <>
      {/*Start Installment Model Update */}
      <Modal
        visible={installmentUpdate}
        className="update_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentUpdate(false);
        }}
      >
        <div className="update_Installment_Model">
          <div className="update_Installment_Model_Main">
            <div className="update_Installment_Model_Detail">
              <UpdateInstallment
                key={payangoAllData[currentIndx2]?.id}
                invoice_no={payangoAllData[currentIndx2]?.data?.invoice_number}
                instAmountProp={
                  payangoAllData[currentIndx2]?.data?.amountPerInstallment
                }
                instCount={payangoAllData[currentIndx2]?.data?.noOfInstallment}
                customer_id={payangoAllData[currentIndx2]?.data?.customer_id}
                closeModal={closeModalUpdate}
                type={payangoAllData[currentIndx2]?.data?.selectedType}
                isEx={
                  payangoAllData[currentIndx2]?.data?.status_of_payandgo ===
                  "expired"
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model Update */}

      {/*Start Installment Model History */}
      <Modal
        visible={installmentHistory}
        className="history_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentHistory(false);
        }}
      >
        <div className="Installment_Model">
          <div className="Installment_Model_Main">
            <div className="Installment_Model_Detail">
              <InstallmentHistory
                key={payangoAllData[currentIndx2]?.id}
                invoice_no={payangoAllData[currentIndx2]?.data?.invoice_number}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model History */}
      {/*Start Installment Model View */}
      <Modal
        visible={installmentvisible}
        className="view_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentVisible(false);
        }}
      >
        <div className="Installment_Model">
          <div className="Installment_Model_Main">
            <div className="Installment_Model_Detail">
              <InstallmentView
                key={payangoAllData[currentIndx2]?.id}
                data={payangoAllData[currentIndx2]?.data}
                items_list_props={payangoAllData[currentIndx2]?.data?.items}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model View */}

      {/*Start Installment Model Full Payment */}
      <Modal
        visible={installmentFullPayment}
        className="FullPayment_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentFullPayment(false);
        }}
      >
        <div className="FullPayment_Installment_Model">
          <div className="FullPayment_Installment_Model_Main">
            <div className="FullPayment_Installment_Model_Detail">
              <InstallmentFullPayment
                key={fullPaymentAllData[currentIndx]?.id}
                items_list_props={fullPaymentAllData[currentIndx]?.data?.items}
                data={fullPaymentAllData[currentIndx]?.data}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model Full Payment */}
      <div component="main" className="main_container">
        <AppBar className="appBar" position="static">
          <Tabs
            classes={{ indicator: classes.indicator }}
            value={value}
            onChange={handleChange}
          >
            <Tab className="tabs" label="Easy Payment" {...a11yProps(0)} />
            <Tab className="tabs" label="Full Payment" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Button variant="contained" className="loadAll">
            {isLoading ? (
              <Spin spinning={isLoading} size="small" />
            ) : (
              "Load All"
            )}
          </Button>
          <span>From </span>
          <DatePicker
            className="date_margin"
            onChange={(e) => {
              if (e !== null) {
                setPayangoDate1(
                  firebase.firestore.Timestamp.fromDate(e.toDate())
                );
              } else {
                setPayangoDate1(null);
              }
            }}
          />
          <span>To </span>
          <DatePicker
            className="date_margin"
            onChange={(e) => {
              if (e !== null) {
                setPayangoDate2(
                  firebase.firestore.Timestamp.fromDate(e.toDate())
                );
              } else {
                setPayangoDate2(null);
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="btn_pay"
            disabled={isMovedLoading}
            onClick={() => moveAllDoneConfirm(true)}
          >
            {isMovedLoading ? (
              <Spin spinning={isLoading} size="small" />
            ) : (
              "Move all done"
            )}
          </Button>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title={<span className="title_Span"></span>}
                className="payAndgo_table"
                data={payangoTableData}
                columns={payAndGoColumns}
                options={{
                  // selectableRows: false,
                  selectableRows: "none",
                  customToolbarSelect: () => {},
                  filterType: "textField",
                  download: false,
                  print: false,
                  searchPlaceholder: "Search using any column names",
                  elevation: 4,
                  sort: true,
                  onRowClick: (rowData, rowMeta) => {
                    setCurrentIndx2(rowMeta.dataIndex);
                  },

                  textLabels: {
                    body: {
                      noMatch: isLoading ? (
                        <Spin
                          className="tblSpinner"
                          size="large"
                          spinning="true"
                        />
                      ) : (
                        ""
                      )
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <span>From </span>
          <DatePicker
            className="date_margin"
            onChange={(e) => {
              if (e !== null) {
                setFullDate1(firebase.firestore.Timestamp.fromDate(e.toDate()));
              } else {
                setFullDate1(null);
              }
            }}
          />
          <span>To </span>
          <DatePicker
            className="date_margin"
            onChange={(e) => {
              if (e !== null) {
                setFullDate2(firebase.firestore.Timestamp.fromDate(e.toDate()));
              } else {
                setFullDate2(null);
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="btn_pay"
            disabled={isMovedLoading}
            onClick={() => moveAllDoneConfirm(false)}
          >
            {isMovedLoading ? (
              <Spin spinning={isLoading} size="small" />
            ) : (
              "Move all"
            )}
          </Button>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title={<span className="title_Span"></span>}
                className="fullPayment_table"
                data={fullPaymentTableData}
                columns={fullPaymentColumns}
                options={{
                  // selectableRows: false,
                  selectableRows: "none",
                  customToolbarSelect: () => {},
                  filterType: "textField",
                  download: false,
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
                        <Spin
                          className="tblSpinner"
                          size="large"
                          spinning="true"
                        />
                      ) : (
                        ""
                      )
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </>
  );
}
