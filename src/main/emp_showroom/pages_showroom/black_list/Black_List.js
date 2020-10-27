import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
// eslint-disable-next-line
import CurrencyFormat from "react-currency-format";

// components
import BlackListCustomers from "../black_list/customer_model/BlackList_Customers";
import BlackListHistory from "../black_list/blackList_history_Model/blackList_history";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

// styles
import "./Black_List.css";

export default function Black_List() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const [visibleCustomer, setVisibleCustomer] = useState(false); // customer table models
  const [customerhistory, setCustomerhistory] = useState(false); // customer table models

  const showModalCustomer = () => {
    setVisibleCustomer(true);
  };
  const showModalCustomerHistory = () => {
    setCustomerhistory(true);
  };

  //START pay And Go Columns
  const repairTableColomns = [
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
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Telephone",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },

    {
      name: "Action",

      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            width: "150px",
            margin: "auto",
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  const repairTableData = [
    {
      InvoiceNo: "3476-JDJCF",
      FirstName: "test",
      LastName: "test",
      NIC: "test",
      Telephone: "test",
      Action: (
        <div>
          <VisibilityIcon onClick={showModalCustomer} />
          <span className="icon_Edit">
            <HistoryIcon onClick={showModalCustomerHistory} />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      {/*Start customer Details models */}

      <Modal
        visible={visibleCustomer}
        className="customer_Model"
        footer={null}
        onCancel={() => {
          setVisibleCustomer(false);
        }}
      >
        <div className="customer_Model">
          <div className="customer_Model_Main">
            <div className="customer_Modell_Detail">
              <BlackListCustomers />
            </div>
          </div>
        </div>
      </Modal>

      {/*END customer Details models */}

      {/*Start customer Details models HISTORY */}
      <Modal
        visible={customerhistory}
        className="blacListkModel_Model_history"
        footer={null}
        onCancel={() => {
          setCustomerhistory(false);
        }}
      >
        <div>
          <div>
            <div>
              <BlackListHistory />
            </div>
          </div>
        </div>
      </Modal>
      {/*END customer Details models HISTORY */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span_blackList">BLACK LIST</span>}
            className="blackList_Table"
            data={repairTableData}
            columns={repairTableColomns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "textfield",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    ""
                  ),
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
