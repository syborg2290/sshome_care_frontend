import { Container, Grid, Typography } from "@material-ui/core";
import { Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import ModalImage from "react-modal-image";
import db from "../../../../../../../../../config/firebase.js";
// styles
import "./view_modal.css";

export default function View_Model({ items_list_props, data }) {
  const [trustees, setTrustees] = useState([]);
  const [customer, setCustomer] = useState({});
  const [itemsList, setItemList] = useState([]);

  useEffect(() => {
    db.collection("gas_customer")
      .doc(data.customer_id)
      .get()
      .then((getCust) => {
        setCustomer(getCust.data());
      });

    db.collection("gas_trustee")
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
      setItemList((old) => [
        ...old,
        {
          weight: each.weight,
          stock_type: data?.selectedType,
          price: each.price,
          discount: each.discount,
          qty: each.qty,
          withCylinder: each.withCylinder ? "Yes" : "No",
          gasType:each.gasType,
        },
      ]);
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
                  Type
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
                  Purchased date
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
                    className="imageFrontHis"
                    src={require("../../../../../../../../../assets/avatar1132.jpg")}
                  />
                ) : (
                  <ModalImage
                    className="imageFrontMod"
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
                    className="imageBackHis"
                    src={require("../../../../../../../../../assets/avater232.jpg")}
                  />
                ) : (
                  <ModalImage
                    className="imageBackMod"
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
                        className="imageFrontHis"
                        src={require("../../../../../../../../../assets/avatar1132.jpg")}
                      />
                    ) : (
                      <ModalImage
                        className="imageFrontMod"
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
                        className="imageBackHis"
                        src={require("../../../../../../../../../assets/avater232.jpg")}
                      />
                    ) : (
                      <ModalImage
                        className="imageBackMod"
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
              Gas details
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
              <hr className="hr_topiSub" />
              <br />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            {itemsList.map((eachItem) => {
              return (
                <Grid key={eachItem.weight} container spacing={2}>
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
                    With cylinder
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.withCylinder}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Weight(KG)
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.weight}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Price(LKR)
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <CurrencyFormat
                      value={eachItem.price}
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
                    Full or Empty
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem?.gasType === undefined ? '':eachItem?.gasType}</p>
                  </Grid>
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
