import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
// styles
import "./Update_Model.css";

export default function Update_Model() {
  return (
    <Container component="main" className="container_main">
      <Typography className="titles" variant="h5" gutterBottom>
        Update Installment
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titles_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              Invoice No
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                autoComplete="nic"
                variant="outlined"
                required
                fullWidth
                label="NIC"
                size="small"
              />
            </Grid>
            <Grid className="txt_Note" item xs={12} sm={7}>
              # Press Enter key after filled the NIC
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
