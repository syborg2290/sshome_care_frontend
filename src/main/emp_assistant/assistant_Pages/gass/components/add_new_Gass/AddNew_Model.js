import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "react-notifications/lib/notifications.css";

// styles
import "./AddNew_Model.css";

import db from "../../../../../../config/firebase.js";
import firebase from "firebase";

export default function AddNew_Model({ close_model }) {
  const [weight, setWeight] = useState(0);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const submit = () => {
    db.collection("gas")
      .where("weight", "==", weight.trim())
      .get()
      .then((re) => {
        if (re.docs.length > 0) {
          db.collection("gas")
            .doc(re.docs[0].id)
            .update({
              weight: weight,
              qty:
                parseInt(qty.trim()) + parseInt(re.docs[0].data().qty.trim()),
              price: parseInt(price.trim()),
            })
            .then((_) => {
              db.collection("gas_history").add({
                weight: weight,
                qty: parseInt(qty.trim()),
                price: parseInt(price.trim()),
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
              close_model();
            });
        } else {
          db.collection("gas")
            .add({
              weight: weight,
              qty: parseInt(qty.trim()),
              price: parseInt(price.trim()),
              date: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((_) => {
              db.collection("gas_history").add({
                weight: weight,
                qty: qty,
                price: price,
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
              close_model();
            });
        }
      });
  };

  return (
    <Container component="main" className="main_container_addGass">
      <Typography className="title_sarani" variant="h5" gutterBottom>
        Add/Update New Gas
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_sarani" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Weight :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="weight"
                variant="outlined"
                required
                fullWidth
                id="weight"
                label="Weight"
                autoFocus
                size="small"
                type="number"
                value={weight}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  setWeight(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Qty :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="Qty"
                name="Qty"
                variant="outlined"
                required
                fullWidth
                id="Qty"
                label="Qty"
                autoFocus
                size="small"
                type="number"
                value={qty}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  setQty(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Price :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="Price"
                variant="outlined"
                required
                fullWidth
                id="Price"
                label="Price"
                autoFocus
                size="small"
                type="number"
                value={price}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  setPrice(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_done"
                onClick={submit}
                disabled={
                  weight.length === 0 || price.length === 0 || qty.length === 0
                }
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
