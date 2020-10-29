import React from "react";
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
    <p className="status_dash">Status</p>
  ),
];

export default function Dashboard(props) {
  var theme = useTheme();
  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="widgetWrappe">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} className="card_body1">
            <Paper title="Profit" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Profit</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    12, 678
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
                  <Typography className="payGoing_lbl" size="md">
                    860
                  </Typography>
                </Grid>
                <Grid className="fullPaying" item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography className="fullPaying_lbl" size="md">
                    32
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3} className="card_body2">
            <Paper title="Today Sales" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Today Sales</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    12, 678
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
                  <Typography className="payGoing_lbl" size="md">
                    860
                  </Typography>
                </Grid>
                <Grid className="fullPaying" item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography className="fullPaying_lbl" size="md">
                    32
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3} className="card_body3">
            <Paper title="Monthly Sales" className="card">
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <h2 className="tipics_cards">Monthly Sales</h2>
              </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    12, 678
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
                  <Typography className="payGoing_lbl" size="md">
                    860
                  </Typography>
                </Grid>
                <Grid className="fullPaying" item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Full Payment
                  </Typography>
                  <Typography className="fullPaying_lbl" size="md">
                    32
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3} className="card_body4">
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
                  <Typography
                    className="fullPaying"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Pay and Go Customers
                  </Typography>

                  <Typography className="Customers_lbl" size="md">
                    8
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <p></p>
                  <SupervisorAccountIcon className="icon_customers" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12}>
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
