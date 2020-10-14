import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Grid  } from "@material-ui/core";
import { Spin, Modal } from "antd";
import MUIDataTable from "mui-datatables";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

// styles
import "./Customer_table_showroom.css";

import db from "../../../../../config/firebase.js";

export default function ItemTable() {
  const [customerTableData, setCustomerTableData] = useState([]);
  // eslint-disable-next-line
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // let socket = socketIOClient(RealtimeServerApi);

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    db.collection("customer")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var newData = [];
        var customermData = [];
        snapshot.docs.forEach((element) => {
          customermData.push({
            id: element.id,
            data: element.data(),
          });

          newData.push([
            element.data().img,
            element.data().customerName,
            element.data().nic,
            element.data().address,
            element.data().mobileNo,
            <div className="table_icon">
              <VisibilityIcon className="icon_Visible" onClick={showModal} />
            </div>,
          ]);
        });
        setCustomerTableData(newData);
        setAllCustomerData(customermData);
        setIsLoading(false);
      });
  }, []);

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
      name: "Customer Name",
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
      name: "Address",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "MODEL NO",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "STATUS",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "ACTION",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        className="model_Item"
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="table_Model">
          <div className="model_Main">

            <div className="model_Detail">
              <p>BRAND</p>
              <p>QTY</p>
              <p>COLOR</p>
            </div>
          </div>
        </div>
      </Modal>

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
