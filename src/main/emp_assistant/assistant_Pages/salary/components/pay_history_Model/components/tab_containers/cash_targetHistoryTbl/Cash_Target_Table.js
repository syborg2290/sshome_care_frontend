import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CurrencyFormat from "react-currency-format";


// styles
import "./Cash_Target_Table.css";


export default function Cash_Target_Table() {

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
      <CurrencyFormat
              value={2000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      "Test",
      <CurrencyFormat
              value={2000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      
     
    ],
  ];

  return (
    <>
 <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card className="root">
            <CardContent>
              <Typography className="cash_tagets" gutterBottom>
                Cash Taget(LKR) : <span className="cash_taget_tot"><CurrencyFormat
              value={2000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            /></span>
              </Typography>
              </CardContent>
            </Card> 
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={5}>

          <Card className="root">
            <CardContent>
              <Typography className="cash_tagets"  gutterBottom>
                Total(LKR) : <span className="cash_taget_tot"><CurrencyFormat
              value={2000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            /></span>
              </Typography>
              <hr />
                <Typography  color="textSecondary">
                Total  &gt;= Cash Taget(20000) + 4%<span className="cash_tagetPer">per Installemt</span>
                <br />
              Total &lt; Cash Taget(20000) + 3%<span className="cash_tagetPer">per Installemt</span>
                </Typography>
              </CardContent>
            </Card> 
        </Grid>
      </Grid>
      
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Cash Target History</span>}
          className="cash_taRhistable"
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
