import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import { Spin } from "antd";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ModalImage from "react-modal-image";

import db from "../../../../../../../config/firebase.js";

// styles
import "./View_Model.css";

export default function View_Model({ items_list_props, data }) {
  const [trustees, setTrustees] = useState([]);
  const [customer, setCustomer] = useState({});
  const [itemsList, setItemList] = useState([]);

  useEffect(() => {
    db.collection("customer")
      .doc(data.customer_id)
      .get()
      .then((getCust) => {
        setCustomer(getCust.data());
      });

    db.collection("trustee")
      .where("invoice_number", "==", data.invoice_number)
      .get()
      .then((reTrustee) => {
        reTrustee.docs.forEach((reTr) => {
          if (
            reTr.data().fname &&
            reTr.data().lname &&
            reTr.data().nic &&
            reTr.data().address1 &&
            reTr.data().mobile1
          ) {
            setTrustees((old) => [
              ...old,
              {
                fname: reTr.data().fname,
                lname: reTr.data().lname,
                nic: reTr.data().nic,
                address: reTr.data().address1,
                mobile: reTr.data().mobile1,
                trusteeFrontURL: reTr.data().trusteeFrontURL,
                trusteeBackURL: reTr.data().trusteeBackURL,
              },
            ]);
          }
        });
      });

    items_list_props.forEach((each) => {
      let itemDataSeMo = [];
      let listOfSerilNo = [];
      let listOfModelNo = [];
      // let listOfChassisNo = [];
      listOfSerilNo = each.serialNo;
      listOfModelNo = each.modelNo;
      // listOfChassisNo = each.chassisNo;

      itemDataSeMo.push({
        serialNo: listOfSerilNo,
        modelNo: listOfModelNo,
        // chassisNo: listOfChassisNo,
      });
      db.collection("item")
        .doc(each.item_id)
        .get()
        .then((th) => {
          setItemList((old) => [
            ...old,
            {
              item_name: th.data().itemName,
              stock_type: each.stock_type,
              dp: each.downpayment,
              listSe: itemDataSeMo,
              discount: each.discount,
              qty: each.qty,
              color: th.data().color,
              model_no: each.modelNo,
              gurantee_type: th.data().guarantee,
              gurantee_period: th.data().guaranteePeriod,
            },
          ]);
        });
    });
  }, [items_list_props, data]);

  return (
    <Container component="main" className="conctainers_main">
      <Typography className="titls" variant="h5" gutterBottom>
        View Invoice
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      {itemsList.length === 0 ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : (
        <div className="paper">
          <form className="form" noValidate>
            <Grid container spacing={2}>
              <Grid className="contine" container spacing={2}>
                <Grid className="lbl_topis" item xs={12} sm={4}>
                  Installmanet Type
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={7}>
                  <p>{data.selectedType}</p>
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={4}>
                  Installmanet day
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={7}>
                  {parseInt(data.installemtnDay) === 1
                    ? "Monday"
                    : parseInt(data.installemtnDay) === 2
                    ? "Tuesday"
                    : parseInt(data.installemtnDay) === 3
                    ? "Wednesday"
                    : parseInt(data.installemtnDay) === 4
                    ? "Thursday"
                    : parseInt(data.installemtnDay) === 5
                    ? "Friday"
                    : parseInt(data.installemtnDay) === 6
                    ? "Saturday"
                    : parseInt(data.installemtnDay) === 0
                    ? "Sunday"
                    : ""}
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={4}>
                  Installmanet Date
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={7}>
                  {data.installemtnDate}
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={4}>
                  No of inastallments
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={7}>
                  {data.noOfInstallment}
                </Grid>

                <Grid className="lbl_topis" item xs={12} sm={4}>
                  Amount of installment(LKR)
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={7}>
                  {data.amountPerInstallment}
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={12}>
                  <hr />
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={5}>
                  Purchase date
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={6}>
                  {moment(data.date.toDate()).format("dddd, MMMM Do YYYY")}
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={5}>
                  Installment deadline
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={6}>
                  {moment(data.deadlineTimestamp.toDate()).format(
                    "dddd, MMMM Do YYYY"
                  )}
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={5}>
                  Gamisarani
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={6}>
                  {data.gamisarani ? "Yes" : "No"}
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={5}>
                  Gamisarani withdrawal Amount(LKR)
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CurrencyFormat
                    value={data.gamisarani_amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" "}
                  />
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={5}>
                  Downpayment Amount(LKR)
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CurrencyFormat
                    value={data.downpayment}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" "}
                  />
                </Grid>
              </Grid>
              <Grid className="lbl_topiSub" item xs={12} sm={12}>
                Customer
              </Grid>
              <Grid item xs={12} sm={6}>
                <hr className="hr_topiSub" />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                {customer.customerFrontURL === null ? (
                  <img
                    alt="Empty data"
                    className="imageFront"
                    src={require("../../../../../../../assets/avatar1132.jpg")}
                  />
                ) : (
                  <ModalImage
                    small={customer.customerFrontURL}
                    large={customer.customerFrontURL}
                    alt="Empty data"
                  />
                )}{" "}
              </Grid>
              <Grid item xs={12} sm={6}>
                {customer.customerBackURL === null ? (
                  <img
                    alt="Empty data"
                    className="imageBack"
                    src={require("../../../../../../../assets/avater232.jpg")}
                  />
                ) : (
                  <ModalImage
                    small={customer.customerBackURL}
                    large={customer.customerBackURL}
                    alt="Empty data"
                  />
                )}
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={3}>
                Full Name
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={3}>
                <p>
                  {customer.fname} {customer.lname}
                </p>
              </Grid>
              <Grid item xs={12} sm={3}>
                <p></p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={3}>
                MID
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={8}>
                <p>{customer.mid}</p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={3}>
                NIC
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={8}>
                <p>{customer.nic}</p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={3}>
                Address
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={8}>
                <p>{customer.address1}</p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={3}>
                Tele.
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={8}>
                <p>{customer.mobile1}</p>
              </Grid>
              <Grid className="lbl_topiSub" item xs={12} sm={12}>
                Trustees Details
              </Grid>
              <Grid item xs={12} sm={6}>
                <hr className="hr_topiSub" />
                <br />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            {trustees.map((si) => {
              return (
                <Grid
                  key={si.fname.toString() + si.lname.toString()}
                  container
                  spacing={2}
                >
                  <Grid item xs={12} sm={6}>
                    {si.trusteeFrontURL === null ? (
                      <img
                        alt="Empty data"
                        className="imageFront"
                        src={require("../../../../../../../assets/avatar1132.jpg")}
                      />
                    ) : (
                      <ModalImage
                        small={si.trusteeFrontURL}
                        large={si.trusteeFrontURL}
                        alt="Empty data"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {si.trusteeBackURL === null ? (
                      <img
                        alt="Empty data"
                        className="imageBack"
                        src={require("../../../../../../../assets/avater232.jpg")}
                      />
                    ) : (
                      <ModalImage
                        small={si.trusteeBackURL}
                        large={si.trusteeBackURL}
                        alt="Empty data"
                      />
                    )}
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={3}>
                    Full Name
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <p>
                      {si.fname} {si.lname}
                    </p>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <p></p>
                  </Grid>

                  <Grid className="lbl_topis" item xs={12} sm={3}>
                    NIC
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <p>{si.nic}</p>
                  </Grid>

                  <Grid className="lbl_topis" item xs={12} sm={3}>
                    Address
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <p>{si.address}</p>
                  </Grid>

                  <Grid className="lbl_topis" item xs={12} sm={3}>
                    Tele.
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <p>{si.mobile}</p>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <hr />
                    <br />
                  </Grid>
                </Grid>
              );
            })}
            <Grid className="lbl_topiSub" item xs={12} sm={12}>
              Item
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
              <hr className="hr_topiSub" />
              <br />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            {itemsList.map((eachItem) => {
              return (
                <Grid key={eachItem.item_name} container spacing={2}>
                  {" "}
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Stock type
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.stock_type}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Item Name
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.item_name}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Sale price(LKR)
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <CurrencyFormat
                      value={eachItem.dp}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Discount(LKR)
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <CurrencyFormat
                      value={eachItem.discount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Qty
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.qty}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Color
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.color}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Guarantee Period
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>
                      {eachItem.gurantee_period.toString() +
                        " " +
                        eachItem.gurantee_type.value.toString()}
                    </p>
                  </Grid>
                  <TableContainer
                    component={Paper}
                    className="main_containerNom"
                  >
                    <Table
                      className="gass_Table"
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead className="No_Table_head">
                        <TableRow>
                          <TableCell className="tbl_cell">SerialNo</TableCell>
                          <TableCell className="tbl_cell" align="left">
                            ModelNo
                          </TableCell>
                          {/* <TableCell className="tbl_cell" align="left">
                            ChasisseNo
                          </TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {eachItem.listSe.length > 0
                          ? eachItem?.listSe?.map((row) => (
                              <TableRow key={0}>
                                <TableCell component="th" scope="row">
                                  {eachItem.listSe[0]?.serialNo?.map(
                                    (serailNoT) => (
                                      <h5 key={serailNoT}>{serailNoT}</h5>
                                    )
                                  )}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {eachItem.listSe[0]?.modelNo?.map(
                                    (modelNoT) => (
                                      <h5 key={Math.random()}>{modelNoT}</h5>
                                    )
                                  )}
                                </TableCell>
                                {/* <TableCell component="th" scope="row">
                                  {eachItem.listSe[0]?.chassisNo?.map(
                                    (chassisNoT) => (
                                      <h5 key={chassisNoT}>{chassisNoT}</h5>
                                    )
                                  )}
                                </TableCell> */}
                              </TableRow>
                            ))
                          : ""}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid item xs={12} sm={12}>
                    <hr />
                  </Grid>
                </Grid>
              );
            })}
          </form>
        </div>
      )}
    </Container>
  );
}
