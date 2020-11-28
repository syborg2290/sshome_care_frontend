 // eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
    // eslint-disable-next-line
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

// styles
import "./View_Repair.css";

export default function View_Repair() {

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
      name: "Discription",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Vehical",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
        },
    {
      name: "Cost",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
      },


  ];
    // eslint-disable-next-line
    const tableData = [
      ["Joe James","Joe James","Joe James",
        <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
        />
        
       
      ],

];

    return (
<>
     
         <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Repair For Vehical</span>}
            className="salary_table"
            sty
            data={tableData}
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
    )
}