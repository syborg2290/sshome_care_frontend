import React, { useState, useEffect } from "react";
import { Row, Col ,Spin} from "antd";
import {
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Container,
  Typography,

} from "@material-ui/core";

// styles
import "./Update_Status.css";

export default function Update_Status({
  fname,
  lname,
  nic,
  date,
//   reason,
}) {

    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
     const [reason, setReason] = useState("");
    
    return (

        <>

            <Container component="main" className="main_container_upStts">
                 <Typography className="title_root" variant="h5" gutterBottom>
                 Employee leaves
                </Typography>
                <Grid item xs={12} sm={2}>
                     <hr className="titles_hr_root" />
                 </Grid>
                 <Row>              
                <Col className="customer_details_sarani" span={8}>
                    First Name
                 </Col>
                <Col className="customer_sarani" span={2}>
                    :
                 </Col>
                <Col className="customer_sarani" span={14}>
                    {fname}
                </Col>
                <Col className="customer_details_sarani" span={8}>
                    Last Name
                 </Col>
                <Col className="customer_sarani" span={2}>
                    :
                 </Col>
                <Col className="customer_sarani" span={14}>
                    {lname}
                </Col>

                <Col className="customer_details_sarani" span={8}>
                    NIC
                 </Col>
                <Col className="customer_sarani" span={2}>
                    :
                 </Col>
                <Col className="customer_sarani" span={14}>
                    {nic}
                    </Col>
                       <Col className="customer_details_sarani" span={8}>
                    Date
                </Col>
                <Col className="customer_sarani" span={2}>
                    :
                </Col>
                <Col className="customer_sarani" span={14}>
                    {date}
                </Col>


                <Col className="customer_details_sarani" span={8}>
                    Reason
                </Col>
                <Col className="customer_sarani" span={2}>
                    :
                </Col>
                <Col className="customer_sarani" span={14}>
                    <TextField
                        className="txt_reason"
                        autoComplete="reason"
                        name="reason"
                        variant="outlined"
                        required
                        multiline
                        rows={6}
                        fullWidth
                        id="reason"
                        label="Reason"
                        size="small"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value.trim());
                    }}
                    />
                </Col>
             

                </Row>
                
       {/* <p className="validate_updateRoot">{validation}</p> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}></Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            className="btn_addRoot"
            // onClick={submit}
            // disabled={rootName.length === 0}
          >
            {isLoadingSubmit ? <Spin size="large" /> : "Make Leave"}
          </Button>
        </Grid>
      </Grid>
        </Container>
        </>
    );
}
