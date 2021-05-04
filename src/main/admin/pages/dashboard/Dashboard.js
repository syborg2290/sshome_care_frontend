import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
// eslint-disable-next-line
import Typography from '@material-ui/core/Typography';
import {Grid, Card, CardContent} from '@material-ui/core';
import {Modal, Button} from 'antd';

//components
import ModelVehicalService from './components/Vehical_Service_Model';
// eslint-disable-next-line
import ArreasTable from '../dashboard/dashboard_contents/arreas_Table/Arreas_Table';
import PendingList from '../dashboard/dashboard_contents/pending_Blacklist/Pending_List';
// eslint-disable-next-line
import InvoiceList from '../dashboard/dashboard_contents/invoice_List/Invoice_List';
import ExpireInvoice from '../dashboard/dashboard_contents/expire_Table/Expire_Invoice';
// eslint-disable-next-line
import ReportCards from './dashboard_contents/reports_cards/Report_Cards';
import firebase from 'firebase';
import db from '../../../../config/firebase.js';

import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

// styles
import './Dashboard.css';

import {useHistory} from 'react-router-dom';

function isDateBeforeToday(date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

// function isDateBeforeNextDate(date) {
//   return new Date(date.toDateString()) > new Date(new Date().toDateString());
// }

// eslint-disable-next-line
function daysCountOfMonth(month, year) {
  return parseInt(new Date(year, month, 0).getDate());
}



export default function Dashboard() {
  const [pendingBlackList, setPendingBlackList] = useState([]);
  const [expiredList, setExpiredList] = useState([]);
  // eslint-disable-next-line
  const [recordPnl, setRecordPnl] = useState(false);
  // eslint-disable-next-line
  const [expencesPnl, setExpencesPnl] = useState(false);
  const [vehicalServiceModel, setVehicalServiceModel] = useState(false); //  model service Vehical
  let history = useHistory();

  const VehicalServiceModel = () => {
    setVehicalServiceModel(true);
  };

  const RecordPnl = () => {
    setRecordPnl(true);
    history.push('/admin/pages/records');
  };

  const ExpencesPnl = () => {
    setExpencesPnl(true);
    history.push('/admin/pages/expences');
  };

  useEffect(() => {
    window.addEventListener('offline', function (e) {
      history.push('/connection_lost');
    });

    db.collection('targets')
      .where('status', '==', 'ongoing')
      .get()
      .then((reAllTargets) => {
        reAllTargets.docs.forEach((eachTarget) => {
          let daysCountTarget =
            (new Date().getTime() -
              new Date(
                eachTarget.data().start_date?.seconds * 1000
              ).getTime()) /
            (1000 * 3600 * 24);

          if (daysCountTarget >= 30) {
            db.collection('targets').doc(eachTarget.id).update({
              status: 'Expired',
            });
          }
        });
      });

    db.collection('invoice')
      .where('status_of_payandgo', '==', 'expired')
      .get()
      .then((onSnap) => {
        var expiredRawData = [];
        onSnap.docs.forEach((each) => {
          expiredRawData.push({
            invoice_number: each.data().invoice_number,
            nic: each.data()?.nic,
            data: each.data(),
            id: each.id,
          });
        });
        setExpiredList(expiredRawData);
      });

    db.collection('invoice')
      .where('status_of_payandgo', '==', 'onGoing')
      .get()
      .then((onSnap) => {
        onSnap.docs.forEach(async (eachRe) => {
          let isBeforeDate = isDateBeforeToday(
            new Date(eachRe.data()?.deadlineTimestamp?.seconds * 1000)
          );
          if (isBeforeDate) {
            db.collection('invoice').doc(eachRe.id).update({
              status_of_payandgo: 'expired',
            });
          }

          checkInstallmentsStatus(eachRe);
        });
      });

    db.collection('invoice')
      .where('status_of_payandgo', '==', 'expired')
      .get()
      .then((onSnap) => {
        onSnap.docs.forEach(async (eachRe) => {
          checkInstallmentsStatusExpired(eachRe);
        });
      });

    // eslint-disable-next-line
  }, []);

  const checkInstallmentsStatus = async (eachRe) => {
    const installmentStatus = await db
      .collection('installment')
      .where('invoice_number', '==', eachRe.data().invoice_number)
      .get();

    if (installmentStatus.docs.length === 0) {
      intialStateOfArreasCheck(eachRe);
    } else {
      afterStateOfArreasCheck(installmentStatus, eachRe);
    }
  };

  const checkInstallmentsStatusExpired = async (eachRe) => {
    const installmentStatus = await db
      .collection('installment')
      .where('invoice_number', '==', eachRe.data().invoice_number)
      .get();

    if (installmentStatus.docs.length === 0) {
      intialStateOfArreasCheck(eachRe);
    } else {
      afterStateOfArreasCheck(installmentStatus, eachRe);
    }
  };

  const intialStateOfArreasCheck = async (eachRe) => {
    const delayedChargesIn =
      (parseInt(eachRe.data().amountPerInstallment) * 5) / 100;
    let daysCountNode1 =
      (new Date().getTime() -
        new Date(eachRe.data()?.nextDate?.seconds * 1000).getTime()) /
      (1000 * 3600 * 24);
      let daysCountInitial=0;
              if(!isDateBeforeToday(new Date(
                    eachRe.data()?.nextDate?.seconds * 1000
              ))) {
                 daysCountInitial = 0;
              } else {
                 daysCountInitial = daysCountNode1;
                  }
   
    if (eachRe.data().selectedType === 'shop') {
      if (7 - daysCountInitial >= 0) {
      } else {
        if (daysCountInitial - 7 > 7) {
          if (Math.round(daysCountInitial) - 7 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }

          db.collection('arrears')
            .where('invoice_number', '==', eachRe.data().invoice_number)
            .get()
            .then((reArreas) => {
              if (reArreas.docs.length > 0) {
                db.collection('arrears')
                  .doc(reArreas.docs[0].id)
                  .update({
                    delayed_days: Math.round(daysCountInitial) - 7,
                    status_of_payandgo: eachRe.data().status_of_payandgo,
                    balance: eachRe.data().balance,
                    delayed_charges:
                      daysCountInitial - 7 <= 7
                        ? 0
                        : (daysCountInitial - 7) / 7 < 2
                        ? delayedChargesIn
                        : (daysCountInitial - 7) / 7 > 2 &&
                          (daysCountInitial - 7) / 7 < 3
                        ? delayedChargesIn * 2
                        : (daysCountInitial - 7) / 7 > 3 &&
                          (daysCountInitial - 7) / 7 < 4
                        ? delayedChargesIn * 3
                        : (daysCountInitial - 7) / 7 > 4 &&
                          (daysCountInitial - 7) / 7 < 5
                        ? delayedChargesIn * 4
                        : (daysCountInitial - 7) / 7 > 5 &&
                          (daysCountInitial - 7) / 7 < 6
                        ? delayedChargesIn * 5
                        : (daysCountInitial - 7) / 7 > 6 &&
                          (daysCountInitial - 7) / 7 < 7
                        ? delayedChargesIn * 6
                        : (daysCountInitial - 7) / 7 > 7 &&
                          (daysCountInitial - 7) / 7 < 8
                        ? delayedChargesIn * 7
                        : (delayedChargesIn * (daysCountInitial - 7)) / 7,
                  });
              } else {
                db.collection('arrears').add({
                  invoice_number: eachRe.data().invoice_number,
                  type: eachRe.data().selectedType,
                  villageRoot: eachRe.data().root_village,
                  mid: eachRe.data().mid,
                  customer_id: eachRe.data().customer_id,
                  nic: eachRe.data().nic,
                  balance: eachRe.data().balance,
                  amountPerInstallment: eachRe.data().amountPerInstallment,
                  noOfInstallment: eachRe.data().noOfInstallment,
                  status_of_payandgo: eachRe.data().status_of_payandgo,
                  delayed_days: Math.round(daysCountInitial) - 7,
                  delayed_charges:
                    daysCountInitial - 7 <= 7
                      ? 0
                      : (daysCountInitial - 7) / 7 < 2
                      ? delayedChargesIn
                      : (daysCountInitial - 7) / 7 > 2 &&
                        (daysCountInitial - 7) / 7 < 3
                      ? delayedChargesIn * 2
                      : (daysCountInitial - 7) / 7 > 3 &&
                        (daysCountInitial - 7) / 7 < 4
                      ? delayedChargesIn * 3
                      : (daysCountInitial - 7) / 7 > 4 &&
                        (daysCountInitial - 7) / 7 < 5
                      ? delayedChargesIn * 4
                      : (daysCountInitial - 7) / 7 > 5 &&
                        (daysCountInitial - 7) / 7 < 6
                      ? delayedChargesIn * 5
                      : (daysCountInitial - 7) / 7 > 6 &&
                        (daysCountInitial - 7) / 7 < 7
                      ? delayedChargesIn * 6
                      : (daysCountInitial - 7) / 7 > 7 &&
                        (daysCountInitial - 7) / 7 < 8
                      ? delayedChargesIn * 7
                      : (delayedChargesIn * (daysCountInitial - 7)) / 7,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
        }
      }
    } else {
      if (14 - daysCountInitial >= 0) {
      } else {
        if (daysCountInitial - 14 > 7) {
          if (Math.round(daysCountInitial) - 14 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }
          db.collection('arrears')
            .where('invoice_number', '==', eachRe.data().invoice_number)
            .get()
            .then((reArreas) => {
              if (reArreas.docs.length > 0) {
                db.collection('arrears')
                  .doc(reArreas.docs[0].id)
                  .update({
                    delayed_days: Math.round(daysCountInitial) - 14,
                    status_of_payandgo: eachRe.data().status_of_payandgo,
                    balance: eachRe.data().balance,
                    delayed_charges:
                      daysCountInitial - 14 <= 7
                        ? 0
                        : (daysCountInitial - 14) / 7 < 2
                        ? delayedChargesIn
                        : (daysCountInitial - 14) / 7 > 2 &&
                          (daysCountInitial - 14) / 7 < 3
                        ? delayedChargesIn * 2
                        : (daysCountInitial - 14) / 7 > 3 &&
                          (daysCountInitial - 14) / 7 < 4
                        ? delayedChargesIn * 3
                        : (daysCountInitial - 14) / 7 > 4 &&
                          (daysCountInitial - 14) / 7 < 5
                        ? delayedChargesIn * 4
                        : (daysCountInitial - 14) / 7 > 5 &&
                          (daysCountInitial - 14) / 7 < 6
                        ? delayedChargesIn * 5
                        : (daysCountInitial - 14) / 7 > 6 &&
                          (daysCountInitial - 14) / 7 < 7
                        ? delayedChargesIn * 6
                        : (daysCountInitial - 14) / 7 > 7 &&
                          (daysCountInitial - 14) / 7 < 8
                        ? delayedChargesIn * 7
                        : (delayedChargesIn * (daysCountInitial - 14)) / 7,
                  });
              } else {
                db.collection('arrears').add({
                  invoice_number: eachRe.data().invoice_number,
                  customer_id: eachRe.data().customer_id,
                  type: eachRe.data().selectedType,
                  villageRoot: eachRe.data().root_village,
                  mid: eachRe.data().mid,
                  nic: eachRe.data().nic,
                  balance: eachRe.data().balance,
                  amountPerInstallment: eachRe.data().amountPerInstallment,
                  noOfInstallment: eachRe.data().noOfInstallment,
                  status_of_payandgo: eachRe.data().status_of_payandgo,
                  delayed_days: Math.round(daysCountInitial) - 14,
                  delayed_charges:
                    daysCountInitial - 14 <= 7
                      ? 0
                      : (daysCountInitial - 14) / 7 < 2
                      ? delayedChargesIn
                      : (daysCountInitial - 14) / 7 > 2 &&
                        (daysCountInitial - 14) / 7 < 3
                      ? delayedChargesIn * 2
                      : (daysCountInitial - 14) / 7 > 3 &&
                        (daysCountInitial - 14) / 7 < 4
                      ? delayedChargesIn * 3
                      : (daysCountInitial - 14) / 7 > 4 &&
                        (daysCountInitial - 14) / 7 < 5
                      ? delayedChargesIn * 4
                      : (daysCountInitial - 14) / 7 > 5 &&
                        (daysCountInitial - 14) / 7 < 6
                      ? delayedChargesIn * 5
                      : (daysCountInitial - 14) / 7 > 6 &&
                        (daysCountInitial - 14) / 7 < 7
                      ? delayedChargesIn * 6
                      : (daysCountInitial - 14) / 7 > 7 &&
                        (daysCountInitial - 14) / 7 < 8
                      ? delayedChargesIn * 7
                      : (delayedChargesIn * (daysCountInitial - 14)) / 7,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
        }
      }
    }
  };

  const afterStateOfArreasCheck = async (instReDoc, eachRe) => {
    const delayedChargesIn =
      (parseInt(eachRe.data().amountPerInstallment) * 5) / 100;

    let daysCountNode2 =
      (new Date().getTime() -
        new Date(eachRe.data()?.nextDate?.seconds * 1000).getTime()) /
      (1000 * 3600 * 24);
     let daysCount = 0;
               if(!isDateBeforeToday(new Date(
                    eachRe.data()?.nextDate?.seconds * 1000
              ))) {
                 daysCount = 0;
                
               } else {
                 daysCount =
                   daysCountNode2;
                //     daysCount =
                // daysCountNode2 +
                // daysCountOfMonth(
                //   new Date().getMonth(),
                //   new Date().getFullYear()
                // );
                  }

    let instRECheckCount = 0;

    instReDoc.docs.forEach((instCheckRe) => {
      if (instCheckRe.data().delayed > 0) {
        instRECheckCount = instRECheckCount + 1;
      }
    });

    if (instRECheckCount >= 7) {
      setPendingBlackList([
        ...pendingBlackList,
        {
          invoice_number: eachRe.data()?.invoice_number,
          nic: eachRe.data()?.nic,
        },
      ]);
    }

    if (eachRe.data().selectedType === 'shop') {
      if (7 - daysCount >= 0) {
      } else {
        if (daysCount - 7 > 7) {
          if (Math.round(daysCount) - 7 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }

          let statusMonth = await db
            .collection('arrears')
            .where('invoice_number', '==', eachRe.data().invoice_number)
            .get();

          if (statusMonth.docs.length > 0) {
            db.collection('arrears')
              .doc(statusMonth.docs[0].id)
              .update({
                delayed_days: daysCount - 7,
                status_of_payandgo: eachRe.data().status_of_payandgo,
                balance: eachRe.data().balance,
                delayed_charges:
                  daysCount - 7 <= 7
                    ? 0
                    : (daysCount - 7) / 7 < 2
                    ? delayedChargesIn
                    : (daysCount - 7) / 7 > 2 && (daysCount - 7) / 7 < 3
                    ? delayedChargesIn * 2
                    : (daysCount - 7) / 7 > 3 && (daysCount - 7) / 7 < 4
                    ? delayedChargesIn * 3
                    : (daysCount - 7) / 7 > 4 && (daysCount - 7) / 7 < 5
                    ? delayedChargesIn * 4
                    : (daysCount - 7) / 7 > 5 && (daysCount - 7) / 7 < 6
                    ? delayedChargesIn * 5
                    : (daysCount - 7) / 7 > 6 && (daysCount - 7) / 7 < 7
                    ? delayedChargesIn * 6
                    : (daysCount - 7) / 7 > 7 && (daysCount - 7) / 7 < 8
                    ? delayedChargesIn * 7
                    : (delayedChargesIn * (daysCount - 7)) / 7,
              });
          } else {
            db.collection('arrears').add({
              invoice_number: eachRe.data().invoice_number,
              customer_id: eachRe.data().customer_id,
              type: eachRe.data().selectedType,
              villageRoot: eachRe.data().root_village,
              mid: eachRe.data().mid,
              nic: eachRe.data().nic,
              balance: eachRe.data().balance,
              amountPerInstallment: eachRe.data().amountPerInstallment,
              noOfInstallment: eachRe.data().noOfInstallment,
              status_of_payandgo: eachRe.data().status_of_payandgo,
              delayed_days: Math.round(daysCount) - 7,
              delayed_charges:
                daysCount - 7 <= 7
                  ? 0
                  : (daysCount - 7) / 7 < 2
                  ? delayedChargesIn
                  : (daysCount - 7) / 7 > 2 && (daysCount - 7) / 7 < 3
                  ? delayedChargesIn * 2
                  : (daysCount - 7) / 7 > 3 && (daysCount - 7) / 7 < 4
                  ? delayedChargesIn * 3
                  : (daysCount - 7) / 7 > 4 && (daysCount - 7) / 7 < 5
                  ? delayedChargesIn * 4
                  : (daysCount - 7) / 7 > 5 && (daysCount - 7) / 7 < 6
                  ? delayedChargesIn * 5
                  : (daysCount - 7) / 7 > 6 && (daysCount - 7) / 7 < 7
                  ? delayedChargesIn * 6
                  : (daysCount - 7) / 7 > 7 && (daysCount - 7) / 7 < 8
                  ? delayedChargesIn * 7
                  : (delayedChargesIn * (daysCount - 7)) / 7,
              date: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      }
    } else {
      if (14 - daysCount >= 0) {
      } else {
        if (daysCount - 14 > 7) {
          if (Math.round(daysCount) - 14 >= 49) {
            setPendingBlackList([
              ...pendingBlackList,
              {
                invoice_number: eachRe.data().invoice_number,
                nic: eachRe.data()?.nic,
              },
            ]);
          }

          let statusWeek = await db
            .collection('arrears')
            .where('invoice_number', '==', eachRe.data().invoice_number)
            .get();

          if (statusWeek.docs.length > 0) {
            db.collection('arrears')
              .doc(statusWeek.docs[0].id)
              .update({
                delayed_days: Math.round(daysCount) - 14,
                status_of_payandgo: eachRe.data().status_of_payandgo,
                balance: eachRe.data().balance,
                delayed_charges:
                  daysCount - 14 <= 7
                    ? 0
                    : (daysCount - 14) / 7 < 2
                    ? delayedChargesIn
                    : (daysCount - 14) / 7 > 2 && (daysCount - 14) / 7 < 3
                    ? delayedChargesIn * 2
                    : (daysCount - 14) / 7 > 3 && (daysCount - 14) / 7 < 4
                    ? delayedChargesIn * 3
                    : (daysCount - 14) / 7 > 4 && (daysCount - 14) / 7 < 5
                    ? delayedChargesIn * 4
                    : (daysCount - 14) / 7 > 5 && (daysCount - 14) / 7 < 6
                    ? delayedChargesIn * 5
                    : (daysCount - 14) / 7 > 6 && (daysCount - 14) / 7 < 7
                    ? delayedChargesIn * 6
                    : (daysCount - 14) / 7 > 7 && (daysCount - 14) / 7 < 8
                    ? delayedChargesIn * 7
                    : (delayedChargesIn * (daysCount - 14)) / 7,
              });
          } else {
            db.collection('arrears').add({
              invoice_number: eachRe.data().invoice_number,
              customer_id: eachRe.data().customer_id,
              type: eachRe.data().selectedType,
              villageRoot: eachRe.data().root_village,
              mid: eachRe.data().mid,
              nic: eachRe.data().nic,
              balance: eachRe.data().balance,
              amountPerInstallment: eachRe.data().amountPerInstallment,
              noOfInstallment: eachRe.data().noOfInstallment,
              status_of_payandgo: eachRe.data().status_of_payandgo,
              delayed_days: Math.round(daysCount) - 14,
              delayed_charges:
                daysCount - 14 <= 7
                  ? 0
                  : (daysCount - 14) / 7 < 2
                  ? delayedChargesIn
                  : (daysCount - 14) / 7 > 2 && (daysCount - 14) / 7 < 3
                  ? delayedChargesIn * 2
                  : (daysCount - 14) / 7 > 3 && (daysCount - 14) / 7 < 4
                  ? delayedChargesIn * 3
                  : (daysCount - 14) / 7 > 4 && (daysCount - 14) / 7 < 5
                  ? delayedChargesIn * 4
                  : (daysCount - 14) / 7 > 5 && (daysCount - 14) / 7 < 6
                  ? delayedChargesIn * 5
                  : (daysCount - 14) / 7 > 6 && (daysCount - 14) / 7 < 7
                  ? delayedChargesIn * 6
                  : (daysCount - 14) / 7 > 7 && (daysCount - 14) / 7 < 8
                  ? delayedChargesIn * 7
                  : (delayedChargesIn * (daysCount - 14)) / 7,
              date: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      }
    }
  };

  return (
    <>
      {/*Start Vehical Service Model */}

      <Modal
        visible={vehicalServiceModel}
        footer={null}
        className="vehical_servicemdl"
        onCancel={() => {
          setVehicalServiceModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ModelVehicalService />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  Vehical Service Model  */}

      <Grid container spacing={4}>
        <Grid className="titl_Dash" item xs={12}></Grid>
      </Grid>

      {/*START Arreas Table */}

      {/* <Grid item xs={12}>
          <ReportCards />
        </Grid> */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div className="dash_btn">
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  className="btn_Dash"
                  endIcon={<FolderOpenIcon />}
                  onClick={RecordPnl}
                >
                  Reports
                </Button>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  className="btn_Expences"
                  endIcon={<PostAddIcon />}
                  onClick={ExpencesPnl}
                >
                  Add Expenses
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  className="btn_VehicalService"
                  endIcon={<SettingsApplicationsIcon />}
                  onClick={VehicalServiceModel}
                >
                  Vehical Services
                </Button>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* END Arreas Table */}

      <Container component="main" className="main_containerDash">
        {/*START Cards */}
        {/* <Grid container spacing={4}>
          <Grid item xs={12}>
            <ArreasTable />
          </Grid>
        </Grid> */}
        {/* END Cards  */}

        {/*START Expire Invoice Table */}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ExpireInvoice expire_list={expiredList} />
          </Grid>
        </Grid>
        {/* END Expire Invoice Table */}

        {/*START BlockListPrnding Table */}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PendingList pendingBlackList={pendingBlackList} />
          </Grid>
        </Grid>
        {/*END BlockListPrnding Table */}

        <br />

        {/*START Invoices  Table */}

        {/* <Typography className="today_invoices" variant="h4" component="h6">
          All invoices of issued in recently
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <InvoiceList />
          </Grid>
        </Grid> */}
        {/*END Invoices  Table */}
      </Container>
    </>
  );
}
