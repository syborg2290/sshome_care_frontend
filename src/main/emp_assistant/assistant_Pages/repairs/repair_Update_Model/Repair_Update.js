import React from "react";
import { Radio } from "antd";
import { Grid, Container, Typography, Button } from "@material-ui/core";

// styles
import "./Repair_Update.css";

export default function Repair_Update() {
  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Update Repair Item
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
              Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>2020.09.27</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">Accepted</Radio.Button>
                <Radio.Button value="b">Return</Radio.Button>
                <Radio.Button value="c">Issued</Radio.Button>
                <Radio.Button value="d">Deliverd</Radio.Button>
              </Radio.Group>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                // onClick={showConfirm}
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
