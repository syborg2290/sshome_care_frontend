import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { DatePicker, Space, Spin } from "antd";
import firebase from "firebase";

import db from "../../../../../../config/firebase.js";

// styles
import "./Add_Model.css";

export default function Add_Model({ closeModel }) {
  // eslint-disable-next-line
  // const [invoice, setInvoice] = useState("");
  const [serial, setSerial] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/assistant/connection/error/lost_connection");
    });
  });

  const addSeized = async () => {
    setLoading(true);
    await db
      .collection("invoice")
      .get()
      .then((re) => {
        var count = 0;
        re.docs.forEach((eachReturn) => {
          eachReturn.data().items.forEach((reItem) => {
            if (reItem.serialNo === serial.trim()) {
              let invoice = eachReturn.data().invoice_number;

              db.collection("blacklist")
                .where("InvoiceNo", "==", invoice.trim())
                .get()
                .then((checkBlackList) => {
                  if (checkBlackList.docs.length > 0) {
                    db.collection("seized")
                      .where("invoice_number", "==", invoice.trim())
                      .get()
                      .then((reSeizedCheck) => {
                        if (reSeizedCheck.docs.length <= 0) {
                          db.collection("invoice")
                            .where("invoice_number", "==", invoice.trim())
                            .get()
                            .then((reThen) => {
                              if (reThen.docs.length > 0) {
                                if (
                                  reThen.docs[0].data()?.customer_id !== null
                                ) {
                                  reThen.docs[0].data().items.forEach((reI) => {
                                    db.collection("item")
                                      .doc(reI.item_id)
                                      .get()
                                      .then((itRe) => {
                                        db.collection("seized")
                                          .add({
                                            invoice_number: invoice.trim(),
                                            model_no: itRe.data().modelNo,
                                            item_name: itRe.data().itemName,
                                            nic: reThen.docs[0].data().nic,
                                            date: date,
                                            addedDate: firebase.firestore.FieldValue.serverTimestamp(),
                                          })
                                          .then((_) => {
                                            setLoading(false);
                                            closeModel();
                                            window.location.reload();
                                          });
                                      });
                                  });
                                } else {
                                  setLoading(false);
                                  setError(
                                    "Serial number you entered is not found in 'On Going Status'!"
                                  );
                                }
                              } else {
                                setLoading(false);
                                setError(
                                  "Serial number you entered is not found!"
                                );
                              }
                            });
                        } else {
                          setLoading(false);
                          setError(
                            "Serial number you entered already in the seized list!"
                          );
                        }
                      });
                  } else {
                    setLoading(false);
                    setError("Serial number you entered not in the blacklist!");
                  }
                });
            }
          });
          count = count + 1;
        });
        if (re.docs.length >= count) {
          setLoading(false);
          setError("Serial number you entered is not found!");
        }
      });
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Add Seized Item
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Serial No
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="sio"
                variant="outlined"
                required
                fullWidth
                label="Serial No"
                size="small"
                value={serial}
                onChange={(e) => {
                  setSerial(e.target.value.trim());
                }}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Seized Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </Grid>
          </Grid>
          <p className="name_Msg">{error.length > 0 ? error : ""}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className="btn_add"
                onClick={addSeized}
                disabled={
                  loading ||
                  serial.length === 0 ||
                  date.length === 0 ||
                  date === null
                    ? true
                    : false
                }
              >
                {loading ? <Spin /> : "Done"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
