import React, { useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
// styles
import "./View_Model.css";

export default function View_Model() {
  const dataList = [
    {
      fname: "Jilat",
      lname: "Kasun",
      nic: "232323454v",
      address: "No.156 kurudugaha hatahakma Galle",
      mobile: "07838689",
    },
    {
      fname: "Jilat",
      lname: "Kasun",
      nic: "232323454v",
      address: "No.156 kurudugaha hatahakma Galle",
      mobile: "07838689",
    },
  ];

  return (
    <Container component="main" className="conctainers_main">
      <Typography className="titls" variant="h5" gutterBottom>
        View Invoice
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
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
                <p>Day</p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={3}>
                Installmanet (day/Date)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={8}>
                Wednesday
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={3}>
                Qty
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={8}>
                <p>2</p>
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
              <p>D.G. Janith</p>
            </Grid>
            <Grid item xs={12} sm={5}>
              <p>Kavishka</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={3}>
              NIC
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>98746534256v</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={3}>
              Address
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>No.53 Kurunduwatta China FriendShip Village Galle</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={3}>
              Tele.
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>0766175353</p>
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
          {dataList.map((si) => {
            return (
              <Grid container spacing={2}>
                <Grid className="lbl_topis" item xs={12} sm={3}>
                  Full Name
                </Grid>
                <Grid item xs={12} sm={1}>
                  :
                </Grid>
                <Grid item xs={12} sm={3}>
                  <p>{si.fname}</p>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <p>{si.lname}</p>
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

          <Grid container spacing={2}>
            <Grid className="lbl_topiSub" item xs={12} sm={12}>
              Item
            </Grid>
            <Grid item xs={12} sm={6}>
              <hr className="hr_topiSub" />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid className="lbl_topis" item xs={12} sm={4}>
              Item Name
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>Gass Cooker</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={4}>
              Down Payment(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <CurrencyFormat
                value={5000}
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
                value={600}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={4}>
              Color
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>Black</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={4}>
              Model No.
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>934-UER</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={4}>
              Guarantee Period
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>10 Years</p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
