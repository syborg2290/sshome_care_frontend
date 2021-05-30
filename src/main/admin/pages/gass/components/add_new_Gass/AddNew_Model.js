import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {TextField, Button, Select, FormControl} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'react-notifications/lib/notifications.css';

// styles
import './AddNew_Model.css';

import db from '../../../../../../config/firebase.js';
import firebase from 'firebase';
import {Spin} from 'antd';

export default function AddNew_Model({close_model}) {
  const [weight, setWeight] = useState(0);
  const [qty, setQty] = useState(0);
  const [emptyqty, setEmptyQty] = useState(0);
  const [selectedType, setSelectedType] = useState('main');
  const [allRoot, setAllRoot] = useState([]);
  const [downpayment, setDownpayment] = useState(0);
  const [noOfInstallments, setNoOfInstallments] = useState(0);
  const [amountPerIns, setAmountPerIns] = useState(0);
  const [emptyDownpayment, setEmptyDownpayment] = useState(0);
  const [emptyNoOfInstallments, setEmptyNoOfInstallments] = useState(0);
  const [emptyAmountPerIns, setEmptyAmountPerIns] = useState(0);
  //Cash price
  const [price, setPrice] = useState(0);
  const [withoutCprice, setWithoutCPrice] = useState(0);
  const [emptyCashPrice, setEmptyCashPrice] = useState(0);
  //Sale price
  const [saleprice, setSalePrice] = useState(0);
  const [withoutSaleprice, setWithoutSalePrice] = useState(0);
  const [purchesPrice, setPurchesPrice] = useState(0);
  const [emptySaleprice, setEmptySalePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener('offline', function(e) {
      history.push('/connection_lost');
    });
    db.collection('root').get().then(re => {
      var rawRoot = [];
      re.docs.forEach(each => {
        rawRoot.push(each.data().root);
      });
      setAllRoot(rawRoot);
    });
  });

  const submit = () => {
    setIsLoading(true);
    db
      .collection('gas')
      .where('stock_type', '==', selectedType)
      .get()
      .then(re => {
        if (re.docs.length > 0) {
          re.docs.forEach(eachGas => {
            if (eachGas.data().weight === weight) {
              let fillEmptyTanks = 0;
              if (parseInt(eachGas.data().empty_tanks > 0)) {
                fillEmptyTanks = parseInt(eachGas.data().empty_tanks);
                if (fillEmptyTanks > parseInt(qty.trim())) {
                  fillEmptyTanks = fillEmptyTanks - parseInt(qty.trim());
                }

                if (fillEmptyTanks <= parseInt(qty.trim())) {
                  fillEmptyTanks = 0;
                }
              }
              db
                .collection('gas')
                .doc(eachGas.id)
                .update({
                  weight: weight,
                  qty: parseInt(qty.trim()) + parseInt(eachGas.data().qty),
                  empty_tanks: parseInt(fillEmptyTanks) + parseInt(emptyqty),
                  stock_type: selectedType,
                  price:
                    price === 0 || price === '' || price === null
                      ? eachGas.data().price
                      : parseInt(price.trim()),
                  withoutCprice:
                    withoutCprice === 0 ||
                    withoutCprice === '' ||
                    withoutCprice === null
                      ? eachGas.data().withoutCprice
                      : parseInt(withoutCprice.trim()),
                  saleprice:
                    saleprice === 0 || saleprice === '' || saleprice === null
                      ? eachGas.data().saleprice
                      : parseInt(saleprice.trim()),
                  withoutSaleprice:
                    withoutSaleprice === 0 ||
                    withoutSaleprice === '' ||
                    withoutSaleprice === null
                      ? eachGas.data().withoutSaleprice
                      : parseInt(withoutSaleprice.trim()),
                  downpayment:
                    downpayment === 0 ||
                    downpayment === '' ||
                    downpayment === null
                      ? eachGas.data().downpayment
                      : parseInt(downpayment.trim()),
                  noOfInstallments:
                    noOfInstallments === 0 ||
                    noOfInstallments === '' ||
                    noOfInstallments === null
                      ? eachGas.data().noOfInstallments
                      : parseInt(noOfInstallments.trim()),
                  amountPerIns:
                    amountPerIns === 0 ||
                    amountPerIns === '' ||
                    amountPerIns === null
                      ? eachGas.data().amountPerIns
                      : parseInt(amountPerIns.trim()),
                      emptydownpayment: emptyDownpayment === 0 ||
                    emptyDownpayment === '' ||
                    emptyDownpayment === null
                      ? eachGas.data().emptydownpayment: parseInt(emptyDownpayment.trim()),
              emptynoOfInstallments:emptyNoOfInstallments === 0 ||
                    emptyNoOfInstallments === '' ||
                    emptyNoOfInstallments === null
                      ? eachGas.data().emptynoOfInstallments: parseInt(emptyNoOfInstallments.trim()),
              emptyamountPerIns:emptyAmountPerIns === 0 ||
                    emptyAmountPerIns === '' ||
                    emptyAmountPerIns === null
                      ? eachGas.data().emptyamountPerIns: parseInt(emptyAmountPerIns.trim()),
              emptycashprice:emptyCashPrice === 0 ||
                    emptyCashPrice === '' ||
                    emptyCashPrice === null
                      ? eachGas.data().emptycashprice:parseInt(emptyCashPrice.trim()),
              emptysaleprice:emptySaleprice === 0 ||
                    emptySaleprice === '' ||
                    emptySaleprice === null
                      ? eachGas.data().emptysaleprice:parseInt(emptySaleprice.trim()),
                })
                .then(_ => {
                  db.collection('gas_history').add({
                    weight: weight,
                    qty: parseInt(qty.trim()),
                    stock_type: selectedType,
                    empty: emptyqty,
                    price:
                      purchesPrice === 0 ||
                      purchesPrice === '' ||
                      purchesPrice === null
                        ? purchesPrice
                        : parseInt(purchesPrice.trim()),
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                  });

                  window.location.reload();
                  setIsLoading(false);
                });
            } else {
              db
                .collection('gas')
                .add({
                  weight: weight,
                  qty: parseInt(qty.trim()),
                  price: parseInt(price.trim()),
                  withoutCprice: parseInt(withoutCprice.trim()),
                  saleprice: parseInt(saleprice.trim()),
                  withoutSaleprice: parseInt(withoutSaleprice.trim()),
                  downpayment: parseInt(downpayment.trim()),
                  noOfInstallments: parseInt(noOfInstallments.trim()),
                  amountPerIns: parseInt(amountPerIns.trim()),
                  emptydownpayment: parseInt(emptyDownpayment.trim()),
              emptynoOfInstallments: parseInt(emptyNoOfInstallments.trim()),
              emptyamountPerIns: parseInt(emptyAmountPerIns.trim()),
              emptycashprice:parseInt(emptyCashPrice.trim()),
              emptysaleprice:parseInt(emptySaleprice.trim()),
                  empty_tanks: parseInt(emptyqty.trim()),
                  stock_type: selectedType,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(_ => {
                  db.collection('gas_history').add({
                    weight: weight,
                    qty: qty,
                    stock_type: selectedType,
                    empty: emptyqty,
                    price: purchesPrice,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                  });
                  window.location.reload();
                  setIsLoading(false);
                });
            }
          });
        } else {
          db
            .collection('gas')
            .add({
              weight: weight,
              qty: parseInt(qty.trim()),
              price: parseInt(price.trim()),
              withoutCprice: parseInt(withoutCprice.trim()),
              saleprice: parseInt(saleprice.trim()),
              withoutSaleprice: parseInt(withoutSaleprice.trim()),
              downpayment: parseInt(downpayment.trim()),
              noOfInstallments: parseInt(noOfInstallments.trim()),
              amountPerIns: parseInt(amountPerIns.trim()),
              emptydownpayment: parseInt(emptyDownpayment.trim()),
              emptynoOfInstallments: parseInt(emptyNoOfInstallments.trim()),
              emptyamountPerIns: parseInt(emptyAmountPerIns.trim()),
              emptycashprice:parseInt(emptyCashPrice.trim()),
              emptysaleprice:parseInt(emptySaleprice.trim()),
              empty_tanks: parseInt(emptyqty.trim()),
              stock_type: selectedType,
              date: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(_ => {
              db.collection('gas_history').add({
                weight: weight,
                qty: qty,
                stock_type: selectedType,
                empty: emptyqty,
                price: purchesPrice,
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
              window.location.reload();
              setIsLoading(false);
            });
        }
      });
  };

  const handleChange = event => {
    setSelectedType(event.target.value);
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
                InputProps={{inputProps: {min: 1}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setWeight(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Full gas qty :
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setQty(e.target.value.trim());
                  }
                }}
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Empty gas qty :
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
                value={emptyqty}
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setEmptyQty(e.target.value.trim());
                  }
                }}
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12}>
              <hr />
              <h3
                style={{
                  textAlign: 'center',
                  fontSize: '20px',
                  color: 'grey',
                  marginTop: '20px',
                  fontWeight: 'bold',
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setPrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setWithoutCPrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
             <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Cash Price(Empty Cylinder) :
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
                value={emptyCashPrice}
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setEmptyCashPrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12}>
              <hr />
              <h3
                style={{
                  textAlign: 'center',
                  fontSize: '20px',
                  color: 'grey',
                  marginTop: '20px',
                  fontWeight: 'bold',
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setSalePrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setWithoutSalePrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
             <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Sale Price(Empty Cylinder) :
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
                value={emptySaleprice}
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setEmptySalePrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setPurchesPrice(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setDownpayment(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />
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
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setNoOfInstallments(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Amount Per Installment(LKR) :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="amountperinstallment"
                variant="outlined"
                required
                fullWidth
                id="amountperinstallment"
                label="AmountPerInstallment"
                size="small"
                type="number"
                value={amountPerIns}
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setAmountPerIns(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            
             <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Empty Gas Downpayment(LKR) :
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
                value={emptyDownpayment}
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setEmptyDownpayment(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Empty Gas No Of Installments(LKR) :
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
                value={emptyNoOfInstallments}
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setEmptyNoOfInstallments(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Empty Gas Amount Per Installment(LKR) :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="amountperinstallment"
                variant="outlined"
                required
                fullWidth
                id="amountperinstallment"
                label="AmountPerInstallment"
                size="small"
                type="number"
                value={emptyAmountPerIns}
                InputProps={{inputProps: {min: 0}}}
                onChange={e => {
                  if (e.target.value !== '') {
                    setEmptyAmountPerIns(e.target.value.trim());
                  }
                }}
              />
            </Grid>
            
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Select Stock type:
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl variant="outlined" className="fcontrol">
                <Select
                  className="roll_selector"
                  size="small"
                  native
                  onChange={handleChange}
                  value={selectedType}
                >
                  <option onChange={handleChange} value={'main'}>
                    main
                  </option>
                  <option onChange={handleChange} value={'shop'}>
                    shop
                  </option>
                  {allRoot.map(each =>
                    <option onChange={handleChange} key={each} value={each}>
                      {each}
                    </option>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3} />
            <Grid item xs={12} sm={12} />
          </Grid>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9} />
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
                {isLoading ? <Spin size="small" /> : 'Done'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
