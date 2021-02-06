import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "react-notifications/lib/notifications.css";

// styles
import "./AddNew_Model.css";

import db from "../../../../../../config/firebase.js";
import firebase from "firebase";
import { Spin } from "antd";

export default function AddNew_Model({ close_model }) {
  const [weight, setWeight] = useState(0);
  const [qty, setQty] = useState(0);

  const [downpayment, setDownpayment] = useState(0);
  const [noOfInstallments, setNoOfInstallments] = useState(0);
  //Cash price
  const [price, setPrice] = useState(0);
  const [withoutCprice, setWithoutCPrice] = useState(0);
  //Sale price
  const [saleprice, setSalePrice] = useState(0);
  const [withoutSaleprice, setWithoutSalePrice] = useState(0);
  const [purchesPrice, setPurchesPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
  });

  const submit = () => {
    setIsLoading(true);
    db.collection("gas")
      .where("weight", "==", weight.trim())
      .get()
      .then((re) => {
        if (re.docs.length > 0) {
          let fillEmptyTanks = 0;
          if (parseInt(re.docs[0].data().empty_tanks > 0)) {
            fillEmptyTanks = parseInt(re.docs[0].data().empty_tanks);
            if (fillEmptyTanks > parseInt(qty.trim())) {
              fillEmptyTanks = fillEmptyTanks - parseInt(qty.trim());
            }

            if (fillEmptyTanks <= parseInt(qty.trim())) {
              fillEmptyTanks = 0;
            }
          }
          db.collection("gas")
            .doc(re.docs[0].id)
            .update({
              weight: weight,
              qty: parseInt(qty.trim()) + parseInt(re.docs[0].data().qty),
              empty_tanks: fillEmptyTanks,
              price:
                price === 0 || price === "" || price === null
                  ? re.docs[0].data().price
                  : parseInt(price.trim()),
              withoutCprice:
                withoutCprice === 0 ||
                withoutCprice === "" ||
                withoutCprice === null
                  ? re.docs[0].data().withoutCprice
                  : parseInt(withoutCprice.trim()),
              saleprice:
                saleprice === 0 || saleprice === "" || saleprice === null
                  ? re.docs[0].data().saleprice
                  : parseInt(saleprice.trim()),
              withoutSaleprice:
                withoutSaleprice === 0 ||
                withoutSaleprice === "" ||
                withoutSaleprice === null
                  ? re.docs[0].data().withoutSaleprice
                  : parseInt(withoutSaleprice.trim()),
              downpayment:
                downpayment === 0 || downpayment === "" || downpayment === null
                  ? re.docs[0].data().downpayment
                  : parseInt(downpayment.trim()),
              noOfInstallments:
                noOfInstallments === 0 ||
                noOfInstallments === "" ||
                noOfInstallments === null
                  ? re.docs[0].data().noOfInstallments
                  : parseInt(noOfInstallments.trim()),
            })
            .then((_) => {
              db.collection("gas_history").add({
                weight: weight,
                qty: parseInt(qty.trim()),
                price:
                  purchesPrice === 0 ||
                  purchesPrice === "" ||
                  purchesPrice === null
                    ? purchesPrice
                    : parseInt(purchesPrice.trim()),
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });

              window.location.reload();
              setIsLoading(false);
            });
        } else {
          db.collection("gas")
            .add({
              weight: weight,
              qty: parseInt(qty.trim()),
              price: parseInt(price.trim()),
              withoutCprice: parseInt(withoutCprice.trim()),
              saleprice: parseInt(saleprice.trim()),
              withoutSaleprice: parseInt(withoutSaleprice.trim()),
              downpayment: parseInt(downpayment.trim()),
              noOfInstallments: parseInt(noOfInstallments.trim()),
              empty_tanks: 0,
              date: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((_) => {
              db.collection("gas_history").add({
                weight: weight,
                qty: qty,
                price: purchesPrice,
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
              window.location.reload();
              setIsLoading(false);
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
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Weight(kg) :
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
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setWeight(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
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
                size="small"
                type="number"
                value={qty}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setQty(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={12}>
              <hr />
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "grey",
                  marginTop: "20px",
                  fontWeight: "bold",
                }}
              >
                Cash prices
              </h3>
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Cash Price(With Cylinder) :
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
                size="small"
                type="number"
                value={price}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setPrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Cash Price(Without Cylinder) :
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
                size="small"
                type="number"
                value={withoutCprice}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setWithoutCPrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={12}>
              <hr />
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "grey",
                  marginTop: "20px",
                  fontWeight: "bold",
                }}
              >
                Sale prices
              </h3>
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Sale Price(With Cylinder) :
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
                size="small"
                type="number"
                value={saleprice}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setSalePrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Sale Price(Without Cylinder) :
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
                size="small"
                type="number"
                value={withoutSaleprice}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setWithoutSalePrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Unit Purchased Price :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="PurchesPrice"
                variant="outlined"
                required
                fullWidth
                id="PurchesPrice"
                label="Purchased Price"
                size="small"
                type="number"
                value={purchesPrice}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setPurchesPrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={12}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Downpayment(LKR) :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="Downpayment"
                variant="outlined"
                required
                fullWidth
                id="downpayment"
                label="Downpayment"
                size="small"
                type="number"
                value={downpayment}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setDownpayment(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={12}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              No Of Installments(LKR) :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="NoOfInstallments"
                variant="outlined"
                required
                fullWidth
                id="noOfInstallments"
                label="NoOfInstallments"
                size="small"
                type="number"
                value={noOfInstallments}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNoOfInstallments(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
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
                  isLoading ||
                  weight.length === 0 ||
                  qty.length === 0 ||
                  weight === 0 ||
                  qty === 0
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
