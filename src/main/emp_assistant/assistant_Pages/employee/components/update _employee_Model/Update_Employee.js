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
import "./Update_Employee.css";

export default function Update_Employe() {
  const [nic, setNic] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [addres1, setAddres1] = useState("");
  const [addres2, setAddres2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [roll, setRoll] = useState("");
  const [basic, setBasic] = useState("");
  const [validation, setValidation] = useState("");
  // eslint-disable-next-line
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const updateEmployee = async (e) => {
    e.preventDefault();
    if (nic === "") {
      setValidation("Employee NIC is required!");
    } else {
      if (fname === "") {
        setValidation("Employee First Name is required!");
      } else {
        if (lname === "") {
          setValidation("Employee Last Name is required!");
        } else {
          if (addres1 === "") {
            setValidation("Employee Address 1  is required!");
          } else {
            if (mobile1 === "") {
              setValidation("Employee Mobile 1 is required!");
            } else {
              if (roll === "") {
                setValidation("Employee Roll is required!");
              } else {
                if (basic === "") {
                  setValidation("Employee Basic is required!");
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <Container component="main" className="main_container_employee_update">
      <Typography className="title_employee_update" variant="h5" gutterBottom>
        Update Employee
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_employee_update" />
      </Grid>
      <div className="paper_employee_update">
        <form className="form_employee_update" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              NIC Number
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                className="txt_nic_employee_update"
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
            <Grid item xs={12} sm={1}></Grid>

            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              First name
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              Last name
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              Address 1:
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              Address 2:
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              Mobile 1 :
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              Mobile 2:
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              Roll :
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels_employee_update" item xs={12} sm={4}>
              Basic :
            </Grid>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={1}></Grid>
          </Grid>
          <p className="validate_updateEmployee">{validation}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_addEmplyee"
                onClick={updateEmployee}
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
