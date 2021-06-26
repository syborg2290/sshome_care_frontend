import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

// styles
import "./Advance_History.css";

import db from "../../../../../../../../config/firebase.js";

export default function Advance_History({ nic }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [allData, setallData] = useState([]);

  const columns = [
    {
      name: "Name",
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
      name: "Date",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Amount",
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
    db.collection("salary_advance")
      .where("nic", "==", nic)
      .get()
      .then((reSlAd) => {
        var rawData = [];
        reSlAd.docs.forEach((each) => {
          rawData.push({
            Name: each.data().name,
            NIC: each.data().nic,
            Date: moment(each.data()?.date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Amount: (
              <CurrencyFormat
                value={each.data().amount}
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
        setallData(rawData);
      });
  }, [nic]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Advance History</span>}
          className="advance_histable"
          sty
          data={allData}
          columns={columns}
          options={{
            // selectableRows: false,
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
  );
}
