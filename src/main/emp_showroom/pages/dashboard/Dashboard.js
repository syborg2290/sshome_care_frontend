import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";

// eslint-disable-next-line
import { Grid } from "@material-ui/core";

import ExpireInvoice from "../dashboard/dashboard_contents/expire_Table/Expire_Invoice";

import db from "../../../../config/firebase.js";

// styles
import "./Dashboard.css";

import { useHistory } from "react-router-dom";

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
  const [expiredList, setExpiredList] = useState([]);
  // eslint-disable-next-line
  const [recordPnl, setRecordPnl] = useState(false);
  // eslint-disable-next-line
  const [expencesPnl, setExpencesPnl] = useState(false);
  let history = useHistory();

  // eslint-disable-next-line
  const RecordPnl = () => {
    setRecordPnl(true);
    history.push("/showroom/pages/records");
  };

  // eslint-disable-next-line
  const ExpencesPnl = () => {
    setExpencesPnl(true);
    history.push("/showroom/pages/expences");
  };

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    

    db.collection("targets")
      .where("status", "==", "ongoing")
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
            db.collection("targets").doc(eachTarget.id).update({
              status: "Expired"
            });
          }
        });
      });

    db.collection("invoice")
      .where("status_of_payandgo", "==", "expired")
      .get()
      .then((onSnap) => {
        var expiredRawData = [];
        onSnap.docs.forEach((each) => {
          expiredRawData.push({
            invoice_number: each.data().invoice_number,
            nic: each.data()?.nic,
            data: each.data(),
            id: each.id
          });
        });
        setExpiredList(expiredRawData);
      });

    db.collection("invoice")
      .where("status_of_payandgo", "==", "onGoing")
      .get()
      .then((onSnap) => {
        onSnap.docs.forEach(async (eachRe) => {
          let isBeforeDate = isDateBeforeToday(
            new Date(
              new Date(eachRe.data()?.deadlineTimestamp?.seconds * 1000).setDate(new Date(eachRe.data()?.deadlineTimestamp?.seconds * 1000).getDate() + 7))
          );
          if (isBeforeDate) {
            db.collection("invoice").doc(eachRe.id).update({
              status_of_payandgo: "expired"
            });
          }
        });
      });
      arreasAllDelete();
    // eslint-disable-next-line
  }, []);
  
   const arreasAllDelete = () => {
    db.collection("arrears")
      .get()
      .then((val) => {
        val.docs.forEach(async (eachArr) => {
          await db.collection("arrears").doc(eachArr.id).delete();
        });
      });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid className="titl_Dash" item xs={12}></Grid>
      </Grid>

      <Container component="main" className="main_containerDash">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ExpireInvoice expire_list={expiredList} />
          </Grid>
        </Grid>
        {/* END Expire Invoice Table */}

        <br />
      </Container>
    </>
  );
}
