import React from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { DatePicker, Space } from "antd";

// styles
import "./Add_Model.css";

export default function Add_Model() {
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Add Seized Item
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
              <TextField
                autoComplete="ino"
                variant="outlined"
                required
                fullWidth
                label="Invoice No"
                size="small"
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Seized Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className="btn_add"
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
