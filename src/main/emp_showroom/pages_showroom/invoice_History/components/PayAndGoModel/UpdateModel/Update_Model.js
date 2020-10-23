import React from "react";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

// styles
import "./Update_Model.css";

export default function Update_Model() {
  const { confirm } = Modal;

  let history = useHistory();

  const showConfirm = () => {
    confirm({
      title: "Do you Want to Print a Recipt?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        history.push(
          "/showroom/invoice_history/payAndGo/updateModel/PrintReceipt"
        );
      },
      onCancel() {
        console.log("No");
      },
    });
  };

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
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                autoComplete="amount"
                variant="outlined"
                required
                fullWidth
                label="Amount"
                size="small"
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Updating Installment Count
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                variant="outlined"
                required
                fullWidth
                label="Count"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
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
              Payed Amount(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <CurrencyFormat
                value={2000}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
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
                type="number"
                autoComplete="delayed"
                InputProps={{ inputProps: { min: 0 } }}
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
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Total(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <CurrencyFormat
                value={3500}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={showConfirm}
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
