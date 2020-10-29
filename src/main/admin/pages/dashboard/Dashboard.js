import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import { LineChart, Line } from "recharts";
import { useTheme } from "@material-ui/styles";

import db from "../../../../config/firebase.js";
import CurrencyFormat from "react-currency-format";

// styles
import "./Dashboard.css";

//icons
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

// components
import PageTitle from "../../PageTitle/PageTitle";
import { Typography } from "../../Wrappers/Wrappers";

function createData(
  name,
  modelNo,
  salePrice,
  cashPrice,
  downPayament,
  qty,
  status
) {
  return { name, modelNo, salePrice, cashPrice, downPayament, qty, status };
}

const rows = [
  createData(
    "Stand Fan",
    "HJEE-32",
    12000.0,
    1000.0,
    19000.0,
    12,
    <p className="status">Status</p>
  ),
  createData(
    "Gass Cooker",
    "HJEE-32",
    1000.0,
    1000.0,
    20000.0,
    6,
    <p className="status">Status</p>
  ),
];

export default function Dashboard(props) {
  var theme = useTheme();

  const [payandgoAllSales, setPayandgoAllSales] = useState(0);
  const [fullpaymentAllSales, setFullpaymentAllSales] = useState(0);
  const [payandgoTodaySales, setPayandgoTodaySales] = useState(0);
  const [fullpaymentTodaySales, setFullpaymentTodaySales] = useState(0);
  const [payandgoMonthSales, setPayandgoMonthSales] = useState(0);
  const [fullpaymentMonthSales, setFullpaymentMonthSales] = useState(0);

  useEffect(() => {
    var instaTot = 0;
    var instaToday = 0;
    var instaMonth = 0;
    db.collection("invoice")
      .get()
      .then((reProfit) => {
        reProfit.docs.forEach((eachPro) => {
          if (eachPro.data().installmentType !== null) {
            db.collection("installment")
              .where("invoice_number", "==", eachPro.data().invoice_number)
              .get()
              .then((instReDoc) => {
                instReDoc.docs.forEach((reInstall) => {
                  // today installments

                  if (
                    new Date().getDate() ===
                    new Date(reInstall.data()?.date?.seconds * 1000).getDate()
                  ) {
                    if (
                      new Date().getMonth() ===
                      new Date(
                        reInstall.data()?.date?.seconds * 1000
                      ).getMonth()
                    ) {
                      if (
                        new Date().getFullYear() ===
                        new Date(
                          reInstall.data()?.date?.seconds * 1000
                        ).getFullYear()
                      ) {
                        let sooooToday =
                          reInstall.data().amount + reInstall.data().delayed;
                        instaToday = instaToday + sooooToday;
                      }
                    }
                  }

                  // current month installments

                  if (
                    new Date().getMonth() ===
                    new Date(reInstall.data()?.date?.seconds * 1000).getMonth()
                  ) {
                    if (
                      new Date().getFullYear() ===
                      new Date(
                        reInstall.data()?.date?.seconds * 1000
                      ).getFullYear()
                    ) {
                      let sooooMonth =
                        reInstall.data().amount + reInstall.data().delayed;
                      instaMonth = instaMonth + sooooMonth;
                    }
                  }

                  //all installments

                  let soooo =
                    reInstall.data().amount + reInstall.data().delayed;
                  instaTot = instaTot + soooo;
                });

                if (
                  new Date().getDate() ===
                  new Date(eachPro.data()?.date?.seconds * 1000).getDate()
                ) {
                  if (
                    new Date().getMonth() ===
                    new Date(eachPro.data()?.date?.seconds * 1000).getMonth()
                  ) {
                    if (
                      new Date().getFullYear() ===
                      new Date(
                        eachPro.data()?.date?.seconds * 1000
                      ).getFullYear()
                    ) {
                      let befToday = eachPro.data().total + instaToday;
                      let passPayandgoToday = payandgoTodaySales + befToday;
                      setPayandgoTodaySales(passPayandgoToday);
                    }
                  }
                }

                if (
                  new Date().getMonth() ===
                  new Date(eachPro.data()?.date?.seconds * 1000).getMonth()
                ) {
                  if (
                    new Date().getFullYear() ===
                    new Date(eachPro.data()?.date?.seconds * 1000).getFullYear()
                  ) {
                    let befMonth = eachPro.data().total + instaMonth;
                    let passPayandgoMonth = payandgoMonthSales + befMonth;
                    setPayandgoMonthSales(passPayandgoMonth);
                  }
                }

                let bef = eachPro.data().total + instaTot;
                let passPayandgo = payandgoAllSales + bef;
                setPayandgoAllSales(passPayandgo);
              });
          } else {
            if (
              new Date().getDate() ===
              new Date(eachPro.data()?.date?.seconds * 1000).getDate()
            ) {
              if (
                new Date().getMonth() ===
                new Date(eachPro.data()?.date?.seconds * 1000).getMonth()
              ) {
                if (
                  new Date().getFullYear() ===
                  new Date(eachPro.data()?.date?.seconds * 1000).getFullYear()
                ) {
                  let passFullpaymentToday =
                    fullpaymentTodaySales + eachPro.data().total;
                  setFullpaymentTodaySales(passFullpaymentToday);
                }
              }
            }
            if (
              new Date().getMonth() ===
              new Date(eachPro.data()?.date?.seconds * 1000).getMonth()
            ) {
              if (
                new Date().getFullYear() ===
                new Date(eachPro.data()?.date?.seconds * 1000).getFullYear()
              ) {
                let passFullpaymentMonth =
                  fullpaymentMonthSales + eachPro.data().total;
                setFullpaymentMonthSales(passFullpaymentMonth);
              }
            }
            let passFullpayment = fullpaymentAllSales + eachPro.data().total;
            setFullpaymentAllSales(passFullpayment);
          }
        });
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="widgetWrappe">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Paper title="Profit" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">All Income(LKR)</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={payandgoAllSales + fullpaymentAllSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LineChart
                    width={55}
                    height={30}
                    data={[
                      { value: 10 },
                      { value: 15 },
                      { value: 10 },
                      { value: 17 },
                      { value: 18 },
                    ]}
                  >
                    <Line
                      stroke={theme.palette.success.main}
                      type="natural"
                      dataKey="value"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </div>
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction="row"
                className="cost"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                    Pay and Go
                  </Typography>
                  <Typography size="md">
                    {" "}
                    <CurrencyFormat
                      value={payandgoAllSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography size="md">
                    {" "}
                    <CurrencyFormat
                      value={fullpaymentAllSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Paper title="Today Sales" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Today Income(LKR)</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={payandgoTodaySales + fullpaymentTodaySales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LineChart
                    width={55}
                    height={30}
                    data={[
                      { value: 10 },
                      { value: 15 },
                      { value: 10 },
                      { value: 17 },
                      { value: 18 },
                    ]}
                  >
                    <Line
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.warning.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </div>
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction="row"
                className="cost"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                    Pay and Go
                  </Typography>
                  <Typography size="md">
                    {" "}
                    <CurrencyFormat
                      value={payandgoTodaySales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography size="md">
                    {" "}
                    <CurrencyFormat
                      value={fullpaymentTodaySales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Paper title="Monthly Sales" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Current Month Income(LKR)</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={payandgoMonthSales + fullpaymentMonthSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LineChart
                    width={55}
                    height={30}
                    data={[
                      { value: 10 },
                      { value: 15 },
                      { value: 10 },
                      { value: 17 },
                      { value: 18 },
                    ]}
                  >
                    <Line
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.secondary.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </div>
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction="row"
                className="cost"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                    Pay and Go
                  </Typography>
                  <Typography size="md">
                    <CurrencyFormat
                      value={payandgoMonthSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography size="md">
                    <CurrencyFormat
                      value={fullpaymentMonthSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Paper title="Current Arrears" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Current Arrears</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={11}>
                  <Typography className="total" size="xl">
                    12, 678
                  </Typography>
                </Grid>
              </div>
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction="row"
                className="cost"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={9}>
                  <Typography color="text" colorBrightness="secondary">
                    Pay and Go Customers
                  </Typography>

                  <Typography size="md">8</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <p></p>
                  <SupervisorAccountIcon className="icon_customers" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography className="total" size="xl">
              Most Sales Items
            </Typography>
            <br />
            <hr />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper}>
              <Table className="table" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tbl_cell" align="left">
                      Item&nbsp;Name
                    </TableCell>
                    <TableCell className="tbl_cell" align="left">
                      Model&nbsp;No.
                    </TableCell>
                    <TableCell className="tbl_cell" align="left">
                      Sales&nbsp;Price
                    </TableCell>
                    <TableCell className="tbl_cell" align="left">
                      Cash&nbsp;Price
                    </TableCell>
                    <TableCell className="tbl_cell" align="left">
                      Down&nbsp;Payment
                    </TableCell>
                    <TableCell className="tbl_cell" align="left">
                      Qty
                    </TableCell>
                    <TableCell className="tbl_cell" align="left">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.modelNo}</TableCell>
                      <TableCell align="left">{row.salePrice}</TableCell>
                      <TableCell align="left">{row.cashPrice}</TableCell>
                      <TableCell align="left">{row.downPayament}</TableCell>
                      <TableCell align="left">{row.qty}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
