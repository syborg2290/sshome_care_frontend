    // eslint-disable-next-line
import React, { useState, useEffect } from "react";
    // eslint-disable-next-line
import { TextField, Button } from "@material-ui/core";
import {DatePicker,Spin } from "antd";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import DoneIcon from "@material-ui/icons/Done";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';

// styles
import "./Update_Service_Model.css";

export default function Update_Service_Model() {
   // eslint-disable-next-lines
  const [date, setDate] = useState(null);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);

    const [serviceKm, setServiceKm] = useState("");
    const [serviceCenter, setServiceCenter] = useState("");
    const [nextService, setNextService] = useState("");
    const [other, setOther] = useState("");
    const [vehical, setVehical] = useState("");

    let history = useHistory();

   useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

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
                                setDate(
                                  firebase.firestore.Timestamp.fromDate(
                                    e.toDate()
                                  )
                                );
                              } else {
                                setDate(null);
                              }
                            }}
                          />
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={6}> <hr /></Grid>
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
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                         <Grid className="txt_Labels" item xs={12} sm={4}>
                            Diesel Filter :
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={8}>
                             <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                         <Grid className="txt_Labels" item xs={12} sm={4}>
                            Oil Filter :
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={8}>
                             <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
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
                         Diesel  :
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={8}>
                             <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                         <Grid className="txt_Labels" item xs={12} sm={4}>
                         Other  :
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
                // onClick={vehicalService}
                disabled={loading || date === null ? true : false}
              >
                {loading ? <Spin size="small" /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
                </form>
             </div>
        </Container>
    )
}
