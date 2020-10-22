import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import { Spin } from "antd";
import CurrencyFormat from "react-currency-format";

// styles
import "./CustomerHistoryModel.css";
import db from "../../../../../../../config/firebase";

export default function CustomerHistoryModel({ customerId }) {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  const [installmentsTableData, setInstallmentsTableData] = useState([]);

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

  useEffect(() => {
    db.collection("invoice")
      .where("customer_id", "==", customerId)
      .get()
      .then((allInvoices) => {
        allInvoices.docs.forEach((docReIn) => {
          db.collection("installment")
            .where("invoice_number", "==", docReIn.data().invoice_number)
            .get()
            .then((instReDoc) => {
              var instRawData = [];
              instReDoc.docs.forEach((insRe) => {
                instRawData.push({
                  InvoiceNo: insRe.data().invoice_number,
                  Date: insRe.data().date,
                  Amount: <CurrencyFormat
                        value={ insRe.data().amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />,
                  Delayed:  <CurrencyFormat
                        value={insRe.data().delayed}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />,
                  Balance: <CurrencyFormat
                        value={insRe.data().balance}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      /> ,
                });
              });
              setInstallmentsTableData(instRawData);
              setIsLoading(false);
            });
        });
      });
    
  }, [customerId]);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Installment History</span>}
            className="installment_table"
            data={installmentsTableData}
            columns={columns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "checkbox",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.rowIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    <img
                      alt="Empty data"
                      className="empty_data"
                      src={require("../../../../../../../assets/empty.png")}
                    />
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
