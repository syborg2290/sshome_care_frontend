import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Spin } from "antd";
import MUIDataTable from "mui-datatables";

// styles
import "./Invoice_history.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#222A44",
  },
}));

export default function Invoice_history() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const columns = [
    {
      name: "IMG",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "FirstName",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "LastName",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "NIC",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Mobile",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Action",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  const customerTableData = [
    {
      IMG: "232323454v",
      FirstName: "Kasun",
      LastName: "Thaksala",
      NIC: "232323454v",
      Mobile: "858689",
      Action: (
        <div>
          <VisibilityIcon />
          <span className="icon_Edit">
            <HistoryIcon />
          </span>
        </div>
      ),
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div component="main" className="main_container">
      <AppBar className="appBar" position="static">
        <Tabs
          classes={{ indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
        >
          <Tab className="tabs" label=" Pay & Go" {...a11yProps(0)} />
          <Tab className="tabs" label="Full Payment" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title={<span className="title_Span"></span>}
              className="customer_table"
              data={customerTableData}
              columns={columns}
              options={{
                selectableRows: false,
                customToolbarSelect: () => {},
                filterType: "checkbox",
                download: false,
                print: false,
                searchPlaceholder: "Search using any column names",
                elevation: 4,
                sort: true,
                onRowClick: (rowData, rowMeta) => {
                  setCurrentIndx(rowMeta.rowIndex);
                },
                textLabels: {
                  body: {
                    noMatch: isLoading ? (
                      <Spin
                        className="tblSpinner"
                        size="large"
                        spinning="true"
                      />
                    ) : (
                      <img
                        alt="Empty data"
                        className="empty_data"
                        src={require("../../../../assets/empty.png")}
                      />
                    ),
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Full Payment
      </TabPanel>
    </div>
  );
}
