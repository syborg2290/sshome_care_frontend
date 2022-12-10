import React, { useRef, useEffect } from "react";
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
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";

import "./Recipt.css";

function createData(description, delayed, balance, amount) {
  return { description, delayed, balance, amount };
}

class Recipt extends React.Component {
  state = {
    invoice_number: "",
    rows: [],
    total: 0,
    delayed: 0,
    customer_nic: "",
    customer_name: "",
    date: null,
  };

  constructor(props) {
    super(props);
    this.state.invoice_number = this.props.prop?.invoice_number;
    this.state.total = this.props.prop?.total;
    this.state.date = this.props.prop?.date;
    this.state.serial_num = this.props.prop?.serialNo;
    this.state.delayed = this.props.prop?.delayedCharges;
    this.state.customer_nic = this.props.prop?.customerDetails?.nic;
    this.state.customer_name =
      this.props.prop?.customerDetails?.fname +
      " " +
      this.props.prop?.customerDetails?.lname;

    this.state.rows.push(
      createData(
        "Installment Payment",
        this.props.prop?.delayedCharges,
        <CurrencyFormat
          value={this.props.prop?.balance}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />,
        <CurrencyFormat
          value={this.props.prop?.total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      )
    );
  }

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
                  {this.state.invoice_number}
                </Col>
                <Col className="tiles" span={4}>
                  Date
                </Col>
                <Col className="tiles_details" span={6}>
                  {moment(this.state.date?.toDate()).format(
                    "dddd, MMMM Do YYYY"
                  )}
                </Col>
                <Col className="tiles" span={6}>
                  Customer Name
                </Col>
                <Col className="tiles_details" span={4}>
                  {this.state.customer_name}
                </Col>
                <Col className="tiles_details" span={14}>
                  <p></p>
                </Col>
                <Col className="tiles" span={6}>
                  NIC No.
                </Col>
                <Col className="tiles_details" span={18}>
                  {this.state.customer_nic}
                </Col>
                <Col className="tiles_sum" span={14}>
                  Recived with thanks a sum of Rs.(LKR)
                </Col>
                <Col className="tiles_details_sum" span={10}>
                  <CurrencyFormat
                    value={this.state.total}
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
                            Delayed Dates
                          </TableCell>
                          <TableCell className="tbl_row" align="right">
                            {" "}
                            Current Balance
                          </TableCell>
                          <TableCell className="tbl_row" align="right">
                            {" "}
                            Amount(LKR)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.rows.map((row) => (
                          <TableRow key={row.description}>
                            <TableCell component="th" scope="row">
                              {row.description}
                            </TableCell>
                            <TableCell align="right">{row.delayed}</TableCell>
                            <TableCell align="right">{row.balance}</TableCell>
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
          history.push("/assistant/ui/InvoiceHistory");
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
      <Recipt ref={componentRef} prop={location.state?.detail} />

      <Button className="print_btn" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}
