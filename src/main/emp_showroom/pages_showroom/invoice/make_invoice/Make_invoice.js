import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Make_invoice.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// icon
import { CloseOutlined } from "@ant-design/icons";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import ClearIcon from "@material-ui/icons/Clear";
import TvIcon from "@material-ui/icons/Tv";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const TAX_RATE = 0.07;

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow(
    "Paper (Case)",
    <TextField
      className="txt_discount"
      autoComplete="disc"
      name="discount"
      variant="outlined"
      size="small"
      type="number"
      autoFocus
    />,
    100,
    1.15
  ),

  createRow(
    "Gass Cooker",
    <TextField
      className="txt_discount"
      autoComplete="disc"
      name="discount"
      variant="outlined"
      size="small"
      type="number"
      autoFocus
    />,
    100,
    1.15
  ),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// eslint-disable-next-line
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function Make_invoice() {
  const location = useLocation();

  // eslint-disable-next-line
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state ? location.state.detail : ""); // result: 'some_value'
  }, [location]);

  return (
    <div className="main_In">
      <Container className="container_In" component="main" maxWidth="xl">
        <div className="paper_in">
          <form className="form_in" noValidate>
            <Typography component="h1" variant="h5">
              Invoice
            </Typography>
            <hr className="hr_invoice" />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <div className="lbl_invoice">Invoice#</div>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  className="txt_Invoice"
                  autoComplete="iNo"
                  name="invoice No"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  id="invoiceNo"
                  label="Invoice No"
                  autoFocus
                />
              </Grid>
              <Grid item xs={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="btn_newItem"
                  endIcon={<TvIcon />}
                >
                  Add more items
                </Button>
              </Grid>

              <TableContainer className="tbl_Container" component={Paper}>
                <Table className="table" aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tbl_Cell">Desc</TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Discount
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Qty.
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Unit
                      </TableCell>

                      <TableCell className="tbl_Cell" align="right">
                        Sum
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.desc}>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell align="right">{row.qty}</TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">888</TableCell>
                        <TableCell align="right">888</TableCell>
                        <TableCell align="right">
                          <span className="iconpls_invTblspan">
                            <PlusOneIcon className="iconpls_invTbl" />
                          </span>
                          <ExposureNeg1Icon className="icon_invTbl" />
                          <span className="iconcls_invTblspan">
                            <CloseOutlined className="iconcls_invTbl" />
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell rowSpan={4} />
                      <TableCell align="right" colSpan={3}>
                        Subtotal
                      </TableCell>
                      <TableCell align="right" colSpan={3}>
                        666
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Discount
                      </TableCell>
                      <TableCell className="cel" align="right" colSpan={3}>
                        <TextField
                          className="txt_discts"
                          variant="outlined"
                          placeholder="Discount"
                          size="small"
                          id="disc"
                          autoFocus
                        ></TextField>
                      </TableCell>
                      {/* <TableCell align="right">555</TableCell> */}
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Total
                      </TableCell>
                      <TableCell align="right" colSpan={3}>
                        222
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="btn_addCustomer"
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </div>
  );
}

export default Make_invoice;
