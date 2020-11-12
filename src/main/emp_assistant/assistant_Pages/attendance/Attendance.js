import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
// eslint-disable-next-line
import { Modal } from "antd";
import { Button } from "@material-ui/core";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
// eslint-disable-next-line
import HistoryIcon from "@material-ui/icons/History";
// eslint-disable-next-line
import HelpIcon from "@material-ui/icons/Help";
import AutorenewIcon from "@material-ui/icons/Autorenew";

// styles
import "./Attendance.css";

export default function Attendance() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  //START pay And Go Columns
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

    {
      name: "Action",

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

  const attendanceTableRow = [
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
       "Yonkers",
      <div className="workingStts">Working</div>,
      <div>
        <VisibilityIcon />
        <span className="icon_Edit">
          <AutorenewIcon />
        </span>
      </div>,
    ],

    [
      "Joe James",
      "Test Corp",
      "Yonkers",
       "Yonkers",
      <div className="leaveStts">Short Leave</div>,
      <div>
        <VisibilityIcon />
        <span className="icon_Edit">
          <AutorenewIcon />
        </span>
      </div>,
    ],
  ];

  return (
    <>
      <Button variant="contained" color="primary" className="btn_attendance">
        Mark Attendance
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <span className="title_Span_blackList">Employee Attendance</span>
            }
            className="attemdance_Table"
            data={attendanceTableRow}
            columns={attendanceTableColomns}
            options={{
              selectableRows: false,
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
