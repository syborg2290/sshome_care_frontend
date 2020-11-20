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
  const [saleTarget, setSaleTarget] = useState("");
  const [cashTarget, setCashTarget] = useState("");
  const [exCard, setExCard] = useState("");
  const [cashSale, setCashSale] = useState("");


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
                  setBasicSalary(e.target.value);
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
                  setInsentive(e.target.value);
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
                <p>27 days</p>
              {/* <TextField
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
              /> */}
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
                  setEPF(e.target.value);
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
                  setSecurityDeposit(e.target.value);
                }}
              />
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
                  setDeduction(e.target.value);
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
                  setAdvance(e.target.value);
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
                 InputProps={{ inputProps: { min: 0 } }}
                value={loan}
                onChange={(e) => {
                  setLoan(e.target.value);
                }}
              />
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
                  setShortage(e.target.value);
                }}
              />
                </Grid>
          <Grid item xs={12} sm={12}><hr /></Grid>
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
                  setSaleTarget(e.target.value);
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
                  setCashTarget(e.target.value);
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
                  setCashSale(e.target.value);
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
                  setExCard(e.target.value);
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
