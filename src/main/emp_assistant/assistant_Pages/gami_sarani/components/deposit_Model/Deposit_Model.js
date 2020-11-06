import React from "react";
import { TextField, Button } from "@material-ui/core";
import { DatePicker, Space } from "antd";
import CurrencyFormat from "react-currency-format";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "react-notifications/lib/notifications.css";

// style
import "./Deposit_Model.css";

export default function Deposit_Model() {
  return (
    <Container component="main" className="main_container_deposit">
      <Typography className="title_deposit" variant="h5" gutterBottom>
        Deposit
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_sarani" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              NIC Number :
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Member ID :
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
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
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Date :
            </Grid>
            <Grid item xs={12} sm={5}>
              <Space direction="vertical">
                <DatePicker />
              </Space>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Deposit Amount :
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="dAmount"
                name="dAmount"
                variant="outlined"
                required
                fullWidth
                id="dAmount"
                label="Deposit Amount"
                autoFocus
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="txt_LabelsDepo" item xs={12} sm={4}>
              Balance(LKR) :
            </Grid>
            <Grid item xs={12} sm={4}>
              <p className="lbl_blnce">
                {" "}
                <CurrencyFormat
                  value={"3500"}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_diposit"
              >
                Deposit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
