import React, { useState, useEffect } from "react";
import { Modal, Radio,Spin } from "antd";
import { PrinterFilled } from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import db, { storage } from "../../../../../config/firebase.js";
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
    value: "Day",
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
          if (doc.data().qty >= (value === "" ? 1 : value)) {
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
    confirm({
      title: <h5 className="confo_title">Do you Want to Print an Invoice?</h5>,
      icon: <PrinterFilled className="confo_icon" />,
<<<<<<< HEAD
      okText: "Yes",
      cancelText: "No",

      onOk() {
=======
      async onOk() {
       await invoiceIntoDb();
>>>>>>> f8d897f6696cb17ae95330361c966aa18d2d601b
        history.push("/showroom/invoice/printInvoice");
      },
      async onCancel() {
        await invoiceIntoDb();
         history.push("/showroom/itemTable");
      },
    });
  };

  const invoiceIntoDb = async () => {
    setLoadingSubmit(true);
    if (tablerows.some((ob) => ob.customer !== null)) {
      const uploadTask = await storage
        .ref(`images/${tablerows[0].customer.customerImageFile.name}`)
        .put(tablerows[0].customer.customerImageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // eslint-disable-next-line
          const progressRe = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          NotificationManager.warning(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(tablerows[0].customer.customerImageFile.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("customer")
                .add({
                  fname: tablerows[0].customer.customerFname,
                  lname: tablerows[0].customer.customerLname,
                  address1: tablerows[0].customer.customerAddress1,
                  address2: tablerows[0].customer.customerAddress2,
                  root: tablerows[0].customer.customerRootToHome,
                  nic: tablerows[0].customer.customerNic,
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
                      qty: itemQty[one.i],
                      paymentWay: one.paymentWay,
                      downpayment: itemDP[one.i],
                      noOfInstallment: itemNOI[one.i],
                      amountPerInstallment: itemAPI[one.i],
                      discount: itemDiscount[one.i],
                    };
                    arrayItems.push(objItem);
                  });

                  db.collection("invoice")
                    .add({
                      invoice_number: invoiceNumber,
                      items: arrayItems,
                      customer_id: cust.id,
                      installmentType: daysDate.value,
                      installemtnDayDate:
                        daysDate.value === "Day" ? days : dates,
                      discount: totalDiscount,
                      total: subTotalFunc() - totalDiscount,
                      status_of_payandgo: "Done",
                      description: discription,
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then((invDoc) => {
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
                      if (
                        tablerows[0].customer.trustee2Nic &&
                        tablerows[0].customer.trustee2Fname &&
                        tablerows[0].customer.trustee2Lname &&
                        tablerows[0].customer.trustee2Address1 &&
                        tablerows[0].customer.trustee2Mobile1
                      ) {
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
                      
                      tablerows.forEach(async(itemUDoc) => { 
                        await db.collection("item").doc(itemUDoc.id).update({
                          qty:itemQty[itemUDoc.i]
                        });
                      });
                       setLoadingSubmit(false);
                      
                    });
                });
            });
        }
      );
    } else {
      let arrayItems = [];

      tablerows.forEach((one) => {
        let objItem = {
          item_id: one.id,
          qty: itemQty[one.i],
          paymentWay: one.paymentWay,
          downpayment: itemDP[one.i],
          noOfInstallment: itemNOI[one.i],
          amountPerInstallment: itemAPI[one.i],
          discount: itemDiscount[one.i],
        };
        arrayItems.push(objItem);
      });

      await db.collection("invoice").add({
        invoice_number: invoiceNumber,
        items: arrayItems,
        customer_id: null,
        installmentType: null,
        installemtnDayDate: null,
        discount: totalDiscount,
        total: subTotalFunc() - totalDiscount,
        status_of_payandgo: "Done",
        description: discription,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      });
      
       tablerows.forEach(async(itemUDoc) => { 
                        await db.collection("item").doc(itemUDoc.id).update({
                          qty:itemQty[itemUDoc.i]
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
                  <TextField
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
                  />
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
                                  handleQTYChange(e, row.id, row);
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
                            {parseInt(itemDP[row.i] - itemDiscount[row.i]) *
                              itemQty[row.i]}
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
                                      history.push("/showroom/itemTable");
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
                          {subTotalFunc()}
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
                          {subTotalFunc() - totalDiscount}
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
                  <Radio.Group onChange={radioOnChange} value={daysDate.value}>
                    <Radio className="date" value={"Date"}>
                      Date
                    </Radio>

                    <br />
                    <Radio className="day" value={"Day"}>
                      Day
                    </Radio>
                  </Radio.Group>
                </Grid>
                <Grid className="radio_dayDate" item xs={12} sm={3}>
                  <TextField
                    className="txt_day"
                    variant="outlined"
                    size="small"
                    placeholder="date"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                    fullWidth
                    value={dates}
                    onChange={(e) => {
                      if (dates < 0 && dates <= 31) {
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
                      <option aria-label="None" value="" />
                      <option value={0}>Monday</option>
                      <option value={1}>Tuesday</option>
                      <option value={3}>Wednesday</option>
                      <option value={4}>Thursday</option>
                      <option value={5}>Friday</option>
                      <option value={6}>Saturday</option>
                      <option value={7}>Sunday</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="btn_addCustomer"
                disabled={loadingsubmit?true:false}
                onClick={showConfirm}
                // onClick={printInvoice}
                endIcon={<ArrowForwardIcon />}
              >
                {loadingsubmit? <Spin size="large" />:"Next"}
                
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
