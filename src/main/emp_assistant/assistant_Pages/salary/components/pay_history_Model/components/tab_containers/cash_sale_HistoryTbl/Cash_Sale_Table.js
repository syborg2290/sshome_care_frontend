import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

// styles
import "./Cash_Sale_Table.css";

export default function Cash_Sale_Table({ list, cash_sale }) {
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
      name: "Invoice_No",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Item_name",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Serial_numbers",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Qty",
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

  useEffect(() => {
    if (list !== undefined) {
      var rawData = [];
      list.forEach((reEa) => {
        rawData.push({
          Date: moment(new Date(reEa.date.seconds * 1000)).format(
            "dddd, MMMM Do YYYY"
          ),
          Invoice_No: reEa.invoice_no,
          Item_name: reEa.item_name,
          Serial_numbers: reEa.serail_number,
          Qty: reEa.qty,
          Total: reEa.total,
        });
      });
      setallData(rawData);
    }
  }, [list]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <Card className="root">
            <CardContent>
              <Typography className="sale_tagets" gutterBottom>
                Total(LKR) :{" "}
                <span className="sale_taget_tot">
                  <CurrencyFormat
                    value={cash_sale !== undefined ? cash_sale : 0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" "}
                  />
                </span>
              </Typography>
              <hr />
              <Typography color="textSecondary">
                Total + 2.5%<span className="cash_tagetPer">per Sale</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Cash Sales History</span>}
            className="cash_histable"
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
