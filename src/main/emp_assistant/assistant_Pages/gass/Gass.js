import React, { useState, useEffect } from "react";
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
import AddIcon from "@material-ui/icons/Add";

// components
import GassModel from "./components/Gass_Model";
import AddNewModel from "./components/add_new_Gass/AddNew_Model";
import UpdateGassModel from "./components/update_Gass/UpdateGass_Model";

import "./Gass.css";

import db from "../../../../config/firebase.js";

function createData(Weight, Qty, Price, Action) {
  return { Weight, Qty, Price, Action };
}

export default function Gass() {
  // eslint-disable-next-line
  const [allTableData, setAllTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [gassModal, setGassModal] = useState(false); //models
  const [addNewGassModal, setAddNewGassModal] = useState(false); // Table models
  const [updateGassModal, setUpdateGassModal] = useState(false); // Table models

  const showModalGass = () => {
    setGassModal(true);
  };

  const showModalAddGass = () => {
    setAddNewGassModal(true);
  };

  const closeModalAddGass = () => {
    setAddNewGassModal(false);
  };

  useEffect(() => {
    db.collection("gas").onSnapshot((snap) => {
      var raw = [];
      var rawAll = [];
      snap.docs.forEach((each) => {
        rawAll.push({
          id: each.id,
          data: each.data(),
          weight: each.data().weight,
        });
        raw.push(
          createData(
            each.data().weight + " Kg",
            each.data().qty,
            <CurrencyFormat
              value={each.data().price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />
          )
        );
      });
      setAllTableData(rawAll);
      setTableData(raw);
    });
  }, []);

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

      {/* START add gass model */}

      <Modal
        className="confo_model"
        visible={addNewGassModal}
        footer={null}
        onCancel={() => {
          setAddNewGassModal(false);
        }}
      >
        <div className="confoModel_body">
          <AddNewModel close_model={closeModalAddGass} />
        </div>
      </Modal>

      {/* END add gass model */}

      {/* START update gass model */}

      <Modal
        className="confo_model"
        visible={updateGassModal}
        footer={null}
        onCancel={() => {
          setUpdateGassModal(false);
        }}
      >
        <div className="confoModel_body">
          <UpdateGassModel />
        </div>
      </Modal>

      {/* END update gass model */}

      <Container component="main" className="main_containerr">
        <Typography className="titles" variant="h5" gutterBottom>
          Gass
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <hr className="titles_hr" />
          </Grid>
          <Grid item xs={12} sm={5}></Grid>
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
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={showModalAddGass}
              endIcon={<AddIcon />}
              className="btn_gass_Add"
            >
              Add/Update gas
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
              {tableData.map((row) => (
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
