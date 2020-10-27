import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import { Spin } from "antd";
import CurrencyFormat from "react-currency-format";

//styles
import "./blackList_history.css";

export default function blackList_history() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const columns = [
    {
      name: "InvoiceNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
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
      name: "Delayed",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Balance",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  const installments = [
    {
      InvoiceNo: "3476-JDJCF",
      Date: "test",
      Amount: (
        <CurrencyFormat
          value={1800}
          // value={each.data().amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
      Delayed: "test",
      Balance: (
        <CurrencyFormat
          value={1500}
          // value={each.data().amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
    },
  ];

  return (
    <div>
      <Grid container spacing={4} className="blockList_main_container">
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <span className="blockList_title_Span">Installment History</span>
            }
            className="blackList_installment_table"
            data={installments}
            columns={columns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    ""
                  ),
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
