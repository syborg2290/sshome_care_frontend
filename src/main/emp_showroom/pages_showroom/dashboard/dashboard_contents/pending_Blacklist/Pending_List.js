import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {Spin} from "antd";

import db from "../../../../../../config/firebase.js";

// styles
import "./Pending_List.css";

//icone

import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function View_Model({ pendingBlackList }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingList, setPendingList] = useState([]);

  //START pay And Go Columns
  const blockTableColomns = [
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

  useEffect(() => {
    pendingBlackList.forEach((each) => {
      db.collection("customer")
        .where("nic", "==", each.nic)
        .get()
        .then((reThen) => {
          setPendingList((old) => [
            ...old,
            {
              InvoiceNo: each.invoice_number,
              FirstName: reThen.docs[0].data().fname,
              LastName: reThen.docs[0].data().lname,
              NIC: each.nic,
              Telephone: reThen.docs[0].data().mobile1,
              Action: (
                <div>
                  <VisibilityIcon />
                  <span className="icon_Edit">
                    <HistoryIcon />
                  </span>
                </div>
              ),
            },
          ]);
          setIsLoading(false);
        });
    });
  }, [pendingBlackList]);

  return (
    <MUIDataTable
      title={<span className="title_Span_blackList">Pending black list</span>}
      className="blackList_Table"
      data={pendingList}
      columns={blockTableColomns}
      options={{
        setRowProps: (row, rowIndex) => {
          return {
            style: { backgroundColor: "#F6CECE" },
          };
        },
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
              "No records for pending black list"
            ),
          },
        },
      }}
    />
  );
}
