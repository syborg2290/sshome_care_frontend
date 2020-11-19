import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
// eslint-disable-next-line
import { Modal } from "antd";


// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
// eslint-disable-next-line
import HistoryIcon from "@material-ui/icons/History";
// eslint-disable-next-line
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useHistory } from "react-router-dom";

// styles
import "./History_Attendance.css";

export default function History_Attendance() {
    // eslint-disable-next-line
    const [currentIndx, setCurrentIndx] = useState(0);
    let history = useHistory();
    

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
  });

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
        <VisibilityIcon/>
        <span className="icon_Edit">
          <AutorenewIcon />
        </span>
      </div>,
      ],
      
        [
      "Jo",
      "Trp",
      "0pu",
       "345f",
      <div className="workingStts">Working</div>,
      <div>
        <VisibilityIcon/>
        <span className="icon_Edit">
          <AutorenewIcon />
        </span>
      </div>,
      ],
        
          [
      "232",
      "mnm",
      "opy",
       "erc",
      <div className="workingStts">Working</div>,
      <div>
        <VisibilityIcon/>
        <span className="icon_Edit">
          <AutorenewIcon />
        </span>
      </div>,
    ],

  ];

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <MUIDataTable
                    title={
                        <span className="title_Span_blackList">Employee Attendance History</span>
                    }
                    className="Attendance_hisstoryTbl"
                    data={attendanceTableRow}
                    columns={attendanceTableColomns}
                    options={{
                        // selectableRows: false,
                        selectableRows: "none",
                        customToolbarSelect: () => { },
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
    );
}
