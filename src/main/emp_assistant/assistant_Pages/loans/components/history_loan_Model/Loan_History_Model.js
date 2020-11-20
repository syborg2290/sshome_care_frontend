import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// styles
import "./Loan_History_Model.css";


export default function Loan_History_Model() {
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

      const tableData = [
        ["Joe ", "James", "Test",]
      ];
           
    return (
          <Grid container spacing={4}>
            <Grid item xs={12}>
                <MUIDataTable
                    title={<span className="title_Span">Loan Paied History</span>}
                    className="loans_table"
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
    )
}
