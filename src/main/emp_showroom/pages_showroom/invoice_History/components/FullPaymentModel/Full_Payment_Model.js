import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

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
            <Grid className="lbl_topis" item xs={12} sm={3}>
              Item Name
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Gass Cooker</p>
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={3}>
              Sale Price(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>50000.00</p>
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={3}>
              Qty
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>3</p>
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={3}>
              Color
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>Black</p>
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={3}>
              Model No.
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>934-UER</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={3}>
              Guarantee Period
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>10 Years</p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
