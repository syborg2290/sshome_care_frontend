import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

// styles
import "./Cash_Sale_History.css";

export default function Cash_Sale_History() {
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
      name: "Invoice_No",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Total",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
   

  ];

  const tableData = [
    [
      "2020/03/01",
      "James",
      "Test",
      "Corp",
      "Yon",
      "kers",
     
    ],
  ];

  return (
    <>
  {/* <Grid container spacing={2}>
        <Grid item xs={9}>
        </Grid>
        <Grid item xs={3}>
          <Card className="root">
            <CardContent>
              <Typography className="sale_tagets"  gutterBottom>
                Total(LKR) : <span className="sale_taget_tot">20000</span>
              </Typography>
              <hr />
                <Typography  color="textSecondary">
                   Total + 2.5%<span className="cash_tagetPer">per Sale</span>
                </Typography>
              </CardContent>
            </Card> 
        </Grid>
     </Grid> */}
      
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Cash Sales History</span>}
          className="cash_histable"
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
  );
}

