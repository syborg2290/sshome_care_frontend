import React from 'react';
import {Grid, Container, Typography} from '@material-ui/core';
import firebase from 'firebase';
import moment from 'moment';

// styles
import './Repair_View.css';

export default function Repair_View({
  description,
  cust_Name,
  mobile_1,
  mobile_2,
  serial_no,
}) {
  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        View Repairing Item
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Serial No
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {serial_no}
              </p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Customer Name
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {cust_Name}
              </p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {mobile_1}
              </p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={6} />
            <Grid item xs={12} sm={6}>
              <p>
                {mobile_2 === '' ? ' - ' : mobile_2}
              </p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {' '}{moment(
                  firebase.firestore.FieldValue.serverTimestamp()
                ).format('dddd, MMMM Do YYYY')}
              </p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Description
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {description}
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
