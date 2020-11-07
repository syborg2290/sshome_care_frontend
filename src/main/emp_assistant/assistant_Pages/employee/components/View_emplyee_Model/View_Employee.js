import React from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
// styles
import "./View_Employee.css";

export default function View_Employee({
  fname,
  lname,
  nic,
  mobile1,
  mobile2,
  address1,
  address2,
  basic,
}) {
  return (
    <Row>
      <Col className="space_col_employee" span={12}>
        <Typography className="title__employee" gutterBottom>
          Employee Details
        </Typography>
      </Col>
      <Col className="space_col__employee" span={12}></Col>
      <Col className="space_col__employee" span={6}>
        <hr />
      </Col>
      <Col className="space_col__employee" span={10}></Col>
      <Col className="img_span__employee" span={24}></Col>
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
        Contact number 1
      </Col>
      <Col className="customer_sarani" span={2}>
        :
      </Col>
      <Col className="customer_sarani" span={14}>
        {mobile1}
      </Col>

      <Col className="customer_details_sarani" span={8}>
        Contact number 2
      </Col>
      <Col className="customer_sarani" span={2}>
        :
      </Col>
      <Col className="customer_sarani" span={14}>
        {mobile2 !== "" ? mobile2 : "-"}
      </Col>

      <Col className="customer_details_sarani" span={8}>
        Address 1
      </Col>
      <Col className="customer_sarani" span={2}>
        :
      </Col>
      <Col className="customer_sarani" span={14}>
        {address1}
      </Col>

      <Col className="customer_details_sarani" span={8}>
        Address 2
      </Col>
      <Col className="customer_sarani" span={2}>
        :
      </Col>
      <Col className="customer_sarani" span={14}>
        {address2 !== "" ? address2 : " - "}
      </Col>

      <Col className="customer_details_sarani" span={8}>
        Basic(LKR)
      </Col>
      <Col className="customer_sarani" span={2}>
        :
      </Col>
      <Col className="customer_sarani" span={14}>
        {basic}
      </Col>
    </Row>
  );
}
