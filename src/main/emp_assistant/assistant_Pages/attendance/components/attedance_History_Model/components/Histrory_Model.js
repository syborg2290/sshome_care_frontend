import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";

// styles
import "./History_Model.css";
import { useHistory } from "react-router-dom";

import db from "../../../../../../../config/firebase.js";

export default function History_Model() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [attendanceTableRow, setAttendanceTableRow] = useState([]);
  // eslint-disable-next-line
  const [allTableData, setAllTableData] = useState([]);
 let history = useHistory();


  //START Attendance Table Colomns
  const attendanceTableColomns = [
    {
      name: "FirstName",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "LastName",
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
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("attendance_history").onSnapshot((snap) => {
      var rawData = [];
      var allRawData = [];
      snap.docs.forEach((reSnap) => {
        allRawData.push({
          id: reSnap.id,
          data: reSnap.data(),
        });
        rawData.push({
          FirstName: reSnap.data().fname,
          LastName: reSnap.data().lname,
          NIC: reSnap.data().nic,
        //   Date: reSnap.data().date,
          Status:
            reSnap.data().status === "full" ? (
              <div className="workingStts">Fullday</div>
            ) : (
              <div className="workingSttsHald">Halfday</div>
            ),
       
        });
      });
      setAllTableData(allRawData);
      setAttendanceTableRow(rawData);
    });
    // eslint-disable-next-line
  }, []);

  return (
      <>
          
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
          title={<span className="title_Span">Emplyee Attendance History</span>}
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
