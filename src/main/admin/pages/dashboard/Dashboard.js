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
  const [installmentToday, setInstallmentToday] = useState(0);
  const [installmentMonth, setInstallmentMonth] = useState(0);
  const [installmentAll, setInstallmentAll] = useState(0);

  const getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  };

  useEffect(() => {
    var raw1 = [];
    var count = 0;

    db.collection("invoice")
      .get()
      .then((reProfit) => {
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
                        var reInst =
                          reInstall.data().amount + reInstall.data().delayed;
                        setInstallmentToday(
                          (installmentTodaySoo) => installmentTodaySoo + reInst
                        );
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
                      var reMonthInst =
                        reInstall.data().amount + reInstall.data().delayed;

                      setInstallmentMonth(
                        (installmentMonthSoo) =>
                          installmentMonthSoo + reMonthInst
                      );
                    }
                  }

                  //all installments

                  var reInstAll =
                    reInstall.data().amount + reInstall.data().delayed;

                  setInstallmentAll(
                    (installmentAllSoo) => installmentAllSoo + reInstAll
                  );
                });
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
                  new Date(eachPro.data()?.date?.seconds * 1000).getFullYear()
                ) {
                  let befToday = eachPro.data().total;

                  setPayandgoTodaySales(
                    (passPayandgoToday) => passPayandgoToday + befToday
                  );
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
                let befMonth = eachPro.data().total;

                setPayandgoMonthSales(
                  (passPayandgoMonth) => passPayandgoMonth + befMonth
                );
              }
            }

            let bef = eachPro.data().total;
            setPayandgoAllSales((payandgoAll) => payandgoAll + bef);
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
                  setFullpaymentTodaySales(
                    (fPayDaySales) => fPayDaySales + eachPro.data().total
                  );
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
                setFullpaymentMonthSales(
                  (fpayMonthSales) => fpayMonthSales + eachPro.data().total
                );
              }
            }

            setFullpaymentAllSales(
              (fpayAllSales) => fpayAllSales + eachPro.data().total
            );
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

        if (count <= 5) {
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
            count++;
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
            <Paper title="All Income" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">All Income(LKR)</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={(payandgoAllSales+installmentAll) + fullpaymentAllSales}
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
                      value={payandgoAllSales+installmentAll}
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
            <Paper title="Today Income" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Today Income(LKR)</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={(payandgoTodaySales+installmentToday) + fullpaymentTodaySales}
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
                      value={payandgoTodaySales + installmentToday}
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
            <Paper title="Current Month Income" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Current Month Income(LKR)</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={(payandgoMonthSales+installmentMonth) + fullpaymentMonthSales}
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
                      value={payandgoMonthSales + installmentMonth}
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
