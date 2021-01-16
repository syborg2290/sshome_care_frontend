import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import db from "../../../../../../../../../../config/firebase.js";

export default function Sold_Gass({ year, month }) {
  const [allTableData, setTableData] = useState([]);
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
      name: "Unit_Price",
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
      name: "Total",
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
    db.collection("gas_purchase_history")
      .orderBy("date", "desc")
      .get()
      .then((snap) => {
        var raw = [];

        snap.docs.forEach((each) => {
          if (
            new Date(each.data().date.seconds * 1000).getFullYear() === year &&
            new Date(each.data().date.seconds * 1000).getMonth() === month
          ) {
            raw.push({
              Weight: each.data().weight + " Kg",
              Date: moment(each.data()?.date?.toDate()).format(
                "dddd, MMMM Do YYYY"
              ),
              Qty: each.data().qty,
              Unit_Price: (
                <CurrencyFormat
                  value={each.data().price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Total: (
                <CurrencyFormat
                  value={
                    parseInt(each.data().price) * parseInt(each.data().qty)
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
            });
          }
        });

        setTableData(raw);
      });
  }, [year, month]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Sold History</span>}
          className="gass_purches_history"
          sty
          data={allTableData}
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
