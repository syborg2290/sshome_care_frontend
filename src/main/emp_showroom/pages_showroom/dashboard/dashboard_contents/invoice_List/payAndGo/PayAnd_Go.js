import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Spin } from "antd";
import CurrencyFormat from "react-currency-format";
// styles
import "./PayAnd_Go.css";

//icone
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function PayAnd_Go() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  //START pay And Go Columns
  const payGoTableColomns = [
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
      name: "NIC",
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
      name: "Paid",
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
      name: "Status",
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

  const payGoTableData = [
    {
      InvoiceNo: "3476-JDJCF",
      Date: "test",
      NIC: "74837483v",
      Discount: "test",
      Paid: (
        <CurrencyFormat
          value={5000}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
      Status: "OnGoing",
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
      className="paygo_Table"
      data={payGoTableData}
      columns={payGoTableColomns}
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
