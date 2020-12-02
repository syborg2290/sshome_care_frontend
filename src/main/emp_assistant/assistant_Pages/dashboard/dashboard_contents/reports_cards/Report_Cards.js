import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { LineChart, Line } from "recharts";
import { useTheme } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CurrencyFormat from "react-currency-format";
import { DatePicker, Space, Spin } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "antd";

// components
import ExpencesModel from "./components/expences/Expences_Model";
import GassModel from "./components/gass/Gass_Model";
import SalesModel from "./components/sales/Sales_Model";
import { Typography } from "../../../../assistant_Wrappers/Wrappers";
import ModelVehicalService from "../../components/Vehical_Service_Model";

//icons
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";

import db from "../../../../../../config/firebase.js";

// styles
import "./Report_Cards.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
});

async function getAllSalesSaily(isAll, year, month) {
  var sales = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
          if (isAll) {
            sales.push({
              date: new Date(custIn.docs[i].data().date.seconds * 1000),
              type: custIn.docs[i].data().selectedType,
              total:
                parseInt(custIn.docs[i].data().items[j].downpayment) *
                  parseInt(custIn.docs[i].data().items[j].qty) -
                custIn.docs[i].data().items[j].discount,
            });
          }
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
          parseInt(reduceDup[indexFor].total) + parseInt(allSales[i].total),
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

async function getAllCashSaleSaily(isAll, year, month) {
  var cashSale = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        if (custIn.docs[i].data().paymentWay === "FullPayment") {
          for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
            if (isAll) {
              cashSale.push({
                date: new Date(custIn.docs[i].data().date.seconds * 1000),
                type: custIn.docs[i].data().selectedType,
                total:
                  parseInt(custIn.docs[i].data().items[j].downpayment) *
                    parseInt(custIn.docs[i].data().items[j].qty) -
                  custIn.docs[i].data().items[j].discount,
              });
            }
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
        total: parseInt(reduceDup[indexFor].total) + parseInt(allCash[i].total),
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

async function getAllRecievedCardSaleSaily(isAll, year, month) {
  var cardSale = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        if (custIn.docs[i].data().paymentWay === "PayandGo") {
          for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
            if (isAll) {
              cardSale.push({
                date: new Date(custIn.docs[i].data().date.seconds * 1000),
                type: custIn.docs[i].data().selectedType,
                total: parseInt(custIn.docs[i].data().downpayment),
              });
            }
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
          parseInt(reduceDup[indexFor].total) + parseInt(allCards[i].total),
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

async function getAllInstallments(isAll, year, month) {
  var creditRecieved = [];

  await db
    .collection("installment")
    .get()
    .then((reInst) => {
      for (let i = 0; i < reInst.docs.length; i++) {
        if (isAll) {
          creditRecieved.push({
            date: new Date(reInst.docs[i].data().date.seconds * 1000),
            type: reInst.docs[i].data().type,
            total: reInst.docs[i].data().amount,
          });
        }
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
          parseInt(reduceDup[indexFor].total) + parseInt(allIntsall[i].total),
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

async function getAllDocumentChargesDaily(isAll, year, month) {
  var cardSale = [];
  await db
    .collection("invoice")
    .orderBy("date", "desc")
    .get()
    .then((custIn) => {
      for (let i = 0; i < custIn.docs.length; i++) {
        for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
          if (isAll) {
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
        total: parseInt(reduceDup[indexFor].total) + parseInt(allDocs[i].total),
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

  for (let n = 0; n < installment.length; n++) {
    let resultExtraIn = allArray.some(
      (ob) =>
        new Date(ob.date).getFullYear() ===
          new Date(installment[n].date).getFullYear() &&
        new Date(ob.date).getMonth() ===
          new Date(installment[n].date).getMonth() &&
        new Date(ob.date).getDate() === new Date(installment[n].date).getDate()
    );

    if (!resultExtraIn) {
      allArray.push({
        date: new Date(installment[n].date),
        sales: 0,
        cash: 0,
        cards: 0,
        installment: installment[n].total,
        docs: docs[n] === 0 ? 0 : docs[n].total,
      });
    }
  }

  allArray.sort((a, b) => {
    if (
      new Date(a.date).getFullYear() > new Date(b.date).getFullYear() &&
      new Date(a.date).getMonth() > new Date(b.date).getMonth() &&
      new Date(a.date).getDate() > new Date(b.date).getDate()
    ) {
      return -1;
    } else {
      return 1;
    }
  });

  return allArray;
}

async function saleTotalBalance(allSalesTotals) {
  var reduceDup = 0;

  for (let i = 0; i < allSalesTotals.length; i++) {
    reduceDup = reduceDup + allSalesTotals[i].sales;
  }

  return reduceDup;
}

async function cashTotalBalance(allSalesTotals) {
  var reduceDup = 0;

  for (let i = 0; i < allSalesTotals.length; i++) {
    reduceDup = reduceDup + allSalesTotals[i].cash;
  }

  return reduceDup;
}

async function cardsTotalBalance(allSalesTotals) {
  var reduceDup = 0;

  for (let i = 0; i < allSalesTotals.length; i++) {
    reduceDup = reduceDup + allSalesTotals[i].cards;
  }

  return reduceDup;
}

async function installTotalBalance(allSalesTotals) {
  var reduceDup = 0;

  for (let i = 0; i < allSalesTotals.length; i++) {
    reduceDup = reduceDup + allSalesTotals[i].installment;
  }

  return reduceDup;
}

async function docsTotalBalance(allSalesTotals) {
  var reduceDup = 0;

  for (let i = 0; i < allSalesTotals.length; i++) {
    reduceDup = reduceDup + allSalesTotals[i].docs;
  }

  return reduceDup;
}

export default function Report_Cards() {
  const [vehicalServiceModel, setVehicalServiceModel] = useState(false); //  model service Vehical
  const [expencesModel, setExpencesModel] = useState(false); //  model
  const [gassModel, setGassModel] = useState(false); //  model
  const [salesModel, setSalesModel] = useState(false); //  model
  // eslint-disable-next-line
  const [recordPnl, setRecordPnl] = useState(false);
  // eslint-disable-next-line
  const [expencesPnl, setExpencesPnl] = useState(false);
  const [saleYear, setSaleYear] = useState(null);
  const [saleMonth, setSaleMonth] = useState(null);
  const [saleIsAll, setSaleIsAll] = useState(true);
  const [gasYear, setGasYear] = useState(null);
  const [gasMonth, setGasMonth] = useState(null);
  const [gasIsAll, setGasIsAll] = useState(true);
  const [expencesYear, setExpencesYear] = useState(null);
  const [expencesMonth, setExpencesMonth] = useState(null);
  const [expencesIsAll, setExpencesIsAll] = useState(true);
  const [allSalesTableData, setAllSalesTable] = useState([]);
  const [saleBalance, setSaleBalance] = useState(0);
  const [cashTotal, setCashTotal] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);
  const [downPayment, setDownpayment] = useState(0);
  const [docsTotal, setDocsTotal] = useState(0);
  const [soldGas, setSoldGas] = useState(0);
  const [purchasedGas, setPurchasedGas] = useState(0);
  const [allExpencesBalance, setAllExpencesBalance] = useState(0);
  const [isLoding, setIsLoading] = useState(true);
  let history = useHistory();

  var theme = useTheme();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const VehicalServiceModel = () => {
    setVehicalServiceModel(true);
  };

  const RecordPnl = () => {
    setRecordPnl(true);
    history.push("/assistant/pages/records");
  };

  const ExpencesPnl = () => {
    setExpencesPnl(true);
    history.push("/assistant/pages/expences");
  };

  const ViewExpencesModel = () => {
    setExpencesModel(true);
  };
  const ViewGassModel = () => {
    setGassModel(true);
  };
  const ViewSalesModel = () => {
    setSalesModel(true);
  };

  useEffect(() => {
    getAllSalesSaily(saleIsAll, saleYear, saleMonth).then((reAllSales) => {
      sumSameDaySales(reAllSales).then((reSumWith) => {
        getAllCashSaleSaily(saleIsAll, saleYear, saleMonth).then((reCash) => {
          sumSameDayCashSale(reCash).then((reCashAllSum) => {
            getAllRecievedCardSaleSaily(saleIsAll, saleYear, saleMonth).then(
              (reCardSale) => {
                sumSameDayCardSale(reCardSale).then((reCardSaleSum) => {
                  getAllInstallments(saleIsAll, saleYear, saleMonth).then(
                    (reInstallments) => {
                      sumSameDayIntallmentSale(reInstallments).then(
                        (reInstallmentsSum) => {
                          getAllDocumentChargesDaily(
                            saleIsAll,
                            saleYear,
                            saleMonth
                          ).then((reDocsCharges) => {
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
                                  // let eachRE = [];

                                  saleTotalBalance(againArray).then(
                                    (reSaleBalance) => {
                                      cashTotalBalance(againArray).then(
                                        (reCashBalance) => {
                                          cardsTotalBalance(againArray).then(
                                            (reCards) => {
                                              installTotalBalance(
                                                againArray
                                              ).then((reInstall) => {
                                                docsTotalBalance(
                                                  againArray
                                                ).then((reDocs) => {
                                                  let previousSale = reSaleBalance;
                                                  let previousCash = reCashBalance;
                                                  let previousCards = reCards;
                                                  let previousIntsll = reInstall;
                                                  let previousDocs = reDocs;

                                                  setSaleBalance(previousSale);
                                                  setCashTotal(previousCash);
                                                  setCreditTotal(
                                                    previousIntsll
                                                  );
                                                  setDownpayment(previousCards);

                                                  setDocsTotal(previousDocs);
                                                  // againArray.forEach((each) => {
                                                  //   previousSale =
                                                  //     previousSale -
                                                  //     parseInt(each.sales);
                                                  //   previousCash =
                                                  //     previousCash -
                                                  //     parseInt(each.cash);
                                                  //   previousCards =
                                                  //     previousCards -
                                                  //     parseInt(each.cards);
                                                  //   previousIntsll =
                                                  //     previousIntsll -
                                                  //     parseInt(
                                                  //       each.installment
                                                  //     );
                                                  //   previousDocs =
                                                  //     previousDocs -
                                                  //     parseInt(each.docs);
                                                  //   eachRE.push({
                                                  //     Date: new Date(
                                                  //       each.date
                                                  //     ).toDateString(),
                                                  //     Total_Sale: (
                                                  //       <CurrencyFormat
                                                  //         value={each.sales}
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //     Balance: (
                                                  //       <CurrencyFormat
                                                  //         value={previousSale}
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //     Cash_Sale: (
                                                  //       <CurrencyFormat
                                                  //         value={each.cash}
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //     Recived_Card_Sale: (
                                                  //       <CurrencyFormat
                                                  //         value={each.cards}
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //     Credit_Recived: (
                                                  //       <CurrencyFormat
                                                  //         value={
                                                  //           each.installment
                                                  //         }
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //     Document_Charges: (
                                                  //       <CurrencyFormat
                                                  //         value={each.docs}
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //     Total: (
                                                  //       <CurrencyFormat
                                                  //         value={
                                                  //           each.cards +
                                                  //           each.cash +
                                                  //           each.installment +
                                                  //           each.docs
                                                  //         }
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //     Total_Balance: (
                                                  //       <CurrencyFormat
                                                  //         value={
                                                  //           previousCards +
                                                  //           previousCash +
                                                  //           previousIntsll +
                                                  //           previousDocs
                                                  //         }
                                                  //         displayType={"text"}
                                                  //         thousandSeparator={
                                                  //           true
                                                  //         }
                                                  //         prefix={" "}
                                                  //       />
                                                  //     ),
                                                  //   });
                                                  // });
                                                  // setAllSalesTable(eachRE);
                                                });
                                              });
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                });
                              }
                            );
                          });
                        }
                      );
                    }
                  );
                });
              }
            );
          });
        });
      });
    });

    db.collection("gas_history")
      .orderBy("date", "desc")
      .onSnapshot((snap) => {
        var purchasedTotal = 0;

        snap.docs.forEach((each) => {
          let totalRe = parseInt(each.data().price) * parseInt(each.data().qty);

          purchasedTotal = purchasedTotal + totalRe;
        });

        setPurchasedGas(purchasedTotal);
      });

    db.collection("gas_purchase_history")
      .orderBy("date", "desc")
      .onSnapshot((snap) => {
        var soldTotal = 0;

        snap.docs.forEach((each) => {
          let totalRe = parseInt(each.data().price) * parseInt(each.data().qty);
          soldTotal = soldTotal + totalRe;
        });
        setSoldGas(soldTotal);
      });

    db.collection("expences")
      .orderBy("date", "desc")
      .get()
      .then((reGet) => {
        setAllExpencesBalance(reGet.docs[0].data().balance);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {/*Start Vehical Service Model */}

      <Modal
        visible={vehicalServiceModel}
        footer={null}
        className="vehical_servicemdl"
        onCancel={() => {
          setVehicalServiceModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ModelVehicalService />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  Vehical Service Model  */}

      {/*Start expencesM  Model */}

      <Modal
        visible={expencesModel}
        footer={null}
        className="excx_servicemdl"
        onCancel={() => {
          setExpencesModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ExpencesModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  expences  Model  */}

      {/*Start gass  Model */}

      <Modal
        visible={gassModel}
        footer={null}
        className="gasscxModel"
        onCancel={() => {
          setGassModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <GassModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End gass  Model  */}

      {/*Start sales Model */}

      <Modal
        visible={salesModel}
        footer={null}
        className="salescxModel"
        onCancel={() => {
          setSalesModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <SalesModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  sales Model  */}

      <div className="widgetWrappe">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="card_body1_cx">
            <Paper className="card_cx" onClick={ViewSalesModel}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <h2 className="tipics_cards_cx">
                    {isLoding ? <Spin size="small" /> : "All Sales"}
                  </h2>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <div className="vlo"></div>
                </Grid>
                <Grid className="date_pikr" item xs={12} sm={5}>
                  <Typography
                    className="select_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Select Year & Month
                  </Typography>
                  <Space direction="vertical">
                    <DatePicker
                      className="date_pikr"
                      picker="month"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    />
                  </Space>
                </Grid>
              </Grid>
              <div className="visitsNumberContainer_cx">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    className="mainTotal_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Total Sale
                  </Typography>
                  <Typography className="total_cx" size="xl">
                    <CurrencyFormat
                      value={saleBalance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LineChart
                    className="line_chart_cx"
                    width={55}
                    height={30}
                    data={[
                      { value: saleBalance },
                      { value: cashTotal },
                      { value: downPayment },
                      { value: creditTotal },
                      { value: docsTotal },
                    ]}
                  >
                    <Line
                      stroke={theme.palette.success.main}
                      type="natural"
                      dataKey="value"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
                <Grid item xs={12} sm={4} className="credit_recvd">
                  <Typography
                    className="credit_recvd_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    {bull}Credit Received
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={creditTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
              </div>
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction="row"
                className="cost"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={1}></Grid>
                <Grid className="payGoing_cx top" item xs={12} sm={3}>
                  <Typography
                    color="text"
                    className="Cash_txt_cx"
                    colorBrightness="secondary"
                  >
                    {bull}Cash Sale
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={cashTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
                <Grid className="payGoing_cx" item xs={12} sm={4}>
                  <Typography
                    color="text"
                    className="Cash_txt_cx"
                    colorBrightness="secondary"
                  >
                    {bull}Down Payment
                  </Typography>
                  <Typography className="Credit_lbl_cx" size="md">
                    {" "}
                    <CurrencyFormat
                      value={downPayment}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
                <Grid className="payGoing_cx" item xs={12} sm={4}>
                  <Typography
                    color="text"
                    className="Cash_txt_cx"
                    colorBrightness="secondary"
                  >
                    {bull}Document Charge
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={docsTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} className="card_body2_cx">
            <Paper
              title="Gass Balance"
              className="card_cx"
              onClick={ViewGassModel}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <h2 className="tipics_cards_cx">
                    {" "}
                    {isLoding ? <Spin size="small" /> : "All Gas History"}
                  </h2>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <div className="vloGss"></div>
                </Grid>
                <Grid className="date_pikr" item xs={12} sm={5}>
                  <Typography
                    className="select_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Select Year & Month
                  </Typography>
                  <Space direction="vertical">
                    <DatePicker className="date_pikr" picker="month" />
                  </Space>
                </Grid>
              </Grid>
              <div className="visitsNumberContainer_cx">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    className="mainTotal_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    The Rest of the Hand
                  </Typography>
                  <Typography className="total_cx" size="xl">
                    <CurrencyFormat
                      value={purchasedGas - soldGas}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <LineChart
                    className="line_chart_cx"
                    width={55}
                    height={30}
                    data={[{ value: soldGas }, { value: purchasedGas }]}
                  >
                    <Line
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.warning.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </div>
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction="row"
                className="cost"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={1}></Grid>
                <Grid className="Soldgrid" item xs={12} sm={6}>
                  <Typography
                    className="Cash_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    {bull}Sold Amount
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={soldGas}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid className="Soldgrid" item xs={12} sm={5}>
                  <Typography
                    color="text"
                    className="Cash_txt_cx"
                    colorBrightness="secondary"
                  >
                    {bull}Purchased Amount
                  </Typography>
                  <Typography size="md" className="Credit_lbl_cx">
                    {" "}
                    <CurrencyFormat
                      value={purchasedGas}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className="card_Bttm" onClick={ViewExpencesModel}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <h2 className="tipics_cards_cx">All Expences History</h2>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <div className="vloEx"></div>
                </Grid>
                <Grid className="date_pikr" item xs={12} sm={5}>
                  <Typography
                    className="select_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Select Year & Month
                  </Typography>
                  <Space direction="vertical">
                    <DatePicker className="date_pikr" picker="month" />
                  </Space>
                </Grid>
              </Grid>
              <div className="visitsNumberContainer_cx">
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    className="mainTotal_txt_cx"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Total Expences
                  </Typography>
                  <Typography className="total_cx" size="xl">
                    <CurrencyFormat
                      value={allExpencesBalance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <LineChart
                    className="line_chart_cx"
                    width={55}
                    height={30}
                    data={[
                      { value: 10 },
                      { value: 20 },
                      { value: 15 },
                      { value: 50 },
                      { value: 60 },
                      { value: 35 },
                    ]}
                  >
                    <Line
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    className="btn_Dash"
                    endIcon={<FolderOpenIcon />}
                    onClick={RecordPnl}
                  >
                    Reports
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    className="btn_Expences"
                    endIcon={<PostAddIcon />}
                    onClick={ExpencesPnl}
                  >
                    Add Expences
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    className="btn_VehicalService"
                    endIcon={<SettingsApplicationsIcon />}
                    onClick={VehicalServiceModel}
                  >
                    Vehical Services
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
