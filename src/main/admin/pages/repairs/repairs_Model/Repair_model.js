import React, {useState, useEffect} from 'react';

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Select,
} from '@material-ui/core';

import {ExclamationCircleOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {Modal} from 'antd';
import firebase from 'firebase';
import moment from 'moment';
import db from '../../../../../config/firebase.js';

// styles
import './Repair_model.css';

export default function Repair_model({closeModel}) {
  const {confirm} = Modal;
  let history = useHistory();
  let history2 = useHistory();
  const [selectedType, setSelectedType] = useState('shop');
  const [itemName, setItemName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [model_no, setModel_no] = useState('');
  const [cust_name, setCust_name] = useState('');
  // eslint-disable-next-line
  const [nic, setNic] = useState('');
  const [mobil_no1, setMobil_no1] = useState('');
  const [mobil_no2, setMobil_no2] = useState('');
  const [description, setDescription] = useState('');
  const [allRoot, setAllRoot] = useState([]);

  useEffect(() => {
    window.addEventListener('offline', function(e) {
      history2.push('/connection_lost');
    });
    db.collection('root').get().then(re => {
      var rawRoot = [];
      re.docs.forEach(each => {
        rawRoot.push(each.data().root);
      });
      setAllRoot(rawRoot);
    });
  });

  const handleChange = event => {
    setSelectedType(event.target.value);
  };

  const showConfirm = () => {
    confirm({
      title: 'Do you want to print a receipt?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        db
          .collection('repair')
          .add({
            serail_no: serialNo.trim(),
            type: selectedType,
            model_no: model_no.trim(),
            nic: nic,
            cust_name: cust_name.trim(),
            mobil_no1: mobil_no1.trim(),
            mobil_no2: mobil_no2.trim(),
            item_name: itemName,
            status: 'accepted',
            description: description.trim(),
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            var passingWithCustomerObj = {
              serail_no: serialNo.trim(),
              model_no: model_no.trim(),
              nic: nic,
              item_name: itemName,
            };
            let moveWith = {
              pathname: '/admin/repair/repairRecipt',
              search: '?query=abc',
              state: {detail: passingWithCustomerObj},
            };
            history.push(moveWith);
          });
      },
      onCancel() {
        db
          .collection('repair')
          .add({
            serail_no: serialNo.trim(),
            type: selectedType,
            model_no: model_no.trim(),
            nic: nic,
            cust_name: cust_name.trim(),
            mobil_no1: mobil_no1.trim(),
            mobil_no2: mobil_no2.trim(),
            item_name: itemName,
            status: 'accepted',
            description: description.trim(),
            date: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            window.location.reload();
          });
      },
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
              Item name
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
                label="Item name"
                size="small"
                value={itemName}
                onChange={e => {
                  setItemName(e.target.value);
                }}
              />
            </Grid>
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
                onChange={e => {
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
                onChange={e => {
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
                onChange={e => {
                  setCust_name(e.target.value);
                }}
              />
            </Grid>

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
                onChange={e => {
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
                onChange={e => {
                  setMobil_no1(e.target.value);
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mobil_no"
                variant="outlined"
                fullWidth
                label="Mobil 2"
                type="number"
                size="small"
                value={mobil_no2}
                onChange={e => {
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
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Choose one
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                className="roll_selector"
                size="small"
                native
                onChange={handleChange}
                value={selectedType}
              >
                <option onChange={handleChange} value={'shop'}>
                  shop
                </option>
                {allRoot.map(each =>
                  <option onChange={handleChange} key={each} value={each}>
                    {each}
                  </option>
                )}
              </Select>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                {' '}{moment(
                  firebase.firestore.FieldValue.serverTimestamp()
                ).format('dddd, MMMM Do YYYY')}
              </p>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={9} />
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={showConfirm}
              >
                {'Add'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
