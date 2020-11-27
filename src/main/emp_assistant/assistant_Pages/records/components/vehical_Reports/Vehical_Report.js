import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


// styles
import "./Vehical_Report.css";

// components
import VehicalRepair from "./components/repair_for_vehical/Vehical_Repair";
import VehicalFuel from "./components/fuel_for_vehical/Vehical_Fuel";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Vehical_Report() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <>
      <p className="titleGass" >Vehical Expences</p>
    <div className="maindiv_gsaa">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Repair For Vehical" {...a11yProps(0)} />
              <Tab label="Fuel For Vehical" {...a11yProps(1)} />
              
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <VehicalRepair />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VehicalFuel />
        </TabPanel>
         
      
        </div>
            </>
  );
}
