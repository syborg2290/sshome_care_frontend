import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
// styles
import "./Target_History_Model.css";

import db from "../../../../../../config/firebase.js";

export default function Target_History_Model() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);

  const columns = [
    {
      name: "Target_Type",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Start_Date",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Target_Amount",
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
  ];

  useEffect(() => {
    db.collection("targets")
      .get()
      .then((reThen) => {
        var rawData = [];
        reThen.docs.forEach((each) => {
          rawData.push({
            Target_Type: each.data().target_type,
            Start_Date: moment(each.data()?.start_date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Target_Amount: (
              <CurrencyFormat
                value={each.data().amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),

            Type: each.data().selectedType,
          });
        });
        setallData(rawData);
      });
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Target History</span>}
          className="Target_History"
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
