import React from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
// styles
import "./CustomerDetailsModel.css";

export default function customerDetailsModel() {
  return (
    <Row>
      <Col className="space_col" span={12}>
        <Typography className="title" gutterBottom>
          Customer Details
          <hr />
        </Typography>
      </Col>
      <Col className="space_col" span={12}></Col>
      <Col className="img_span" span={24}>
        {" "}
        <img
          alt="Empty data"
          className="avatar_customer"
          src={require("../../../../../../../assets/avatar.png")}
        />
      </Col>

      <Col className="space_col" span={24}></Col>

      <Col className="customer_details" span={8}>
        First Name
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        D.G janith
      </Col>
      <Col className="customer_details" span={8}>
        Last Name
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        Kavishka
      </Col>

      <Col className="customer_details" span={8}>
        NIC
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        67448098V
      </Col>

      <Col className="customer_details" span={8}>
        Mobile
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        07636153
      </Col>

      <Col className="customer_details" span={8}>
        Address 1
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        Galle
      </Col>

      <Col className="customer_details" span={8}>
        Address 2
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        Galle, Galle Galle Galle Galle Galle Galle Galle
      </Col>

      <Col className="customer_details" span={8}>
        Root To Home
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        Galle Rd.Galle Rd.Galle Rd.Galle Rd.Galle Rd.Galle Rd.Galle Rd.Galle
        Rd.Galle Rd.Galle Rd.Galle Rd.
      </Col>
    </Row>
  );
}
