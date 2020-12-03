import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
// styles
import "./Target_History_Model.css";

import db from "../../../../../../config/firebase.js";

export default function Target_History_Model() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();
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
    {
      name: "Status",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    db.collection("targets")
      .get()
      .then((reThen) => {
        var rawData = [];
        var reArray = reThen.docs;

        reArray.forEach((each) => {
          if (each.data().status === "ongoing") {
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
              Status:
                each.data().status === "ongoing" ? (
                  <div className="sttLondone">Ongoing</div>
                ) : (
                  <div className="sttLon">Expired</div>
                ),
            });
          }
        });
        reArray.forEach((each) => {
          if (each.data().status !== "ongoing") {
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
              Status:
                each.data().status === "ongoing" ? (
                  <div className="sttLondone">Ongoing</div>
                ) : (
                  <div className="sttLon">Expired</div>
                ),
            });
          }
        });
        setallData(rawData);
      });
    // eslint-disable-next-line
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
