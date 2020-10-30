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

export default function Dashboard(props) {
  var theme = useTheme();

  const [payandgoAllSales, setPayandgoAllSales] = useState(0);
  const [fullpaymentAllSales, setFullpaymentAllSales] = useState(0);
  const [payandgoTodaySales, setPayandgoTodaySales] = useState(0);
  const [fullpaymentTodaySales, setFullpaymentTodaySales] = useState(0);
  const [payandgoMonthSales, setPayandgoMonthSales] = useState(0);
  const [fullpaymentMonthSales, setFullpaymentMonthSales] = useState(0);
  const [mostSalesItems, setMostSalesItems] = useState([]);

  const getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  };

  useEffect(() => {
    var instaTot = 0;
    var instaToday = 0;
    var instaMonth = 0;
    var raw1 = [];
    db.collection("invoice")
      .onSnapshot((reProfit) => {
        reProfit.docs.forEach((eachPro) => {
          eachPro.data().items.forEach((eachItems) => {
            var index = getIndex(eachItems.item_id, raw1, "items_id");
            if (index === -1) {
              raw1.push({
                items_id: eachItems.item_id,
                qty: eachItems.qty,
              });
            } else {
              let plusQty = eachItems.qty + raw1[index].qty;
              raw1[index] = {
                items_id: eachItems.item_id,
                qty: plusQty,
              };
            }
          });

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
      })
      .then((re) => {
        raw1.sort((a, b) => {
          if (a.qty > b.qty) {
            return -1;
          } else {
            return 1;
          }
        });
        if (mostSalesItems.length <= 5) {
          raw1.forEach((getItems) => {
            db.collection("item")
              .doc(getItems.items_id)
              .get()
              .then((reEachIten) => {
                setMostSalesItems((old) => [
                  ...old,
                  createData(
                    reEachIten.data().itemName,
                    reEachIten.data().modelNo,
                    reEachIten.data().salePrice,
                    reEachIten.data().cashPrice,
                    reEachIten.data().downPayment,
                    getItems.qty,

                    <div
                      color="secondary"
                      size="small"
                      className={
                        reEachIten.data().qty !== 0
                          ? reEachIten.data().qty >= 3
                            ? "px-2"
                            : "px-3"
                          : "px-4"
                      }
                      variant="contained"
                    >
                      {reEachIten.data().qty !== 0 ? (
                        reEachIten.data().qty >= 3 ? (
                          <p className="status">Available</p>
                        ) : (
                          <p className="status">Low Stock</p>
                        )
                      ) : (
                        <p className="status">Out Of Stock</p>
                      )}
                    </div>
                  ),
                ]);
              });
          });
        }
      });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="widgetWrappe">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className="card_body1">
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
                    className="line_chart"
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
                <Grid className="payGoing" item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                    Pay and Go
                  </Typography>
                  <Typography size="md" className="payGoing_lbl">
                    {" "}
                    <CurrencyFormat
                      value={payandgoAllSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
                <Grid className="fullPaying" item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography className="fullPaying_lbl" size="md">
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

          <Grid item xs={12} sm={4} className="card_body2">
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
                    className="line_chart"
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
                <Grid className="payGoing" item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                    Pay and Go
                  </Typography>
                  <Typography size="md" className="payGoing_lbl">
                    {" "}
                    <CurrencyFormat
                      value={payandgoTodaySales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid className="fullPaying" item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography size="md" className="fullPaying_lbl">
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

          <Grid item xs={12} sm={4} className="card_body3">
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
                    className="line_chart"
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
                <Grid className="payGoing" item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                    Pay and Go
                  </Typography>
                  <Typography size="md" className="payGoing_lbl">
                    <CurrencyFormat
                      value={payandgoMonthSales}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid className="fullPaying" item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography size="md" className="fullPaying_lbl">
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

          <Grid item xs={12} sm={12} className="mostSales_tbl">
            <Typography size="xl">Most Sales Items</Typography>
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
                  {mostSalesItems.map((row) => (
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
