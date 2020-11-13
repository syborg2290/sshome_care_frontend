import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import CurrencyFormat from "react-currency-format";
import moment from "moment";
import MUIDataTable from "mui-datatables";

// styles
import "./Stock_History.css";

export default function Stock_History() {
    
    const [allTableData, setTableData] = useState([]);

    const columns = [
    // {
    //   name: "Serial_No",
    //   options: {
    //     filter: true,
    //     setCellHeaderProps: (value) => ({
    //       style: { fontSize: "15px", color: "black", fontWeight: "600" },
    //     }),
    //   },
    // },
    {
      name: "Item_Name",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
        },
     {
      name: "Brand",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    // {
    //   name: "Model_No",
    //   options: {
    //     filter: true,
    //     setCellHeaderProps: (value) => ({
    //       style: { fontSize: "15px", color: "black", fontWeight: "600" },
    //     }),
    //   },
    // },
    {
      name: "Qty",
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
      name: "Cash_Price",
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
  ];

    const data = [
 ["mes", "Torp", "Yonkers","Yonkers", "NY"],

];
    
    
    return (

    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Stock History</span>}
          className="stock_history"
          sty
          data={allTableData}
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
          }}
        />
      </Grid>
    </Grid>
    );
}
