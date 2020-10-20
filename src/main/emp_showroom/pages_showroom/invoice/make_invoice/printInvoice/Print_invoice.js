import React, { useRef } from "react";
import { Row, Col } from "antd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";

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
                        <TableRow>
                          <TableCell>Cooker</TableCell>
                          <TableCell align="right">123</TableCell>
                          <TableCell align="right">123</TableCell>
                          <TableCell align="right">123</TableCell>
                          <TableCell align="right">50000.00</TableCell>
                        </TableRow>

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
                        <TableRow>
                          <TableCell>Cooker</TableCell>
                          <TableCell align="right">123</TableCell>
                          <TableCell align="right">123</TableCell>
                          <TableCell align="right">123</TableCell>
                          <TableCell align="right">50000.00</TableCell>
                        </TableRow>

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

  return (
    <div>
      <PrintInvoiceClass ref={componentRef} prop={location.state.detail}/>
      <Button fullWidth className="btn_print" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}
