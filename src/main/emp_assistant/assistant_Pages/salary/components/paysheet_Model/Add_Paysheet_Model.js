import React, { useState, useEffect } from "react";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import { Spin } from "antd";
// styles
import "./Add_Paysheet_Model.css";

import db from "../../../../../../config/firebase.js";

export default function Add_Paysheet_Model({ nic }) {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [basicSalary, setBasicSalary] = useState(0);
  const [insentive, setInsentive] = useState(0);
  const [phoneBill, setPhoneBill] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [epf, setEPF] = useState(0);
  const [paidSecurityDepo, setPaidSecurityDepo] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [loan, setLoan] = useState(0);
  const [loanBalance, setLoanBalance] = useState(0);
  const [shortage, setShortage] = useState(0);
  const [saleTarget, setSaleTarget] = useState(0);
  const [cashTarget, setCashTarget] = useState(0);
  const [exCard, setExCard] = useState(0);
  const [cashSale, setCashSale] = useState(0);

  useEffect(() => {
    setLoading(true);
    db.collection("root")
      .get()
      .then((reRoot) => {
        reRoot.docs.forEach((eachRoot) => {
          if (eachRoot.data().employee1 === nic) {
          }

          if (eachRoot.data().employee2 === nic) {
          }
        });
      });
    db.collection("employee")
      .where("nic", "==", nic)
      .get()
      .then((reEmp) => {
        setBasicSalary(parseInt(reEmp.docs[0].data().basic));
        setPaidSecurityDepo(parseInt(reEmp.docs[0].data().security_deposit));
        db.collection("loans")
          .where("nic", "==", nic)
          .get()
          .then((reLoan) => {
            if (reLoan.docs.length > 0) {
              if (reLoan.docs[0].data().balance > 0) {
                setLoanBalance(reLoan.docs[0].data().balance);
                setLoan(reLoan.docs[0].data().salary_cut);
              }
            }

            db.collection("salary_advance")
              .where("nic", "==", nic)
              .get()
              .then((salAd) => {
                var unpaidamount = 0;

                salAd.docs.forEach((reEach) => {
                  if (reEach.data().status === "unpaid") {
                    unpaidamount =
                      unpaidamount + parseInt(reEach.data().amount);
                  }
                });
                setAdvance(unpaidamount);
                setLoading(false);
              });
          });
      });
  }, []);

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Make Salary
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Basic Salary(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="bsly"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Basic Salary"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={basicSalary}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setBasicSalary(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Insentive(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="insn"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Insentive"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={insentive}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setInsentive(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Phone Bill(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="pbill"
                variant="outlined"
                required
                fullWidth
                type="number"
                label=" Phone Bill"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={phoneBill}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setPhoneBill(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Attendant
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>27 days</p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              EPF(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="epf"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="EPF"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={epf}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setEPF(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Security Deposit(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="sdp"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Security Deposit"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={securityDeposit}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setSecurityDeposit(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                Paid security deposit amount(LKR) : {paidSecurityDepo}
              </p>
            </Grid>

            <Grid className="lbl_topi" item xs={12} sm={4}>
              Attendance deductions(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="sdp"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Security Deposit"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={deduction}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setDeduction(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Salary Advance(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="adv"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Advance"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={advance}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setAdvance(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Loan(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="lon"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Loan"
                size="small"
                disabled={loanBalance === 0 ? true : false}
                InputProps={{ inputProps: { min: 0 } }}
                value={loan}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setLoan(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                Current loan balance(LKR) : {loanBalance}
              </p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Shortage(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="sho"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Shortage"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={shortage}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setShortage(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Sale Target(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="sho"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Sale Target"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={saleTarget}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setSaleTarget(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Cash Target(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="trgtCASH"
                variant="outlined"
                required
                fullWidth
                type="number"
                label=" Cash Target"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={cashTarget}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setCashTarget(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Cash Sale(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="cashsle"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Cash Sale"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={cashSale}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setCashSale(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              EX Card(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="ex"
                variant="outlined"
                required
                fullWidth
                type="number"
                label=" EX Card"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={exCard}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setExCard(parseInt(e.target.value.trim()));
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                // onClick={addRepair}
                disabled={
                  loading ||
                  basicSalary.length === 0 ||
                  insentive.length === 0 ||
                  phoneBill.length === 0
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
