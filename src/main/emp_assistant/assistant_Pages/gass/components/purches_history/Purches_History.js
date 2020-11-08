import React from "react";
import { Grid } from "@material-ui/core";

import CurrencyFormat from "react-currency-format";
import MUIDataTable from "mui-datatables";
// styles
import "./Purches_History.css";

export default function Purches_History() {
  //   const [allTableData, setTableData] = useState([]);
  const columns = [
    {
      name: "Weight",
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
      name: "Price",
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

  const allTableData = [
    [
      "5 kg",
      "2020",
      "5",
      <CurrencyFormat
        value={5000}
        displayType={"text"}
        thousandSeparator={true}
        prefix={" "}
      />,
    ],
  ];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Purches History</span>}
          className="gass_purches_history"
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
