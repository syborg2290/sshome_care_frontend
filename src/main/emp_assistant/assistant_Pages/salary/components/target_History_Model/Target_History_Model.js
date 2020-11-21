import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// styles
import "./Target_History_Model.css";

export default function Target_History_Model() {

   // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();

    const columns = [
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
            name: "End_Date",
            options: {
                filter: false,
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
    
       const tableData = [
        [ "Test", "Corp", "Yon", "kers", "kers"],

];
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <MUIDataTable
                    title={<span className="title_Span">Target History</span>}
                    className="Target_History"
                    sty
                    data={tableData}
                    columns={columns}
                    options={{
                        // selectableRows: false,
                        selectableRows: "none",
                        customToolbarSelect: () => { },
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
