import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

// styles
import "./Invoice_List.css";

//components
import PayAndGo from "../invoice_List/payAndGo/PayAnd_Go";
import FullPayment from "../invoice_List/fullPayment/Full_Payment";

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

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#222A44",
  },
}));

export default function Invoice_List() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mainRoot">
      <AppBar className="List_appBar" position="static">
        <Tabs
          value={value}
          classes={{ indicator: classes.indicator }}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Pay & Go" {...a11yProps(0)} />
          <Tab label="Full Payment" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PayAndGo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FullPayment />
      </TabPanel>
    </div>
  );
}
