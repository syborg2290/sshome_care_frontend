import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import moment from "moment";

// styles
import "./History_Model.css";

import db from "../../../../../../../config/firebase.js";

export default function History_Model({ nic }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [attendanceTableRow, setAttendanceTableRow] = useState([]);

  //START Attendance Table Colomns
  const attendanceTableColomns = [
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
      name: "Status",
      options: {
        filter: false,
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
    db.collection("attendance_history")
      .where("nic", "==", nic)
      .get()
      .then((snap) => {
        var rawData = [];
        var allRawData = [];
        snap.docs.forEach((reSnap) => {
          allRawData.push({
            id: reSnap.id,
            data: reSnap.data(),
          });
          rawData.push({
            Date: moment(reSnap.data().date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Status:
              reSnap.data().status === "full" ? (
                <div className="workingStts">Fullday</div>
              ) : (
                <div className="workingSttsHald">Halfday</div>
              ),
          });
        });
        setAttendanceTableRow(rawData);
      });
    // eslint-disable-next-line
  }, [nic]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <span className="title_Span">Employee Attendance History</span>
            }
            className="attemdance_Table"
            data={attendanceTableRow}
            columns={attendanceTableColomns}
            options={{
              selectableRows: "none",
              customToolbarSelect: () => {},
              filterType: "textfield",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
