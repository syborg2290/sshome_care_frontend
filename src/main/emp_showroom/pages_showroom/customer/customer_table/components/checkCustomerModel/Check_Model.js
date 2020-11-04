import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "react-notifications/lib/notifications.css";
import "./Check_Model.css";

export default function Check_Model() {
  const [custNic, setCustNic] = useState("");
  const [trustee1Nic, setTrustee1Nic] = useState("");
  const [trustee2Nic, setTrustee2Nic] = useState("");
  const [validation, setValidation] = useState("");
  const checkCustomer = async (e) => {
    e.preventDefault();
    if (custNic === "") {
      setValidation("Customer's NIC is required!");
    } else {
      if (trustee1Nic === "") {
        setValidation("Trustee's 1 NIC is required!");
      }
    }
  };

  return (
    <>
      <Typography className="titles" variant="h5" gutterBottom>
        Check Customer & Trustees
      </Typography>
      <Grid item xs={12} sm={6}>
        <hr className="titles_hr" />
      </Grid>
      <Container component="main" className="main_container_check">
        <div className="paper_check">
          <form className="form_check" noValidate>
            <Grid container spacing={2}>
              <Grid className="txt_Labels" item xs={12} sm={4}>
                Customer NIC
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  value={custNic}
                  className="txtt_nic"
                  autoComplete="custNic"
                  name="custNic"
                  variant="outlined"
                  required
                  fullWidth
                  id="custNic"
                  label=" Customer NIC"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    setCustNic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={1}></Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}>
                Trustee 1 NIC
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  value={trustee1Nic}
                  className="txtt_nic"
                  autoComplete="t1nic"
                  name="t1nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="t1nic"
                  label=" Trustee 1 NIC"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    setTrustee1Nic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={1}></Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}>
                Trustee 2 NIC
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  value={trustee2Nic}
                  className="txtt_nic"
                  autoComplete="t2Nic"
                  name="t2Nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="t2Nic"
                  label=" Trustee 2 NIC"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    setTrustee2Nic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={1}></Grid>

              <p className="validate_check">{validation}</p>

              <Grid className="txt_Note" item xs={12} sm={9}></Grid>
              <Grid className="btn_chk" item xs={12} sm={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn_Check"
                  onClick={checkCustomer}
                >
                  Check
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
