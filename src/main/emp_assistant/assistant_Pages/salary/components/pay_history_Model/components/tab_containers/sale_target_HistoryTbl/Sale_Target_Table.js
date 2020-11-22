import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// styles
import "./Sale_Target_Table.css";

export default function Sale_Target_Table() {

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
      name: "Item_Name",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Serial_Number",
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
      "3000",
      "Gass Cooker",
      "S012-89",
      "30000",
     
     
    ],
  ];

  return (
<>
 <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card className="root">
            <CardContent>
              <Typography className="sale_tagets" gutterBottom>
                Sale Taget(LKR) : <span className="sale_taget_tot">20000</span>
              </Typography>
              </CardContent>
            </Card> 
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Card className="root">
            <CardContent>
              <Typography className="sale_tagets"  gutterBottom>
                Total(LKR) : <span className="sale_taget_tot">20000</span>
                <br />
                <hr />
              </Typography>
                <Typography  color="textSecondary">
                   <p>Total  &gt;= Sale Taget(20000) + 5000</p>
                </Typography>
              </CardContent>
            </Card> 
        </Grid>
     </Grid>

    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Sale Target History</span>}
          className="sale_Tarhistable"
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
