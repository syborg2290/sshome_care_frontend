import React, { useState } from "react";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Modal, Spin } from "antd";
import firebase from "firebase";
import moment from "moment";
import db from "../../../../../config/firebase.js";

// styles
import "./Repair_model.css";

export default function Repair_model({ closeModel }) {
  const { confirm } = Modal;
  let history = useHistory();
  const [invoice, setInvoice] = useState("");
  const [model_no, setModel_no] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const showConfirm = (nic, item_name) => {
    confirm({
      title: "Do you want to print a receipt?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        db.collection("repair")
          .add({
            invoice_no: invoice.trim(),
            model_no: model_no.trim(),
            nic: nic,
            item_name: item_name,
            status: "accepted",
            description: description.trim(),
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            var passingWithCustomerObj = {
              invoice_no: invoice.trim(),
              model_no: model_no.trim(),
              nic: nic,
              item_name: item_name,
            };
            let moveWith = {
              pathname:
                "/showroom/repairs/repairs_Model/repair_update_Recipt/Repair_recipt",
              search: "?query=abc",
              state: { detail: passingWithCustomerObj },
            };
            history.push(moveWith);
          });
      },
      onCancel() {
        db.collection("repair")
          .add({
            invoice_no: invoice.trim(),
            model_no: model_no.trim(),
            nic: nic,
            item_name: item_name,
            status: "accepted",
            description: description.trim(),
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            closeModel();
          });
      },
    });
  };

  const addRepair = async () => {
    setLoading(true);
    db.collection("repair")
      .where("invoice_number", "==", invoice.trim())
      .get()
      .then(async (checkre) => {
        var checkStatus = await db
          .collection("repair")
          .where("status", "==", "back_to_customer")
          .get();
        if (checkre.docs.length === 0 || checkStatus.docs.length >= 0) {
          db.collection("invoice")
            .where("invoice_number", "==", invoice.trim())
            .get()
            .then((reThen) => {
              if (reThen.docs.length > 0) {
                reThen.docs[0].data().items.forEach((reI) => {
                  db.collection("item")
                    .doc(reI.item_id)
                    .get()
                    .then((itRe) => {
                      if (itRe.data().modelNo === model_no.trim()) {
                        let daysCountInitial =
                          (new Date().getTime() -
                            new Date(
                              itRe.data()?.timestamp?.seconds * 1000
                            ).getTime()) /
                          (1000 * 3600 * 24);

                        if (itRe.data().guarantee.value === "Months") {
                          if (
                            Math.round(daysCountInitial / 30) <=
                            itRe.data().guaranteePeriod
                          ) {
                            setLoading(false);
                            showConfirm(
                              reThen.docs[0].data().nic,
                              itRe.data().itemName
                            );
                          } else {
                            setLoading(false);
                            setError("Your garuntee period is expired!");
                          }
                        } else {
                          if (
                            Math.round(daysCountInitial / 365) <=
                            itRe.data().guaranteePeriod
                          ) {
                            setLoading(false);
                            showConfirm(
                              reThen.docs[0].data().nic,
                              itRe.data().itemName
                            );
                          } else {
                            setLoading(false);
                            setError("Item garuntee period is expired!");
                          }
                        }
                      } else {
                        setLoading(false);
                        setError(
                          "Model number you entered is not match with invoice number!"
                        );
                      }
                    });
                });
              } else {
                setLoading(false);
                setError("Invoice number you entered is not found!");
              }
            });
        } else {
          setLoading(false);
          setError("Invoice number you entered is already in the list!");
        }
      });
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Add New Repair
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Invoice No
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="ino"
                variant="outlined"
                required
                fullWidth
                label="Invoice No"
                size="small"
                value={invoice}
                onChange={(e) => {
                  setInvoice(e.target.value);
                }}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Model No
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="modelno"
                variant="outlined"
                required
                fullWidth
                label="Model No"
                size="small"
                value={model_no}
                onChange={(e) => {
                  setModel_no(e.target.value);
                }}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Description
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="ino"
                variant="outlined"
                required
                multiline
                rowsMax={5}
                fullWidth
                label="Description"
                size="small"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {" "}
                {moment(firebase.firestore.FieldValue.serverTimestamp()).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </Grid>
          </Grid>
          <p className="name_Msg">{error.length > 0 ? error : ""}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={addRepair}
                disabled={
                  loading || invoice.length === 0 || model_no.length === 0
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
