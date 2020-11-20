import React, { useState } from "react";

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

export default function Add_Paysheet_Model() {
    // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

    const [basicSalary, setBasicSalary] = useState("");
    const [insentive, setInsentive] = useState("");
    const [phoneBill, setPhoneBill] = useState("");
    const [attendance, setAttendance] = useState("");
    const [epf, setEPF] = useState("");
    const [securityDeposit, setSecurityDeposit] = useState("");
    const [deduction, setDeduction] = useState("");
    const [advance, setAdvance] = useState("");
    const [loan, setLoan] = useState("");
    const [shortage, setShortage] = useState("");


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
             Basic Salary
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
                value={basicSalary}
                onChange={(e) => {
                  setBasicSalary(e.target.value);
                }}
              />
             </Grid>
         <Grid className="lbl_topi" item xs={12} sm={4}>
             Insentive
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
                value={insentive}
                onChange={(e) => {
                  setInsentive(e.target.value);
                }}
              />
           </Grid>
           <Grid className="lbl_topi" item xs={12} sm={4}>
            Phone Bill
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
                value={phoneBill}
                onChange={(e) => {
                  setPhoneBill(e.target.value);
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
              <TextField
                autoComplete="attn"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Attendant"
                size="small"
                value={attendance}
                onChange={(e) => {
                  setAttendance(e.target.value);
                }}
              />
         </Grid>
                        
          <Grid className="lbl_topi" item xs={12} sm={4}>
           EPF
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
                value={epf}
                onChange={(e) => {
                  setEPF(e.target.value);
                }}
              />
           </Grid>
         <Grid className="lbl_topi" item xs={12} sm={4}>
           Security Deposit
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
                value={securityDeposit}
                onChange={(e) => {
                  setSecurityDeposit(e.target.value);
                }}
              />
              </Grid>
          <Grid className="lbl_topi" item xs={12} sm={4}>
          Attendance duductions
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
                value={deduction}
                onChange={(e) => {
                  setDeduction(e.target.value);
                }}
              />
              </Grid>
        <Grid className="lbl_topi" item xs={12} sm={4}>
           Advance
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
                value={advance}
                onChange={(e) => {
                  setAdvance(e.target.value);
                }}
              />
             </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
           Loan
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
                value={loan}
                onChange={(e) => {
                  setLoan(e.target.value);
                }}
              />
            </Grid>
             <Grid className="lbl_topi" item xs={12} sm={4}>
           Shortage
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
                value={shortage}
                onChange={(e) => {
                  setShortage(e.target.value);
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
                  phoneBill.length === 0 ||
                  attendance.length === 0 
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
    )
}
