import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Spin } from "antd";
import CurrencyFormat from "react-currency-format";

// styles
import "./Arreas_Table.css";

//icone

import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function Arreas_Table() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  //START pay And Go Columns
  const arreasTableColomns = [
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
      name: "NIC",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Delayed_Days",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Delayed_Charges",
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
      name: "Date",
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

  const arreasTableData = [
    {
      InvoiceNo: "3476-JDJCF",
      NIC: "test",
      Delayed_Days: "test",
      Delayed_Charges: (
        <CurrencyFormat
          value={5000}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
      Date: "test",
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
      title={<span className="title_Span_blackList">ARREAS TABLE</span>}
      className="blackList_Table"
      data={arreasTableData}
      columns={arreasTableColomns}
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
              ""
            ),
          },
        },
      }}
    />
  );
}
