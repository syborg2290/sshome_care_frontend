import React, { useState } from "react";
import { Modal, DatePicker, Space } from "antd";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Select,
   FormControl,
     InputLabel,
} from "@material-ui/core";
import { Spin } from "antd";
// styles
import "./Salary_Advance.css";

export default function Salary_Advance() {
   const [amount, setAmount] = useState("");
  
    return (
        <Container component="main" className="conctainefr_main">
          <Typography className="titleffs" variant="h5" gutterBottom>
               Salary Advance
          </Typography>
             <Grid item xs={12} sm={12}>
            <hr className="titl_hr" />
            </Grid>
            <div className="paper">
            <form className="form" noValidate>
            <Grid container spacing={2}>
               <Grid className="lbl_topi" item xs={12} sm={4}>
           Amount(LKR)
          </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="bsly"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Target Amount"
                size="small"
                 InputProps={{ inputProps: { min: 0 } }}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              </Grid>
          <Grid className="lbl_topi" item xs={12} sm={4}>
          Balance(LKR)
          </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
             <p>1234.00</p>
              </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
             Date
           </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
             <Space direction="vertical">
              <DatePicker />
            </Space>
            </Grid>
        
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
    )
}