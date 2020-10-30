import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import { Spin } from "antd";

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
              },
            ]);
          }
        });
      });

    items_list_props.forEach((each) => {
      db.collection("item")
        .doc(each.item_id)
        .get()
        .then((th) => {
          setItemList((old) => [
            ...old,
            {
              item_name: th.data().itemName,
              dp: each.downpayment,
              discount: each.discount,
              qty: each.qty,
              color: th.data().color,
              model_no: th.data().modelNo,
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
                <Grid className="lbl_topis" item xs={12} sm={3}>
                  Installmanet Type
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={8}>
                  <p>{data.installmentType}</p>
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={3}>
                  Installmanet (day/Date)
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={8}>
                  {data.installmentType === "Weekly"
                    ? parseInt(data.installemtnDayDate) === 1
                      ? "Monday"
                      : parseInt(data.installemtnDayDate) === 2
                      ? "Tuesday"
                      : parseInt(data.installemtnDayDate) === 3
                      ? "Wednesday"
                      : parseInt(data.installemtnDayDate) === 4
                      ? "Thursday"
                      : parseInt(data.installemtnDayDate) === 5
                      ? "Friday"
                      : parseInt(data.installemtnDayDate) === 6
                      ? "Saturday"
                      : parseInt(data.installemtnDayDate) === 0
                      ? "Sunday"
                      : ""
                    : data.installemtnDayDate}
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={3}>
                  Qty
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={8}>
                  <p>{items_list_props.length}</p>
                </Grid>
                <Grid className="lbl_topis" item xs={12} sm={3}>
                  Total Discount
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={8}>
                  <p>0</p>
                </Grid>
              </Grid>
              <Grid className="lbl_topiSub" item xs={12} sm={12}>
                Customer
              </Grid>
              <Grid item xs={12} sm={6}>
                <hr className="hr_topiSub" />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
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
                Trustee
              </Grid>
              <Grid item xs={12} sm={6}>
                <hr className="hr_topiSub" />
                <br />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            {trustees.map((si) => {
              return (
                <Grid key={si.fname.toString() + "33333"} container spacing={2}>
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
                    Item Name
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.item_name}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Basic Payment(LKR)
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
                    Model No.
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.model_no}</p>
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
                </Grid>
              );
            })}
          </form>
        </div>
      )}
    </Container>
  );
}
