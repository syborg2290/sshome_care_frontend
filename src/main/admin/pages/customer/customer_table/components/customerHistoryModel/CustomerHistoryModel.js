import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import { Spin } from "antd";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { useHistory } from "react-router-dom";

// styles
import "./CustomerHistoryModel.css";
import db from "../../../../../../../config/firebase";

export default function CustomerHistoryModel({ customerId }) {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  const [installmentsTableData, setInstallmentsTableData] = useState([]);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  let history = useHistory();

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

     window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

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
                  Date: moment(insRe.data().date.toDate()).format(
                    "dddd, MMMM Do YYYY"
                  ),
                  Amount: (
                    <CurrencyFormat
                      value={insRe.data().amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  ),
                  Delayed: (
                    <CurrencyFormat
                      value={insRe.data().delayed}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  ),
                  Balance: (
                    <CurrencyFormat
                      value={insRe.data().balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  ),
                });
              });
              setInstallmentsTableData(instRawData);
              setIsLoading(false);
            });
        });
      });
      // eslint-disable-next-line
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
             selectableRows: "none",
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
