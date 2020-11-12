import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


// styles
import "./Gass_History.css";

function createData(Weight, Qty, Date,Price) {
  return {Weight, Qty, Date,Price};
}

export default function Gass_History() {
      // eslint-disable-next-line
  const [allTableData, setAllTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
    return (
        <Container component="main" className="main_containerhis">
             <Typography className="titles-his" variant="h5" gutterBottom>
          Gass History
        </Typography>
         <TableContainer component={Paper} className="main_containerGasshis">
          <Table className="gass_Table-his" size="small" aria-label="a dense table">
            <TableHead className="gass_Table_head">
              <TableRow>
                <TableCell>Weight(kg)</TableCell>
                <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Date</TableCell>
                <TableCell align="right">Purches&nbsp;Price(LKR)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.Weight}>
                  <TableCell component="th" scope="row">
                    {row.Weight}
                  </TableCell>
                      <TableCell align="right">{row.Qty}</TableCell>
                      <TableCell align="right">{row.Date}</TableCell>
                  <TableCell align="right">{row.Price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
 </Container>
 
    );
}
