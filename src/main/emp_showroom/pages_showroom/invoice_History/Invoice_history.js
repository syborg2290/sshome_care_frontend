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
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";

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

  //START pay And Go Columns

  const payAndGoColumns = [
    {
      name: "InvoiceNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Date",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Amount",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Delayed",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Balance",
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
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  const customerTableData = [
    {
      InvoiceNo: "232323454v",
      Date: "Kasun",
      Amount: "Thaksala",
      Delayed: "232323454v",
      Balance: "858689",
      Action: (
        <div>
          <AttachMoneyOutlinedIcon className="icon_pay" />
          <span className="icon_visibl">
            <VisibilityIcon />
          </span>
          <span className="icon_Edit">
            <HistoryIcon />
          </span>
        </div>
      ),
    },
  ];

  //END  pay And Go Columns

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //START Full Payment Colomns

  const fullPaymentColumns = [
    {
      name: "InvoiceNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "ItemName",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "ModelNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Qty",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "DownPayment",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Date",
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
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  const fullPaymentTableData = [
    {
      InvoiceNo: "4532-JH",
      ItemName: "Kasun",
      ModelNo: "Thaksala",
      Qty: "232323454v",
      DownPayment: "858689",
      Date: "2020.09.28",
      Action: (
        <div>
          <VisibilityIcon />
        </div>
      ),
    },
  ];

  //START Full Payment Colomns

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
              className="payAndgo_table"
              data={customerTableData}
              columns={payAndGoColumns}
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
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title={<span className="title_Span"></span>}
              className="fullPayment_table"
              data={fullPaymentTableData}
              columns={fullPaymentColumns}
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
    </div>
  );
}
