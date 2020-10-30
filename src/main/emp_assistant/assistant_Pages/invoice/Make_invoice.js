import React, { useState, useEffect } from "react";
import { Modal, Radio, Spin } from "antd";
import { PrinterFilled } from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";

import firebase from "firebase";
import CurrencyFormat from "react-currency-format";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import db, { storage } from "../../../../config/firebase.js";
import "./Make_invoice.css";
// icon
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

function Make_invoice() {
  const location = useLocation();
  const [loadingsubmit, setLoadingSubmit] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [tablerows, setTableRows] = useState([]);
  const [itemQty, setItemQty] = useState({});
  const [itemDP, setItemDP] = useState({});
  const [itemNOI, setItemNOI] = useState({});
  const [itemAPI, setItemAPI] = useState({});
  const [itemDiscount, setItemDiscount] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discription, setDiscription] = useState("");
  const [days, setDays] = useState(new Date().getDay());
  const [dates, setDates] = useState(new Date().getDate());
  const [daysDate, setDaysDate] = useState({
    value: "Weekly",
  });
  const { confirm } = Modal;

  let history = useHistory();

  useEffect(() => {
    setInvoiceNumber("IN-" + Math.floor(Math.random() * 1000000000 + 1));

    if (location.state != null) {
      var tableData = [];
      var keepDataQTY = {};
      var keepDataDP = {};
      var keepDataNOI = {};
      var keepDataAPI = {};
      var keepDataDiscount = {};
      location.state.detail.forEach((obj) => {
        keepDataQTY[obj.i] = obj.qty;
        keepDataDP[obj.i] =
          obj.paymentWay === "PayandGo"
            ? obj.item.downPayment
            : obj.item.salePrice;
        keepDataNOI[obj.i] =
          obj.paymentWay === "PayandGo" ? obj.item.noOfInstallments : 0;
        keepDataAPI[obj.i] =
          obj.paymentWay === "PayandGo" ? obj.item.amountPerInstallment : 0;
        keepDataDiscount[obj.i] = obj.item.discount;
        tableData.push(obj);
      });
      setItemDiscount(keepDataDiscount);
      setItemAPI(keepDataAPI);
      setItemNOI(keepDataNOI);
      setItemQty(keepDataQTY);
      setItemDP(keepDataDP);
      setTableRows(tableData);
    }
    // eslint-disable-next-line
  }, []);

  const radioOnChange = (e) => {
    setDaysDate({
      value: e.target.value,
    });
  };

  const subTotalFunc = () => {
    var subTotalValue = 0;
    for (var a = 0; a < tablerows.length; a++) {
      subTotalValue =
        subTotalValue +
        (itemDP[tablerows[a].i] - itemDiscount[tablerows[a].i]) *
          itemQty[tablerows[a].i];
    }
    return subTotalValue;
  };

  const handleQTYChange = (e, itemid, row) => {
    try {
      const { value } = e.target;
      db.collection("item")
        .doc(itemid)
        .get()
        .then((doc) => {
          if (Math.round(doc.data().qty) >= (value === "" ? 1 : value)) {
            setItemQty({
              ...itemQty,
              [row.i]: value,
            });
          } else {
            NotificationManager.warning("Out Of Stock");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const showConfirm = () => {
    if (subTotalFunc() - totalDiscount < 0) {
      NotificationManager.warning(
        "Issue with your calculations Pleace check again (May be Included minus values ! )"
      );
    } else {
      confirm({
        title: (
          <h5 className="confo_title">Do you Want to Print an Invoice?</h5>
        ),
        icon: <PrinterFilled className="confo_icon" />,
        okText: "Yes",
        cancelText: "No",
        async onOk() {
          var arrayPassingItems = [];

          tablerows.forEach((one) => {
            let objItem = {
              item_id: one.id,
              item_name: one.title,
              qty: itemQty[one.i],
              paymentWay: one.paymentWay,
              downpayment: itemDP[one.i],
              noOfInstallment: itemNOI[one.i],
              amountPerInstallment: itemAPI[one.i],
              discount: itemDiscount[one.i],
            };
            arrayPassingItems.push(objItem);
          });

          if (tablerows.some((ob) => ob.customer !== null)) {
            let passingWithCustomerObj = {
              invoice_number: invoiceNumber,
              customerDetails: tablerows[0].customer,
              installmentType: daysDate.value,
              installemtnDayDate: daysDate.value === "Weekly" ? days : dates,
              discount: totalDiscount,
              subTotal: subTotalFunc(),
              total: subTotalFunc() - totalDiscount,
              discription: discription,
              itemsList: arrayPassingItems,
              backto: "item_list",
            };

            let moveWith = {
              pathname: "/assistant/invoice/printInvoice",
              search: "?query=abc",
              state: { detail: passingWithCustomerObj },
            };
            await invoiceIntoDb();

            history.push(moveWith);
          } else {
            let passingWithoutCustomerObj = {
              invoice_number: invoiceNumber,
              customerDetails: null,
              installmentType: null,
              installemtnDayDate: null,
              discount: totalDiscount,
              subTotal: subTotalFunc(),
              total: subTotalFunc() - totalDiscount,
              discription: discription,
              itemsList: arrayPassingItems,
              backto: "item_list",
            };
            let moveWith = {
              pathname: "/assistant/invoice/printInvoice",
              search: "?query=abc",
              state: { detail: passingWithoutCustomerObj },
            };
            await invoiceIntoDb();

            history.push(moveWith);
          }
        },
        async onCancel() {
          await invoiceIntoDb();
          history.push("/assistant/ui/ItemTable");
        },
      });
    }
  };

  // eslint-disable-next-line
  const invoiceIntoDb = async () => {
    setLoadingSubmit(true);
    if (tablerows.some((ob) => ob.customer !== null)) {
      if (tablerows[0].customer.customerImageFile) {
        await storage
          .ref(`images/${tablerows[0].customer.customerImageFile.name}`)
          .put(tablerows[0].customer.customerImageFile);

        storage
          .ref("images")
          .child(tablerows[0].customer.customerImageFile.name)
          .getDownloadURL()
          .then((url) => {
            if (tablerows[0].customer.customerId !== null) {
              db.collection("customer")
                .doc(tablerows[0].customer.customerId)
                .update({
                  fname: tablerows[0].customer.customerFname,
                  lname: tablerows[0].customer.customerLname,
                  address1: tablerows[0].customer.customerAddress1,
                  address2: tablerows[0].customer.customerAddress2,
                  root: tablerows[0].customer.customerRootToHome,
                  nic: tablerows[0].customer.customerNic,
                  relations_nics: tablerows[0].customer.customerRelatedNics,
                  mobile1: tablerows[0].customer.customerMobile1,
                  mobile2: tablerows[0].customer.customerMobile2,
                  photo: url,
                })
                .then((cust) => {
                  let arrayItems = [];

                  tablerows.forEach((one) => {
                    let objItem = {
                      item_id: one.id,
                      qty: parseInt(itemQty[one.i]),
                      paymentWay: one.paymentWay,
                      downpayment: itemDP[one.i] === "" ? 0 : itemDP[one.i],
                      noOfInstallment:
                        itemNOI[one.i] === "" ? 0 : itemNOI[one.i],
                      amountPerInstallment:
                        itemAPI[one.i] === "" ? 0 : itemAPI[one.i],
                      discount:
                        itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
                      item_name: one.title,
                    };
                    arrayItems.push(objItem);
                  });

                  db.collection("invoice")
                    .add({
                      invoice_number: invoiceNumber,
                      items: arrayItems,
                      customer_id: cust.id,
                      nic: tablerows[0].customer.customerNic,
                      installmentType: daysDate.value,
                      installemtnDayDate:
                        daysDate.value === "Weekly" ? days : dates,
                      discount: totalDiscount === "" ? 0 : totalDiscount,
                      total:
                        subTotalFunc() -
                        (totalDiscount === "" ? 0 : totalDiscount),
                      status_of_payandgo: "onGoing",
                      description: discription,
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then((invDoc) => {
                      if (tablerows[0].customer.trustee1Id !== null) {
                        db.collection("trustee")
                          .doc(tablerows[0].customer.trustee1Id)
                          .update({
                            fname: tablerows[0].customer.trustee1Fname,
                            lname: tablerows[0].customer.trustee1Lname,
                            nic: tablerows[0].customer.trustee1Nic,
                            address1: tablerows[0].customer.trustee1Address1,
                            address2: tablerows[0].customer.trustee1Address2,
                            mobile1: tablerows[0].customer.trustee1Mobile1,
                            mobile2: tablerows[0].customer.trustee1Mobile2,
                            invoice_number: invoiceNumber,
                          });
                      } else {
                        db.collection("trustee").add({
                          fname: tablerows[0].customer.trustee1Fname,
                          lname: tablerows[0].customer.trustee1Lname,
                          nic: tablerows[0].customer.trustee1Nic,
                          address1: tablerows[0].customer.trustee1Address1,
                          address2: tablerows[0].customer.trustee1Address2,
                          mobile1: tablerows[0].customer.trustee1Mobile1,
                          mobile2: tablerows[0].customer.trustee1Mobile2,
                          invoice_number: invoiceNumber,
                          date: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                      }

                      if (
                        tablerows[0].customer.trustee2Nic &&
                        tablerows[0].customer.trustee2Fname &&
                        tablerows[0].customer.trustee2Lname &&
                        tablerows[0].customer.trustee2Address1 &&
                        tablerows[0].customer.trustee2Mobile1
                      ) {
                        if (tablerows[0].customer.trustee2Id !== null) {
                          db.collection("trustee")
                            .doc(tablerows[0].customer.trustee2Id)
                            .update({
                              fname: tablerows[0].customer.trustee2Fname,
                              lname: tablerows[0].customer.trustee2Lname,
                              nic: tablerows[0].customer.trustee2Nic,
                              address1: tablerows[0].customer.trustee2Address1,
                              address2: tablerows[0].customer.trustee2Address2,
                              mobile1: tablerows[0].customer.trustee2Mobile1,
                              mobile2: tablerows[0].customer.trustee2Mobile2,
                              invoice_number: invoiceNumber,
                            });
                        } else {
                          db.collection("trustee").add({
                            fname: tablerows[0].customer.trustee2Fname,
                            lname: tablerows[0].customer.trustee2Lname,
                            nic: tablerows[0].customer.trustee2Nic,
                            address1: tablerows[0].customer.trustee2Address1,
                            address2: tablerows[0].customer.trustee2Address2,
                            mobile1: tablerows[0].customer.trustee2Mobile1,
                            mobile2: tablerows[0].customer.trustee2Mobile2,
                            invoice_number: invoiceNumber,
                            date: firebase.firestore.FieldValue.serverTimestamp(),
                          });
                        }
                      }

                      tablerows.forEach(async (itemUDoc) => {
                        let newArray = await await db
                          .collection("item")
                          .doc(itemUDoc.id)
                          .get();

                        await db
                          .collection("item")
                          .doc(itemUDoc.id)
                          .update({
                            qty:
                              Math.round(newArray.data().qty) -
                              itemQty[itemUDoc.i],
                          });
                      });
                      setLoadingSubmit(false);
                    });
                });
            } else {
              db.collection("customer")
                .add({
                  fname: tablerows[0].customer.customerFname,
                  lname: tablerows[0].customer.customerLname,
                  address1: tablerows[0].customer.customerAddress1,
                  address2: tablerows[0].customer.customerAddress2,
                  root: tablerows[0].customer.customerRootToHome,
                  nic: tablerows[0].customer.customerNic,
                  relations_nics: tablerows[0].customer.customerRelatedNics,
                  mobile1: tablerows[0].customer.customerMobile1,
                  mobile2: tablerows[0].customer.customerMobile2,
                  photo: url,
                  status: "normal",
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((cust) => {
                  let arrayItems = [];

                  tablerows.forEach((one) => {
                    let objItem = {
                      item_id: one.id,
                      qty: parseInt(itemQty[one.i]),
                      paymentWay: one.paymentWay,
                      downpayment: itemDP[one.i] === "" ? 0 : itemDP[one.i],
                      noOfInstallment:
                        itemNOI[one.i] === "" ? 0 : itemNOI[one.i],
                      amountPerInstallment:
                        itemAPI[one.i] === "" ? 0 : itemAPI[one.i],
                      discount:
                        itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
                      item_name: one.title,
                    };
                    arrayItems.push(objItem);
                  });

                  db.collection("invoice")
                    .add({
                      invoice_number: invoiceNumber,
                      items: arrayItems,
                      customer_id: cust.id,
                      nic: tablerows[0].customer.customerNic,
                      installmentType: daysDate.value,
                      installemtnDayDate:
                        daysDate.value === "Weekly" ? days : dates,
                      discount: totalDiscount === "" ? 0 : totalDiscount,
                      total:
                        subTotalFunc() -
                        (totalDiscount === "" ? 0 : totalDiscount),
                      status_of_payandgo: "onGoing",
                      description: discription,
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then((invDoc) => {
                      if (tablerows[0].customer.trustee1Id !== null) {
                        db.collection("trustee")
                          .doc(tablerows[0].customer.trustee1Id)
                          .update({
                            fname: tablerows[0].customer.trustee1Fname,
                            lname: tablerows[0].customer.trustee1Lname,
                            nic: tablerows[0].customer.trustee1Nic,
                            address1: tablerows[0].customer.trustee1Address1,
                            address2: tablerows[0].customer.trustee1Address2,
                            mobile1: tablerows[0].customer.trustee1Mobile1,
                            mobile2: tablerows[0].customer.trustee1Mobile2,
                            invoice_number: invoiceNumber,
                          });
                      } else {
                        db.collection("trustee").add({
                          fname: tablerows[0].customer.trustee1Fname,
                          lname: tablerows[0].customer.trustee1Lname,
                          nic: tablerows[0].customer.trustee1Nic,
                          address1: tablerows[0].customer.trustee1Address1,
                          address2: tablerows[0].customer.trustee1Address2,
                          mobile1: tablerows[0].customer.trustee1Mobile1,
                          mobile2: tablerows[0].customer.trustee1Mobile2,
                          invoice_number: invoiceNumber,
                          date: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                      }

                      if (
                        tablerows[0].customer.trustee2Nic &&
                        tablerows[0].customer.trustee2Fname &&
                        tablerows[0].customer.trustee2Lname &&
                        tablerows[0].customer.trustee2Address1 &&
                        tablerows[0].customer.trustee2Mobile1
                      ) {
                        if (tablerows[0].customer.trustee2Id !== null) {
                          db.collection("trustee")
                            .doc(tablerows[0].customer.trustee2Id)
                            .update({
                              fname: tablerows[0].customer.trustee2Fname,
                              lname: tablerows[0].customer.trustee2Lname,
                              nic: tablerows[0].customer.trustee2Nic,
                              address1: tablerows[0].customer.trustee2Address1,
                              address2: tablerows[0].customer.trustee2Address2,
                              mobile1: tablerows[0].customer.trustee2Mobile1,
                              mobile2: tablerows[0].customer.trustee2Mobile2,
                              invoice_number: invoiceNumber,
                            });
                        } else {
                          db.collection("trustee").add({
                            fname: tablerows[0].customer.trustee2Fname,
                            lname: tablerows[0].customer.trustee2Lname,
                            nic: tablerows[0].customer.trustee2Nic,
                            address1: tablerows[0].customer.trustee2Address1,
                            address2: tablerows[0].customer.trustee2Address2,
                            mobile1: tablerows[0].customer.trustee2Mobile1,
                            mobile2: tablerows[0].customer.trustee2Mobile2,
                            invoice_number: invoiceNumber,
                            date: firebase.firestore.FieldValue.serverTimestamp(),
                          });
                        }
                      }

                      tablerows.forEach(async (itemUDoc) => {
                        let newArray = await await db
                          .collection("item")
                          .doc(itemUDoc.id)
                          .get();

                        await db
                          .collection("item")
                          .doc(itemUDoc.id)
                          .update({
                            qty:
                              Math.round(newArray.data().qty) -
                              itemQty[itemUDoc.i],
                          });
                      });
                      setLoadingSubmit(false);
                    });
                });
            }
          });
      } else {
        if (tablerows[0].customer.customerId !== null) {
          db.collection("customer")
            .doc(tablerows[0].customer.customerId)
            .update({
              fname: tablerows[0].customer.customerFname,
              lname: tablerows[0].customer.customerLname,
              address1: tablerows[0].customer.customerAddress1,
              address2: tablerows[0].customer.customerAddress2,
              root: tablerows[0].customer.customerRootToHome,
              nic: tablerows[0].customer.customerNic,
              relations_nics: tablerows[0].customer.customerRelatedNics,
              mobile1: tablerows[0].customer.customerMobile1,
              mobile2: tablerows[0].customer.customerMobile2,
              photo: null,
            })
            .then((cust) => {
              let arrayItems = [];

              tablerows.forEach((one) => {
                let objItem = {
                  item_id: one.id,
                  qty: parseInt(itemQty[one.i]),
                  paymentWay: one.paymentWay,
                  downpayment: itemDP[one.i] === "" ? 0 : itemDP[one.i],
                  noOfInstallment: itemNOI[one.i] === "" ? 0 : itemNOI[one.i],
                  amountPerInstallment:
                    itemAPI[one.i] === "" ? 0 : itemAPI[one.i],
                  discount:
                    itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
                  item_name: one.title,
                };
                arrayItems.push(objItem);
              });

              db.collection("invoice")
                .add({
                  invoice_number: invoiceNumber,
                  items: arrayItems,
                  customer_id: cust.id,
                  nic: tablerows[0].customer.customerNic,
                  installmentType: daysDate.value,
                  installemtnDayDate:
                    daysDate.value === "Weekly" ? days : dates,
                  discount: totalDiscount === "" ? 0 : totalDiscount,
                  total:
                    subTotalFunc() - (totalDiscount === "" ? 0 : totalDiscount),
                  status_of_payandgo: "onGoing",
                  description: discription,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((invDoc) => {
                  if (tablerows[0].customer.trustee1Id !== null) {
                    db.collection("trustee")
                      .doc(tablerows[0].customer.trustee1Id)
                      .update({
                        fname: tablerows[0].customer.trustee1Fname,
                        lname: tablerows[0].customer.trustee1Lname,
                        nic: tablerows[0].customer.trustee1Nic,
                        address1: tablerows[0].customer.trustee1Address1,
                        address2: tablerows[0].customer.trustee1Address2,
                        mobile1: tablerows[0].customer.trustee1Mobile1,
                        mobile2: tablerows[0].customer.trustee1Mobile2,
                        invoice_number: invoiceNumber,
                      });
                  } else {
                    db.collection("trustee").add({
                      fname: tablerows[0].customer.trustee1Fname,
                      lname: tablerows[0].customer.trustee1Lname,
                      nic: tablerows[0].customer.trustee1Nic,
                      address1: tablerows[0].customer.trustee1Address1,
                      address2: tablerows[0].customer.trustee1Address2,
                      mobile1: tablerows[0].customer.trustee1Mobile1,
                      mobile2: tablerows[0].customer.trustee1Mobile2,
                      invoice_number: invoiceNumber,
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                  }

                  if (
                    tablerows[0].customer.trustee2Nic &&
                    tablerows[0].customer.trustee2Fname &&
                    tablerows[0].customer.trustee2Lname &&
                    tablerows[0].customer.trustee2Address1 &&
                    tablerows[0].customer.trustee2Mobile1
                  ) {
                    if (tablerows[0].customer.trustee2Id !== null) {
                      db.collection("trustee")
                        .doc(tablerows[0].customer.trustee2Id)
                        .update({
                          fname: tablerows[0].customer.trustee2Fname,
                          lname: tablerows[0].customer.trustee2Lname,
                          nic: tablerows[0].customer.trustee2Nic,
                          address1: tablerows[0].customer.trustee2Address1,
                          address2: tablerows[0].customer.trustee2Address2,
                          mobile1: tablerows[0].customer.trustee2Mobile1,
                          mobile2: tablerows[0].customer.trustee2Mobile2,
                          invoice_number: invoiceNumber,
                        });
                    } else {
                      db.collection("trustee").add({
                        fname: tablerows[0].customer.trustee2Fname,
                        lname: tablerows[0].customer.trustee2Lname,
                        nic: tablerows[0].customer.trustee2Nic,
                        address1: tablerows[0].customer.trustee2Address1,
                        address2: tablerows[0].customer.trustee2Address2,
                        mobile1: tablerows[0].customer.trustee2Mobile1,
                        mobile2: tablerows[0].customer.trustee2Mobile2,
                        invoice_number: invoiceNumber,
                        date: firebase.firestore.FieldValue.serverTimestamp(),
                      });
                    }
                  }

                  tablerows.forEach(async (itemUDoc) => {
                    let newArray = await await db
                      .collection("item")
                      .doc(itemUDoc.id)
                      .get();

                    await db
                      .collection("item")
                      .doc(itemUDoc.id)
                      .update({
                        qty:
                          Math.round(newArray.data().qty) - itemQty[itemUDoc.i],
                      });
                  });
                  setLoadingSubmit(false);
                });
            });
        } else {
          db.collection("customer")
            .add({
              fname: tablerows[0].customer.customerFname,
              lname: tablerows[0].customer.customerLname,
              address1: tablerows[0].customer.customerAddress1,
              address2: tablerows[0].customer.customerAddress2,
              root: tablerows[0].customer.customerRootToHome,
              nic: tablerows[0].customer.customerNic,
              relations_nics: tablerows[0].customer.customerRelatedNics,
              mobile1: tablerows[0].customer.customerMobile1,
              mobile2: tablerows[0].customer.customerMobile2,
              photo: null,
              status: "normal",
              date: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((cust) => {
              let arrayItems = [];

              tablerows.forEach((one) => {
                let objItem = {
                  item_id: one.id,
                  qty: parseInt(itemQty[one.i]),
                  paymentWay: one.paymentWay,
                  downpayment: itemDP[one.i] === "" ? 0 : itemDP[one.i],
                  noOfInstallment: itemNOI[one.i] === "" ? 0 : itemNOI[one.i],
                  amountPerInstallment:
                    itemAPI[one.i] === "" ? 0 : itemAPI[one.i],
                  discount:
                    itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
                  item_name: one.title,
                };
                arrayItems.push(objItem);
              });

              db.collection("invoice")
                .add({
                  invoice_number: invoiceNumber,
                  items: arrayItems,
                  customer_id: cust.id,
                  nic: tablerows[0].customer.customerNic,
                  installmentType: daysDate.value,
                  installemtnDayDate:
                    daysDate.value === "Weekly" ? days : dates,
                  discount: totalDiscount === "" ? 0 : totalDiscount,
                  total:
                    subTotalFunc() - (totalDiscount === "" ? 0 : totalDiscount),
                  status_of_payandgo: "onGoing",
                  description: discription,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((invDoc) => {
                  if (tablerows[0].customer.trustee1Id !== null) {
                    db.collection("trustee")
                      .doc(tablerows[0].customer.trustee1Id)
                      .update({
                        fname: tablerows[0].customer.trustee1Fname,
                        lname: tablerows[0].customer.trustee1Lname,
                        nic: tablerows[0].customer.trustee1Nic,
                        address1: tablerows[0].customer.trustee1Address1,
                        address2: tablerows[0].customer.trustee1Address2,
                        mobile1: tablerows[0].customer.trustee1Mobile1,
                        mobile2: tablerows[0].customer.trustee1Mobile2,
                        invoice_number: invoiceNumber,
                      });
                  } else {
                    db.collection("trustee").add({
                      fname: tablerows[0].customer.trustee1Fname,
                      lname: tablerows[0].customer.trustee1Lname,
                      nic: tablerows[0].customer.trustee1Nic,
                      address1: tablerows[0].customer.trustee1Address1,
                      address2: tablerows[0].customer.trustee1Address2,
                      mobile1: tablerows[0].customer.trustee1Mobile1,
                      mobile2: tablerows[0].customer.trustee1Mobile2,
                      invoice_number: invoiceNumber,
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                  }

                  if (
                    tablerows[0].customer.trustee2Nic &&
                    tablerows[0].customer.trustee2Fname &&
                    tablerows[0].customer.trustee2Lname &&
                    tablerows[0].customer.trustee2Address1 &&
                    tablerows[0].customer.trustee2Mobile1
                  ) {
                    if (tablerows[0].customer.trustee2Id !== null) {
                      db.collection("trustee")
                        .doc(tablerows[0].customer.trustee2Id)
                        .update({
                          fname: tablerows[0].customer.trustee2Fname,
                          lname: tablerows[0].customer.trustee2Lname,
                          nic: tablerows[0].customer.trustee2Nic,
                          address1: tablerows[0].customer.trustee2Address1,
                          address2: tablerows[0].customer.trustee2Address2,
                          mobile1: tablerows[0].customer.trustee2Mobile1,
                          mobile2: tablerows[0].customer.trustee2Mobile2,
                          invoice_number: invoiceNumber,
                        });
                    } else {
                      db.collection("trustee").add({
                        fname: tablerows[0].customer.trustee2Fname,
                        lname: tablerows[0].customer.trustee2Lname,
                        nic: tablerows[0].customer.trustee2Nic,
                        address1: tablerows[0].customer.trustee2Address1,
                        address2: tablerows[0].customer.trustee2Address2,
                        mobile1: tablerows[0].customer.trustee2Mobile1,
                        mobile2: tablerows[0].customer.trustee2Mobile2,
                        invoice_number: invoiceNumber,
                        date: firebase.firestore.FieldValue.serverTimestamp(),
                      });
                    }
                  }

                  tablerows.forEach(async (itemUDoc) => {
                    let newArray = await await db
                      .collection("item")
                      .doc(itemUDoc.id)
                      .get();

                    await db
                      .collection("item")
                      .doc(itemUDoc.id)
                      .update({
                        qty:
                          Math.round(newArray.data().qty) - itemQty[itemUDoc.i],
                      });
                  });
                  setLoadingSubmit(false);
                });
            });
        }
      }
    } else {
      let arrayItems = [];

      tablerows.forEach((one) => {
        let objItem = {
          item_id: one.id,
          qty: parseInt(itemQty[one.i]),
          paymentWay: one.paymentWay,
          downpayment: itemDP[one.i] === "" ? 0 : itemDP[one.i],
          noOfInstallment: itemNOI[one.i] === "" ? 0 : itemNOI[one.i],
          amountPerInstallment: itemAPI[one.i] === "" ? 0 : itemAPI[one.i],
          discount: itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
          item_name: one.title,
        };
        arrayItems.push(objItem);
      });

      await db.collection("invoice").add({
        invoice_number: invoiceNumber,
        items: arrayItems,
        customer_id: null,
        installmentType: null,
        installemtnDayDate: null,
        discount: totalDiscount === "" ? 0 : totalDiscount,
        total: subTotalFunc() - (totalDiscount === "" ? 0 : totalDiscount),
        status_of_payandgo: "Done",
        description: discription,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      });

      tablerows.forEach(async (itemUDoc) => {
        let newArray = await await db.collection("item").doc(itemUDoc.id).get();

        await db
          .collection("item")
          .doc(itemUDoc.id)
          .update({
            qty: Math.round(newArray.data().qty) - itemQty[itemUDoc.i],
          });
      });
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="main_In">
        <Container className="container_In" component="main" maxWidth="xl">
          <div className="paper_in">
            <form className="form_in" noValidate>
              <Typography component="h1" variant="h5">
                Invoice
              </Typography>
              <hr className="hr_invoice" />
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="lbl_invoice">Invoice#</div>
                </Grid>
                <Grid item xs={5}>
                  <h3>{invoiceNumber}</h3>
                  {/* <TextField
                    className="txt_Invoice"
                    autoComplete="iNo"
                    name="invoice No"
                    variant="outlined"
                    size="small"
                    required
                    value={invoiceNumber}
                    onChange={(e) => {
                      setInvoiceNumber(e.target.value.trim());
                    }}
                    fullWidth
                    id="invoiceNo"
                    label="Invoice No"
                  /> */}
                </Grid>
                <Grid item xs={5}></Grid>

                <TableContainer className="tbl_Container" component={Paper}>
                  <Table className="table" aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="tbl_Cell">Item</TableCell>
                        <TableCell className="tbl_Cell" colSpan={1}>
                          Qty
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Type
                        </TableCell>
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          DP(LKR)
                        </TableCell>
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          NOI
                        </TableCell>

                        <TableCell className="tbl_Cell" align="right">
                          API(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Discount(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Sum(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tablerows.map((row) => (
                        <TableRow key={row.i}>
                          <TableCell>{row.title}</TableCell>
                          <TableCell align="right">
                            <TextField
                              key={row.i}
                              id={row.i.toString()}
                              className="txt_qty"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 1 } }}
                              type="number"
                              fullWidth
                              value={itemQty[row.i]}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  if (row.paymentWay === "PayandGo") {
                                    if (Math.round(e.target.value) === 1) {
                                      handleQTYChange(e, row.id, row);
                                    }
                                  } else {
                                    handleQTYChange(e, row.id, row);
                                  }
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell align="right" colSpan={1}>
                            {row.paymentWay === "PayandGo" ? "P" : "F"}
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            <TextField
                              className="txt_dpayment"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 0 } }}
                              type="number"
                              fullWidth
                              key={row.i}
                              id={row.i.toString()}
                              value={itemDP[row.i]}
                              onChange={(e) => {
                                setItemDP({
                                  ...itemDP,
                                  [row.i]: e.target.value,
                                });
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            <TextField
                              className="txt_dpayment"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 0 } }}
                              type="number"
                              fullWidth
                              disabled={
                                row.paymentWay === "PayandGo" ? false : true
                              }
                              key={row.i}
                              id={row.i.toString()}
                              value={itemNOI[row.i]}
                              onChange={(e) => {
                                setItemNOI({
                                  ...itemNOI,
                                  [row.i]: e.target.value,
                                });
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            <TextField
                              className="txt_dpayment"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 0 } }}
                              type="number"
                              fullWidth
                              key={row.i}
                              disabled={
                                row.paymentWay === "PayandGo" ? false : true
                              }
                              id={row.i.toString()}
                              value={itemAPI[row.i]}
                              onChange={(e) => {
                                setItemAPI({
                                  ...itemAPI,
                                  [row.i]: e.target.value,
                                });
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            <TextField
                              className="txt_dpayment"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 0 } }}
                              type="number"
                              fullWidth
                              key={row.i}
                              id={row.i.toString()}
                              value={itemDiscount[row.i]}
                              onChange={(e) => {
                                if (e.target.value < itemDP[row.i]) {
                                  setItemDiscount({
                                    ...itemDiscount,
                                    [row.i]: e.target.value,
                                  });
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell
                            align="right"
                            key={row.i}
                            id={row.i.toString()}
                          >
                            {" "}
                            <CurrencyFormat
                              value={
                                parseInt(itemDP[row.i] - itemDiscount[row.i]) *
                                itemQty[row.i]
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={" Rs. "}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <CloseOutlinedIcon
                              className="iconcls_invTbl"
                              onClick={(e) => {
                                tablerows.forEach((itemRe) => {
                                  if (itemRe.i === row.i) {
                                    let index = tablerows.findIndex(
                                      // eslint-disable-next-line
                                      (element) => {
                                        if (element.i === row.i) {
                                          return true;
                                        }
                                      }
                                    );
                                    tablerows.splice(index, 1);
                                    setTableRows([...tablerows]);
                                    if (tablerows.length === 0) {
                                      history.push("/assistant/ui/ItemTable");
                                    }
                                    delete itemQty[row.i];
                                    delete itemDP[row.i];
                                    delete itemNOI[row.i];
                                    delete itemAPI[row.i];
                                    delete itemDiscount[row.i];
                                  }
                                });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell align="right" colSpan={5}>
                          Subtotal(LKR)
                        </TableCell>
                        <TableCell align="right" colSpan={2}>
                          <CurrencyFormat
                            value={subTotalFunc()}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={" Rs. "}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right" colSpan={5}>
                          Discount(LKR)
                        </TableCell>
                        <TableCell className="cel" align="right" colSpan={2}>
                          <TextField
                            className="txt_distg"
                            variant="outlined"
                            size="small"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            fullWidth
                            value={totalDiscount}
                            onChange={(e) => {
                              if (e.target.value < subTotalFunc()) {
                                setTotalDiscount(e.target.value);
                              }
                            }}
                          />
                        </TableCell>
                        {/* <TableCell align="right">555</TableCell> */}
                      </TableRow>
                      <TableRow>
                        <TableCell align="right" colSpan={5}>
                          Total(LKR)
                        </TableCell>
                        <TableCell align="right" colSpan={2}>
                          <CurrencyFormat
                            value={subTotalFunc() - totalDiscount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={" Rs. "}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid container spacing={2}>
                <Grid className="" item xs={12} sm={7}></Grid>
                <Grid className="txt_ip_setting" item xs={12} sm={5}>
                  Choose Installment Repayment Plan:
                </Grid>
                <Grid className="txt_description" item xs={12} sm={2}>
                  Description :
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className="txt_description"
                    autoComplete="description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    id="description"
                    label="Description"
                    size="small"
                    value={discription}
                    onChange={(e) => {
                      setDiscription(e.target.value.trim());
                    }}
                  />
                </Grid>
                <Grid className="xxx" item xs={12} sm={1}></Grid>

                <Grid className="radio_dayDate" item xs={12} sm={1}>
                  <Radio.Group
                    onChange={radioOnChange}
                    value={daysDate.value}
                    disabled={
                      tablerows.some((ob) => ob.paymentWay === "PayandGo")
                        ? false
                        : true
                    }
                  >
                    <Radio className="date" value={"Monthly"}>
                      Monthly
                    </Radio>

                    <br />
                    <Radio className="day" value={"Weekly"}>
                      Weekly
                    </Radio>
                  </Radio.Group>
                </Grid>
                <Grid className="radio_dayDate" item xs={12} sm={3}>
                  <TextField
                    className="txt_day"
                    variant="outlined"
                    size="small"
                    disabled={
                      tablerows.some((ob) => ob.paymentWay === "PayandGo")
                        ? false
                        : true
                    }
                    placeholder="date"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                    fullWidth
                    value={dates}
                    onChange={(e) => {
                      if (daysDate.value === "Monthly") {
                        if (e.target.value <= 31 || e.target.value < 0) {
                          setDates(e.target.value.trim());
                        }
                      }
                    }}
                  />
                  <br />
                  <FormControl size="small" className="select">
                    <InputLabel
                      className="select_label"
                      id="demo-controlled-open-select-label"
                    >
                      Days
                    </InputLabel>
                    <Select
                      value={days}
                      disabled={
                        tablerows.some((ob) => ob.paymentWay === "PayandGo")
                          ? false
                          : true
                      }
                      onChange={(e) => {
                        if (daysDate.value === "Weekly") {
                          setDays(e.target.value);
                        }
                      }}
                      native
                      variant="outlined"
                      label="day"
                      inputProps={{
                        name: "day",
                        id: "outlined-day-native-simple",
                      }}
                    >
                      <option value={1}>Monday</option>
                      <option value={2}>Tuesday</option>
                      <option value={3}>Wednesday</option>
                      <option value={4}>Thursday</option>
                      <option value={5}>Friday</option>
                      <option value={6}>Saturday</option>
                      <option value={0}>Sunday</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="btn_addCustomer"
                disabled={loadingsubmit ? true : false}
                onClick={showConfirm}
                // onClick={printInvoice}
                endIcon={<ArrowForwardIcon />}
              >
                {loadingsubmit ? <Spin size="large" /> : "Next"}
              </Button>
            </form>
          </div>
          <Box mt={5}></Box>
          <NotificationContainer />
        </Container>
      </div>
    </>
  );
}

export default Make_invoice;
