import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { LineChart, Line } from "recharts";
import { useTheme } from "@material-ui/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CurrencyFormat from "react-currency-format";
import { DatePicker, Space } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "antd";

// components
import ExpencesModel from "./components/expences/Expences_Model";
import GassModel from "./components/gass/Gass_Model";
import SalesModel from "./components/sales/Sales_Model";
import { Typography } from "../../../../assistant_Wrappers/Wrappers";
import ModelVehicalService from "../../components/Vehical_Service_Model";

//icons
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";

// styles
import "./Report_Cards.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
 
});

export default function Report_Cards() {
  const [vehicalServiceModel, setVehicalServiceModel] = useState(false); //  model service Vehical
  const [expencesModel, setExpencesModel] = useState(false); //  model  
  const [gassModel, setGassModel] = useState(false); //  model  
  const [salesModel, setSalesModel] = useState(false); //  model  
  // eslint-disable-next-line
  const [recordPnl, setRecordPnl] = useState(false);
  // eslint-disable-next-line
  const [expencesPnl, setExpencesPnl] = useState(false);
   let history1 = useHistory();
  let history2 = useHistory();

  const VehicalServiceModel = () => {
    setVehicalServiceModel(true);
  };

  const RecordPnl = () => {
    setRecordPnl(true);
    history1.push("/assistant/pages/records");
  };

  const ExpencesPnl = () => {
    setExpencesPnl(true);
    history2.push("/assistant/pages/expences");
  };

  const ViewExpencesModel = () => {
    setExpencesModel(true);
  };
  const ViewGassModel = () => {
    setGassModel(true);
  };
  const ViewSalesModel = () => {
    setSalesModel(true);
  };

  var theme = useTheme();
   const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <>

         {/*Start Vehical Service Model */}

      <Modal
        visible={vehicalServiceModel}
        footer={null}
        className="vehical_servicemdl"
        onCancel={() => {
          setVehicalServiceModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ModelVehicalService />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  Vehical Service Model  */}

         {/*Start expencesM  Model */}

      <Modal
        visible={expencesModel}
        footer={null}
        className="excx_servicemdl"
        onCancel={() => {
          setExpencesModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ExpencesModel />
            </div>
          </div>
        </div>
      </Modal>

        {/* End  expences  Model  */}
        
         {/*Start gass  Model */}

      <Modal
        visible={gassModel}
        footer={null}
        className="gasscxModel"
        onCancel={() => {
          setGassModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <GassModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End gass  Model  */}

         {/*Start sales Model */}

      <Modal
        visible={salesModel}
        footer={null}
        className="salescxModel"
        onCancel={() => {
          setSalesModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <SalesModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  sales Model  */}
            
       <div className="widgetWrappe">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="card_body1_cx">
            <Paper  className="card_cx" onClick={ViewSalesModel}>
            <Grid  container spacing={3}>
              <Grid item xs={12} sm={6}>
                <h2 className="tipics_cards_cx">All Sales Balance</h2>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <div className="vlo"></div>
                  </Grid>
                  <Grid className="date_pikr" item xs={12} sm={5}>
                     <Typography className="select_txt_cx" color="text" colorBrightness="secondary">
                       Select Year & Month
                      </Typography> 
                    <Space direction="vertical">
                         <DatePicker className="date_pikr" picker="month" />   
                     </Space>             
                      </Grid>
                       </Grid>
              <div className="visitsNumberContainer_cx">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={4}>
                   <Typography className="mainTotal_txt_cx" color="text" colorBrightness="secondary">
                  Total Sale
                  </Typography>
                  <Typography className="total_cx" size="xl">
                    <CurrencyFormat
                      value={2324543 }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LineChart
                    className="line_chart_cx"
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
                  <Grid item xs={12} sm={4}  className="credit_recvd">
                    <Typography  className="credit_recvd_txt_cx" color="text" colorBrightness="secondary">
                  {bull}Credit Received
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
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
                <Grid className="payGoing_cx top" item xs={12} sm={3}>
                  <Typography color="text" className="Cash_txt_cx" colorBrightness="secondary">
                    {bull}Cash Sale
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
                <Grid className="payGoing_cx" item xs={12} sm={4}>
                  <Typography color="text" className="Cash_txt_cx" colorBrightness="secondary">
                   {bull}Down Payment
                  </Typography>
                  <Typography className="Credit_lbl_cx" size="md">
                    {" "}
                    <CurrencyFormat
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                  </Grid>
                  <Grid className="payGoing_cx" item xs={12} sm={4}>
                  <Typography color="text" className="Cash_txt_cx" colorBrightness="secondary">
                   {bull}Document Charge
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
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

          <Grid item xs={12} sm={6} className="card_body2_cx">
            <Paper title="Gass Balance" className="card_cx"  onClick={ViewGassModel}>
               <Grid  container spacing={3}>
              <Grid item xs={12} sm={6}>
                <h2 className="tipics_cards_cx">All Gass Balance </h2>
                 </Grid>
                  <Grid item xs={12} sm={1}>
                    <div className="vloGss"></div>
                  </Grid>
                  <Grid className="date_pikr" item xs={12} sm={5}>
                    <Typography className="select_txt_cx" color="text" colorBrightness="secondary">
                       Select Year & Month
                      </Typography> 
                    <Space direction="vertical">
                         <DatePicker className="date_pikr" picker="month" />   
                     </Space> 
                                 
                      </Grid>
                       </Grid>
              <div className="visitsNumberContainer_cx">
                <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography  className="mainTotal_txt_cx" color="text" colorBrightness="secondary">
                   The Rest of the Hand
                  </Typography>
                  <Typography  className="total_cx" size="xl">
                    <CurrencyFormat
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <LineChart
                    className="line_chart_cx"
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
                <Grid className="Soldgrid" item xs={12} sm={6}>
                  <Typography  className="Cash_txt_cx"  color="text" colorBrightness="secondary">
                    {bull}Sold Amount
                  </Typography>
                  <Typography size="md"  className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid className="Soldgrid" item xs={12} sm={5}>
                  <Typography color="text" className="Cash_txt_cx"  colorBrightness="secondary">
                   {bull}Purchased Amount
                  </Typography>
                  <Typography size="md"  className="Credit_lbl_cx">
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
            
      <Grid  container spacing={3}>
      <Grid item xs={12} sm={6}>
      <Card className="card_Bttm" onClick={ViewExpencesModel}>
      <CardContent>
        <Grid  container spacing={3}>
              <Grid item xs={12} sm={6}>
                <h2 className="tipics_cards_cx">All Expences Balance </h2>
                 </Grid>
                  <Grid item xs={12} sm={1}>
                    <div className="vloEx"></div>
                  </Grid>
                  <Grid className="date_pikr" item xs={12} sm={5}>
                    <Typography className="select_txt_cx" color="text" colorBrightness="secondary">
                       Select Year & Month
                      </Typography> 
                    <Space direction="vertical">
                         <DatePicker className="date_pikr" picker="month" />   
                     </Space> 
                                 
                      </Grid>
                </Grid>
                 <div className="visitsNumberContainer_cx">
                <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography  className="mainTotal_txt_cx" color="text" colorBrightness="secondary">
                   Expences Balance 
                  </Typography>
                  <Typography  className="total_cx" size="xl">
                    <CurrencyFormat
                      value={2324543}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <LineChart
                    className="line_chart_cx"
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
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </div>
                  
      </CardContent>
        </Card>
        </Grid>
        
        <Grid item xs={12} sm={6}>
      <Card >
      <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
             <Button
            variant="contained"
            className="btn_Dash"
                      endIcon={<FolderOpenIcon />}
                       onClick={RecordPnl}
            
          >
            Reports
          </Button>     
        </Grid>   
         
         <Grid item xs={12} sm={12}>
             <Button
            variant="contained"
            className="btn_Expences"
                      endIcon={<PostAddIcon />}
                      onClick={ExpencesPnl}
          
          >
            Add Expences
          </Button>    
          </Grid>  
     <Grid item xs={12} sm={12}>
             <Button
            variant="contained"
            className="btn_VehicalService"
                      endIcon={<SettingsApplicationsIcon />}
                       onClick={VehicalServiceModel}
           
          >
            Vehical Services
          </Button>      
                </Grid>   
          
       </Grid>
      </CardContent>
    </Card>
          </Grid>
          </Grid>
                
          
                
   </>

)
}
