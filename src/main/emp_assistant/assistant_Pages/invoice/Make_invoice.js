import React, { useState, useEffect } from "react";
import { Modal, Spin, DatePicker, Space, Checkbox } from "antd";
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
  const [allRoot, setAllRoot] = useState([]);
  const [loadingsubmit, setLoadingSubmit] = useState(false);
  const [loadingNicsubmit, setLoadingNicSubmit] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [tablerows, setTableRows] = useState([]);
  const [itemQty, setItemQty] = useState({});
  const [itemDP, setItemDP] = useState({});
  const [itemNOI, setItemNOI] = useState({});
  const [itemAPI, setItemAPI] = useState({});
  const [itemDiscount, setItemDiscount] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [gamisaraniInitialAmount, setGamisaraniInitialAmount] = useState(0);
  const [gamisaraniamount, setGamisaraniamount] = useState(0);
  const [gamisaraniId, setGamisaraniId] = useState("");
  const [gamisaraniNic, setGamisaraniNic] = useState("");
  const [days, setDays] = useState(new Date().getDay());
  const [dates, setDates] = useState(new Date().getDate());
  // eslint-disable-next-line
  const [selectedType, setSelectedType] = useState("shop");
  const [gamisarani, setGamisarani] = useState(false);
  const [intialTimestamp, setInititialTimestamp] = useState(null);
  const [deadlineTimestamp, setDeadlineTimestamp] = useState(null);
  let history = useHistory();
  const { confirm } = Modal;

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

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

    db.collection("root")
      .get()
      .then((re) => {
        var rawRoot = [];
        re.docs.forEach((each) => {
          rawRoot.push(each.data().root);
        });
        setAllRoot(rawRoot);
      });

    // eslint-disable-next-line
  }, []);

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
      if (gamisarani) {
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
                  date: intialTimestamp,
                });

                confirm({
                  title: (
                    <h5 className="confo_title">
                      Do you Want to Print an Invoice?
                    </h5>
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
                        installemtnDay: days,
                        installemtnDate: dates,
                        discount: totalDiscount,
                        subTotal: subTotalFunc(),
                        balance: itemNOI * itemAPI,
                        total: subTotalFunc() - totalDiscount,
                        // discription: discription,
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
                        balance: 0,
                        total: subTotalFunc() - totalDiscount,
                        // discription: discription,
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
              });
          });
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
                installemtnDay: days,
                installemtnDate: dates,
                discount: totalDiscount,
                subTotal: subTotalFunc(),
                balance: itemNOI * itemAPI,
                total: subTotalFunc() - totalDiscount,
                // discription: discription,
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
                balance: 0,
                total: subTotalFunc() - totalDiscount,
                // discription: discription,
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
    }
  };

  // eslint-disable-next-line
  const invoiceIntoDb = async () => {
    setLoadingSubmit(true);
    if (tablerows.some((ob) => ob.customer !== null)) {
      if (deadlineTimestamp !== null) {
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
                    mid: tablerows[0].customer.mid,
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
                        mid: tablerows[0].customer.mid,
                        installemtnDay: days,
                        installemtnDate: dates,
                        gamisarani: gamisarani,
                        balance: itemNOI * itemAPI,
                        deadlineTimestamp: deadlineTimestamp,
                        selectedType: selectedType,
                        discount: totalDiscount === "" ? 0 : totalDiscount,
                        total:
                          subTotalFunc() -
                          (totalDiscount === "" ? 0 : totalDiscount),
                        status_of_payandgo: "onGoing",
                        // description: discription,
                        date: intialTimestamp,
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
                                address1:
                                  tablerows[0].customer.trustee2Address1,
                                address2:
                                  tablerows[0].customer.trustee2Address2,
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
                    mid: tablerows[0].customer.mid,
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
                        mid: tablerows[0].customer.mid,
                        installemtnDay: days,
                        installemtnDate: dates,
                        gamisarani: gamisarani,
                        balance: itemNOI * itemAPI,
                        deadlineTimestamp: deadlineTimestamp,
                        selectedType: selectedType,
                        discount: totalDiscount === "" ? 0 : totalDiscount,
                        total:
                          subTotalFunc() -
                          (totalDiscount === "" ? 0 : totalDiscount),
                        status_of_payandgo: "onGoing",
                        // description: discription,
                        date: intialTimestamp,
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
                                address1:
                                  tablerows[0].customer.trustee2Address1,
                                address2:
                                  tablerows[0].customer.trustee2Address2,
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
                mid: tablerows[0].customer.mid,
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
                    mid: tablerows[0].customer.mid,
                    installemtnDay: days,
                    installemtnDate: dates,
                    gamisarani: gamisarani,
                    balance: itemNOI * itemAPI,
                    deadlineTimestamp: deadlineTimestamp,
                    selectedType: selectedType,
                    discount: totalDiscount === "" ? 0 : totalDiscount,
                    total:
                      subTotalFunc() -
                      (totalDiscount === "" ? 0 : totalDiscount),
                    status_of_payandgo: "onGoing",
                    // description: discription,
                    date: intialTimestamp,
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
                mid: tablerows[0].customer.mid,
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
                    mid: tablerows[0].customer.mid,
                    installemtnDay: days,
                    installemtnDate: dates,
                    gamisarani: gamisarani,
                    balance: itemNOI * itemAPI,
                    deadlineTimestamp: deadlineTimestamp,
                    selectedType: selectedType,
                    discount: totalDiscount === "" ? 0 : totalDiscount,
                    total:
                      subTotalFunc() -
                      (totalDiscount === "" ? 0 : totalDiscount),
                    status_of_payandgo: "onGoing",
                    // description: discription,
                    date: intialTimestamp,
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
        }
      } else {
        NotificationManager.warning("Deadline date is not selected ! )");
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
        installemtnDay: null,
        installemtnDate: null,
        gamisarani: gamisarani,
        balance: 0,
        deadlineTimestamp: null,
        selectedType: selectedType,
        discount: totalDiscount === "" ? 0 : totalDiscount,
        total: subTotalFunc() - (totalDiscount === "" ? 0 : totalDiscount),
        status_of_payandgo: "Done",
        // description: discription,
        date: intialTimestamp,
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
          if (
            reGami.docs[0].data().currentDeposit -
              (subTotalFunc() - totalDiscount) <
            0
          ) {
            NotificationManager.warning(
              `Info gamisarani ${gamisaraniNic}, not enough balance for pay the total !`
            );
          }
        } else {
          setLoadingNicSubmit(false);
          NotificationManager.warning(
            "Any gamisarani customer not found from this NIC!"
          );
        }
      });
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
                          Balance(LKR)
                        </TableCell>
                        <TableCell align="right" colSpan={2}>
                          <CurrencyFormat
                            value={
                              tablerows.some(
                                (ob) => ob.paymentWay === "PayandGo"
                              )
                                ? itemNOI * itemAPI
                                : 0
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={" Rs. "}
                          />
                        </TableCell>
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
                <Grid className="txt_ip_setting" item xs={12} sm={7}>
                  Invoice Dates :
                </Grid>
                <Grid className="txt_ip_setting" item xs={12} sm={5}>
                  Choose Installment Repayment Plan:
                </Grid>
                <Grid className="txt_description" item xs={12} sm={2}>
                  Initial date
                  <br />
                  <div
                    hidden={
                      tablerows.some((ob) => ob.paymentWay === "PayandGo")
                        ? false
                        : true
                    }
                    className="deadline"
                  >
                    Installment deadline
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Space direction="vertical">
                    <DatePicker
                      onChange={(e) => {
                        setInititialTimestamp(
                          firebase.firestore.Timestamp.fromDate(e.toDate())
                        );
                      }}
                    />

                    <br />
                    <div
                      hidden={
                        tablerows.some((ob) => ob.paymentWay === "PayandGo")
                          ? false
                          : true
                      }
                    >
                      <DatePicker
                        onChange={(e) => {
                          setDeadlineTimestamp(
                            firebase.firestore.Timestamp.fromDate(e.toDate())
                          );
                        }}
                      />
                    </div>
                  </Space>
                </Grid>
                <Grid className="xxx" item xs={12} sm={1}></Grid>
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
                      if (e.target.value <= 31 || e.target.value < 0) {
                        setDates(e.target.value.trim());
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
                        setDays(e.target.value);
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
                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={12} sm={2}>
                  Select a type
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Space direction="vertical">
                    <FormControl variant="outlined" className="fcontrol">
                      <Select
                        className="roll_selector"
                        size="small"
                        native
                        onChange={handleChange}
                        value={selectedType}
                      >
                        <option onChange={handleChange} value={"shop"}>
                          shop
                        </option>
                        {allRoot.map((each) => (
                          <option
                            onChange={handleChange}
                            key={each}
                            value={each}
                          >
                            {each}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Space>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                  <hr />
                  <br />
                  <p className="gami_cust">Gamisarani Coustomers :</p>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>

                <Grid item xs={12} sm={2}>
                  Gamisarani
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Checkbox
                    checked={gamisarani}
                    onChange={(e) => {
                      if (gamisarani) {
                        setGamisarani(false);
                      } else {
                        setGamisarani(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid className="lbl_MI" item xs={12} sm={2}>
                  NIC
                </Grid>
                <Grid className="nIc" item xs={12} sm={3}>
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

                <Grid item xs={12} sm={1}>
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
                <Grid item xs={12} sm={6}></Grid>
                <Grid className="lbl_MI" item xs={12} sm={2}>
                  Amount
                </Grid>
                <Grid className="amouNt" item xs={12} sm={3}>
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
                      !gamisarani || gamisaraniInitialAmount === 0
                        ? true
                        : false
                    }
                    InputProps={{ inputProps: { min: 0 } }}
                    value={gamisaraniamount}
                    onChange={(e) => {
                      if (
                        gamisaraniInitialAmount >=
                        parseInt(e.target.value.trim())
                      ) {
                        setGamisaraniamount(parseInt(e.target.value.trim()));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={7}></Grid>
                <Grid item xs={12} sm={6}>
                  <hr />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="btn_addCustomer"
                    disabled={
                      loadingsubmit ||
                      tablerows.length === 0 ||
                      intialTimestamp === null
                        ? true
                        : false
                    }
                    onClick={showConfirm}
                    // onClick={printInvoice}
                    endIcon={<ArrowForwardIcon />}
                  >
                    {loadingsubmit ? <Spin size="large" /> : "Next"}
                  </Button>
                </Grid>
              </Grid>
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
