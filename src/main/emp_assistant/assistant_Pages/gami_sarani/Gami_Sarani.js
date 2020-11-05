import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Spin, Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

// components
import AddCustomer from "./components/add_customer/Add_Customer";

import "./Gami_Sarani.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Gami_Sarani() {
  const [gamisaraniModel, setGamisaraniModel] = useState([]);

  const GamisaraniAddCustomer = () => {
    setGamisaraniModel(true);
  };

  return (
    <>
      {/*Selected Item Model */}

      <Modal
        visible={gamisaraniModel}
        footer={null}
        className="model_Gamisarani_Cutomer"
        onCancel={() => {
          setGamisaraniModel(false);
        }}
      >
        <div className="table_Gamisarani_Cutomer">
          <div className="model_Gamisarani_Cutomer_Main">
            <div className="modelGamisarani_Cutomer_Detail">
              <AddCustomer />
            </div>
          </div>
        </div>
      </Modal>

      {/*Selected Item Model */}
      <Button
        variant="contained"
        color="primary"
        className="btn_addSaraniCustomers"
        onClick={GamisaraniAddCustomer}
      >
        New Customer
      </Button>

      <TableContainer component={Paper} className="tbl_container">
        <Table className="sarani_table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
