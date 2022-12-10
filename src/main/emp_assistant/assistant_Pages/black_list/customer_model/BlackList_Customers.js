import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import db from "../../../../../config/firebase.js";

// styles
import "./BlackList_Customers.css";

export default function BlackList_Customers({ nic }) {
  const [photo, setPhoto] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [rootToHome, setRootToHome] = useState("");

  useEffect(() => {
    db.collection("customer")
      .where("nic", "==", nic)
      .get()
      .then((reCust) => {
        if (reCust.docs.length > 0) {
          setPhoto(reCust.docs[0].data().photo);
          setAddress1(reCust.docs[0].data().address1);
          setAddress2(reCust.docs[0].data().address2);
          setMobile1(reCust.docs[0].data().mobile1);
          setMobile2(reCust.docs[0].data().mobile2);
          setRootToHome(reCust.docs[0].data().root);
        }
      });
  }, [nic]);

  return (
    <Row>
      <Col className="blackList_space_col" span={12}>
        <Typography className="blackList_title" gutterBottom>
          Customer Details
        </Typography>
      </Col>
      <Col className="blackList_space_col" span={12}></Col>
      <Col className="img_span" span={24}>
        <img
          alt="Empty data"
          className="blackList_avatar_customer"
          src={
            photo === null ? require("../../../../../assets/avatar.png") : photo
          }
        />
      </Col>

      <Col className="blackList_space_col" span={24}></Col>

      <Col className="blackList_customer_details" span={8}>
        Telephone 1
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {/* {mobile2 !== "" ? mobile2 : "-"} */}
        {mobile1}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Telephone 2
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {/* {mobile2 !== "" ? mobile2 : "-"} */}
        {mobile2 === "" ? " - " : mobile2}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Address 1
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {address1}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Address 2
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {/* {address2 !== "" ? address2 : "-"} */}
        {address2 === "" ? " - " : address2}
      </Col>

      <Col className="blackList_customer_details" span={8}>
        Root To Home
      </Col>
      <Col className="blackList_customer" span={2}>
        :
      </Col>
      <Col className="blackList_customer" span={14}>
        {/* {root !== "" ? root : "-"} */}
        {rootToHome === "" ? " - " : rootToHome}
      </Col>
    </Row>
  );
}
