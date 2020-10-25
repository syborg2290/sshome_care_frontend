import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useReactToPrint } from "react-to-print";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";

import "./Repair_recipt.css";

class RepairRecipt extends React.Component {
  render() {
    return (
      <div>
        <Container component="main" className="mainPrint_container_repair">
          <Typography
            className="company_title_repair"
            variant="h5"
            gutterBottom
          >
            SS HOME CARE CITY
          </Typography>
          <Typography
            className="company_sub__title_repair"
            variant="h5"
            gutterBottom
          >
            Dealers In All Kind of Electtic & Electronic Items
            <hr />
          </Typography>
          <div className="paper_repair">
            <form className="form_repair" noValidate>
              <Row>
                <Col className="tiles_repair" span={6}>
                  Invoice No.
                </Col>
                <Col className="tiles_details_repair" span={6}>
                  TEWCV-565
                </Col>
                <Col className="tiles_repair" span={6}>
                  Accepted Date
                </Col>
                <Col className="tiles_details_repair" span={6}>
                  {moment(
                    firebase.firestore.FieldValue.serverTimestamp()
                  ).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </Col>
                <Col className="tiles_repair" span={6}>
                  Model No.
                </Col>
                <Col className="tiles_details_repair" span={18}>
                  232-FD
                </Col>
                <Col className="tiles_repair" span={6}>
                  Item Name
                </Col>
                <Col className="tiles_details_repair" span={18}>
                  Gass Cooker
                </Col>
                <Col className="tiles_repair" span={6}>
                  NIC No.
                </Col>
                <Col className="tiles_details_repair" span={18}>
                  434325435V
                </Col>
                <Col className="tiles_details_repairSpace" span={24}></Col>
                <Col className="tiles_Signature_repair" span={18}></Col>

                <Col className="tiles_Signature_repair" span={6}>
                  <sapn> ....................</sapn>
                  <br />
                  Signature
                </Col>

                <Col className="tiles_settlement_repair" span={24}>
                  Thank You!
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default function Example() {
  const componentRef = useRef();
  const location = useLocation();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const history = useHistory();

  useEffect(() => {
    window.addEventListener(
      "popstate",
      (event) => {
        if (event.state) {
          history.push("/showroom/ui/repairs");
        }
      },
      false
    );

    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, [history]);

  return (
    <div>
      <RepairRecipt ref={componentRef} prop={location.state?.detail} />

      <Button className="print_btn_repair" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}
