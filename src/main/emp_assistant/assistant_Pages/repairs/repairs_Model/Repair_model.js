import React from "react";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

// styles
import "./Repair_model.css";

export default function Repair_model() {
  const { confirm } = Modal;
  let history = useHistory();

  const showConfirm = () => {
    confirm({
      title: "Do you Want to ptint a Receipt?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        console.log("yes");
        history.push("/assistant/repair/repairRecipt");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Add New Repair
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
              Model No
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="modelno"
                variant="outlined"
                required
                fullWidth
                label="Model No"
                size="small"
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Reason
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="ino"
                variant="outlined"
                required
                multiline
                rowsMax={5}
                fullWidth
                label="Reason"
                size="small"
              />
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
