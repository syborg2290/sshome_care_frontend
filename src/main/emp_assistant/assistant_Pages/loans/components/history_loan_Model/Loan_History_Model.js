import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import moment from "moment";

// styles
import "./Loan_History_Model.css";

import db from "../../../../../../config/firebase.js";

export default function Loan_History_Model({ docId }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [tableData, setallData] = useState([]);

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
    db.collection("loan_history")
      .where("docId", "==", docId)
      .get()
      .then((reLH) => {
        var rawData = [];
        reLH.docs.forEach((reE) => {
          rawData.push({
            Date: moment(reE.data()?.date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Amount: reE.data().amount,
            Balance: reE.data().Balance,
          });
        });
        setallData(rawData);
      });
  }, [docId]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Loan History</span>}
          className="loans_table"
          sty
          data={tableData}
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
