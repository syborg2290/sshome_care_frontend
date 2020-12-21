import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "react-notifications/lib/notifications.css";
import { Spin } from "antd";
import { DatePicker, Space } from "antd";
import db from "../../../../../config/firebase.js";
import firebase from "firebase";

export default function Add_Revenue_Model() {
   
const [oldSerial, setOldSerial] = useState("");
  const [newSerial, setNewSerial] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nic, setNic] = useState("");
      const [saveTimestamp, setTimestamp] = useState(null);
    return (
       
        <Container component="main" className="main_container_addGass">
            <Typography className="title_sarani" variant="h5" gutterBottom>
               Add Revenue Item
      </Typography>
            <Grid item xs={12} sm={2}>
                <hr className="titles_hr_sarani" />
            </Grid>
            <div className="paper">
                <form className="form" noValidate>
                    <Grid container spacing={2}>
                          <Grid className="txt_Labels" item xs={12} sm={5}>
                            Customer NIC :
                         </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                className="txtt_nic"
                                autoComplete="nic"
                                name="nic"
                                variant="outlined"
                                required
                                fullWidth
                                id="nic"
                                label="Nic"
                                size="small"
                                value={nic}
                                onChange={(e) => {
                                    setNic(e.target.value.trim());
                                }}
                            />
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={2}></Grid>
                        <Grid className="txt_Labels" item xs={12} sm={5}>
                            Old Serial Number :
            </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                className="txtt_nic"
                                autoComplete="0ld"
                                name="0ld"
                                variant="outlined"
                                required
                                fullWidth
                                id="0ld"
                                label=" Old Serial Number"
                                autoFocus
                                size="small"
                                value={oldSerial}
                                onChange={(e) => {
                                    setOldSerial(e.target.value.trim());
                                }}
                            />
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={2}></Grid>
                        <Grid className="txt_Labels" item xs={12} sm={5}>
                            New Serial Number :
            </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                className="txtt_nic"
                                autoComplete="new"
                                name="new"
                                variant="outlined"
                                required
                                fullWidth
                                id="new"
                                label="New Serial Number"
                                size="small"
                                value={newSerial}
                                onChange={(e) => {
                                    setNewSerial(e.target.value.trim());
                                }}
                            />
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={2}></Grid>
          <Grid className="txt_Labels" item xs={12} sm={5}>
              Date :
            </Grid>
            <Grid item xs={12} sm={5}>
              <Space direction="vertical">
                <DatePicker
                  onChange={(e) => {
                    if (e !== null) {
                      setTimestamp(
                        firebase.firestore.Timestamp.fromDate(e.toDate())
                      );
                    } else {
                      setTimestamp(null);
                    }
                  }}
                />
              </Space>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={9}></Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn_done"
                                // onClick={Done}
                                disabled={
                                    isLoading ||
                                    oldSerial.length === 0 ||
                                    newSerial.length === 0 ||
                                     saveTimestamp === null
                                }
                            >
                                {isLoading ? <Spin size="small" /> : "Done"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
