import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
 // eslint-disable-next-line
import { Grid,Button } from "@material-ui/core";
 // eslint-disable-next-line
import { Checkbox , Spin } from "antd";

// styles
import "./Mark_Attendance.css";

export default function Mark_Attendance() {
     // eslint-disable-next-line
    const [currentIndx, setCurrentIndx] = useState(0);
    let history = useHistory();
     const attendanceMarkTableColomns = [
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

    {
      name: "Mark",

      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            width: "150px",
            margin: "auto",
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  const attendanceMarkTable = [
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
         "Yonkers",
        <Checkbox />,
     
    ],

  ];


   useEffect(() => {

    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
  });

    return (
        <>
            
        <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <span className="title_Span_blackList">Mark Employee Attendance</span>
            }
            className="attemdanceMark_Table"
            data={attendanceMarkTable}
            columns={attendanceMarkTableColomns}
            options={{
              // selectableRows: false,
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
    )
}
