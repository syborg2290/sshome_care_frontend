import React from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
// style
import "./view_customer_Model.css";

export default function view_customer_Model({
  photo,
  fname,
  lname,
  mid,
  nic,
  mobile1,
  mobile2,
  address1,
  address2,
  root,
}) {
  return (
    <Row>
      <Col className="space_col_sarani" span={12}>
        <Typography className="title__sarani" gutterBottom>
          Customer Details
        </Typography>
      </Col>
      <Col className="space_col__sarani" span={12}></Col>
      <Col className="img_span__sarani" span={12}>
        {" "}
        <img
          alt="image Front"
          className="imageFront"
          
          src={
            photo !== null
              ? photo
              : require("../../../../../../assets/avatar1132.jpg")
          }
        />
      </Col>
       <Col className="img_span__sarani" span={12}>
        {" "}
        <img
          alt="image Back"
          className="imageBack"
            src={require("../../../../../../assets/avater232.jpg")}
        />
      </Col>

      <Col className="space_col_sarani" span={24}></Col>

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
      <Col className="customer_details" span={8}>
        MemeberID
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {mid}
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
        Root To Home
      </Col>
      <Col className="customer_sarani" span={2}>
        :
      </Col>
      <Col className="customer_sarani" span={14}>
        {root !== "" ? root : "-"}
      </Col>

     
    </Row>
  );
}
