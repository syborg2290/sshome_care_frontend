import React from "react";

import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import ModalImage from "react-modal-image";

// styles
import "./CustomerDetailsModel.css";

export default function customerDetailsModel({
  front,
  back,
  fname,
  lname,
  mid,
  nic,
  mobile1,
  mobile2,
  address1,
  address2,
  root,
  status,
  createdAt,
}) {
  return (
    <Row>
      <Col className="space_col" span={12}>
        <Typography className="title" gutterBottom>
          Customer Details
        </Typography>
      </Col>
      <Col className="space_col" span={12}></Col>
      <Col className="img_span" span={12}>
        {" "}
        {front === null ? (
          <img
            alt="Empty data"
            className="imageFrontCustDetails"
            src={require("../../../../../../../assets/avatar1132.jpg")}
          />
        ) : (
          <ModalImage  className="imageFrontCustDetailsload"  small={front} large={front} alt="Empty data" />
        )}
      </Col>
      <Col className="img_span" span={12}>
        {" "}
        {back === null ? (
          <img
            alt="Empty data"
            className="imageBackCustDetails"
            src={require("../../../../../../../assets/avater232.jpg")}
          />
        ) : (
          <ModalImage  className="imageBackCustDetailsload" small={back} large={back} alt="Empty data" />
        )}
      </Col>
      <Col className="space_col" span={24}></Col>

      <Col className="customer_details" span={8}>
        First Name
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {fname}
      </Col>
      <Col className="customer_details" span={8}>
        Last Name
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
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

      <Col className="customer_details" span={8}>
        NIC
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {nic}
      </Col>

      <Col className="customer_details" span={8}>
        Contact number 1
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {mobile1}
      </Col>

      <Col className="customer_details" span={8}>
        Contact number 2
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {mobile2 !== "" ? mobile2 : "-"}
      </Col>

      <Col className="customer_details" span={8}>
        Address 1
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {address1}
      </Col>

      <Col className="customer_details" span={8}>
        Address 2
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {address2 !== "" ? address2 : "-"}
      </Col>

      <Col className="customer_details" span={8}>
        Root To Home
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {root !== "" ? root : "-"}
      </Col>

      <Col className="customer_details" span={8}>
        Customer status
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {status === "normal" ? (
          <span
            style={{
              color: "white",
              backgroundColor: "#09b66d",
              padding: "6px",
              borderRadius: "20px",
            }}
          >
            {status}
          </span>
        ) : status === "arrears" ? (
          <span
            style={{
              color: "black",
              backgroundColor: "#ffd84d",
              padding: "6px",
              borderRadius: "20px",
            }}
          >
            {status}
          </span>
        ) : (
          <span
            style={{
              color: "white",
              backgroundColor: "#ff5c33",
              padding: "6px",
              borderRadius: "20px",
            }}
          >
            {status}
          </span>
        )}
      </Col>

      <Col className="customer_details" span={8}>
        Created at
      </Col>
      <Col className="customer" span={2}>
        :
      </Col>
      <Col className="customer" span={14}>
        {moment(createdAt.toDate()).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </Col>
    </Row>
  );
}
