import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { Spin } from "antd";
import CurrencyFormat from "react-currency-format";
import db from "../../../../../../../config/firebase.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function View_History() {
  const [itemsList, setItemList] = useState([]);


  return (
    <>
      <Container component="main" className="conctainers_main">
        <Typography className="titls" variant="h5" gutterBottom>
          View Purchased Item
        </Typography>
        <Grid item xs={12} sm={12}>
          <hr className="titl_hr" />
              </Grid>
              
              {itemsList.length === 0 ?
                  (
          <Spin
            size="large"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        ) : (
          itemsList.map((eachItem) => {
            return (
              <div key={eachItem.item_name} className="paper">
                <form className="form1" noValidate>
                  <Grid className="lbl_topiSub" item xs={12} sm={12}>
                    Item
                  </Grid>
                  <br />
                  <Grid item xs={12} sm={6}>
                    <hr className="hr_topiSub" />
                    <br />
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid container spacing={2}>
                    {" "}
                    <Grid className="lbl_topis" item xs={12} sm={4}>
                      Item Name
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      :
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <p>{eachItem.item_name}</p>
                    </Grid>
                    <Grid className="lbl_topis" item xs={12} sm={4}>
                      Item Discount(LKR)
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      :
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CurrencyFormat
                        value={eachItem.discount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
                    </Grid>
                    <Grid className="lbl_topis" item xs={12} sm={4}>
                      Qty
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      :
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <p>{eachItem.qty}</p>
                    </Grid>
                    <Grid className="lbl_topis" item xs={12} sm={4}>
                      Color
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      :
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <p>{eachItem.color}</p>
                    </Grid>
                    <Grid className="lbl_topis" item xs={12} sm={4}>
                      Guarantee Period
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      :
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <p>
                        {eachItem.gurantee_period.toString() +
                          " " +
                          eachItem.gurantee_type.value.toString()}
                      </p>
                    </Grid>
                  
                  </Grid>

                  <TableContainer
                    component={Paper}
                    className="main_containerNo"
                  >
                    <hr />
                    <Table
                      className="gass_Table"
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead className="No_Table_head">
                        <TableRow>
                          <TableCell className="tbl_cell">SerialNo</TableCell>
                          <TableCell className="tbl_cell" align="right">
                            ModelNo
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {eachItem.listSe.length > 0
                          ? eachItem?.listSe?.map((row) => (
                              <TableRow key={0}>
                                <TableCell component="th" scope="row">
                                  {eachItem.listSe[0]?.serialNo?.map(
                                    (serailNoT) => (
                                      <h5 key={serailNoT}>{serailNoT}</h5>
                                    )
                                  )}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {eachItem.listSe[0]?.modelNo?.map(
                                    (modelNoT) => (
                                      <h5 key={modelNoT}>{modelNoT}</h5>
                                    )
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          : ""}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </form>
                <hr />
              </div>
            );
          })
        )}
      </Container>
    </>
  );
}
