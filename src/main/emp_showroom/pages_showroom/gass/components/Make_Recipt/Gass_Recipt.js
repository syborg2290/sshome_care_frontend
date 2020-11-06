import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useReactToPrint } from "react-to-print";
import Button from "@material-ui/core/Button";
import { useLocation, useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CurrencyFormat from "react-currency-format";
import firebase from "firebase";
import moment from "moment";
// styles
import "./Gass_Recipt.css";

function createData(item, qty, price) {
  return { item, qty, price };
}

const rows = [createData("5kg", 1, 1000), createData("2kg", 2, 5000)];

class GassRecipt extends React.Component {
  render() {
    return (
      <div>
        <Container component="main" className="mainPrint_container_gass">
          <Typography className="company_title_gass" variant="h5" gutterBottom>
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
          <div className="paper_gass">
            <form className="form_repair" noValidate>
              <Row>
                <Col span={24}>
                  <br />
                  <br />
                </Col>
                <Col span={2}>Tel.</Col>
                <Col span={15}>
                  0917901603
                  <br />
                  0715651711
                </Col>
                <Col span={7}>
                  Mapalagama Rd.
                  <br />
                  <span className="lbl_address">THANABADDEGAMA.</span>
                </Col>

                <Col span={24}>
                  <br />
                </Col>
                <Col span={17}></Col>
                <Col span={7}>
                  Date :{" "}
                  {moment(
                    firebase.firestore.FieldValue.serverTimestamp()
                  ).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </Col>
                <Col span={24}>
                  <hr />
                  <br />
                </Col>
                <Col className="tiles_settlement_repair" span={24}>
                  <TableContainer component={Paper}>
                    <Table className="ytsd" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell align="center">Qty</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.item}>
                            <TableCell component="th" scope="row">
                              {row.item}
                            </TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell align="right">
                              {" "}
                              <CurrencyFormat
                                value={row.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={" "}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell rowSpan={1} />
                          <TableCell align="right" colSpan={1}>
                            Total(LKR)
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            <CurrencyFormat
                              value={"84738"}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={" "}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
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
          history.push("/showroom/ui/gass");
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
      <GassRecipt ref={componentRef} prop={location.state?.detail} />

      <Button className="print_btn_gass" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}
