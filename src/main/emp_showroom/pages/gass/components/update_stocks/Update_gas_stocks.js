import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {TextField, Button, Select, FormControl} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'react-notifications/lib/notifications.css';

// styles
import './Update_gas.css';

import db from '../../../../../../config/firebase.js';
import {Spin} from 'antd';

export default function AddNew_Model() {
  const [weight, setWeight] = useState(0);
  const [selectedType, setSelectedType] = useState('main');
  const [allRoot, setAllRoot] = useState([]);
  const [qty, setQty] = useState(0);
  const [emptyqty, setEmptyQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  useEffect(
    () => {
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
    },
    // eslint-disable-next-line
    []
  );

   const submit = () => {
    if (weight > 0) {
      setIsLoading(true);
      db
        .collection('gas')
        .where('stock_type', '==', selectedType)
        .get()
        .then(re => {
          re.docs.forEach(eachGet => {
            if (eachGet.data().weight === weight) {
              db
                .collection('gas')
                .doc(eachGet.id)
                .update({
                  qty:
                    parseInt(qty) + parseInt(eachGet.data().qty),
                  empty_tanks:
                    parseInt(emptyqty) +
                      parseInt(eachGet.data().empty_tanks) -
                      parseInt(qty) <
                    0
                      ? 0
                      : parseInt(emptyqty) +
                        parseInt(eachGet.data().empty_tanks) -
                        parseInt(qty),
                })
                .then(_ => {
                  window.location.reload();
                  setIsLoading(false);
                });
            }
          });
        });
    }
  };

  const handleChange = event => {
    setSelectedType(event.target.value);
  };

  return (
    <Container component="main" className="main_container_addGass">
      <Typography className="title_sarani" variant="h5" gutterBottom>
        Update stocks
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
                InputProps={{inputProps: {min: 0}}}
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
            <Grid item xs={12} sm={12} />
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
                disabled={isLoading}
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
