import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import { Checkbox, Spin } from "antd";

import { useHistory } from "react-router-dom";
import db from "../../../../../../config/firebase.js";
import "react-notifications/lib/notifications.css";

// styles
import "./Add_Employee.css";

export default function Add_Employee() {
  const [allEmployee, setAllEmployee] = useState([]);
  const [employee1, setEmployee1] = useState("");
  const [employeeName1, setEmployeeName1] = useState("");
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  // const [validation, setValidation] = useState("");

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("employee")
      .get()
      .then((re) => {
        var raw = [];
        re.docs.forEach((each) => {
          raw.push(each.data());
        });
        setAllEmployee(raw);
      });
    // eslint-disable-next-line
  }, []);

  const handleChange1 = (event) => {
    setEmployee1(event.target.value);
    allEmployee.forEach((reE) => {
      if (reE.nic === event.target.value) {
        setEmployeeName1(reE.fname + " " + reE.lname);
      }
    });
  };

  return (
    <Container component="main" className="main_container_root">
      <Typography className="title_root" variant="h5" gutterBottom>
       Assign Employees to Shop
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_root" />
      </Grid>
      <div className="paper_root">
        <form className="form_root" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels_root" item xs={12} sm={5}>
              Assigne Employees :
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl size="small" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                <Select native label="Name" onChange={handleChange1}>
                  <option onChange={handleChange1} value="">
                    Select Employee
                  </option>
                  {allEmployee.map((reM) => (
                    <option
                      key={reM.nic + "r"}
                      onChange={handleChange1}
                      value={reM.nic}
                    >
                      {reM.fname} {reM.lname}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
          </Grid>
        </form>
      </div>
      {/* <p className="validate_updateRoot">{validation}</p> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            className="btn_addRoot"
            // onClick={submit}
          >
            {isLoadingSubmit ? <Spin size="large" /> : "Done"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
