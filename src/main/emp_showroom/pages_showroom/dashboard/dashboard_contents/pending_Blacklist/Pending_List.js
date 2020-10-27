import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import db from "../../../../../../config/firebase.js";

// styles
import "./Pending_List.css";

//icone

import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function View_Model({ pendingBlackList }) {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

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

  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    var rawTableData = [];
    pendingBlackList.forEach((each) => {
      db.collection("customer")
        .where("nic", "==", each.nic)
        .get()
        .then((reThen) => {
          rawTableData.push({
            InvoiceNo: each.invoice_number,
            FirstName: reThen.fname,
            LastName: reThen.lname,
            NIC: each.nic,
            Telephone: reThen.mobile1,
            Action: (
              <div>
                <VisibilityIcon />
                <span className="icon_Edit">
                  <HistoryIcon />
                </span>
              </div>
            ),
          });
        });
    });

    setPendingList(rawTableData);
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
      }}
    />
  );
}
