import React, { useRef } from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useReactToPrint } from "react-to-print";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./Print_invoice.css";

function createRow(Item, Qty, DP, Discount, Sum) {
  return { Item, Qty, DP, Discount, Sum };
}

const rows = [
  createRow(55, 100, 115, 220, 404, 595),
  createRow(55, 100, 115, 220, 404, 595),
];

function createCol(DPayment, Itemname, IType, ICost, ICount) {
  return { DPayment, Itemname, IType, ICost, ICount };
}

const cols = [
  createCol(100, "gass", "saturdat", 1000, 6),
  createCol(60, "fan", 25, 500, 3),
];

class PrintInvoiceClass extends React.Component {
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
                <Col span={4}>Invoice No:</Col>
                <Col className="invo_number" span={20}>
                  0138900
                </Col>
                <Col span={24}>
                  <br />
                  <br />
                </Col>
                <Col span={2}>Tel.</Col>
                <Col span={16}>
                  0917901603
                  <br />
                  0715651711
                </Col>
                <Col span={5}>
                  Mapalagama Rd.
                  <br />
                  <span className="lbl_address">THANABADDEGAMA.</span>
                </Col>

                <Col span={24}>
                  <br />
                </Col>
                <Col span={18}></Col>
                <Col span={6}>Date............................</Col>
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
                            DP(LKR)
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
                        {rows.map((row) => (
                          <TableRow key={row.Item}>
                            <TableCell>{row.Item}</TableCell>
                            <TableCell align="right">{row.Qty}</TableCell>
                            <TableCell align="right">{row.DP}</TableCell>
                            <TableCell align="right">{row.Discount}</TableCell>
                            <TableCell align="right">{row.Sum}</TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={4} />
                          <TableCell align="right" colSpan={3}>
                            Subtotal
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            1200.00
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="right" colSpan={3}>
                            Discount
                          </TableCell>
                          <TableCell className="cel" align="right" colSpan={2}>
                            123
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            className="cell_total"
                            align="right"
                            colSpan={3}
                          >
                            Total
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            55000.00
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

        {/* installment detail */}

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
                <Col span={4}>Invoice No:</Col>
                <Col className="invo_number" span={20}>
                  0138900
                </Col>
                <Col span={24}>
                  <br />
                  <br />
                </Col>
                <Col span={2}>Tel.</Col>
                <Col span={16}>
                  0917901603
                  <br />
                  0715651711
                </Col>
                <Col span={5}>
                  Mapalagama Rd.
                  <br />
                  <span className="lbl_address">THANABADDEGAMA.</span>
                </Col>

                <Col span={24}>
                  <br />
                </Col>
                <Col span={18}></Col>
                <Col span={6}>Date............................</Col>
                <Col span={24}>
                  <hr />
                  <br />
                </Col>
                <Col span={6}>Customer Name:</Col>
                <Col span={10}>Piyal Pradeep</Col>
                <Col span={3}>NIC:</Col>
                <Col span={5}>8946453723V</Col>

                <Col className="hr_installmentPrint" span={24}></Col>

                {cols.map((col) => (
                  <Row className="installmentPrint">
                    <Col span={8}>Down Payment(LKR):</Col>
                    <Col span={4}>{col.DPayment}</Col>
                    <Col span={12}></Col>
                    <Col span={4}>Item Name:</Col>
                    <Col span={10}>{col.Itemname}</Col>
                    <Col span={10}></Col>
                    <Col span={4}>Installment Type:</Col>
                    <Col span={4}>{col.IType}</Col>
                    <Col span={16}></Col>
                    <Col span={8}>Installment Cost(LKR):</Col>
                    <Col span={6}>{col.ICost}</Col>
                    <Col span={10}></Col>
                    <Col span={8}>Installment Count:</Col>
                    <Col span={6}>{col.ICount}</Col>
                    <Col span={10}></Col>
                    <Col span={24}>
                      <hr />
                    </Col>
                  </Row>
                ))}
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
      </div>
    );
  }
}

export default function PrintInvoice() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <PrintInvoiceClass ref={componentRef} />
      <Button fullWidth className="btn_print" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}
