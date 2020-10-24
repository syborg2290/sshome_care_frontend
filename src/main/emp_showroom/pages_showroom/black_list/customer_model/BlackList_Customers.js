import React from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";

// styles
import "./BlackList_Customers.css";

export default function BlackList_Customers() {
  const data = {
    mobile2: "test",
    address1: "test",
    address2: "test",
    root: "test",
    time: "test",
    reason: "test",
  };

  return (
    <Row>
      <Col className="blackList_space_col" span={12}>
        <Typography className="blackList_title" gutterBottom>
          Customer Details
        </Typography>
      </Col>
      <Col className="blackList_space_col" span={12}></Col>
      <Col className="img_span" span={24}>
        <p>{data.photo}</p>
        <img
          alt="Empty data"
          className="blackList_avatar_customer"
          src={require("../../../../../assets/avatar.png")}
        />
      </Col>

      <Col className="blackList_space_col" span={24}></Col>

      <Col className="blackList_customer_details" span={8}>
        Telephone 2
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {/* {mobile2 !== "" ? mobile2 : "-"} */}
        {data.mobile2}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Address 1
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {data.address1}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Address 2
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {/* {address2 !== "" ? address2 : "-"} */}
        {data.address2}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Root To Home
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {/* {root !== "" ? root : "-"} */}
        {data.root}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Created at
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {data.time}
        {/* {moment(createdAt.toDate()).format("dddd, MMMM Do YYYY, h:mm:ss a")} */}
      </Col>
      <Col className="blackList_customer_details" span={8}>
        Reason
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {data.reason}
      </Col>
    </Row>
  );
}
