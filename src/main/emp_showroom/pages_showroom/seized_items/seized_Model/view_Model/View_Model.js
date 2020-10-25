import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

// styles
import "./View_Model.css";

export default function View_Model() {
  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        View Seized Item
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Invoice No
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>4637-4FK</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Seized Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>2020.09.27</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_Subtopic" item xs={12} sm={12}>
              Customer
            </Grid>
            <Grid item xs={12} sm={6}>
              <hr className="hr_Subtopic" />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Full Name
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={2}>
              <p>janith</p>
            </Grid>
            <Grid item xs={12} sm={4}>
              <p>kavishka</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              NIC
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>9835445627v</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Address
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Galle Rd.</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>0766254141</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_Subtopic" item xs={12} sm={12}>
              Trustee
            </Grid>
            <Grid item xs={12} sm={6}>
              <hr className="hr_Subtopic" />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Full Name
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={2}>
              <p>janith</p>
            </Grid>
            <Grid item xs={12} sm={4}>
              <p>kavishka</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              NIC
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>9835445627v</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Address
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Galle Rd.</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>0766254141</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={7}>
              Paid Installment Total(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid class="totls" item xs={12} sm={3}>
              <p>1600</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={7}>
              Down Payment(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid class="totls" item xs={12} sm={3}>
              <p>100</p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
