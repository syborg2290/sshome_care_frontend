import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid } from "@material-ui/core";
import { Modal } from "antd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CurrencyFormat from "react-currency-format";

// styles
import "./Gass.css";

// icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// components
import GassModel from "./components/Gass_Model";

import "./Gass.css";

function createData(Weight, Qty, Price) {
  return { Weight, Qty, Price };
}

const rows = [
  createData(
    "12.5 kg",
    12,
    <CurrencyFormat
      value={" 3500"}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" "}
    />
  ),
  createData(
    "5 kg",
    6,
    <CurrencyFormat
      value={" 2500"}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" "}
    />
  ),
  createData(
    "2.5 kg",
    15,
    <CurrencyFormat
      value={" 1200"}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" "}
    />
  ),
];

export default function Gass() {
  const [gassModal, setGassModal] = useState(false);

  const showModalGass = () => {
    setGassModal(true);
  };

  return (
    <>
      <Modal
        className="confo_model"
        visible={gassModal}
        footer={null}
        onCancel={() => {
          setGassModal(false);
        }}
      >
        <div className="confoModel_body">
          <GassModel />
        </div>
      </Modal>

      <Container component="main" className="main_containerr">
        <Typography className="titles" variant="h5" gutterBottom>
          Gass
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <hr className="titles_hr" />
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              onClick={showModalGass}
              endIcon={<ShoppingCartIcon />}
              color="primary"
              className="btn_gass"
            >
              Sell
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} className="main_containerGass">
          <Table className="gass_Table" size="small" aria-label="a dense table">
            <TableHead className="gass_Table_head">
              <TableRow>
                <TableCell>Weight</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Price&nbsp;(LKR)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.Weight}>
                  <TableCell component="th" scope="row">
                    {row.Weight}
                  </TableCell>
                  <TableCell align="right">{row.Qty}</TableCell>
                  <TableCell align="right">{row.Price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
