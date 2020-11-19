import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import CurrencyFormat from "react-currency-format";
import moment from "moment";
import MUIDataTable from "mui-datatables";

// styles
import "./Gass_History.css";
import db from "../../../../../../config/firebase.js";


export default function Gass_History() {
   
  const [tableData, setTableData] = useState([]);
  
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
      name: "Purchased_Price",
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

  useEffect(() => {
    db.collection("gas_history").onSnapshot((snap) => {
      var raw = [];

      snap.docs.forEach((each) => {
        raw.push({
          Weight: each.data().weight + " Kg",
          Date: moment(each.data()?.date?.toDate()).format(
            "dddd, MMMM Do YYYY"
          ),
          Qty: each.data().qty,
          Purchased_Price: (
            <CurrencyFormat
              value={each.data().price}
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
          title={<span className="title_Span">Gass History</span>}
          className="gass_purches_history"
          sty
          data={tableData}
          columns={columns}
          options={{
            // selectableRows: false,
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

  
    

