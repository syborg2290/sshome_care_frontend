import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

// styles
import "./View_Model.css";

export default function View_Model({
  invoice_no,
  cname,
  nic,
  addres1,
  addres2,
  mobil1,
  mobil2,
  t_name,
  t_nic,
  t_address1,
  t_address2,
  t_mobile1,
  t_mobile2,
  t2_name,
  t2_nic,
  t2_address1,
  t2_address2,
  t2_mobile1,
  t2_mobile2,
}) {
  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Pending Black list
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
              <p>{invoice_no}</p>
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
              {cname}
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              NIC
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p> {nic}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Address 1
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p> {addres1}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              {" "}
              Address 2
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{addres2 === "" ? " - " : addres2}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele 1.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{mobil1}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele 2.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{mobil2 === "" ? " - " : mobil2}</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
            <Grid className="lbl_Subtopic" item xs={12} sm={12}>
              Trustee
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
              {t_name === "" ? " - " : t_name}
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              NIC
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p> {t_nic === "" ? " - " : t_nic}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Address 1
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t_address1 === "" ? " - " : t_address1}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              {" "}
              Address 2
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t_address2 === "" ? " - " : t_address2}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele 1.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t_mobile1 === "" ? " - " : t_mobile1}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele 2.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t_mobile2 === "" ? " - " : t_mobile2}</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>

            <Grid className="lbl_Subtopic" item xs={12} sm={12}>
              Trustee 2
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
              {t2_name === "" ? " - " : t2_name}
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              NIC
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p> {t2_nic === "" ? " - " : t2_nic}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Address 1
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t2_address1 === "" ? " - " : t2_address1}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              {" "}
              Address 2
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t2_address2 === "" ? " - " : t2_address2}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele 1.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t2_mobile1 === "" ? " - " : t2_mobile1}</p>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Tele 2.
            </Grid>
            <Grid item xs={12} sm={2}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{t2_mobile2 === "" ? " - " : t2_mobile2}</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}