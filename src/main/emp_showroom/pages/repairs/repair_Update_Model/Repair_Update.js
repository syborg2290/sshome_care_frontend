import React, {useState, useEffect} from 'react';
import {Radio} from 'antd';
import {Grid, Container, Typography, Button} from '@material-ui/core';
import firebase from 'firebase';
import moment from 'moment';
import {useHistory} from 'react-router-dom';

import db from '../../../../../config/firebase.js';

// styles
import './Repair_Update.css';

export default function Repair_Update({
  serial_no,
  statusProp,
  docId,
  closeModel,
}) {
  const [status, setStatus] = useState(statusProp);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener('offline', function(e) {
      history.push('/connection_lost');
    });
  });

  const updateStatus = () => {
    db
      .collection('repair')
      .doc(docId)
      .update({
        status: status,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(_ => {
        if (status === 'back_to_customer') {
          db.collection('repair').doc(docId).delete().then(() => {
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
      });
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Update Repair Item
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
              <p>
                {serial_no}
              </p>
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
                ).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Radio.Group
                value={status}
                onChange={e => setStatus(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="accepted">Accepted</Radio.Button>
                <Radio.Button value="return_to_company">
                  Return to company
                </Radio.Button>
                <Radio.Button value="return_from_company">
                  Return from company
                </Radio.Button>
                <Radio.Button value="back_to_customer">Job Done</Radio.Button>
              </Radio.Group>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={9} />
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={updateStatus}
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
