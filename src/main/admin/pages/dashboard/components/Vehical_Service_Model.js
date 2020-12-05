import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { DatePicker, Spin } from "antd";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

// styles
import "./Vehical_Service_Model.css";

import db from "../../../../../config/firebase.js";

export default function Vehical_Service_Model() {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serviceKm, setServiceKm] = useState("");
  const [serviceCenter, setServiceCenter] = useState("");
  const [nextService, setNextService] = useState("");
  const [other, setOther] = useState("");
  const [vehical, setVehical] = useState("");
  const [oil, setOil] = useState(true);
  const [dieselFilter, setDieselFilter] = useState(true);
  const [oilFilter, setOilFilter] = useState(true);
  const [diesel, setDiesel] = useState(true);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

  const addService = () => {
    setLoading(true);

    db.collection("vehi_service")
      .add({
        date: date,
        serviceKm: serviceKm,
        serviceCenter: serviceCenter,
        nextService: nextService,
        other: other,
        vehical: vehical,
        oil: oil,
        dieselFilter: dieselFilter,
        oilFilter: oilFilter,
        diesel: diesel,
      })
      .then((reSe) => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <Container component="main" className="main_container_Vehical">
      <Typography className="titles" variant="h5" gutterBottom>
        Vehical Service
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Service Date :
            </Grid>
            <Grid item xs={12} sm={8}>
              <DatePicker
                onChange={(e) => {
                  if (e !== null) {
                    setDate(firebase.firestore.Timestamp.fromDate(e.toDate()));
                  } else {
                    setDate(null);
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={6}>
              {" "}
              <hr />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={6}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={12}>
              <br />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Vehical Name :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <TextField
                className="txtt_nic"
                variant="outlined"
                required
                fullWidth
                label="Vehical"
                autoFocus
                size="small"
                value={vehical}
                onChange={(e) => {
                  setVehical(e.target.value);
                }}
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Oil :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <Checkbox
                checked={oil}
                onChange={(e) => {
                  if (oil) {
                    setOil(false);
                  } else {
                    setOil(true);
                  }
                }}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Diesel Filter :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <Checkbox
                checked={dieselFilter}
                onChange={(e) => {
                  if (dieselFilter) {
                    setDieselFilter(false);
                  } else {
                    setDieselFilter(true);
                  }
                }}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Oil Filter :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <Checkbox
                checked={oilFilter}
                onChange={(e) => {
                  if (oilFilter) {
                    setOilFilter(false);
                  } else {
                    setOilFilter(true);
                  }
                }}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Service Km Total :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <TextField
                className="txtt_nic"
                variant="outlined"
                required
                fullWidth
                label=" Service Km"
                autoFocus
                size="small"
                value={serviceKm}
                onChange={(e) => {
                  setServiceKm(e.target.value);
                }}
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Service Center :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <TextField
                className="txtt_nic"
                variant="outlined"
                required
                fullWidth
                label="Service Center"
                autoFocus
                size="small"
                value={serviceCenter}
                onChange={(e) => {
                  setServiceCenter(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Next Service Km :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <TextField
                className="txtt_nic"
                variant="outlined"
                required
                fullWidth
                label="Next Service"
                autoFocus
                size="small"
                value={nextService}
                onChange={(e) => {
                  setNextService(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Diesel :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <Checkbox
                checked={diesel}
                onChange={(e) => {
                  if (diesel) {
                    setDiesel(false);
                  } else {
                    setDiesel(true);
                  }
                }}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Other :
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}>
              <TextField
                className="txtt_nic"
                variant="outlined"
                required
                fullWidth
                label="Other"
                autoFocus
                size="small"
                value={other}
                onChange={(e) => {
                  setOther(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}></Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                className="btn_vehicalService"
                endIcon={<DoneIcon />}
                onClick={addService}
                disabled={
                  loading || date === null || vehical === "" ? true : false
                }
              >
                {loading ? <Spin size="small" /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
