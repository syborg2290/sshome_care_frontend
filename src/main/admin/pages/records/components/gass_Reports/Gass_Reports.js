import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// styles
import "./Gass_Reports.css";

// components
import PurchasedGass from "./components/purchased_Gass/Purchased_Gass";
import SoldGass from "./components/sold_Gass/Sold_Gass";
import RestOfHand from "./components/rest_of_hand/Rest_Of_Hand";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Gass_Reports() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <p className="titleGass">Gass Reports</p>
      <div className="maindiv_gsaa">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Sold Gass" {...a11yProps(0)} />
            <Tab label="Purchased Gass" {...a11yProps(1)} />
            <Tab label="The rest of the hand" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SoldGass />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PurchasedGass />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RestOfHand />
        </TabPanel>
      </div>
      {/* <Grid container spacing={4}>
        <Grid item xs={12}>
            <p className="profitas" > =</p><span>12345.00</span>
          </Grid>
          </Grid> */}
    </>
  );
}
