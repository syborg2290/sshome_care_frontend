import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CurrencyFormat from "react-currency-format";



export default function Loans() {

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
      ["20/20/20","JoeJames",
        <CurrencyFormat
                        value={25000}
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
            title={<span className="title_Span">Loans</span>}
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