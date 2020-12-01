import React from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { LineChart, Line } from "recharts";
import { useTheme } from "@material-ui/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CurrencyFormat from "react-currency-format";
import { DatePicker, Space } from 'antd';

// components
import { Typography } from "../../../../assistant_Wrappers/Wrappers";


// styles
import "./Report_Cards.css";

export default function Report_Cards() {
     var theme = useTheme();
    return (
        <>
            
       <div className="widgetWrappe">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="card_body1">
                        <Paper title="All Income" className="card">
                               <Grid  container spacing={3}>
              <Grid item xs={12} sm={7}>
                <h2 className="tipics_cards">All Expences Balance Report</h2>
                 </Grid>
                   <Grid className="date_pikr" item xs={12} sm={5}>
                    <Space direction="vertical">
                         <DatePicker className="date_pikr" picker="month" />   
                     </Space>             
                      </Grid>
                       </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={2324543 }
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
                      value={2324543}
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
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} className="card_body2">
            <Paper title="Today Income" className="card">
               <Grid  container spacing={3}>
              <Grid item xs={12} sm={7}>
                <h2 className="tipics_cards">All Gass Balance Report</h2>
                 </Grid>
                   <Grid className="date_pikr" item xs={12} sm={5}>
                    <Space direction="vertical">
                         <DatePicker className="date_pikr" picker="month" />   
                     </Space>             
                      </Grid>
                       </Grid>
              <div className="visitsNumberContainer">
                <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                   The Rest of the Hand
                  </Typography>
                  <Typography className="total" size="xl">
                    <CurrencyFormat
                      value={2324543}
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
                <Grid className="payGoing" item xs={12} sm={6}>
                  <Typography color="text" colorBrightness="secondary">
                    Sold Amount
                  </Typography>
                  <Typography size="md" className="payGoing_lbl">
                    {" "}
                    <CurrencyFormat
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid className="fullPaying" item xs={12} sm={5}>
                  <Typography color="text" colorBrightness="secondary">
                   Purchased Amount
                  </Typography>
                  <Typography size="md" className="fullPaying_lbl">
                    {" "}
                    <CurrencyFormat
                      value={23245}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
        </Grid>

    </Grid>
            </div>
            

    <Grid className="Botm_crd_grid" container spacing={3}>
     <Grid className="Botm_crd_grid" item xs={12} sm={8}>
      <Card>
      <CardContent>
        <h2 className="tipics_cards">Current Month Income(LKR)</h2>
      </CardContent>
        </Card>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
                </Grid>
   </>

)
}
