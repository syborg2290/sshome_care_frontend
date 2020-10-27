import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";

import db from "../../../../../../config/firebase.js";

// styles
import "./View_Model.css";

export default function View_Model({ invoice_num, seized_date, nic }) {
  const [fullname, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [tele1, setTele1] = useState("");
  const [tele2, setTele2] = useState("");

  const [totalInstallmentsPaid, setTotalInstallmentsPaid] = useState(0);
  const [downPayment, setDownPayment] = useState(0);

  useEffect(() => {
    db.collection("customer")
      .where("nic", "==", nic)
      .get()
      .then((reCust) => {
        if (reCust.docs.length > 0) {
          setFullName(
            reCust.docs[0]?.data()?.fname + " " + reCust.docs[0]?.data()?.lname
          );
          setAddress1(reCust.docs[0]?.data()?.address1);
          setAddress2(reCust.docs[0]?.data()?.address2);
          setTele1(reCust.docs[0]?.data()?.mobile1);
          setTele2(reCust.docs[0]?.data()?.mobile2);
        }
      });
    db.collection("installment")
      .where("invoice_number", "==", invoice_num)
      .get()
      .then((inst) => {
        if (inst.docs.length > 0) {
          inst.docs.forEach((docRe) => {
            let plus = docRe.data()?.amount;
            let now = totalInstallmentsPaid;
            setTotalInstallmentsPaid(plus + now);
          });
        }
      });

    db.collection("invoice")
      .where("invoice_number", "==", invoice_num)
      .get()
      .then((reInvoice) => {
        if (reInvoice.docs.length > 0) {
          setDownPayment(reInvoice.docs[0]?.data()?.items[0]?.downpayment);
        }
      });
     // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        View Seized Item
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
              <p>{invoice_num}</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Seized Date
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{seized_date}</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_Subtopic" item xs={12} sm={12}>
              Customer
            </Grid>
            <Grid item xs={12} sm={6}>
              <hr className="hr_Subtopic" />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Full Name
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={2}>
              {fullname}
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              NIC
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{nic}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Address
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{address1}</p>
            </Grid>

            <Grid item xs={12} sm={6}>
              <p>{address2 === "" ? "-" : address2}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{tele1}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{tele2 === "" ? " - " : tele2}</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={7}>
              Paid Installment Total(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid className="totls" item xs={12} sm={3}>
              <p>{totalInstallmentsPaid}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={7}>
              Down Payment(LKR)
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid className="totls" item xs={12} sm={3}>
              <p>{downPayment}</p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
