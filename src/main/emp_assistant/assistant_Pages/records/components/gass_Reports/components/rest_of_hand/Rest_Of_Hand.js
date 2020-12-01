import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CurrencyFormat from "react-currency-format";
// import moment from "moment";
import db from "../../../../../../../../config/firebase.js";
import { Spin } from "antd";

async function getAllSold() {
  var rawSold = [];
  await db
    .collection("gas_purchase_history")
    .orderBy("date", "desc")
    .get()
    .then((snap1) => {
      for (let i = 0; i < snap1.docs.length; i++) {
        rawSold.push({
          date: new Date(snap1.docs[i].data().date.seconds * 1000),
          sold_total:
            parseInt(snap1.docs[i].data().price) *
            parseInt(snap1.docs[i].data().qty),
        });
      }
    });
  return rawSold;
}

async function getAllSoldWithoutDuplicates(soldDup) {
  var reduceDup = [];

  for (let i = 0; i < soldDup.length; i++) {
    let result = reduceDup.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(soldDup[i].date).getFullYear() &&
        new Date(ob.date).getMonth() === new Date(soldDup[i].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(soldDup[i].date).getDate()
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(soldDup[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(soldDup[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(soldDup[i].date).getDate()
      );

      reduceDup[indexFor] = {
        date: reduceDup[indexFor].date,
        sold_total:
          parseInt(reduceDup[indexFor].sold_total) +
          parseInt(soldDup[i].sold_total),
      };
    } else {
      reduceDup.push({
        date: new Date(soldDup[i].date),
        sold_total: soldDup[i].sold_total,
      });
    }
  }

  return reduceDup;
}

async function getAllPurchased() {
  var rawPucrhaes = [];
  await db
    .collection("gas_history")
    .orderBy("date", "desc")
    .get()
    .then((snap1) => {
      for (let i = 0; i < snap1.docs.length; i++) {
        rawPucrhaes.push({
          date: new Date(snap1.docs[i].data().date.seconds * 1000),
          purchaes_total:
            parseInt(snap1.docs[i].data().price) *
            parseInt(snap1.docs[i].data().qty),
        });
      }
    });
  return rawPucrhaes;
}

async function getAllPurchaesWithoutDuplicates(purchaesDup) {
  var reduceDup = [];

  for (let i = 0; i < purchaesDup.length; i++) {
    let result = reduceDup.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(purchaesDup[i].date).getFullYear() &&
        new Date(ob.date).getMonth() ===
          new Date(purchaesDup[i].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(purchaesDup[i].date).getDate()
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(purchaesDup[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(purchaesDup[i].date).getMonth() &&
          new Date(ob.date).getDate() ===
            new Date(purchaesDup[i].date).getDate()
      );

      reduceDup[indexFor] = {
        date: reduceDup[indexFor].date,
        purchaes_total:
          parseInt(reduceDup[indexFor].purchaes_total) +
          parseInt(purchaesDup[i].purchaes_total),
      };
    } else {
      reduceDup.push({
        date: new Date(purchaesDup[i].date),
        purchaes_total: parseInt(purchaesDup[i].purchaes_total),
      });
    }
  }

  return reduceDup;
}

async function getSameDateWithTotals(sold, purchased) {
  var restTable = [];

  if (sold.length >= purchased.length) {
    for (let i = 0; i < sold.length; i++) {
      let result = purchased.some(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(sold[i].date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(sold[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(sold[i].date).getDate()
      );

      if (result) {
        let indexFor = purchased.findIndex(
          (ob) =>
            new Date(ob.date).getFullYear() ===
              new Date(sold[i].date).getFullYear() &&
            new Date(ob.date).getMonth() ===
              new Date(sold[i].date).getMonth() &&
            new Date(ob.date).getDate() === new Date(sold[i].date).getDate()
        );

        restTable.push({
          date: purchased[indexFor].date,
          purchased_total: purchased[indexFor].purchaes_total,
          sold_total: sold[i].sold_total,
          rest:
            parseInt(sold[i].sold_total) -
              parseInt(purchased[indexFor].purchaes_total) <
            0
              ? parseInt(purchased[indexFor].purchaes_total) -
                parseInt(sold[i].sold_total)
              : parseInt(sold[i].sold_total) -
                parseInt(purchased[indexFor].purchaes_total),
        });
      } else {
        restTable.push({
          date: sold[i].date,
          purchased_total: 0,
          sold_total: sold[i].sold_total,
          rest: parseInt(sold[i].sold_total),
        });
      }
    }
  } else {
    for (let i = 0; i < purchased.length; i++) {
      let result = sold.some(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(purchased[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(purchased[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(purchased[i].date).getDate()
      );
      if (result) {
        let indexFor = sold.findIndex(
          (ob) =>
            new Date(ob.date).getFullYear() ===
              new Date(purchased[i].date).getFullYear() &&
            new Date(ob.date).getMonth() ===
              new Date(purchased[i].date).getMonth() &&
            new Date(ob.date).getDate() ===
              new Date(purchased[i].date).getDate()
        );
        restTable.push({
          date: sold[indexFor].date,
          sold_total: sold[indexFor].sold_total,

          purchased_total: purchased[i].purchaes_total,
          rest:
            parseInt(sold[indexFor].sold_total) -
              parseInt(purchased[i].purchaes_total) <
            0
              ? parseInt(purchased[i].purchaes_total) -
                parseInt(sold[indexFor].sold_total)
              : parseInt(sold[indexFor].sold_total) -
                parseInt(purchased[i].purchaes_total),
        });
      } else {
        restTable.push({
          date: purchased[i].date,
          sold_total: 0,
          purchased_total: purchased[i].purchaes_total,
          rest: parseInt(purchased[i].purchaes_total),
        });
      }
    }
  }

  return restTable;
}

export default function Rest_Of_Hand() {
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
      name: "Sold_Amount",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Purchased_Amount",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Rest_of_the_Hand",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    getAllSold().then((reSoldRe) => {
      getAllSoldWithoutDuplicates(reSoldRe).then((reDupSold) => {
        getAllPurchased().then((rePurchaseRe) => {
          getAllPurchaesWithoutDuplicates(rePurchaseRe).then(
            (reDupPurcahes) => {
              getSameDateWithTotals(reDupSold, reDupPurcahes).then(
                (reTotalCal) => {
                  var rawTable = [];
                  let prevRest = 0;
                  reTotalCal.forEach((each) => {
                    prevRest = prevRest + each.rest;
                    rawTable.push({
                      Date: new Date(each.date).toDateString(),

                      Sold_Amount: (
                        <CurrencyFormat
                          value={each.sold_total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />
                      ),
                      Purchased_Amount: (
                        <CurrencyFormat
                          value={each.purchased_total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />
                      ),
                      Rest_of_the_Hand: (
                        <CurrencyFormat
                          value={prevRest}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />
                      ),
                    });
                  });
                  setTableData(rawTable);
                  setIsLoading(false);
                }
              );
            }
          );
        });
      });
    });
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={
            <span className="title_Span">Daily Rest of the Hand Report</span>
          }
          className="purchsd_gass"
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
