import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";

export default function Full_Payment_Model() {
  return (
    <Container component="main" className="conctainers_main">
      <Typography className="titls" variant="h5" gutterBottom>
        View Full Payment Invoice
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
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
              Basic Payment(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <CurrencyFormat
                value={5700}
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
                value={4500}
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
              <p>3</p>
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
