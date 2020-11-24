import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CurrencyFormat from "react-currency-format";

// styles
import "./Shortage_Table.css";

export default function Shortage_Table({ list }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);

  const columns = [
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
      name: "Amount",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Type",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Shortage_of",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Total",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  const tableData = [
    [
      "2020/03/01",
      <CurrencyFormat
        value={2000}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" "}
      />,
      "Shop",
      "Gass",
      <CurrencyFormat
        value={2000}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" "}
      />,
    ],
  ];

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={8}></Grid>
        <Grid className="shortage_tot" item xs={2}>
          Total(LKR) :
        </Grid>
        <Grid item xs={1}>
          <p className="shortage_totNum">
            <CurrencyFormat
              value={2000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />
          </p>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Shortage History</span>}
            className="shortage_tbl"
            sty
            data={tableData}
            columns={columns}
            options={{
              selectableRows: "none",
              customToolbarSelect: () => {},
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
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
    </>
  );
}
