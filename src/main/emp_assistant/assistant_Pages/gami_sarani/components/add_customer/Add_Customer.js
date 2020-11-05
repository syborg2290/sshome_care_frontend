import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import "react-notifications/lib/notifications.css";

// styles
import "./Add_Customer.css";

export default function Add_Customer() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Container component="main" className="main_container_sarani">
      <Typography className="title_sarani" variant="h5" gutterBottom>
        Add Customer
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_sarani" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              NIC Number :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="nic"
                name="nic"
                variant="outlined"
                required
                fullWidth
                id="nic"
                label="NIC"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Member ID :
            </Grid>
            <Grid className="txt_Note" item xs={12} sm={3}>
              <TextField
                className="txtt_mid"
                autoComplete="mid"
                name="mid"
                variant="outlined"
                required
                fullWidth
                id="mid"
                label="Member ID"
                autoFocus
                size="small"
              />
            </Grid>

            <br />
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Primary Contact :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_fname"
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_lname"
                autoComplete="lname"
                name="lname"
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                autoFocus
                size="small"
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1:
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                className="txtt_addrs1"
                autoComplete="addrs1"
                name="addrs1"
                variant="outlined"
                required
                fullWidth
                id="addrs1"
                label="Address 1"
                autoFocus
                size="small"
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 2 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                className="txtt_addrs2"
                autoComplete="addrs2"
                name="addrs2"
                variant="outlined"
                required
                fullWidth
                id="addrs2"
                label="Address 2"
                autoFocus
                size="small"
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              Mobile :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_mobile1"
                autoComplete="mobile1"
                name="mobile1"
                variant="outlined"
                required
                fullWidth
                id="mobile1"
                label="Mobile 1"
                autoFocus
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_mobile2"
                autoComplete="mobile2"
                name="mobile2"
                variant="outlined"
                required
                fullWidth
                id="mobile2"
                label="Mobile 2"
                autoFocus
                size="small"
                type="number"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Root to Home :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txt_rHome"
                autoComplete="rHome"
                name="rHome"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                id="rHome"
                label="Root to Home"
                size="small"
              />
            </Grid>
            <Grid className="txt_LabelsImg" item xs={12} sm={1}>
              Image :
            </Grid>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                // disabled={
                //   nic.length === 0 || !isValidatedCustomerNic ? true : false
                // }
                accept="image/*"
                name=""
                onChange={onImageChange}
                className="image"
                id="item_image"
                hidden
              />
              <img
                // disabled={
                //   nic.length === 0 || !isValidatedCustomerNic ? true : false
                // }
                alt="Item upload"
                onClick={() => {
                  document.getElementById("item_image").click();
                }}
                src={
                  imageUrl == null
                    ? require("../../../../../../assets/avatar.png")
                    : imageUrl
                }
                className="image"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_addCust"
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
