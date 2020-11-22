import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// styles
import "./Ex_Card_Table.css";

export default function Ex_Card_Table() {

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();


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
      "32000",
      "IN-6437",
      "Total",
      
     
    ],
  ];

  return (

    <>
   <Grid container spacing={2}>
        <Grid item xs={9}>
        </Grid>
        <Grid item xs={3}>
          <Card className="root">
            <CardContent>
              <Typography className="sale_tagets"  gutterBottom>
                Total(LKR) : <span className="sale_taget_tot">20000</span>
                <br />
                <hr />
              </Typography>
                <Typography  color="textSecondary">
                   <p>Total + 2%<span className="cash_tagetPer">per Installment</span></p>
                </Typography>
              </CardContent>
            </Card> 
        </Grid>
     </Grid>
      
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Ex Card History</span>}
          className="exx_histable"
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
