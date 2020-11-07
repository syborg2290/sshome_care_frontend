import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Spin } from "antd";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import { nicValidation } from "../../../../../../config/validation.js";
import "react-notifications/lib/notifications.css";

// styles
import "./Add_Employee.css";

export default function Add_Employee() {
  const [nic, setNic] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [addres1, setAddres1] = useState("");
  const [addres2, setAddres2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [roll, setRoll] = useState("");
  const [basic, setBasic] = useState("");
  // eslint-disable-next-line
  const [validation, setValidation] = useState("");
  // eslint-disable-next-line
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  return (
    <Container component="main" className="main_container_employee">
      <Typography className="title_employee" variant="h5" gutterBottom>
        Add Employee
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_employee" />
      </Grid>
      <div className="paper_employee">
        <form className="form_employee" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels_employee" item xs={12} sm={2}>
              NIC Number
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txt_nic_employee"
                autoComplete="nic"
                name="nic"
                variant="outlined"
                required
                fullWidth
                id="nic"
                label="NIC"
                autoFocus
                size="small"
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Name :
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
                value={fname}
                onChange={(e) => {
                  setFirstName(e.target.value.trim());
                }}
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
                value={lname}
                onChange={(e) => {
                  setLastName(e.target.value.trim());
                }}
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
                value={addres1}
                onChange={(e) => {
                  setAddres1(e.target.value.trim());
                }}
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
                value={addres2}
                onChange={(e) => {
                  setAddres2(e.target.value.trim());
                }}
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
                value={mobile1}
                onChange={(e) => {
                  setMobile1(e.target.value.trim());
                }}
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
                value={mobile2}
                onChange={(e) => {
                  setMobile2(e.target.value.trim());
                }}
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              Roll :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_roll"
                autoComplete="roll"
                name="roll"
                variant="outlined"
                required
                fullWidth
                id="roll"
                label="Roll"
                autoFocus
                size="small"
                value={roll}
                onChange={(e) => {
                  setRoll(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Basic :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_basic"
                autoComplete="basic"
                name="basic"
                variant="outlined"
                required
                fullWidth
                id="basic"
                label="Basic"
                autoFocus
                size="small"
                InputProps={{ inputProps: { min: 1 } }}
                type="number"
                value={basic}
                onChange={(e) => {
                  setBasic(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
          </Grid>
          <p className="validate_Edit">{validation}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_addEmplyee"
                // onClick={submit}
                disabled={
                  nic.length === 0 ||
                  fname.length === 0 ||
                  lname.length === 0 ||
                  addres1.length === 0 ||
                  mobile1.length === 0 ||
                  roll.length === 0 ||
                  basic.length === 0
                }
              >
                {isLoadingSubmit ? <Spin size="large" /> : "Done"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
