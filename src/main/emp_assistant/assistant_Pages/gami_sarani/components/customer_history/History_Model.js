import React, { useState } from "react";
import { Spin } from "antd";
import { Grid } from "@material-ui/core";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import MUIDataTable from "mui-datatables";

// style
import "./History_Model.css";

export default function History_Model() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndx, setCurrentIndx] = useState(0);

  const columns = [
    {
      name: "Member ID",
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
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Deposits Amount",
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

    {
      name: "Current Balance",
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
  ];

  const data = [
    [
      "2324",
      <div className="cBalance">2000</div>,
      <div className="cBalance">
        {" "}
        <CurrencyFormat
          value={"2500"}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      </div>,
      <div className="cBalance">
        {" "}
        <CurrencyFormat
          value={"6500"}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      </div>,
    ],
  ];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Deposits</span>}
          className="customer_History_table"
          sty
          data={data}
          columns={columns}
          options={{
            selectableRows: false,
            customToolbarSelect: () => {},
            filterType: "textField",
            download: false,
            print: false,
            searchPlaceholder: "Search using any column names",
            elevation: 4,
            sort: true,
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
  );
}
