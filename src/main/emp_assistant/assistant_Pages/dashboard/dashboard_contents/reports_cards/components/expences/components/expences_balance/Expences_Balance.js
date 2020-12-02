// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CurrencyFormat from "react-currency-format";
// styles
import "./Expences_Balance.css";
import db from "../../../../../../../../../../config/firebase.js";


export default function Expences_Balance() {
  const [tableData, setTableData] = useState([]);

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
      name: "Expences",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Balance",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    db.collection("expences")
      .orderBy("date", "desc")
      .get()
      .then((reGet) => {
        var raw = [];
        reGet.docs.forEach((each) => {
          raw.push({
            Date: new Date(each.data().date.seconds * 1000).toDateString(),
            Expences: (
              <CurrencyFormat
                value={each.data().total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Balance: (
              <CurrencyFormat
                value={each.data().balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
          });
        });
        setTableData(raw);
      });
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Expences Balance</span>}
          className="salary_table"
          sty
          data={tableData}
          columns={columns}
          options={{
            selectableRows: "none",
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
