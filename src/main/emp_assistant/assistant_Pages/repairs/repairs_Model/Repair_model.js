import React, { useState, useEffect } from "react";

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
  let history2 = useHistory();
  // eslint-disable-next-line
  const [invoice, setInvoice] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [model_no, setModel_no] = useState("");
  const [cust_name, setCust_name] = useState("");
  // eslint-disable-next-line
  const [nic, setNic] = useState("");
  const [mobil_no1, setMobil_no1] = useState("");
  const [mobil_no2, setMobil_no2] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history2.push("/assistant/connection/error/lost_connection");
    });
  });

  const showConfirm = (item_name) => {
    confirm({
      title: "Do you want to print a receipt?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        db.collection("repair")
          .add({
            invoice_no: invoice.trim(),
            serail_no: serialNo.trim(),
            model_no: model_no.trim(),
            nic: nic,
            cust_name: cust_name.trim(),
            mobil_no1: mobil_no1.trim(),
            mobil_no2: mobil_no2.trim(),
            item_name: item_name,
            status: "accepted",
            description: description.trim(),
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            var passingWithCustomerObj = {
              serail_no: serialNo.trim(),
              model_no: model_no.trim(),
              nic: nic,
              item_name: item_name,
            };
            let moveWith = {
              pathname: "/assistant/repair/repairRecipt",
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
            serail_no: serialNo.trim(),
            model_no: model_no.trim(),
            nic: nic,
            cust_name: cust_name.trim(),
            mobil_no1: mobil_no1.trim(),
            mobil_no2: mobil_no2.trim(),
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

  const getInvoiceAndItem = async () => {
    await db
      .collection("invoice")
      .get()
      .then((re) => {
        re.docs.forEach((eachReturn) => {
          eachReturn.data().items.forEach((reItem) => {
            if (reItem.serialNo === serialNo.trim()) {
              if (reItem.modelNo === model_no.trim()) {
                setInvoice(eachReturn.data().invoice_number);
              }
            }
          });
        });
      });
  };

  const addRepair = async () => {
    setLoading(true);
    await getInvoiceAndItem().then(async (_) => {
      let statusOfBlacklist = await db
        .collection("blacklist")
        .where("InvoiceNo", "==", invoice.trim())
        .get();
      let statusOfSeized = await db
        .collection("seized")
        .where("invoice_number", "==", invoice.trim())
        .get();
      if (statusOfBlacklist.docs.length > 0) {
        setLoading(false);
        setError("Serial number you entered is in the blacklist!");
      } else {
        if (statusOfSeized.docs.length > 0) {
          setLoading(false);
          setError("Serial number you entered is in the seized list!");
        } else {
          db.collection("invoice")
            .where("invoice_number", "==", invoice.trim())
            .get()
            .then((reThen) => {
              if (reThen.docs.length > 0) {
                reThen.docs.forEach((reInvo) => {
                  reInvo.data().items.forEach((reI) => {
                    db.collection("item")
                      .doc(reI.item_id)
                      .get()
                      .then((itRe) => {
                        if (itRe.data().modelNo === model_no.trim()) {
                          let daysCountInitial =
                            (new Date().getTime() -
                              new Date(
                                reInvo.data()?.date?.seconds * 1000
                              ).getTime()) /
                            (1000 * 3600 * 24);

                          if (itRe.data().guarantee.value === "Months") {
                            if (
                              Math.round(daysCountInitial / 30) <=
                              itRe.data().guaranteePeriod
                            ) {
                              setLoading(false);
                              showConfirm(itRe.data().itemName);
                            } else {
                              setLoading(false);
                              setError("Item's garuntee period is expired!");
                            }
                          } else {
                            if (
                              Math.round(daysCountInitial / 365) <=
                              itRe.data().guaranteePeriod
                            ) {
                              setLoading(false);
                              showConfirm(itRe.data().itemName);
                            } else {
                              setLoading(false);
                              setError("Item's garuntee period is expired!");
                            }
                          }
                        }
                      });
                  });
                });
              } else {
                setLoading(false);
                setError("Serial number you entered is not found!");
              }
            });
        }
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
            {/* <Grid className="lbl_topi" item xs={12} sm={4}>
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
            </Grid> */}
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Serial No
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
                label=" Serial No"
                size="small"
                value={serialNo}
                onChange={(e) => {
                  setSerialNo(e.target.value);
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
              Customer Name
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                variant="outlined"
                required
                fullWidth
                label="Full Name"
                size="small"
                value={cust_name}
                onChange={(e) => {
                  setCust_name(e.target.value);
                }}
              />
            </Grid>
            {/* <Grid className="lbl_topi" item xs={12} sm={4}>
              MID
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mic"
                variant="outlined"
                required
                fullWidth
                label="MID"
                size="small"
                value={mid}
                onChange={(e) => {
                  setMid(e.target.value);
                }}
              />
            </Grid> */}
            <Grid className="lbl_topi" item xs={12} sm={4}>
              NIC
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nic"
                variant="outlined"
                required
                fullWidth
                label="NIC"
                size="small"
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value);
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mobile"
                type="number"
                variant="outlined"
                required
                fullWidth
                label="Mobil 1"
                size="small"
                value={mobil_no1}
                onChange={(e) => {
                  setMobil_no1(e.target.value);
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mobil_no"
                variant="outlined"
                fullWidth
                label="Mobil 2"
                type="number"
                size="small"
                value={mobil_no2}
                onChange={(e) => {
                  setMobil_no2(e.target.value);
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
                autoComplete="discription"
                variant="outlined"
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
                  "dddd, MMMM Do YYYY"
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
                  loading ||
                  serialNo.length === 0 ||
                  model_no.length === 0 ||
                  cust_name.length === 0 ||
                  nic.length === 0 ||
                  mobil_no1.length === 0
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
