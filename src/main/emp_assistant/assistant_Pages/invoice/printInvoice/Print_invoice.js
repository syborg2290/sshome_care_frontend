import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useLocation, useHistory } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

import "./Print_invoice.css";

function createRow(Item, Qty, DP, Discount, Sum) {
  return { Item, Qty, DP, Discount, Sum };
}

function createCol(Itemname, DPayment, IType, ICost, ICount) {
  return { Itemname, DPayment, IType, ICost, ICount };
}

class PrintInvoiceClass extends React.Component {
  state = {
    invoice_number: "",
    cols: [],
    rows: [],
    balance: 0,
    total: 0,
    discount: 0,
    subTotal: 0,
    customer_nic: "",
    customer_name: "",
    dayOrDate: "",
  };

  constructor(props) {
    super(props);

    this.state.invoice_number = this.props.prop?.invoice_number;
    this.state.total = this.props.prop?.total;
    this.state.balance = this.props.prop?.balance;
    this.state.dayOrDate = this.props.prop?.installemtnDayDate;
    this.state.discount = this.props.prop?.discount;
    this.state.subTotal = this.props.prop?.subTotal;
    this.state.customer_nic =
      this.props.prop?.backto === "invoice_history"
        ? this.props.prop?.customerDetails?.nic
        : this.props.prop?.customerDetails?.customerNic;
    this.state.customer_name =
      this.props.prop?.backto === "invoice_history"
        ? this.props.prop?.customerDetails?.fname
        : this.props.prop?.customerDetails?.customerFname +
          " " +
          "invoice_history"
        ? this.props.prop?.customerDetails?.lname
        : this.props.prop?.customerDetails?.customerLname;
    if (this.props.prop) {
      this.props.prop.itemsList.forEach((ele) => {
        if (ele?.paymentWay === "PayandGo") {
          this.state.cols.push(
            createCol(
              ele?.item_name,
              ele?.downpayment,
              this.props.prop.installmentType,
              ele?.amountPerInstallment,
              ele?.noOfInstallment
            )
          );

          this.state.rows.push(
            createRow(
              ele?.item_name,
              ele?.qty,
              ele?.downpayment,
              ele?.discount,
              (ele?.downpayment - ele?.discount) * ele?.qty
            )
          );
        } else {
          this.state.rows.push(
            createRow(
              ele?.item_name,
              ele?.qty,
              ele?.downpayment,
              ele?.discount,
              (ele?.downpayment - ele?.discount) * ele?.qty
            )
          );
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Container component="main" className="mainsPrint_container">
          <Typography className="company_title" variant="h5" gutterBottom>
            SS HOME CARE CITY
          </Typography>

          <Typography className="company_sub__title" variant="h5" gutterBottom>
            Dealers In Alsl Kind of Electtic & Electronic Items
            <hr />
          </Typography>

          <div className="papers">
            <form className="forms" noValidate>
              <Row>
                <Col span={4}>Invoice No:</Col>
                <Col className="invo_number" span={20}>
                  {this.state.invoice_number}
                </Col>
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
                <Col span={24}>
                  <TableContainer className="tbl_Containers" component={Paper}>
                    <Table className="tables" aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="tbl_Cell">Item</TableCell>
                          <TableCell className="tbl_Cell" colSpan={1}>
                            Qty
                          </TableCell>

                          <TableCell
                            className="tbl_Cell"
                            align="right"
                            colSpan={1}
                          >
                            Sale Price(LKR)
                          </TableCell>

                          <TableCell className="tbl_Cell" align="right">
                            Discount(LKR)
                          </TableCell>
                          <TableCell className="tbl_Cell" align="right">
                            Sum(LKR)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.rows.map((row) => (
                          <TableRow key={row.Item}>
                            <TableCell>{row.Item}</TableCell>
                            <TableCell align="right">{row.Qty}</TableCell>
                            <TableCell align="right">
                              {" "}
                              <CurrencyFormat
                                value={row.DP}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={" "}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <CurrencyFormat
                                value={row.Discount}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={" "}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <CurrencyFormat
                                value={row.Sum}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={" "}
                              />
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={4} />
                          <TableCell align="right" colSpan={3}>
                            Subtotal(LKR)
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            <CurrencyFormat
                              value={this.state.subTotal}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={" "}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="right" colSpan={3}>
                            Discount(LKR)
                          </TableCell>
                          <TableCell className="cel" align="right" colSpan={2}>
                            <CurrencyFormat
                              value={this.state.discount}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={" "}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="right" colSpan={3}>
                            Balance(LKR)
                          </TableCell>
                          <TableCell className="cel" align="right" colSpan={2}>
                            <CurrencyFormat
                              value={this.state.balance}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={" "}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            className="cell_total"
                            align="right"
                            colSpan={3}
                          >
                            Total(LKR)
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            <CurrencyFormat
                              value={this.state.total}
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
              </Row>
              <br />
              <Row className="row_signature">
                <Col className="lbl_signature" span={4}>
                  ...............................
                  <br />
                  <span className="txt_signature"> Signature</span>
                </Col>
              </Row>
            </form>
          </div>
        </Container>

        <br />
      </div>
    );
  }
}

export default function PrintInvoice() {
  const location = useLocation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const history = useHistory();

  useEffect(() => {
    window.addEventListener(
      "popstate",
      (event) => {
        if (event.state) {
          if (location.state?.detail.backto === "item_list") {
            history.push("/assistant/ui/ItemTable");
          } else {
            history.push("/assistant/ui/InvoiceHistory");
          }
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
    // eslint-disable-next-line
  }, [history]);

  return (
    <div>
      <PrintInvoiceClass ref={componentRef} prop={location.state?.detail} />
      <Button fullWidth className="btn_print" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}
