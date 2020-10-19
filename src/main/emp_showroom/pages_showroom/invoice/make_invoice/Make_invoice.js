import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Make_invoice.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { Modal } from "antd";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//components
import ItemTable from "../components/Itemtable_Model";
import DaydateModel from "../components/dayandDate/Day_date_model";

// icon
import TvIcon from "@material-ui/icons/Tv";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

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
  // eslint-disable-next-line
  const location = useLocation();

  const [itemtVisible, setItemtVisible] = useState(false);
  const [dayDateVisible, setDayDateVisible] = useState(false);

  // eslint-disable-next-line
  const [selectedItems, setSelectedItems] = useState([]);

  const itemModalClose = () => {
    setItemtVisible(false);
    setDayDateVisible(false);
  };

  const itemTableModel = () => {
    setItemtVisible(true);
  };

  // eslint-disable-next-line
  const dayDateModel = () => {
    setDayDateVisible(true);
  };

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
                  onClick={itemTableModel}
                  className="btn_newItem"
                  endIcon={<TvIcon />}
                >
                  Add more items
                </Button>
              </Grid>

              {/*More Item Model */}

              <Modal
                title="All Items"
                visible={itemtVisible}
                footer={null}
                className="table_all_Item"
                // onOk={itemModalClose}
                onCancel={itemModalClose}
              >
                <div className="table_model_Model">
                  <div className="table_model_Main">
                    <div className="table_model_Detail">
                      <ItemTable />
                    </div>
                  </div>
                </div>
              </Modal>

              {/*More Item Model */}

              <TableContainer className="tbl_Container" component={Paper}>
                <Table className="table" aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tbl_Cell">Item</TableCell>
                      <TableCell className="tbl_Cell" colSpan={1}>
                        Qty
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Type
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right" colSpan={1}>
                        DP(LKR)
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right" colSpan={1}>
                        NOI
                      </TableCell>

                      <TableCell className="tbl_Cell" align="right">
                        API(LKR)
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Discount(LKR)
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Sum(LKR)
                      </TableCell>
                      <TableCell className="tbl_Cell" align="right">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.desc}>
                        <TableCell>Gass Cooker</TableCell>
                        <TableCell align="right">
                          <TextField
                            className="txt_qty"
                            autoComplete="qty"
                            name="qty"
                            variant="outlined"
                            size="small"
                            required
                            InputProps={{ inputProps: { min: 1 } }}
                            type="number"
                            fullWidth
                            id="qty"
                            label="qty"
                            autoFocus
                          />
                        </TableCell>
                        <TableCell align="right" colSpan={1}>
                          P
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <TextField
                            className="txt_dpayment"
                            autoComplete="discount"
                            name="discount"
                            variant="outlined"
                            size="small"
                            required
                            InputProps={{ inputProps: { min: 0 } }}
                            type="number"
                            fullWidth
                            id="discount"
                            label="dpayment"
                            autoFocus
                          />
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <TextField
                            className="txt_dpayment"
                            autoComplete="noi"
                            name="noi"
                            variant="outlined"
                            size="small"
                            required
                            InputProps={{ inputProps: { min: 0 } }}
                            type="number"
                            fullWidth
                            id="noi"
                            label="NOI"
                            autoFocus
                          />
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <TextField
                            className="txt_dpayment"
                            autoComplete="api"
                            name="api"
                            variant="outlined"
                            size="small"
                            InputProps={{ inputProps: { min: 0 } }}
                            required
                            type="number"
                            fullWidth
                            id="api"
                            label="API"
                            autoFocus
                          />
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <TextField
                            className="txt_dpayment"
                            autoComplete="discount"
                            name="discount"
                            variant="outlined"
                            size="small"
                            required
                            InputProps={{ inputProps: { min: 0 } }}
                            type="number"
                            fullWidth
                            id="discount"
                            label="discount"
                            autoFocus
                          />
                        </TableCell>
                        <TableCell align="right">50000.00</TableCell>
                        <TableCell align="right">
                          <CloseOutlinedIcon className="iconcls_invTbl" />
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell rowSpan={4} />
                      <TableCell align="right" colSpan={5}>
                        Subtotal
                      </TableCell>
                      <TableCell align="right" colSpan={2}>
                        1200.00
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={5}>
                        Discount
                      </TableCell>
                      <TableCell className="cel" align="right" colSpan={2}>
                        <TextField
                          className="txt_discount"
                          autoComplete="discount"
                          name="discount"
                          variant="outlined"
                          size="small"
                          required
                          type="number"
                          fullWidth
                          id="discount"
                          label="dis"
                          autoFocus
                        />
                      </TableCell>
                      {/* <TableCell align="right">555</TableCell> */}
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={5}>
                        Total
                      </TableCell>
                      <TableCell align="right" colSpan={2}>
                        55000.00
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/*START Day Date Model */}

            <Modal
              title="All Items"
              visible={dayDateVisible}
              footer={null}
              className="table_all_Item"
              // onOk={itemModalClose}
              onCancel={itemModalClose}
            >
              <div className="table_model_Model">
                <div className="table_model_Main">
                  <div className="table_model_Detail">
                    <DaydateModel />
                  </div>
                </div>
              </div>
            </Modal>

            {/*END Day Date Model */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="btn_addCustomer"
              // onClick={dayDateModel}
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
