import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import MUIDataTable from "mui-datatables";

import db from "../../../../../config/firebase.js";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

// components
import CustomerDetails from "./components/customerDetailsModel/CustomerDetailsModel";
import CustomerHistory from "./components/customerHistoryModel/CustomerHistoryModel";

// styles
import "./Customer_table_assistant.css";

import { useHistory } from "react-router-dom";

export default function CustomerTable() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false); // customer table models
  const [history, setHistory] = useState(false); // customer table models

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [customerTableData, setCustomerTableData] = useState([]);
  const [customerAllData, setCustomerAllData] = useState([]);

  let history2 = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  const showModalHistory = () => {
    setHistory(true);
  };

  const columns = [
    // {
    //   name: "IMG",
    //   options: {
    //     filter: true,
    //     setCellHeaderProps: (value) => ({
    //       style: { fontSize: "15px", color: "black", fontWeight: "600" },
    //     }),
    //   },
    // },
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
      name: "MID",
      options: {
        filter: false,
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
      name: "Telephone",
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

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history2.push("/connection_lost");
    });

    db.collection("customer")
      .orderBy("date", "desc")
      .onSnapshot((custDoc) => {
        let rawData = [];
        let rawAllData = [];
        custDoc.docs.forEach((siDoc) => {
          rawAllData.push({
            id: siDoc.id,
            data: siDoc.data(),
          });
          rawData.push({
            // IMG: (
            //   <img
            //     alt="Empty data"
            //     className="avatar_data"
            //     src={
            //       siDoc.data().photo !== null
            //         ? siDoc.data().photo
            //         : require("../../../../../assets/avatar.png")
            //     }
            //   />
            // ),
            FirstName: siDoc.data().fname,
            LastName: siDoc.data().lname,
            MID: siDoc.data().mid,
            NIC: siDoc.data().nic,
            Telephone: siDoc.data().mobile1,
            Action: (
              <div>
                <VisibilityIcon onClick={showModal} />
                <span className="icon_Edit">
                  <HistoryIcon onClick={showModalHistory} />
                </span>
              </div>
            ),
          });
        });
        setCustomerTableData(rawData);
        setCustomerAllData(rawAllData);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);

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
              <CustomerDetails
                fname={customerAllData[currentIndx]?.data.fname}
                lname={customerAllData[currentIndx]?.data.lname}
                front={customerAllData[currentIndx]?.data.customerFrontURL}
                back={customerAllData[currentIndx]?.data.customerBackURL}
                address1={customerAllData[currentIndx]?.data.address1}
                address2={customerAllData[currentIndx]?.data.address2}
                nic={customerAllData[currentIndx]?.data.nic}
                mobile1={customerAllData[currentIndx]?.data.mobile1}
                mobile2={customerAllData[currentIndx]?.data.mobile2}
                root={customerAllData[currentIndx]?.data.root}
                status={customerAllData[currentIndx]?.data.status}
                createdAt={customerAllData[currentIndx]?.data.date}
                mid={customerAllData[currentIndx]?.data.mid}
                key={customerAllData[currentIndx]?.id}
              />
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
              <CustomerHistory
                customerId={customerAllData[currentIndx]?.id}
                key={customerAllData[currentIndx]?.id}
              />
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
            sty
            data={customerTableData}
            columns={columns}
            options={{
              setRowProps: (row, rowIndex) => {
                if (customerAllData[rowIndex]?.data?.status === "normal") {
                  return {
                    style: { backgroundColor: "#EFFBF5" },
                  };
                }

                if (customerAllData[rowIndex]?.data?.status === "arrears") {
                  return {
                    style: { backgroundColor: "#F5F6CE" },
                  };
                }

                if (customerAllData[rowIndex]?.data?.status === "blacklist") {
                  return {
                    style: { backgroundColor: "#F6CECE" },
                  };
                }
              },
              selectableRows: "none",
              draggableColumns: {
                enabled: true,
              },
              responsive: "standard",
              customToolbarSelect: () => {},
              filterType: "textField",
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
