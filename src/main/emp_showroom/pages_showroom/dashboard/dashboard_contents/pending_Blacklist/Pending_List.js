import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
// eslint-disable-next-line
import { Spin, Modal } from "antd";

// styles
import "./Pending_List.css";

//icone

import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function View_Model() {
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

  const blockTableData = [
    {
      InvoiceNo: "3476-JDJCF",
      FirstName: "test",
      LastName: "test",
      NIC: "test",
      Telephone: "test",
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

  return (
    <MUIDataTable
      title={<span className="title_Span_blackList">PENDING BLOCK LIST</span>}
      className="blackList_Table"
      data={blockTableData}
      columns={blockTableColomns}
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
                src={require("../../../../../../assets/empty.png")}
              />
            ),
          },
        },
      }}
    />
  );
}