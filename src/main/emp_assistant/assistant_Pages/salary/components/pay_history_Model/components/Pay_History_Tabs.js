import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// components pages
import CashSaleTable from "./tab_containers/cash_sale_HistoryTbl/Cash_Sale_Table";
import CashTargetTable from "./tab_containers/cash_targetHistoryTbl/Cash_Target_Table";
import ExCardTable from "./tab_containers/ex_card_HistoryTbl/Ex_Card_Table";
import SaleTargetTable from "./tab_containers/sale_target_HistoryTbl/Sale_Target_Table";
import ShortageTable from "./tab_containers/shortage_HistoryTbl/Shortage_Table";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
        width: '100%',
    marginTop:'70px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Pay_History_Tabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<MoneyOffIcon />} label="Shortage"  aria-label="phone" {...a11yProps(0)} />
          <Tab icon={<TrendingUpIcon />} label="Sale Target" aria-label="favorite" {...a11yProps(1)} />
          <Tab icon={<LocalAtmIcon />} label="Cash Target" aria-label="person" {...a11yProps(2)} />
          <Tab icon={<MonetizationOnIcon />} label="Cash Sale" aria-label="help" {...a11yProps(3)} />
          <Tab icon={<AssignmentTurnedInIcon />} label="Ex Card" aria-label="shopping" {...a11yProps(4)} />
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       <ShortageTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SaleTargetTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
         <CashTargetTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CashSaleTable />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ExCardTable />
      </TabPanel>
     
    </div>
  );
}
