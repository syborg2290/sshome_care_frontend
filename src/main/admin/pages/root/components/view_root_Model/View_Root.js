import React from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";

// styles
import "./View_Root.css";

export default function View_Root({
  rootName,
  description,
  empName,
  empName2,
}) {
  return (
    <Row>
      <Col className="space_col_rootView" span={12}>
        <Typography className="title_rootView" gutterBottom>
          Root Details
        </Typography>
      </Col>
      <Col className="space_col__rootView" span={12}></Col>
      <Col className="space_col__rootView" span={6}>
        <hr />
      </Col>
      <Col className="space_col__rootView" span={10}></Col>
      <Col className="img_span__rootView" span={24}></Col>
      <Col className="details_rootView" span={8}>
        Root Name
      </Col>
      <Col className="rootView" span={2}>
        :
      </Col>
      <Col className="rootView" span={14}>
        {rootName}
      </Col>
      <Col className="details_rootView" span={8}>
        Description
      </Col>
      <Col className="rootView" span={2}>
        :
      </Col>
      <Col className="rootView" span={14}>
        {description === "" ? "-" : description}
      </Col>

      <Col className="details_rootView" span={8}>
        Employee 1
      </Col>
      <Col className="rootView" span={2}>
        :
      </Col>
      <Col className="rootView" span={14}>
        {empName === "" ? "-" : empName}
      </Col>

      <Col className="details_rootView" span={8}>
        Employee 2
      </Col>
      <Col className="rootView" span={2}>
        :
      </Col>
      <Col className="rootView" span={14}>
        {empName2 === "" ? "-" : empName2}
      </Col>
    </Row>
  );
}
