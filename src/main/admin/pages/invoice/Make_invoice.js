import React, { useState, useEffect } from "react";
import { Modal, Spin, DatePicker, Space, Checkbox, Radio } from "antd";
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
  Card,
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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

// components
// import AddSerialNumber from "./components/Add_Serial_Number";

function Make_invoice() {
  const location = useLocation();
  const [allRoot, setAllRoot] = useState([]);
  const [loadingsubmit, setLoadingSubmit] = useState(false);
  const [loadingNicsubmit, setLoadingNicSubmit] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [tablerows, setTableRows] = useState([]);
  const [itemQty, setItemQty] = useState({});
  const [itemDP, setItemDP] = useState({});
  const [itemNOI, setItemNOI] = useState(0);
  const [itemAPI, setItemAPI] = useState(0);
  const [balance, setBalance] = useState(0);
  const [shortage, setShortage] = useState(0);
  const [dpayment, setDpayment] = useState(0);
  const [itemDiscount, setItemDiscount] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [gamisaraniInitialAmount, setGamisaraniInitialAmount] = useState(0);
  const [gamisaraniamount, setGamisaraniamount] = useState(0);
  const [gamisaraniId, setGamisaraniId] = useState("");
  const [gamisaraniNic, setGamisaraniNic] = useState("");
  const [days, setDays] = useState(new Date().getDay());
  const [dates, setDates] = useState(new Date().getDate());
  const [selectedType, setSelectedType] = useState("shop");
  const [gamisarani, setGamisarani] = useState(false);
  const [intialTimestamp, setInititialTimestamp] = useState(null);
  const [deadlineTimestamp, setDeadlineTimestamp] = useState(null);
  const [isFullPayment, setIsFullPayment] = useState(false);
  const [documentCharges, setDocumentCharges] = useState(0);
  const [visibleSerial, setVisibleSerial] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState("new");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [inputsSerialNo, setInputsSerialNo] = useState({});

  let history = useHistory();
  let history2 = useHistory();
  const { confirm } = Modal;

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const showModal = () => {
    setVisibleSerial(true);
  };

  const addInput = () => {
    setInputsSerialNo({
      [currentIndex]: {
        ...inputsSerialNo[currentIndex],
        [inputsSerialNo[currentIndex] === undefined
          ? 0
          : Object.keys(inputsSerialNo[currentIndex]).length]: "",
      },
    });
  };
  const handleChangeAddSerialInputs = (e) => {
    setInputsSerialNo({
      [currentIndex]: {
        ...inputsSerialNo[currentIndex],
        [e.target.id]: e.target.value,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history2.push("/connection_lost");
    });

    window.addEventListener(
      "popstate",
      (event) => {
        if (event.state) {
          history.push("/admin/ui/MakeInvoiceTable");
        }
      },
      false
    );

    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );

    setInvoiceNumber("IN-" + Math.floor(Math.random() * 1000000000 + 1));

    if (location.state != null) {
      var tableData = [];
      var keepDataQTY = {};
      var keepDataDP = {};
      var keepDataDiscount = {};
      location.state.detail.forEach((obj) => {
        keepDataQTY[obj.i] = obj.qty;
        keepDataDP[obj.i] = obj.item.salePrice;
        keepDataDiscount[obj.i] = obj.item.discount;
        tableData.push(obj);
        if (obj.paymentWay === "PayandGo") {
          setIsFullPayment(false);
        } else {
          setIsFullPayment(true);
        }
      });
      setItemDiscount(keepDataDiscount);
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
    let gamiam = gamisaraniamount === "" ? 0 : parseInt(gamisaraniamount);
    let fTotoS = subTotalValue - gamiam <= 0 ? 0 : subTotalValue - gamiam;
    return fTotoS;
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
    if (!isFullPayment) {
      if (deadlineTimestamp !== null) {
        if (balance === 0) {
          NotificationManager.warning("Balance amount is required ! )");
        } else {
          if (itemAPI === 0) {
            NotificationManager.warning(
              "Amount per installment amount is required ! )"
            );
          } else {
            if (itemNOI === 0) {
              NotificationManager.warning("No of installment is required ! )");
            } else {
              if (dpayment === 0) {
                NotificationManager.warning(
                  "Downpayment amount is required ! )"
                );
              } else {
                seFunc();
              }
            }
          }
        }
      } else {
        NotificationManager.warning("Deadline date is not selected ! )");
      }
    } else {
      seFunc();
    }
  };

  const seFunc = () => {
    if (subTotalFunc() - totalDiscount < 0) {
      NotificationManager.warning(
        "Issue with your calculations Pleace check again (May be Included minus values ! )"
      );
    } else {
      if (
        gamisarani &&
        (parseInt(gamisaraniamount) === "" ? 0 : parseInt(gamisaraniamount)) > 0
      ) {
        db.collection("gami_sarani")
          .doc(gamisaraniId)
          .get()
          .then((getRe) => {
            let toto1 =
              gamisaraniamount === "" ? 0 : parseInt(gamisaraniamount);
            let totoF = getRe.data().currentDeposit - toto1;
            db.collection("gami_sarani")
              .doc(gamisaraniId)
              .update({
                currentDeposit: totoF <= 0 ? 0 : totoF,
              })
              .then((re) => {
                let toto =
                  gamisaraniamount === "" ? 0 : parseInt(gamisaraniamount);
                db.collection("gami_sarani_withdrawhistory").add({
                  gami_nic: gamisaraniNic,
                  docId: gamisaraniId,
                  withdraw: toto,
                  balance: getRe.data().currentDeposit - toto,
                  date: intialTimestamp,
                });

                confirm({
                  title: (
                    <h5 className="confo_title">
                      Do you Want to Print an Invoice ?
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
                        downpayment: itemDP[one.i] === "" ? 0 : itemDP[one.i],
                        discount:
                          itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
                      };
                      arrayPassingItems.push(objItem);
                    });

                    if (tablerows.some((ob) => ob.customer !== null)) {
                      let passingWithCustomerObj = {
                        invoice_number: invoiceNumber,
                        customerDetails: tablerows[0].customer,
                        installemtnDay: days,
                        installemtnDate: dates === "" ? 1 : dates,
                        discount: totalDiscount,
                        subTotal: subTotalFunc(),
                        paymentWay: isFullPayment ? "FullPayment" : "PayandGo",
                        downpayment: dpayment,
                        noOfInstallment: itemNOI,
                        amountPerInstallment: itemAPI,
                        balance: balance,
                        total: subTotalFunc() - totalDiscount,
                        // discription: discription,
                        itemsList: arrayPassingItems,
                        backto: "item_list",
                      };

                      let moveWith = {
                        pathname: "/admin/invoice/printInvoice",
                        search: "?query=abc",
                        state: { detail: passingWithCustomerObj },
                      };
                      await invoiceIntoDb().then((_) => {
                        history.push(moveWith);
                      });
                    } else {
                      let passingWithoutCustomerObj = {
                        invoice_number: invoiceNumber,
                        customerDetails: null,
                        installmentType: null,
                        installemtnDayDate: null,
                        discount: totalDiscount,
                        subTotal: subTotalFunc(),
                        paymentWay: isFullPayment ? "FullPayment" : "PayandGo",
                        downpayment: dpayment,
                        noOfInstallment: itemNOI,
                        amountPerInstallment: itemAPI,
                        balance: balance,
                        total: subTotalFunc() - totalDiscount,
                        // discription: discription,
                        itemsList: arrayPassingItems,
                        backto: "item_list",
                      };
                      let moveWith = {
                        pathname: "/admin/invoice/printInvoice",
                        search: "?query=abc",
                        state: { detail: passingWithoutCustomerObj },
                      };
                      await invoiceIntoDb().then((_) => {
                        history.push(moveWith);
                      });
                    }
                  },
                  async onCancel() {
                    await invoiceIntoDb().then((_) => {
                      history.push("/admin/ui/MakeInvoiceTable");
                    });
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
                downpayment: itemDP[one.i] === "" ? 0 : itemDP[one.i],
                discount: itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
              };
              arrayPassingItems.push(objItem);
            });

            if (tablerows.some((ob) => ob.customer !== null)) {
              let passingWithCustomerObj = {
                invoice_number: invoiceNumber,
                customerDetails: tablerows[0].customer,
                installemtnDay: days,
                installemtnDate: dates === "" ? 1 : dates,
                discount: totalDiscount,
                subTotal: subTotalFunc(),
                paymentWay: isFullPayment ? "FullPayment" : "PayandGo",
                downpayment: dpayment,
                noOfInstallment: itemNOI,
                amountPerInstallment: itemAPI,
                balance: balance,
                total: subTotalFunc() - totalDiscount,
                // discription: discription,
                itemsList: arrayPassingItems,
                backto: "item_list",
              };

              let moveWith = {
                pathname: "/admin/invoice/printInvoice",
                search: "?query=abc",
                state: { detail: passingWithCustomerObj },
              };
              await invoiceIntoDb().then((_) => {
                history.push(moveWith);
              });
            } else {
              let passingWithoutCustomerObj = {
                invoice_number: invoiceNumber,
                customerDetails: null,
                installmentType: null,
                installemtnDayDate: null,
                discount: totalDiscount,
                subTotal: subTotalFunc(),
                paymentWay: isFullPayment ? "FullPayment" : "PayandGo",
                downpayment: dpayment,
                noOfInstallment: itemNOI,
                amountPerInstallment: itemAPI,
                balance: balance,
                total: subTotalFunc() - totalDiscount,
                // discription: discription,
                itemsList: arrayPassingItems,
                backto: "item_list",
              };
              let moveWith = {
                pathname: "/admin/invoice/printInvoice",
                search: "?query=abc",
                state: { detail: passingWithoutCustomerObj },
              };
              await invoiceIntoDb().then((_) => {
                history.push(moveWith);
              });
            }
          },
          async onCancel() {
            await invoiceIntoDb().then((_) => {
              history.push("/admin/ui/MakeInvoiceTable");
            });
          },
        });
      }
    }
  };

  // eslint-disable-next-line
  const invoiceIntoDb = async () => {
    setLoadingSubmit(true);
    var times = new Date(
      new Date(intialTimestamp?.seconds * 1000).setMonth(
        new Date(intialTimestamp?.seconds * 1000).getMonth() + 1
      )
    );

    if (tablerows.some((ob) => ob.customer !== null)) {
      if (deadlineTimestamp !== null) {
        let randomNumber = Math.floor(Math.random() * 1000000000) + 1000;
        //customerImageUrlFront
        if (tablerows[0].customer.customerImageFileFront !== null) {
          await storage
            .ref(
              `images/${tablerows[0].customer.customerImageFileFront.name}${randomNumber}`
            )
            .put(tablerows[0].customer.customerImageFileFront);
        }

        //customerImageUrlBack
        if (tablerows[0].customer.customerImageFile2Back !== null) {
          await storage
            .ref(
              `images/${tablerows[0].customer.customerImageFile2Back.name}${randomNumber}`
            )
            .put(tablerows[0].customer.customerImageFile2Back);
        }

        //trustee1ImageUrlFront
        if (tablerows[0].customer.trustee1ImageFile1Front !== null) {
          await storage
            .ref(
              `images/${tablerows[0].customer.trustee1ImageFile1Front.name}${randomNumber}`
            )
            .put(tablerows[0].customer.trustee1ImageFile1Front);
        }

        //trustee1ImageUrlBack
        if (tablerows[0].customer.trustee1ImageFile2Back !== null) {
          await storage
            .ref(
              `images/${tablerows[0].customer.trustee1ImageFile2Back.name}${randomNumber}`
            )
            .put(tablerows[0].customer.trustee1ImageFile2Back);
        }

        //trustee2ImageUrlFront
        if (tablerows[0].customer.trustee2ImageFile1Front !== null) {
          await storage
            .ref(
              `images/${tablerows[0].customer.trustee2ImageFile1Front.name}${randomNumber}`
            )
            .put(tablerows[0].customer.trustee2ImageFile1Front);
        }

        //trustee2ImageUrlBack
        if (tablerows[0].customer.trustee2ImageFile1Front !== null) {
          await storage
            .ref(
              `images/${tablerows[0].customer.trustee2ImageFile2Back.name}${randomNumber}`
            )
            .put(tablerows[0].customer.trustee2ImageFile2Back);
        }

        storage
          .ref("images")
          .child(
            tablerows[0].customer.customerImageFileFront.name + randomNumber
          )
          .getDownloadURL()
          .then(async (customerImageURLFront) => {
            storage
              .ref("images")
              .child(
                tablerows[0].customer.customerImageFile2Back.name + randomNumber
              )
              .getDownloadURL()
              .then(async (customerImageURLBack) => {
                storage
                  .ref("images")
                  .child(
                    tablerows[0].customer.trustee1ImageFile1Front.name +
                      randomNumber
                  )
                  .getDownloadURL()
                  .then(async (trustee1ImageURLFront) => {
                    storage
                      .ref("images")
                      .child(
                        tablerows[0].customer.trustee1ImageFile2Back.name +
                          randomNumber
                      )
                      .getDownloadURL()
                      .then(async (trustee1ImageURLBack) => {
                        storage
                          .ref("images")
                          .child(
                            tablerows[0].customer.trustee2ImageFile1Front.name +
                              randomNumber
                          )
                          .getDownloadURL()
                          .then(async (trustee2ImageURLFront) => {
                            storage
                              .ref("images")
                              .child(
                                tablerows[0].customer.trustee2ImageFile2Back
                                  .name + randomNumber
                              )
                              .getDownloadURL()
                              .then(async (trustee2ImageURLBack) => {
                                //+++++++++++++++++++++++++++++++++++

                                if (tablerows[0].customer.customerId !== null) {
                                  let prevCust = await db
                                    .collection("customer")
                                    .doc(tablerows[0].customer.customerId)
                                    .get();
                                  db.collection("customer")
                                    .doc(tablerows[0].customer.customerId)
                                    .update({
                                      fname:
                                        tablerows[0].customer.customerFname,
                                      lname:
                                        tablerows[0].customer.customerLname,
                                      address1:
                                        tablerows[0].customer.customerAddress1,
                                      address2:
                                        tablerows[0].customer.customerAddress2,
                                      root:
                                        tablerows[0].customer
                                          .customerRootToHome,
                                      nic: tablerows[0].customer.customerNic,
                                      mid: prevCust.data().mid,
                                      relations_nics:
                                        tablerows[0].customer
                                          .customerRelatedNics,
                                      mobile1:
                                        tablerows[0].customer.customerMobile1,
                                      mobile2:
                                        tablerows[0].customer.customerMobile2,
                                      customerFrontURL: customerImageURLFront,
                                      customerBackURL: customerImageURLBack,
                                    })
                                    .then((_) => {
                                      let arrayItems = [];

                                      tablerows.forEach((one) => {
                                        let listOfSerilNo = [];
                                        let listOfModelNo = [];
                                        let listOfChassisNo = [];
                                        for (
                                          var n = 0;
                                          n < parseInt(itemQty[one.i]);
                                          n++
                                        ) {
                                          listOfSerilNo.push(one.serialNo[n]);
                                          listOfModelNo.push(one.modelNo[n]);
                                        }
                                        if (
                                          listOfSerilNo.length ===
                                          parseInt(itemQty[one.i])
                                        ) {
                                          let objItem = {
                                            item_id: one.id,
                                            serialNo: listOfSerilNo,
                                            modelNo: listOfModelNo,
                                            chassisNo: listOfChassisNo,
                                            downpayment:
                                              itemDP[one.i] === ""
                                                ? 0
                                                : parseInt(itemDP[one.i]),
                                            qty: parseInt(itemQty[one.i]),
                                            discount:
                                              itemDiscount[one.i] === ""
                                                ? 0
                                                : itemDiscount[one.i],
                                            item_name: one.title,
                                            stock_type:
                                              tablerows[0].item.stock_type,
                                          };
                                          arrayItems.push(objItem);
                                        }
                                      });

                                      db.collection("selling_history").add({
                                        invoice_number: invoiceNumber,
                                        items: arrayItems,
                                        paymentWay: isFullPayment
                                          ? "FullPayment"
                                          : "PayandGo",
                                        selectedType: selectedType,
                                        total:
                                          subTotalFunc() -
                                          (totalDiscount === ""
                                            ? 0
                                            : totalDiscount),

                                        date: intialTimestamp,
                                      });

                                      db.collection("invoice")
                                        .add({
                                          invoice_number: invoiceNumber,
                                          items: arrayItems,
                                          customer_id:
                                            tablerows[0].customer.customerId,
                                          nic:
                                            tablerows[0].customer.customerNic,
                                          mid: tablerows[0].customer.mid,
                                          installemtnDay: days,
                                          installemtnDate:
                                            dates === "" ? 1 : dates,
                                          gamisarani: gamisarani,
                                          gamisarani_amount:
                                            gamisaraniamount === ""
                                              ? 0
                                              : parseInt(gamisaraniamount),
                                          paymentWay: isFullPayment
                                            ? "FullPayment"
                                            : "PayandGo",
                                          downpayment: dpayment,
                                          noOfInstallment: itemNOI,
                                          amountPerInstallment: itemAPI,
                                          balance: balance,
                                          deadlineTimestamp: deadlineTimestamp,
                                          selectedType: selectedType,
                                          discount:
                                            totalDiscount === ""
                                              ? 0
                                              : totalDiscount,
                                          shortage:
                                            shortage === "" ? 0 : shortage,
                                          total:
                                            subTotalFunc() -
                                            (totalDiscount === ""
                                              ? 0
                                              : totalDiscount),
                                          status_of_payandgo: "onGoing",
                                          date: intialTimestamp,
                                          document_charges: documentCharges,
                                          nextDate: firebase.firestore.Timestamp.fromDate(
                                            times
                                          ),
                                        })
                                        .then((_) => {
                                          db.collection("trustee").add({
                                            fname:
                                              tablerows[0].customer
                                                .trustee1Fname,
                                            lname:
                                              tablerows[0].customer
                                                .trustee1Lname,
                                            nic:
                                              tablerows[0].customer.trustee1Nic,
                                            address1:
                                              tablerows[0].customer
                                                .trustee1Address1,
                                            address2:
                                              tablerows[0].customer
                                                .trustee1Address2,
                                            mobile1:
                                              tablerows[0].customer
                                                .trustee1Mobile1,
                                            mobile2:
                                              tablerows[0].customer
                                                .trustee1Mobile2,
                                            invoice_number: invoiceNumber,
                                            trusteeFrontURL: trustee1ImageURLFront,
                                            trusteeBackURL: trustee1ImageURLBack,
                                            date: firebase.firestore.FieldValue.serverTimestamp(),
                                          });

                                          if (
                                            tablerows[0].customer.trustee2Nic &&
                                            tablerows[0].customer
                                              .trustee2Fname &&
                                            tablerows[0].customer
                                              .trustee2Lname &&
                                            tablerows[0].customer
                                              .trustee2Address1 &&
                                            tablerows[0].customer
                                              .trustee2Mobile1
                                          ) {
                                            db.collection("trustee").add({
                                              fname:
                                                tablerows[0].customer
                                                  .trustee2Fname,
                                              lname:
                                                tablerows[0].customer
                                                  .trustee2Lname,
                                              nic:
                                                tablerows[0].customer
                                                  .trustee2Nic,
                                              address1:
                                                tablerows[0].customer
                                                  .trustee2Address1,
                                              address2:
                                                tablerows[0].customer
                                                  .trustee2Address2,
                                              mobile1:
                                                tablerows[0].customer
                                                  .trustee2Mobile1,
                                              mobile2:
                                                tablerows[0].customer
                                                  .trustee2Mobile2,
                                              invoice_number: invoiceNumber,
                                              trusteeFrontURL: trustee2ImageURLFront,
                                              trusteeBackURL: trustee2ImageURLBack,
                                              date: firebase.firestore.FieldValue.serverTimestamp(),
                                            });
                                          }

                                          tablerows.forEach(
                                            async (itemUDoc) => {
                                              let newArray = await await db
                                                .collection("item")
                                                .doc(itemUDoc.id)
                                                .get();

                                              let serialNoList = [];
                                              let modelNoList = [];
                                              let chassisiNoList = [];
                                              serialNoList = newArray.data()
                                                .serialNo;
                                              modelNoList = newArray.data()
                                                .modelNo;
                                              chassisiNoList = newArray.data()
                                                .chassisNo;

                                              //++++++++++++++++++++++++++++++++++++++++++++
                                              let countOfExist = 0;
                                              if (
                                                inputsSerialNo[itemUDoc.i] !==
                                                undefined
                                              ) {
                                                for (
                                                  let q = 0;
                                                  q <
                                                  Object.keys(
                                                    inputsSerialNo[itemUDoc.i]
                                                  ).length;
                                                  q++
                                                ) {
                                                  if (
                                                    serialNoList.indexOf(
                                                      inputsSerialNo[
                                                        itemUDoc.i
                                                      ][q]
                                                    ) !== -1
                                                  ) {
                                                    countOfExist++;
                                                    let indexVal = serialNoList.indexOf(
                                                      inputsSerialNo[
                                                        itemUDoc.i
                                                      ][q]
                                                    );
                                                    serialNoList.splice(
                                                      indexVal,
                                                      1
                                                    );
                                                  } else {
                                                    console.log(
                                                      "Value does not exists!"
                                                    );
                                                  }
                                                }
                                              }

                                              let spliceCount =
                                                itemQty[itemUDoc.i] -
                                                countOfExist;

                                              if (spliceCount > 0) {
                                                serialNoList.splice(
                                                  0,
                                                  spliceCount
                                                );
                                              }

                                              modelNoList.splice(
                                                0,
                                                itemQty[itemUDoc.i]
                                              );

                                              //++++++++++++++++++++++++++++++++++++++++++++

                                              if (invoiceStatus === "new") {
                                                await db
                                                  .collection("item")
                                                  .doc(itemUDoc.id)
                                                  .update({
                                                    qty:
                                                      Math.round(
                                                        newArray.data().qty
                                                      ) - itemQty[itemUDoc.i],
                                                    serialNo: serialNoList,
                                                    modelNo: modelNoList,
                                                    chassisNo: chassisiNoList,
                                                  });
                                              }
                                            }
                                          );

                                          setLoadingSubmit(false);
                                        });
                                    });
                                } else {
                                  db.collection("customer")
                                    .add({
                                      fname:
                                        tablerows[0].customer.customerFname,
                                      lname:
                                        tablerows[0].customer.customerLname,
                                      address1:
                                        tablerows[0].customer.customerAddress1,
                                      address2:
                                        tablerows[0].customer.customerAddress2,
                                      root:
                                        tablerows[0].customer
                                          .customerRootToHome,
                                      nic: tablerows[0].customer.customerNic,
                                      mid: tablerows[0].customer.mid,
                                      relations_nics:
                                        tablerows[0].customer
                                          .customerRelatedNics,
                                      mobile1:
                                        tablerows[0].customer.customerMobile1,
                                      mobile2:
                                        tablerows[0].customer.customerMobile2,

                                      customerFrontURL: customerImageURLFront,
                                      customerBackURL: customerImageURLBack,
                                      status: "normal",
                                      date: firebase.firestore.FieldValue.serverTimestamp(),
                                    })
                                    .then((cust) => {
                                      let arrayItems = [];

                                      tablerows.forEach((one) => {
                                        let listOfSerilNo = [];
                                        let listOfModelNo = [];
                                        let listOfChassisNo = [];
                                        for (
                                          var n = 0;
                                          n < parseInt(itemQty[one.i]);
                                          n++
                                        ) {
                                          listOfSerilNo.push(one.serialNo[n]);
                                          listOfModelNo.push(one.modelNo[n]);
                                          // listOfChassisNo.push(
                                          //   one.chassisNo[n]
                                          // );
                                        }
                                        if (
                                          listOfSerilNo.length ===
                                          parseInt(itemQty[one.i])
                                        ) {
                                          let objItem = {
                                            item_id: one.id,
                                            serialNo: listOfSerilNo,
                                            modelNo: listOfModelNo,
                                            chassisNo: listOfChassisNo,
                                            downpayment:
                                              itemDP[one.i] === ""
                                                ? 0
                                                : parseInt(itemDP[one.i]),
                                            qty: parseInt(itemQty[one.i]),
                                            discount:
                                              itemDiscount[one.i] === ""
                                                ? 0
                                                : itemDiscount[one.i],
                                            item_name: one.title,
                                            stock_type:
                                              tablerows[0].item.stock_type,
                                          };
                                          arrayItems.push(objItem);
                                        }
                                      });

                                      db.collection("selling_history").add({
                                        invoice_number: invoiceNumber,
                                        items: arrayItems,
                                        paymentWay: isFullPayment
                                          ? "FullPayment"
                                          : "PayandGo",

                                        selectedType: selectedType,
                                        total:
                                          subTotalFunc() -
                                          (totalDiscount === ""
                                            ? 0
                                            : totalDiscount),

                                        date: intialTimestamp,
                                      });

                                      db.collection("invoice")
                                        .add({
                                          invoice_number: invoiceNumber,
                                          items: arrayItems,
                                          customer_id: cust.id,
                                          nic:
                                            tablerows[0].customer.customerNic,
                                          mid: tablerows[0].customer.mid,
                                          installemtnDay: days,
                                          installemtnDate:
                                            dates === "" ? 1 : dates,
                                          gamisarani: gamisarani,
                                          gamisarani_amount:
                                            gamisaraniamount === ""
                                              ? 0
                                              : parseInt(gamisaraniamount),
                                          paymentWay: isFullPayment
                                            ? "FullPayment"
                                            : "PayandGo",
                                          downpayment: dpayment,
                                          noOfInstallment: itemNOI,
                                          amountPerInstallment: itemAPI,
                                          balance: balance,
                                          deadlineTimestamp: deadlineTimestamp,
                                          selectedType: selectedType,
                                          discount:
                                            totalDiscount === ""
                                              ? 0
                                              : totalDiscount,
                                          shortage:
                                            shortage === "" ? 0 : shortage,
                                          total:
                                            subTotalFunc() -
                                            (totalDiscount === ""
                                              ? 0
                                              : totalDiscount),
                                          status_of_payandgo: "onGoing",
                                          date: intialTimestamp,
                                          document_charges: documentCharges,
                                          nextDate: firebase.firestore.Timestamp.fromDate(
                                            times
                                          ),
                                        })
                                        .then((_) => {
                                          db.collection("trustee").add({
                                            fname:
                                              tablerows[0].customer
                                                .trustee1Fname,
                                            lname:
                                              tablerows[0].customer
                                                .trustee1Lname,
                                            nic:
                                              tablerows[0].customer.trustee1Nic,
                                            address1:
                                              tablerows[0].customer
                                                .trustee1Address1,
                                            address2:
                                              tablerows[0].customer
                                                .trustee1Address2,
                                            mobile1:
                                              tablerows[0].customer
                                                .trustee1Mobile1,
                                            mobile2:
                                              tablerows[0].customer
                                                .trustee1Mobile2,
                                            invoice_number: invoiceNumber,
                                            trustee1FrontURL: trustee1ImageURLFront,
                                            trustee1BackURL: trustee1ImageURLBack,
                                            date: firebase.firestore.FieldValue.serverTimestamp(),
                                          });

                                          if (
                                            tablerows[0].customer.trustee2Nic &&
                                            tablerows[0].customer
                                              .trustee2Fname &&
                                            tablerows[0].customer
                                              .trustee2Lname &&
                                            tablerows[0].customer
                                              .trustee2Address1 &&
                                            tablerows[0].customer
                                              .trustee2Mobile1
                                          ) {
                                            db.collection("trustee").add({
                                              fname:
                                                tablerows[0].customer
                                                  .trustee2Fname,
                                              lname:
                                                tablerows[0].customer
                                                  .trustee2Lname,
                                              nic:
                                                tablerows[0].customer
                                                  .trustee2Nic,
                                              address1:
                                                tablerows[0].customer
                                                  .trustee2Address1,
                                              address2:
                                                tablerows[0].customer
                                                  .trustee2Address2,
                                              mobile1:
                                                tablerows[0].customer
                                                  .trustee2Mobile1,
                                              mobile2:
                                                tablerows[0].customer
                                                  .trustee2Mobile2,
                                              invoice_number: invoiceNumber,
                                              trustee2FrontURL: trustee2ImageURLFront,
                                              trustee2BackURL: trustee2ImageURLBack,
                                              date: firebase.firestore.FieldValue.serverTimestamp(),
                                            });
                                          }

                                          tablerows.forEach(
                                            async (itemUDoc) => {
                                              let newArray = await await db
                                                .collection("item")
                                                .doc(itemUDoc.id)
                                                .get();

                                              let serialNoList = [];
                                              let modelNoList = [];
                                              let chassisiNoList = [];
                                              serialNoList = newArray.data()
                                                .serialNo;
                                              modelNoList = newArray.data()
                                                .modelNo;
                                              chassisiNoList = newArray.data()
                                                .chassisNo;

                                              //++++++++++++++++++++++++++++++++++++++++++++
                                              let countOfExist = 0;
                                              if (
                                                inputsSerialNo[itemUDoc.i] !==
                                                undefined
                                              ) {
                                                for (
                                                  let q = 0;
                                                  q <
                                                  Object.keys(
                                                    inputsSerialNo[itemUDoc.i]
                                                  ).length;
                                                  q++
                                                ) {
                                                  if (
                                                    serialNoList.indexOf(
                                                      inputsSerialNo[
                                                        itemUDoc.i
                                                      ][q]
                                                    ) !== -1
                                                  ) {
                                                    countOfExist++;
                                                    let indexVal = serialNoList.indexOf(
                                                      inputsSerialNo[
                                                        itemUDoc.i
                                                      ][q]
                                                    );
                                                    serialNoList.splice(
                                                      indexVal,
                                                      1
                                                    );
                                                  } else {
                                                    console.log(
                                                      "Value does not exists!"
                                                    );
                                                  }
                                                }
                                              }

                                              let spliceCount =
                                                itemQty[itemUDoc.i] -
                                                countOfExist;

                                              if (spliceCount > 0) {
                                                serialNoList.splice(
                                                  0,
                                                  spliceCount
                                                );
                                              }

                                              modelNoList.splice(
                                                0,
                                                itemQty[itemUDoc.i]
                                              );

                                              //++++++++++++++++++++++++++++++++++++++++++++

                                              if (invoiceStatus === "new") {
                                                await db
                                                  .collection("item")
                                                  .doc(itemUDoc.id)
                                                  .update({
                                                    qty:
                                                      Math.round(
                                                        newArray.data().qty
                                                      ) - itemQty[itemUDoc.i],
                                                    serialNo: serialNoList,
                                                    modelNo: modelNoList,
                                                    chassisNo: chassisiNoList,
                                                  });
                                              }
                                            }
                                          );

                                          setLoadingSubmit(false);
                                        });
                                    });
                                }

                                //+++++++++++++++++++++++++++++++++++
                              });
                          });
                      });
                  });
              });
          });
      } else {
        NotificationManager.warning("Deadline date is not selected ! )");
      }
    } else {
      let arrayItems = [];

      tablerows.forEach((one) => {
        let listOfSerilNo = [];
        let listOfModelNo = [];
        let listOfChassisNo = [];
        for (var n = 0; n < parseInt(itemQty[one.i]); n++) {
          listOfSerilNo.push(one.serialNo[n]);
          listOfModelNo.push(one.modelNo[n]);
          // listOfChassisNo.push(one.chassisNo[n]);
        }
        if (listOfSerilNo.length === parseInt(itemQty[one.i])) {
          let objItem = {
            item_id: one.id,
            serialNo: listOfSerilNo,
            modelNo: listOfModelNo,
            chassisNo: listOfChassisNo,
            downpayment: itemDP[one.i] === "" ? 0 : parseInt(itemDP[one.i]),
            qty: parseInt(itemQty[one.i]),
            discount: itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
            item_name: one.title,
            stock_type: tablerows[0].item.stock_type,
          };
          arrayItems.push(objItem);
        }
      });

      db.collection("selling_history").add({
        invoice_number: invoiceNumber,
        items: arrayItems,
        paymentWay: isFullPayment ? "FullPayment" : "PayandGo",
        selectedType: selectedType,
        total: subTotalFunc() - (totalDiscount === "" ? 0 : totalDiscount),
        date: intialTimestamp,
      });

      await db.collection("invoice").add({
        invoice_number: invoiceNumber,
        items: arrayItems,
        customer_id: null,
        installemtnDay: null,
        installemtnDate: null,
        gamisarani: gamisarani,
        gamisarani_amount:
          gamisaraniamount === "" ? 0 : parseInt(gamisaraniamount),
        paymentWay: isFullPayment ? "FullPayment" : "PayandGo",
        downpayment: dpayment,
        noOfInstallment: itemNOI,
        amountPerInstallment: itemAPI,
        balance: balance,
        deadlineTimestamp: null,
        selectedType: selectedType,
        discount: totalDiscount === "" ? 0 : totalDiscount,
        shortage: shortage === "" ? 0 : shortage,
        total: subTotalFunc() - (totalDiscount === "" ? 0 : totalDiscount),
        status_of_payandgo: "Done",
        // description: discription,
        date: intialTimestamp,
        document_charges: documentCharges,
        nextDate: null,
      });

      tablerows.forEach(async (itemUDoc) => {
        let newArray = await await db.collection("item").doc(itemUDoc.id).get();

        let serialNoList = [];
        let modelNoList = [];
        let chassisiNoList = [];
        serialNoList = newArray.data().serialNo;
        modelNoList = newArray.data().modelNo;
        chassisiNoList = newArray.data().chassisNo;

        //++++++++++++++++++++++++++++++++++++++++++++
        let countOfExist = 0;
        if (inputsSerialNo[itemUDoc.i] !== undefined) {
          for (
            let q = 0;
            q < Object.keys(inputsSerialNo[itemUDoc.i]).length;
            q++
          ) {
            if (serialNoList.indexOf(inputsSerialNo[itemUDoc.i][q]) !== -1) {
              countOfExist++;
              let indexVal = serialNoList.indexOf(
                inputsSerialNo[itemUDoc.i][q]
              );
              serialNoList.splice(indexVal, 1);
            } else {
              console.log("Value does not exists!");
            }
          }
        }

        let spliceCount = itemQty[itemUDoc.i] - countOfExist;

        if (spliceCount > 0) {
          serialNoList.splice(0, spliceCount);
        }

        modelNoList.splice(0, itemQty[itemUDoc.i]);

        //++++++++++++++++++++++++++++++++++++++++++++

        if (invoiceStatus === "new") {
          await db
            .collection("item")
            .doc(itemUDoc.id)
            .update({
              qty: Math.round(newArray.data().qty) - itemQty[itemUDoc.i],
              serialNo: serialNoList,
              modelNo: modelNoList,
              chassisNo: chassisiNoList,
            });
        }
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
      {/*Start Serial Number Model */}

      <Modal
        visible={visibleSerial}
        footer={null}
        className="serialNumberMod"
        onCancel={() => {
          setVisibleSerial(false);
        }}
      >
        <div>
          <div>
            <div>
              <Container component="main" className="main_container_root">
                <Typography className="title_root" variant="h5" gutterBottom>
                  Add Serial Numbers
                </Typography>
                <Grid item xs={12} sm={2}>
                  <hr className="titles_hr_root" />
                </Grid>
                <div className="paper_root">
                  <form className="form_root" noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <div>
                          <Button className="reltion_add" onClick={addInput}>
                            Add Numbers
                            <PlusOutlined className="reltion_addIcon" />
                          </Button>
                          {inputsSerialNo[currentIndex] === undefined
                            ? null
                            : Object.keys(inputsSerialNo[currentIndex]).map(
                                (i) => (
                                  <div key={i + 1}>
                                    <TextField
                                      key={i + 2}
                                      id={i.toString()}
                                      className="txt_serials"
                                      autoComplete="serial"
                                      name="serial"
                                      variant="outlined"
                                      label="Serial Numbers"
                                      onChange={handleChangeAddSerialInputs}
                                      size="small"
                                    />

                                    {i >=
                                    Object.keys(inputsSerialNo[currentIndex])
                                      .length -
                                      1 ? (
                                      <MinusCircleOutlined
                                        key={i + 3}
                                        className="rmov_iconss"
                                        onClick={() => {
                                          delete inputsSerialNo[currentIndex][
                                            i
                                          ];
                                          setInputsSerialNo({
                                            ...inputsSerialNo,
                                          });
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                )
                              )}
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </Modal>

      {/* End Serial Number Model  */}

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
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          Qty
                        </TableCell>
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          Serial Number
                        </TableCell>
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          Sale Price(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Discount(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Sum(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell_Ac" align="right">
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
                                  handleQTYChange(e, row.id, row);
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <AddCircleOutlineIcon
                              onClick={() => {
                                setCurrentIndex(row.i);
                                showModal();
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
                              value={itemDP[row.i]}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setItemDP({
                                    ...itemDP,
                                    [row.i]: e.target.value,
                                  });
                                }
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
                                if (e.target.value !== "") {
                                  if (e.target.value < itemDP[row.i]) {
                                    setItemDiscount({
                                      ...itemDiscount,
                                      [row.i]: e.target.value,
                                    });
                                  }
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
                                      history.push("/admin/ui/ItemTable");
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
                        <TableCell align="right" colSpan={4}>
                          Subtotal(LKR)
                        </TableCell>
                        <TableCell align="right" colSpan={1}>
                          <CurrencyFormat
                            value={subTotalFunc()}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={" Rs. "}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right" colSpan={4}>
                          Discount(LKR)
                        </TableCell>
                        <TableCell className="cel" align="right" colSpan={1}>
                          <TextField
                            className="txt_distg"
                            variant="outlined"
                            size="small"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            fullWidth
                            disabled={true}
                            value={totalDiscount}
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                if (e.target.value < subTotalFunc()) {
                                  setTotalDiscount(e.target.value);
                                }
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="right" colSpan={4}>
                          Total(LKR)
                        </TableCell>
                        <TableCell align="right" colSpan={1}>
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

              {/* //     */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card className="gami_card">
                    <Grid className="gami_card-grid" container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <p className="gami_cust">
                          Choose Installment Repayment Plan:
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={4}></Grid>
                      <Grid className="lbl_MI" item xs={12} sm={6}>
                        NO. of Installments:
                      </Grid>
                      <Grid className="noi" item xs={12} sm={4}>
                        <TextField
                          className="txt_dpayment"
                          variant="outlined"
                          size="small"
                          InputProps={{ inputProps: { min: 0 } }}
                          type="number"
                          fullWidth
                          label="NOI"
                          disabled={
                            tablerows.some((ob) => ob.paymentWay === "PayandGo")
                              ? false
                              : true
                          }
                          value={itemNOI}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setItemNOI(parseInt(e.target.value.trim()));
                              setBalance(
                                parseInt(e.target.value.trim()) * itemAPI
                              );
                            }
                          }}
                        />
                      </Grid>
                      <Grid className="noi" item xs={12} sm={2}></Grid>
                      <Grid className="lbl_MI" item xs={12} sm={6}>
                        Amount per Installments(LKR):
                      </Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        <TextField
                          className="txt_dpayment"
                          variant="outlined"
                          size="small"
                          InputProps={{ inputProps: { min: 0 } }}
                          type="number"
                          label=" API"
                          fullWidth
                          disabled={
                            tablerows.some((ob) => ob.paymentWay === "PayandGo")
                              ? false
                              : true
                          }
                          value={itemAPI}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setItemAPI(parseInt(e.target.value.trim()));
                              setBalance(
                                parseInt(e.target.value.trim()) * itemNOI
                              );
                            }
                          }}
                        />
                      </Grid>
                      <Grid className="noi" item xs={12} sm={2}></Grid>

                      <Grid className="lbl_MI" item xs={12} sm={6}>
                        Down Payment(LKR):
                      </Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        <TextField
                          className="txt_dpayment"
                          variant="outlined"
                          size="small"
                          label="Down Payment"
                          InputProps={{ inputProps: { min: 0 } }}
                          type="number"
                          fullWidth
                          value={dpayment}
                          disabled={
                            tablerows.some((ob) => ob.paymentWay === "PayandGo")
                              ? false
                              : true
                          }
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setDpayment(parseInt(e.target.value.trim()));
                            }
                          }}
                        />
                      </Grid>
                      <Grid className="noi" item xs={12} sm={2}></Grid>

                      <Grid className="lbl_MI" item xs={12} sm={6}>
                        Balance(LKR):
                      </Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        <TextField
                          className="txt_dpayment"
                          variant="outlined"
                          size="small"
                          label="Balance"
                          InputProps={{ inputProps: { min: 0 } }}
                          type="number"
                          fullWidth
                          disabled={
                            tablerows.some((ob) => ob.paymentWay === "PayandGo")
                              ? false
                              : true
                          }
                          value={balance}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setBalance(parseInt(e.target.value.trim()));
                            }
                          }}
                        />
                      </Grid>
                      <Grid className="noi" item xs={12} sm={2}></Grid>
                      <Grid className="lbl_MI" item xs={12} sm={6}>
                        Shortage(LKR):
                      </Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        <TextField
                          className="txt_dpayment"
                          disabled={true}
                          variant="outlined"
                          size="small"
                          label="Shortage"
                          InputProps={{ inputProps: { min: 0 } }}
                          type="number"
                          fullWidth
                          value={shortage}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setShortage(parseInt(e.target.value.trim()));
                            }
                          }}
                        />
                      </Grid>
                      <Grid className="noi" item xs={12} sm={2}></Grid>
                      <Grid className="lbl_MI" item xs={12} sm={6}>
                        Document Charges(LKR):
                      </Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        <TextField
                          type="number"
                          autoComplete="delayed"
                          variant="outlined"
                          required
                          fullWidth
                          label=" Document Charges"
                          size="small"
                          value={documentCharges}
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setDocumentCharges(
                                parseInt(e.target.value.trim())
                              );
                            }
                          }}
                        />
                      </Grid>
                      <Grid className="noi" item xs={12} sm={2}></Grid>
                      <Grid className="noi" item xs={12} sm={12}>
                        <hr />
                      </Grid>

                      <Grid className="lbl_MI" item xs={12} sm={3}>
                        Date :
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          className="txt_dpayment"
                          variant="outlined"
                          size="small"
                          disabled={
                            // tablerows.some((ob) => ob.paymentWay === "PayandGo")
                            //   ? false
                            //   : true
                            true
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
                      </Grid>
                      <Grid item xs={12} sm={5}></Grid>

                      <Grid className="lbl_MI" item xs={12} sm={3}>
                        Day
                      </Grid>
                      <Grid className="radio_dayDate" item xs={12} sm={4}>
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
                              // tablerows.some(
                              //   (ob) => ob.paymentWay === "PayandGo"
                              // )
                              //   ? false
                              //   : true
                              true
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
                      <Grid item xs={12} sm={5}></Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card className="gami_card">
                    <Grid className="gami_card-grid" container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <p className="gami_cust">Gamisarani Customers :</p>
                      </Grid>
                      <Grid item xs={12} sm={6}></Grid>
                      <Grid item xs={12} sm={4}>
                        Gamisarani
                      </Grid>
                      <Grid item xs={12} sm={4}>
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
                      <Grid item xs={12} sm={4}></Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        NIC
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
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        Amount
                      </Grid>
                      <Grid className="amouNt" item xs={12} sm={4}>
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
                              setGamisaraniamount(
                                parseInt(e.target.value.trim())
                              );
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}></Grid>
                    </Grid>
                  </Card>

                  <br />

                  <Grid container spacing={2}>
                    <Grid className="txt_ip_setting" item xs={12} sm={7}>
                      Invoice Status :
                    </Grid>
                    <Grid className="txt_ip_setting" item xs={12} sm={5}></Grid>
                    <Grid className="lbl_MI" item xs={12} sm={4}>
                      Invoice Status
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Radio.Group
                        defaultValue="new"
                        buttonStyle="solid"
                        onChange={(e) => {
                          setInvoiceStatus(e.target.value);
                        }}
                      >
                        <Radio.Button value="new">New record</Radio.Button>
                        <Radio.Button value="old">Old record</Radio.Button>
                      </Radio.Group>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <br />
                    </Grid>
                    <Grid className="lbl_MI" item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid className="txt_ip_setting" item xs={12} sm={12}>
                      <hr />
                    </Grid>
                    <Grid className="txt_ip_setting" item xs={12} sm={7}>
                      Invoice Dates :
                    </Grid>
                    <Grid className="txt_ip_setting" item xs={12} sm={5}></Grid>

                    <Grid className="txt_description" item xs={12} sm={4}>
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
                            if (e !== null) {
                              setInititialTimestamp(
                                firebase.firestore.Timestamp.fromDate(
                                  e.toDate()
                                )
                              );
                              setDates(
                                new Date(
                                  firebase.firestore.Timestamp.fromDate(
                                    e.toDate()
                                  )?.seconds * 1000
                                ).getDate()
                              );
                              setDays(
                                new Date(
                                  firebase.firestore.Timestamp.fromDate(
                                    e.toDate()
                                  )?.seconds * 1000
                                ).getDay()
                              );
                            } else {
                              setInititialTimestamp(null);
                              setDates(new Date().getDate());
                              setDays(new Date().getDay());
                            }
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
                              if (e !== null) {
                                setDeadlineTimestamp(
                                  firebase.firestore.Timestamp.fromDate(
                                    e.toDate()
                                  )
                                );
                              } else {
                                setDeadlineTimestamp(null);
                              }
                            }}
                          />
                        </div>
                      </Space>
                    </Grid>
                    <Grid className="xxx" item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4}>
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
                    <Grid item xs={12} sm={4}></Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* //     */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="btn_addCustomer"
                    disabled={
                      loadingsubmit ||
                      itemDP.length === 0 ||
                      tablerows.length === 0 ||
                      intialTimestamp === null
                        ? true
                        : false
                    }
                    onClick={showConfirm}
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
