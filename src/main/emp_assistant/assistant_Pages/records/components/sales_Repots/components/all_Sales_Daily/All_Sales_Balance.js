// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Spin } from "antd";

// styles
import "./All_Sales_Balance.css";

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
        new Date(ob.date).getDate() === new Date(allSales[i].date).getDate()
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(allSales[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(allSales[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(allSales[i].date).getDate()
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

async function getAllCashSaleSaily() {
  var cashSale = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        if (custIn.docs[i].data().paymentWay === "FullPayment") {
          for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
            cashSale.push({
              date: new Date(custIn.docs[i].data().date.seconds * 1000),
              type: custIn.docs[i].data().selectedType,
              total:
                parseInt(custIn.docs[i].data().items[j].downpayment) *
                parseInt(custIn.docs[i].data().items[j].qty),
            });
          }
        }
      }
    });
  return cashSale;
}

async function sumSameDayCashSale(allCash) {
  var reduceDup = [];

  for (let i = 0; i < allCash.length; i++) {
    let result = reduceDup.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(allCash[i].date).getFullYear() &&
        new Date(ob.date).getMonth() === new Date(allCash[i].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(allCash[i].date).getDate()
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(allCash[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(allCash[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(allCash[i].date).getDate()
      );

      reduceDup[indexFor] = {
        date: reduceDup[indexFor].date,
        total:
          parseInt(reduceDup[indexFor].total) + parseInt(allCash[i].sold_total),
      };
    } else {
      reduceDup.push({
        date: new Date(allCash[i].date),
        type: allCash[i].type,
        total: allCash[i].total,
      });
    }
  }

  return reduceDup;
}

async function getAllRecievedCardSaleSaily() {
  var cardSale = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        if (custIn.docs[i].data().paymentWay === "PayandGo") {
          for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
            cardSale.push({
              date: new Date(custIn.docs[i].data().date.seconds * 1000),
              type: custIn.docs[i].data().selectedType,
              total:
                parseInt(custIn.docs[i].data().items[j].downpayment) *
                parseInt(custIn.docs[i].data().items[j].qty),
            });
          }
        }
      }
    });
  return cardSale;
}

async function sumSameDayCardSale(allCards) {
  var reduceDup = [];

  for (let i = 0; i < allCards.length; i++) {
    let result = reduceDup.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(allCards[i].date).getFullYear() &&
        new Date(ob.date).getMonth() ===
          new Date(allCards[i].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(allCards[i].date).getDate()
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(allCards[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(allCards[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(allCards[i].date).getDate()
      );

      reduceDup[indexFor] = {
        date: reduceDup[indexFor].date,
        total:
          parseInt(reduceDup[indexFor].total) +
          parseInt(allCards[i].sold_total),
      };
    } else {
      reduceDup.push({
        date: new Date(allCards[i].date),
        type: allCards[i].type,
        total: allCards[i].total,
      });
    }
  }

  return reduceDup;
}

async function getAllInstallments() {
  var creditRecieved = [];

  await db
    .collection("installment")
    .get()
    .then((reInst) => {
      for (let i = 0; i < reInst.docs.length; i++) {
        creditRecieved.push({
          date: new Date(reInst.docs[i].data().date.seconds * 1000),
          type: reInst.docs[i].data().type,
          total: reInst.docs[i].data().amount,
        });
      }
    });
  return creditRecieved;
}

async function sumSameDayIntallmentSale(allIntsall) {
  var reduceDup = [];

  for (let i = 0; i < allIntsall.length; i++) {
    let result = reduceDup.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(allIntsall[i].date).getFullYear() &&
        new Date(ob.date).getMonth() ===
          new Date(allIntsall[i].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(allIntsall[i].date).getDate()
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(allIntsall[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(allIntsall[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(allIntsall[i].date).getDate()
      );

      reduceDup[indexFor] = {
        date: reduceDup[indexFor].date,
        total:
          parseInt(reduceDup[indexFor].total) +
          parseInt(allIntsall[i].sold_total),
      };
    } else {
      reduceDup.push({
        date: new Date(allIntsall[i].date),
        type: allIntsall[i].type,
        total: allIntsall[i].total,
      });
    }
  }

  return reduceDup;
}

async function getAllDocumentChargesDaily() {
  var cardSale = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        if (custIn.docs[i].data().paymentWay === "PayandGo") {
          for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
            cardSale.push({
              date: new Date(custIn.docs[i].data().date.seconds * 1000),
              type: custIn.docs[i].data().selectedType,
              total: custIn.docs[i].data().document_charges,
            });
          }
        }
      }
    });
  return cardSale;
}

async function sumSameDayDocumentCharges(allDocs) {
  var reduceDup = [];

  for (let i = 0; i < allDocs.length; i++) {
    let result = reduceDup.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(allDocs[i].date).getFullYear() &&
        new Date(ob.date).getMonth() === new Date(allDocs[i].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(allDocs[i].date).getDate()
    );

    if (result) {
      let indexFor = reduceDup.findIndex(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(allDocs[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(allDocs[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(allDocs[i].date).getDate()
      );

      reduceDup[indexFor] = {
        date: reduceDup[indexFor].date,
        total:
          parseInt(reduceDup[indexFor].total) + parseInt(allDocs[i].sold_total),
      };
    } else {
      reduceDup.push({
        date: new Date(allDocs[i].date),
        type: allDocs[i].type,
        total: allDocs[i].total,
      });
    }
  }

  return reduceDup;
}

async function getAllSalesReports(sales, cash, cards, installment, docs) {
  let allArray = [];

  if (sales.length >= installment.length) {
    for (let i = 0; i < sales.length; i++) {
      let result = cash.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(sales[i].date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(sales[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(sales[i].date).getDate()
      );
      let result2 = cards.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(sales[i].date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(sales[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(sales[i].date).getDate()
      );
      let result3 = installment.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(sales[i].date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(sales[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(sales[i].date).getDate()
      );
      let result4 = docs.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(sales[i].date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(sales[i].date).getMonth() &&
          new Date(ob.date).getDate() === new Date(sales[i].date).getDate()
      );

      allArray.push({
        date: new Date(sales[i].date),
        sales: sales[i].total,
        cash: result.length === 0 ? 0 : result[0].total,
        cards: result2.length === 0 ? 0 : result2[0].total,
        installment: result3.length === 0 ? 0 : result3[0].total,
        docs: result4.length === 0 ? 0 : result4[0].total,
      });
    }
  } else {
    for (let i = 0; i < installment.length; i++) {
      let result = cash.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(installment[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(installment[i].date).getMonth() &&
          new Date(ob.date).getDate() ===
            new Date(installment[i].date).getDate()
      );
      let result2 = cards.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(installment[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(installment[i].date).getMonth() &&
          new Date(ob.date).getDate() ===
            new Date(installment[i].date).getDate()
      );
      let result3 = sales.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(installment[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(installment[i].date).getMonth() &&
          new Date(ob.date).getDate() ===
            new Date(installment[i].date).getDate()
      );
      let result4 = docs.filter(
        (ob) =>
          new Date(ob.date).getFullYear() ===
            new Date(installment[i].date).getFullYear() &&
          new Date(ob.date).getMonth() ===
            new Date(installment[i].date).getMonth() &&
          new Date(ob.date).getDate() ===
            new Date(installment[i].date).getDate()
      );

      allArray.push({
        date: new Date(installment[i].date),
        sales: result3.length === 0 ? 0 : result3[0].total,
        cash: result.length === 0 ? 0 : result[0].total,
        cards: result2.length === 0 ? 0 : result2[0].total,
        installment: installment[i].total,
        docs: result4.length === 0 ? 0 : result4[0].total,
      });
    }
  }
  return allArray;
}

export default function All_Sales_Balance() {
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
      name: "Total_Sale",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Balance",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Cash_Sale",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Recived_Card_Sale",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Credit_Recived",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Document_Charges",
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
        getAllCashSaleSaily().then((reCash) => {
          sumSameDayCashSale(reCash).then((reCashAllSum) => {
            getAllRecievedCardSaleSaily().then((reCardSale) => {
              sumSameDayCardSale(reCardSale).then((reCardSaleSum) => {
                getAllInstallments().then((reInstallments) => {
                  sumSameDayIntallmentSale(reInstallments).then(
                    (reInstallmentsSum) => {
                      getAllDocumentChargesDaily().then((reDocsCharges) => {
                        sumSameDayDocumentCharges(reDocsCharges).then(
                          (reDocsSum) => {
                            getAllSalesReports(
                              reSumWith,
                              reCashAllSum,
                              reCardSaleSum,
                              reInstallmentsSum,
                              reDocsSum
                            ).then((reAllArray) => {
                              let againArray = reAllArray;
                              let eachRE = [];
                              let previousSale = 0;
                              let previousCash = 0;
                              let previousCards = 0;
                              let previousIntsll = 0;
                              let previousDocs = 0;

                              againArray.sort((a, b) => {
                                if (
                                  new Date(a.date).getFullYear() ===
                                    new Date(b.date).getFullYear() &&
                                  new Date(a.date).getMonth() ===
                                    new Date(b.date).getMonth() &&
                                  new Date(a.date).getDate() ===
                                    new Date(b.date).getDate()
                                ) {
                                  return -1;
                                } else {
                                  return 1;
                                }
                              });

                              againArray.forEach((each) => {
                                previousSale =
                                  previousSale + parseInt(each.sales);
                                previousCash =
                                  previousCash + parseInt(each.cash);
                                previousCards =
                                  previousCards + parseInt(each.cards);
                                previousIntsll =
                                  previousIntsll + parseInt(each.installment);
                                previousDocs =
                                  previousDocs + parseInt(each.docs);
                                eachRE.push({
                                  Date: new Date(each.date).toDateString(),
                                  Total_Sale: (
                                    <CurrencyFormat
                                      value={each.sales}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={" "}
                                    />
                                  ),
                                  Balance: (
                                    <CurrencyFormat
                                      value={previousSale}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={" "}
                                    />
                                  ),
                                  Cash_Sale: (
                                    <CurrencyFormat
                                      value={each.cash}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={" "}
                                    />
                                  ),
                                  Recived_Card_Sale: (
                                    <CurrencyFormat
                                      value={each.cards}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={" "}
                                    />
                                  ),
                                  Credit_Recived: (
                                    <CurrencyFormat
                                      value={each.installment}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={" "}
                                    />
                                  ),
                                  Document_Charges: (
                                    <CurrencyFormat
                                      value={each.docs}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={" "}
                                    />
                                  ),
                                  Total: (
                                    <CurrencyFormat
                                      value={
                                        each.sales +
                                        each.cards +
                                        each.cash +
                                        each.installment +
                                        each.docs
                                      }
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={" "}
                                    />
                                  ),
                                  Total_Balance: (
                                    <CurrencyFormat
                                      value={
                                        previousSale +
                                        previousCards +
                                        previousCash +
                                        previousIntsll +
                                        previousDocs
                                      }
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
                          }
                        );
                      });
                    }
                  );
                });
              });
            });
          });
        });
      });
    });
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">All Sales Balance</span>}
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
