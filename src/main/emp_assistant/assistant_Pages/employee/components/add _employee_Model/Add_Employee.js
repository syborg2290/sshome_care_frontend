import React, { useState,useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Spin } from "antd";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import { nicValidation } from "../../../../../../config/validation.js";
import db from "../../../../../../config/firebase.js";
import "react-notifications/lib/notifications.css";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
// styles
import "./Add_Employee.css";

export default function Add_Employee({ close_model }) {
  const [nic, setNic] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [addres1, setAddres1] = useState("");
  const [addres2, setAddres2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [basic, setBasic] = useState("");
  const [deposits, setDeposits] = useState("");
  // eslint-disable-next-line
  const [validation, setValidation] = useState("");
  // eslint-disable-next-line
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  let history = useHistory();
  
  const submit = () => {
    setLoadingSubmit(true);
    var result = nicValidation(nic);
    if (result) {
      db.collection("employee")
        .where("nic", "==", nic)
        .get()
        .then((nicRe) => {
          if (nicRe.docs.length > 0) {
            setLoadingSubmit(false);
            setValidation("Employee already exists by NIC");
          } else {
            db.collection("employee")
              .add({
                nic: nic.trim(),
                fname: fname.trim(),
                lname: lname.trim(),
                address1: addres1.trim(),
                addres2: addres2.trim(),
                mobile1: mobile1.trim(),
                mobile2: mobile2.trim(),
                basic: parseInt(basic.trim()),
                date: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then((_) => {
                setLoadingSubmit(false);
                close_model();
                window.location.reload();
              });
          }
        });
    } else {
      setLoadingSubmit(false);
      setValidation("Employee's NIC format is invalid!");
    }
  };

    useEffect(() => {

    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
  });

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
           
             <Grid className="txt_Labels" item xs={12} sm={2}>
              Security Deposits :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txtt_basic"
                autoComplete="basic"
                variant="outlined"
                required
                fullWidth
                label="Security Deposits"
                autoFocus
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                type="number"
                value={deposits}
                onChange={(e) => {
                  setDeposits(e.target.value.trim());
                }}
              />
            </Grid>
           
          </Grid>
          <p className="validate_Edit">{validation}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_addEmplyee"
                onClick={submit}
                disabled={
                  nic.length === 0 ||
                  fname.length === 0 ||
                  lname.length === 0 ||
                  addres1.length === 0 ||
                  mobile1.length === 0 ||
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
