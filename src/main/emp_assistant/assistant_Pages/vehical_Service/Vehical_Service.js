    // eslint-disable-next-line
import React, { useState, useEffect } from "react";
    // eslint-disable-next-line
import { TextField, Button } from "@material-ui/core";
import {DatePicker } from "antd";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
    // eslint-disable-next-line
import DoneIcon from "@material-ui/icons/Done";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';


// styles
import "./Vehical_Service.css";

export default function Vehical_Service() {
      // eslint-disable-next-lines
  const [date, setDate] = useState(null);
    // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
 
  let history = useHistory();

   useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

    return (
        
        <Container component="main" className="main_container">
             <Typography className="titles" variant="h5" gutterBottom>
                Add Expences
        </Typography>
             <Grid item xs={12} sm={2}>
          <hr className="titles_hr" />
            </Grid>
            <div className="paper">
                <form className="form" noValidate>
                    <Grid container spacing={2}>
                         <Grid className="txt_Labels" item xs={12} sm={2}>
                        Service Date :
                        </Grid>
                <Grid item xs={12} sm={10}>
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
                        
                        <Grid className="txt_Labels" item xs={12} sm={12}>
                            <br />
                        </Grid>
                        
                        <Grid className="txt_Labels" item xs={12} sm={2}>
                            Oil :
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={10}>
                             <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
                        </Grid>

                    </Grid>
                </form>
             </div>
        </Container>
    )
}
