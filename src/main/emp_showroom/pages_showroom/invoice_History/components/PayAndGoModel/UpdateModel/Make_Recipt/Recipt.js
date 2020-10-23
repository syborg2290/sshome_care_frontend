import React, { useRef } from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CurrencyFormat from "react-currency-format";
import { useReactToPrint } from "react-to-print";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import "./Recipt.css";

function createData(description, delayed, amount) {
  return { description, delayed, amount };
}

const rows = [
  createData(
    "Installment Payment",
    15,
    <CurrencyFormat
      value={1500}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" "}
    />
  ),
];

class Recipt extends React.Component {
  render() {
    return (
      <div>
        <Container component="main" className="mainPrint_container">
          <Typography className="company_title" variant="h5" gutterBottom>
            SS HOME CARE CITY
          </Typography>
          <Typography className="company_sub__title" variant="h5" gutterBottom>
            Dealers In All Kind of Electtic & Electronic Items
            <hr />
          </Typography>
          <div className="paper">
            <form className="form" noValidate>
              <Row>
                <Col className="tiles" span={6}>
                  Invoice No.
                </Col>
                <Col className="tiles_details" span={8}>
                  983-3JFDF
                </Col>
                <Col className="tiles" span={4}>
                  Date
                </Col>
                <Col className="tiles_details" span={6}>
                  2020.09.01
                </Col>
                <Col className="tiles" span={6}>
                  Customer Name
                </Col>
                <Col className="tiles_details" span={4}>
                  D.G.Janith
                </Col>
                <Col className="tiles_details" span={14}>
                  Kavishka
                </Col>
                <Col className="tiles" span={6}>
                  NIC No.
                </Col>
                <Col className="tiles_details" span={18}>
                  324543456V
                </Col>
                <Col className="tiles_sum" span={14}>
                  Recived with thanks a sum of Rs.(LKR)
                </Col>
                <Col className="tiles_details_sum" span={10}>
                  <CurrencyFormat
                    value={1900}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" "}
                  />
                </Col>
                <Col className="tiles_settlement" span={24}>
                  being settlement of the following.
                </Col>

                <Col className="settlement_tbl" span={24}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell className="tbl_row">Description</TableCell>
                          <TableCell className="tbl_row" align="right">
                            {" "}
                            Delayed Count
                          </TableCell>
                          <TableCell className="tbl_row" align="right">
                            {" "}
                            Amount(LKR)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.description}>
                            <TableCell component="th" scope="row">
                              {row.description}
                            </TableCell>
                            <TableCell align="right">{row.delayed}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Recipt ref={componentRef} />

      <Button className="print_btn" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}
