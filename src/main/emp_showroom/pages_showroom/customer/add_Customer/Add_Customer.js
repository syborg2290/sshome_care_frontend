import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { Row, Col } from "antd";

import "./Add_Customer.css";

export default function Add_Customer() {
  return (
    <div className="main">
      <Container className="container_Cus" component="main" maxWidth="xl">
        <div className="paper_cust">
          <Typography component="h1" variant="h5">
            Invoice
          </Typography>
          <form className="form_cust" noValidate>
            <Row>
              <Col className="labels" span={2}>
                NIC
              </Col>
              <Col span={22}>
                <TextField
                  className="txt_AddCustomer"
                  autoComplete="iNo"
                  name="invoice No"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  id="invoiceNo"
                  label="Customer NIC number"
                  autoFocus
                />
              </Col>
              {/* <p>Add Customer</p>
              <p>Add Customer</p> */}
            </Row>
          </form>
        </div>
      </Container>
    </div>
  );
}
