import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Container,
  Typography,

} from "@material-ui/core";
import { Checkbox , Spin } from "antd";

import { useHistory } from "react-router-dom";
import db from "../../../../../../config/firebase.js";
import "react-notifications/lib/notifications.css";

// styles
import "./Add_Root.css";

export default function Add_Root() {
  const [rootName, setRootName] = useState("");
  const [description, setDescription] = useState("");
  const [allEmployee, setAllEmployee] = useState([]);

  const [employee1, setEmployee1] = useState("");
  const [employee2, setEmployee2] = useState("");
  const [employeeName1, setEmployeeName1] = useState("");
  const [employeeName2, setEmployeeName2] = useState("");

  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const [monday, setMonday] = useState(true);
  const [tuesday, setTuesday] = useState(true);
  const [wendsday, setWendsday] = useState(true);
  const [thursday, setThursday] = useState(true);
  const [friday, setFriday] = useState(true);
  const [saturday, setSaturday] = useState(true);
  const [sunday, setSunday] = useState(true);

  const [validation, setValidation] = useState("");

  let history = useHistory();

  useEffect(() => {

     window.addEventListener("offline", function (e) {
      history.push("/assistant/connection/error/lost_connection");
    });

    db.collection("employee")
      .get()
      .then((re) => {
        var raw = [];
        re.docs.forEach((each) => {
          raw.push(each.data());
        });
        setEmployee1(raw[0].nic);
        setEmployee2(raw[0].nic);
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

  const handleChange2 = (event) => {
    setEmployee2(event.target.value);
    allEmployee.forEach((reE) => {
      if (reE.nic === event.target.value) {
        setEmployeeName2(reE.fname + " " + reE.lname);
      }
    });
  };

  const submit = () => {
    setLoadingSubmit(true);

    db.collection("root")
      .where("root", "==", rootName)
      .get()
      .then((reTh) => {
        if (reTh.docs.length > 0) {
          setLoadingSubmit(false);
          setValidation("Already exists root name!");
        } else {
          if (
            monday ||
            tuesday ||
            wendsday ||
            thursday ||
            friday ||
            saturday ||
            sunday
          ) {
            if (employee1 !== "" || employee2 !== "") {
              var daysList = [];
              daysList.push({
                monday: monday,
                tuesday: tuesday,
                wendsday: wendsday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
              });

              db.collection("root")
                .add({
                  root: rootName.trim(),
                  description: description,
                  days: daysList,
                  empName1: employeeName1,
                  empName2: employeeName2,
                  employee1: employee1,
                  employee2: employee2,
                })
                .then((_) => {
                  setLoadingSubmit(false);
                  window.location.reload();
                });
            } else {
              setLoadingSubmit(false);
              setValidation("Please select atleaset 1 employee!");
            }
          } else {
            setLoadingSubmit(false);
            setValidation("Please select atleaset 1 day!");
          }
        }
      });
  };

  return (
    <Container component="main" className="main_container_root">
      <Typography className="title_root" variant="h5" gutterBottom>
        Add Root
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_root" />
      </Grid>
      <div className="paper_root">
        <form className="form_root" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels_root" item xs={12} sm={4}>
              Root Name :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txt_nic_root"
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Root Name"
                autoFocus
                size="small"
                value={rootName}
                onChange={(e) => {
                  setRootName(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="txt_descriptin_root" item xs={12} sm={4}>
              Description :
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                className="txt_discp_root"
                autoComplete="description"
                name="description"
                variant="outlined"
                required
                multiline
                rows={6}
                fullWidth
                id="description"
                label="Description"
                size="small"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value.trim());
                }}
              />
            </Grid>

            <Grid className="txt_Labels_root" item xs={12} sm={4}>
              Assigne Employees :
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl size="small" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                <Select native label="Name" onChange={handleChange1}>
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
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels_root" item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={5}>
              <FormControl size="small" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                <Select native label="Name" onChange={handleChange2}>
                  {allEmployee.map((reM) => (
                    <option
                      key={reM.nic + "e"}
                      onChange={handleChange2}
                      value={reM.nic}
                    >
                      {reM.fname} {reM.lname}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>

            <Grid className="txt_dayTopic_root" item xs={12} sm={4}>
              Select Days :
              <br />
              <hr />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_days_root" item xs={12} sm={4}>
              Monday :
              <br />
              Tuesday :
              <br />
              Wednesday :
              <br />
              Thursday :
              <br />
              Friday :
              <br />
              Saturday :
              <br />
              Sunday :
            </Grid>
            <Grid item xs={12} sm={5} className="txt_days_root_Checkbox">
              <Checkbox
                checked={monday}
                onChange={(e) => {
                  if (monday) {
                    setMonday(false);
                  } else {
                    setMonday(true);
                  }
                }}
              />
              <br />
              <Checkbox
                checked={tuesday}
                onChange={(e) => {
                  if (tuesday) {
                    setTuesday(false);
                  } else {
                    setTuesday(true);
                  }
                }}
              />
              <br />
              <Checkbox
                checked={wendsday}
                onChange={(e) => {
                  if (wendsday) {
                    setWendsday(false);
                  } else {
                    setWendsday(true);
                  }
                }}
              />
              <br />
              <Checkbox
                checked={thursday}
                onChange={(e) => {
                  if (thursday) {
                    setThursday(false);
                  } else {
                    setThursday(true);
                  }
                }}
              />
              <br />
              <Checkbox
                checked={friday}
                onChange={(e) => {
                  if (friday) {
                    setFriday(false);
                  } else {
                    setFriday(true);
                  }
                }}
              />
              <br />
              <Checkbox
                checked={saturday}
                onChange={(e) => {
                  if (saturday) {
                    setSaturday(false);
                  } else {
                    setSaturday(true);
                  }
                }}
              />
              <br />
              <Checkbox
                checked={sunday}
                onChange={(e) => {
                  if (sunday) {
                    setSunday(false);
                  } else {
                    setSunday(true);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>
        </form>
      </div>
      <p className="validate_updateRoot">{validation}</p>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            className="btn_addRoot"
            onClick={submit}
            disabled={rootName.length === 0}
          >
            {isLoadingSubmit ? <Spin size="large" /> : "Done"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
