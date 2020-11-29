// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Spin } from "antd";

// styles
import "./Daily_Sales.css";

import db from "../../../../../../../../config/firebase.js";

async function getAllSalesSaily() {
  var sales = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
          sales.push({
            date: new Date(custIn.docs[i].data().date.seconds * 1000),
            type: custIn.docs[i].data().selectedType,
            total:
              parseInt(custIn.docs[i].data().items[j].downpayment) *
              parseInt(custIn.docs[i].data().items[j].qty),
          });
        }
      }
    });
  return sales;
}

async function sumSameDaySales(allSales) {
  var reduceDup = [];

  for (let i = 0; i < allSales.length; i++) {
    let result = reduceDup.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(allSales[i].date).getFullYear() &&
        new Date(ob.date).getMonth() ===
          new Date(allSales[i].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(allSales[i].date).getDate() &&
        ob.type === allSales[i].type
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(allSales[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(allSales[i].date).getMonth() &&
          new Date(ob.date).getDate() ===
            new Date(allSales[i].date).getDate() &&
          ob.type === allSales[i].type
      );

      reduceDup[indexFor] = {
        date: reduceDup[indexFor].date,
        total:
          parseInt(reduceDup[indexFor].total) +
          parseInt(allSales[i].sold_total),
      };
    } else {
      reduceDup.push({
        date: new Date(allSales[i].date),
        type: allSales[i].type,
        total: allSales[i].total,
      });
    }
  }

  return reduceDup;
}

export default function Daily_Sales() {
  // eslint-disable-next-line
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      name: "Type",
      options: {
        filter: true,
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
    {
      name: "Total_Balance",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    getAllSalesSaily().then((reAllSales) => {
      sumSameDaySales(reAllSales).then((reSumWith) => {
        let againArray = reSumWith;
        let eachRE = [];
        let totalBalance = 0;
        againArray.sort((a, b) => {
          if (
            new Date(a.date).getFullYear() === new Date(b.date).getFullYear() &&
            new Date(a.date).getMonth() === new Date(b.date).getMonth() &&
            new Date(a.date).getDate() === new Date(b.date).getDate()
          ) {
            return -1;
          } else {
            return 1;
          }
        });
        againArray.forEach((each) => {
          totalBalance = totalBalance + parseInt(each.total);
          eachRE.push({
            Date: new Date(each.date).toDateString(),
            Type: each.type,
            Total: (
              <CurrencyFormat
                value={each.total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Total_Balance: (
              <CurrencyFormat
                value={totalBalance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
          });
        });
        setTableData(eachRE);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Sales Reports</span>}
          className="salary_table"
          sty
          data={tableData}
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
  );
}
