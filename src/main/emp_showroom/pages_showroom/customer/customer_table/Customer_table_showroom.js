import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import MUIDataTable from "mui-datatables";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

// components
import CustomerDetails from "./components/customerDetailsModel/CustomerDetailsModel";
import CustomerHistory from "./components/customerHistoryModel/CustomerHistoryModel";

// styles
import "./Customer_table_showroom.css";

export default function ItemTable() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = useState(false); // customer table models
  const [history, setHistory] = useState(false); // customer table models

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const showModal = () => {
    setVisible(true);
  };

  const showModalHistory = () => {
    setHistory(true);
  };

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
      IMG: (
        <img
          alt="Empty data"
          className="avatar_data"
          src={require("../../../../../assets/avatar.png")}
        />
      ),
      FirstName: "Kasun",
      LastName: "Thaksala",
      NIC: "232323454v",
      Mobile: "858689",
      Action: (
        <div>
          <VisibilityIcon onClick={showModal} />
          <span className="icon_Edit">
            <HistoryIcon onClick={showModalHistory} />
          </span>
        </div>
      ),
    },
    {
      IMG: (
        <img
          alt="Empty data"
          className="avatar_data"
          src={require("../../../../../assets/avatar.png")}
        />
      ),
      FirstName: "Janith",
      LastName: "Kavishka",
      NIC: "123456789v",
      Mobile: "754845375",
      Action: (
        <div>
          <VisibilityIcon onClick={showModal} />
          <span className="icon_Edit">
            <HistoryIcon onClick={showModalHistory} />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      {/*Start customer Details models */}

      <Modal
        visible={visible}
        className="customer_Model"
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="customer_Model">
          <div className="customer_Model_Main">
            <div className="customer_Modell_Detail">
              <CustomerDetails />
            </div>
          </div>
        </div>
      </Modal>

      {/*End customer Details models */}

      {/*Start customer History models */}
      <Modal
        visible={history}
        className="customer_History"
        footer={null}
        onCancel={() => {
          setHistory(false);
        }}
      >
        <div className="customer_Model_History">
          <div className="customer_Model_History_Main">
            <div className="customer_Modell_History_Detail">
              <CustomerHistory />
            </div>
          </div>
        </div>
      </Modal>
      {/*End customer History models */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">ALL CUSTOMERS</span>}
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
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    <img
                      alt="Empty data"
                      className="empty_data"
                      src={require("../../../../../assets/empty.png")}
                    />
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
