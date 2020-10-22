import React from "react";
import {
  TextField,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
// styles
import "./Update_Model.css";

export default function Update_Model() {
  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Update Installment
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
              <p>8548-UYE</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Amount of Installment(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nic"
                variant="outlined"
                required
                fullWidth
                label="Amount"
                size="small"
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Due Installment Count
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>2</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Balance(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>50000.00</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>2020.06.07</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Delayed Charges(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nic"
                variant="outlined"
                required
                fullWidth
                label="Delayed"
                size="small"
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Delayed Days
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>14 Days Delayd</p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
