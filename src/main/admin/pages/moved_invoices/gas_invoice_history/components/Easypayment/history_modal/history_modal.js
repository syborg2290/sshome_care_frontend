import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

import db from "../../../../../../../../config/firebase.js";

// styles
import "./history_modal.css";

export default function History_Modal({ invoice_no }) {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [installments, setInstallments] = useState([]);

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
    db.collection("moved_gas_installment")
      .where("invoice_number", "==", invoice_no)
      .get()
      .then((instReDoc) => {
        var reArray = instReDoc.docs;
        reArray.sort((a, b) => {
          if (a.data().balance > b.data().balance) {
            return -1;
          } else {
            return 1;
          }
        });

        reArray.forEach((each) => {
          setInstallments((old) => [
            ...old,
            {
              InvoiceNo: invoice_no,
              Date: moment(each.data()?.date?.toDate()).format(
                "dddd, MMMM Do YYYY"
              ),
              Amount: (
                <CurrencyFormat
                  value={each.data().amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Delayed: (
                <CurrencyFormat
                  value={each.data().delayed}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Balance: (
                <CurrencyFormat
                  value={each.data().balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
            },
          ]);
        });
      });
    setIsLoading(false);
    // eslint-disable-next-line
  }, [invoice_no]);

  return (
    <div>
      <Grid container spacing={4} className="mains_container">
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Installment History</span>}
            className="installment_table"
            data={installments}
            columns={columns}
            options={{
              // selectableRows: false,
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
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
