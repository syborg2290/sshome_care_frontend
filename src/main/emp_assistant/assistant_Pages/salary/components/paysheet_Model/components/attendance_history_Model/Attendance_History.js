import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";

// styles
import "./Attendance_History.css";

export default function Attendance_History({ list }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);

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
      name: "Status",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    var rawData = [];
    list.forEach((reEa) => {
      rawData.push({
        Date: moment(reEa?.date?.toDate()).format("dddd, MMMM Do YYYY"),
        Status:
          reEa.status === "full" ? (
            <div className="workingStts">Fullday</div>
          ) : (
            <div className="workingSttsHald">Halfday</div>
          ),
      });
    });
    setallData(rawData);
  }, [list]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Attendance History</span>}
            className="shortage_tbl"
            sty
            data={allData}
            columns={columns}
            options={{
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
    </>
  );
}
