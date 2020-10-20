import React, { useState, useEffect } from "react";
import { Modal, Radio } from "antd";
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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import db from "../../../../../config/firebase.js";
import "./Make_invoice.css";
// icon
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

function Make_invoice() {
  const location = useLocation();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [tablerows, setTableRows] = useState([]);
  const [itemQty, setItemQty] = useState({});
  const [itemDP, setItemDP] = useState({});
  const [itemNOI, setItemNOI] = useState({});
  const [itemAPI, setItemAPI] = useState({});
  const [itemDiscount, setItemDiscount] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discription, setDiscription] = useState("");
  const [days, setDays] = useState("");
  const [dates, setDates] = useState("");
  const [daysDate, setDaysDate] = useState({
    value: "Day",
  });
  const radioOnChange = (e) => {
    setDaysDate({
      value: e.target.value,
    });
  };

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

  // const printInvoice = () => {
  //   history.push("/showroom/invoice/printInvoice");
  // };

  const showConfirm = () => {
    confirm({
      title: <h5 className="confo_title">Do you Want to Print an Invoice?</h5>,
      icon: <PrinterFilled className="confo_icon" />,
      okText: "Yes",
      cancelText: "No",

      onOk() {
        history.push("/showroom/invoice/printInvoice");
      },
      onCancel() {},
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
                                    // eslint-disable-next-line
                                    let index = tablerows.findIndex(
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
                    InputProps={{ inputProps: { min: 0, max: 31 } }}
                    fullWidth
                    value={days}
                    onChange={(e) => {
                      setDays(e.target.value.trim());
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
                      value={dates}
                      onChange={(e) => {
                        setDates(e.target.value.trim());
                      }}
                      native
                      variant="outlined"
                      label="Age"
                      inputProps={{
                        name: "age",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={10}>Monday</option>
                      <option value={20}>Tuesday</option>
                      <option value={30}>Wednesday</option>
                      <option value={30}>Thursday</option>
                      <option value={30}>Friday</option>
                      <option value={30}>Saturday</option>
                      <option value={30}>Sunday</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="btn_addCustomer"
                onClick={showConfirm}
                // onClick={printInvoice}
                endIcon={<ArrowForwardIcon />}
              >
                Next
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
