import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Spin, Modal } from "antd";
import MUIDataTable from "mui-datatables";
import { Button, Box, Tab, Tabs, AppBar, Grid } from "@material-ui/core";

// components
import UpdateInstallment from "../invoice_History/components/PayAndGoModel/UpdateModel/Update_Model";
import InstallmentHistory from "../invoice_History/components/PayAndGoModel/HistoryModel/History_Model";
import InstallmentView from "../invoice_History/components/PayAndGoModel/ViewModel/View_Model";
import InstallmentFullPayment from "../invoice_History/components/FullPaymentModel/Full_Payment_Model";

// styles
import "./Invoice_history.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";
import PaymentSharpIcon from "@material-ui/icons/AttachMoneyOutlined";

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

export default function Invoice_history() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [installmentUpdate, setInstallmentUpdate] = useState(false); //  table models
  const [installmentvisible, setInstallmentVisible] = useState(false); //  table models
  const [installmentHistory, setInstallmentHistory] = useState(false); //  table models
  const [installmentFullPayment, setInstallmentFullPayment] = useState(false); //  table models

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showModalUpdate = () => {
    setInstallmentUpdate(true);
  };

  const showModalHistory = () => {
    setInstallmentHistory(true);
  };

  const showInstallmentView = () => {
    setInstallmentVisible(true);
  };

  const showInstallmentFullPayment = () => {
    setInstallmentFullPayment(true);
  };

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
      name: "Discount",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Total",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Status",
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
            width: "10px",
            margin: "auto",
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
      Discount: "Thaksala",
      Total: "232323454v",
      Status: "858689",
      Action: (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="btn_pay"
            onClick={showModalUpdate}
          >
            Update
          </Button>
          <span className="icon_visibl">
            <HistoryIcon onClick={showModalHistory} />
          </span>
          <span className="icon_Edit">
            <VisibilityIcon onClick={showInstallmentView} />
          </span>
        </div>
      ),
    },
  ];

  //END  pay And Go Columns

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
      DownPayment: "858689",
      Date: "2020.09.28",
      Action: (
        <div>
          <VisibilityIcon onClick={showInstallmentFullPayment} />
        </div>
      ),
    },
  ];

  //START Full Payment Colomns

  return (
    <>
      {/*Start Installment Model Update */}
      <Modal
        visible={installmentUpdate}
        className="update_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentUpdate(false);
        }}
      >
        <div className="update_Installment_Model">
          <div className="update_Installment_Model_Main">
            <div className="update_Installment_Model_Detail">
              <UpdateInstallment />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model Update */}

      {/*Start Installment Model History */}
      <Modal
        visible={installmentHistory}
        className="history_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentHistory(false);
        }}
      >
        <div className="Installment_Model">
          <div className="Installment_Model_Main">
            <div className="Installment_Model_Detail">
              <InstallmentHistory />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model History */}
      {/*Start Installment Model View */}
      <Modal
        visible={installmentvisible}
        className="view_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentVisible(false);
        }}
      >
        <div className="Installment_Model">
          <div className="Installment_Model_Main">
            <div className="Installment_Model_Detail">
              <InstallmentView />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model View */}
      {/*Start Installment Model Full Payment */}
      <Modal
        visible={installmentFullPayment}
        className="FullPayment_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentFullPayment(false);
        }}
      >
        <div className="FullPayment_Installment_Model">
          <div className="FullPayment_Installment_Model_Main">
            <div className="FullPayment_Installment_Model_Detail">
              <InstallmentFullPayment />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model Full Payment */}
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
    </>
  );
}
