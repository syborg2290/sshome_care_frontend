import React, { useState } from "react";
import { DatePicker, Space, Spin } from "antd";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

// styles
import "./Update_Loan_Model.css";

export default function Update_Loan_Model() {

    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const onChange = (date, dateString) => {
    setDate(dateString);
  };

    return (
        <Container component="main" className="conctainefr_main">
            <Typography className="titleffs" variant="h5" gutterBottom>
             Pay Loan
        </Typography>
            <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
            </Grid>
         <div className="paper">
          <form className="form" noValidate>
           <Grid container spacing={2}>
           <Grid className="lbl_topi" item xs={12} sm={3}>
                 Amount(LKR)
        </Grid>
        <Grid item xs={12} sm={1}>
         :
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
                autoComplete="amount"
                variant="outlined"
                required
                fullWidth
                label="Amount"
                size="small"
                  value={amount}
                  type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              </Grid>
            <Grid item xs={12} sm={3}></Grid>
             <Grid className="lbl_topi" item xs={12} sm={3}>
            Date
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={5}>
               <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
                </Grid>
              <Grid item xs={12} sm={3}></Grid>
                     </Grid>
                       <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                // onClick={btnUpdate}
               
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
