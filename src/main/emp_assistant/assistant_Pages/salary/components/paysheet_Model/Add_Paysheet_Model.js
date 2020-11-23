import React, { useState, useEffect } from "react";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Fab,
} from "@material-ui/core";
import { Modal, Spin } from "antd";

// styles
import "./Add_Paysheet_Model.css";

import db from "../../../../../../config/firebase.js";

//icons
import HistoryIcon from "@material-ui/icons/History";

// components
import AttendanceHistorys from "./components/attendance_history_Model/Attendance_History";
import CashSaleHistorys from "./components/cash_sale_history_Model/Cash_Sale_History";
import CashTargetHistorys from "./components/cash_target_history_Model/Cash_Target_History";
import ExcardHistorys from "./components/excard_history_Model/Excard_History";
import SaleTargetHistorys from "./components/sale_target_history_Model/Sale_Target_History";
import ShortageHistorys from "./components/shortage_history_Model/Shortage_History";

async function getGasshort(root, isFirstSalary, lastSalaryDate) {
  var reGas = await db
    .collection("gas_purchase_history")
    .where("type", "==", root)
    .get();

  var gasShort = 0;

  for (var i = 0; i < reGas.docs.length; i++) {
    if (reGas.docs[i].data().type === root) {
      if (isFirstSalary) {
        gasShort = parseInt(gasShort) + parseInt(reGas.docs[i].data().shortage);
      } else {
        let seeBool3 =
          new Date(reGas.docs[i].data()?.date.seconds * 1000) >
            new Date(lastSalaryDate.seconds * 1000) &&
          new Date(reGas.docs[i].data()?.date.seconds * 1000) <= new Date();

        if (seeBool3) {
          gasShort =
            parseInt(gasShort) + parseInt(reGas.docs[i].data().shortage);
        }
      }
    }
  }

  return gasShort === 0 ? 0 : Math.round((gasShort / 2) * 10) / 10;
}

async function getInstallmentshort(root, isFirstSalary, lastSalaryDate) {
  var reInstallment = await db
    .collection("installment")
    .where("type", "==", root)
    .get();

  var installShortage = 0;
  for (var i = 0; i < reInstallment.docs.length; i++) {
    if (reInstallment.docs[i].data().type === root) {
      if (isFirstSalary) {
        installShortage =
          parseInt(installShortage) +
          parseInt(reInstallment.docs[i].data().shortage);
      } else {
        let seeBool2 =
          new Date(reInstallment.docs[i].data()?.date.seconds * 1000) >
            new Date(lastSalaryDate.seconds * 1000) &&
          new Date(reInstallment.docs[i].data()?.date.seconds * 1000) <=
            new Date();

        if (seeBool2) {
          installShortage =
            parseInt(installShortage) +
            parseInt(reInstallment.docs[i].data().shortage);
        }
      }
    }
  }

  return installShortage === 0
    ? 0
    : Math.round((installShortage / 2) * 10) / 10;
}

async function getShortage(root, isFirstSalary, lastSalaryDate) {
  var reInvoice = await db
    .collection("invoice")
    .where("selectedType", "==", root)
    .get();

  var shortage = 0;
  for (var i = 0; i < reInvoice.docs.length; i++) {
    if (reInvoice.docs[i].data().selectedType === root) {
      if (isFirstSalary) {
        shortage =
          parseInt(shortage) + parseInt(reInvoice.docs[i].data().shortage);
      } else {
        let seeBool1 =
          new Date(reInvoice.docs[i].data()?.date.seconds * 1000) >
            new Date(lastSalaryDate.seconds * 1000) &&
          new Date(reInvoice.docs[i].data()?.date.seconds * 1000) <= new Date();

        if (seeBool1) {
          shortage =
            parseInt(shortage) + parseInt(reInvoice.docs[i].data().shortage);
        }
      }
    }
  }

  return shortage === 0 ? 0 : Math.round((shortage / 2) * 10) / 10;
}

async function getAllAttendance(nic, isFirstSalary, lastSalaryDate) {
  var reAt = await db
    .collection("attendance_history")
    .where("nic", "==", nic)
    .get();

  if (isFirstSalary) {
    return reAt.docs.length;
  } else {
    var attendance = 0;
    for (var i = 0; i < reAt.docs.length; i++) {
      let seeBool1 =
        new Date(reAt.docs[i].data()?.date.seconds * 1000) >
          new Date(lastSalaryDate.seconds * 1000) &&
        new Date(reAt.docs[i].data()?.date.seconds * 1000) <= new Date();

      if (seeBool1) {
        attendance = parseInt(attendance) + 1;
      }
    }

    return parseInt(attendance);
  }
}

async function getAllAttendanceForTable(nic, isFirstSalary, lastSalaryDate) {
  var reAt = await db
    .collection("attendance_history")
    .where("nic", "==", nic)
    .get();

  if (isFirstSalary) {
    let allAttendance1 = [];
    for (let i = 0; i < reAt.docs.length; i++) {
      allAttendance1.push(reAt.docs[i].data());
    }

    return allAttendance1;
  } else {
    let allAttendance2 = [];
    for (let i = 0; i < reAt.docs.length; i++) {
      let seeBool1 =
        new Date(reAt.docs[i].data()?.date.seconds * 1000) >
          new Date(lastSalaryDate.seconds * 1000) &&
        new Date(reAt.docs[i].data()?.date.seconds * 1000) <= new Date();

      if (seeBool1) {
        allAttendance2.push(reAt.docs[i].data());
      }
    }

    return allAttendance2;
  }
}

async function getSaleTarget(root) {
  var saleRe = await db
    .collection("invoice")
    .where("selectedType", "==", root)
    .get();

  var salesTaregt = await db
    .collection("targets")
    .where("selectedType", "==", root)
    .get();
  var saleTargetValue = 0;
  var targetValue = 0;

  for (var k = 0; k < salesTaregt.docs.length; k++) {
    if (
      salesTaregt.docs[k].data().status === "ongoing" &&
      salesTaregt.docs[k].data().target_type === "Sale target"
    ) {
      targetValue = parseInt(salesTaregt.docs[k].data().amount);
      for (var i = 0; i < saleRe.docs.length; i++) {
        let seeBool1 =
          new Date(saleRe.docs[i].data()?.date.seconds * 1000) >
            new Date(salesTaregt.docs[k].data()?.start_date.seconds * 1000) &&
          new Date(saleRe.docs[i].data()?.date.seconds * 1000) <= new Date();

        if (seeBool1) {
          for (let n = 0; n < saleRe.docs[i].data().items.length; n++) {
            saleTargetValue =
              parseInt(saleTargetValue) +
              parseInt(saleRe.docs[i].data().items[n].downpayment);
          }
        }
      }
    }
  }

  return targetValue === 0
    ? 0
    : saleTargetValue === 0
    ? 0
    : saleTargetValue >= targetValue
    ? 5000
    : 0;
}

async function cashTargetFunc(root, isFirstSalary, lastSalaryDate) {
  var saleRe = await db
    .collection("invoice")
    .where("selectedType", "==", root)
    .get();
  var installmentsRe = await db
    .collection("installment")
    .where("type", "==", root)
    .get();

  var cashTaregtRpp = await db
    .collection("targets")
    .where("selectedType", "==", root)
    .get();
  var returnValue = 0;
  var threePresentage = 0;
  var fourPresentage = 0;

  var dueCashTaregt = cashTaregtRpp.docs.filter(
    (ob) =>
      ob.data().status === "ongoing" && ob.data().target_type === "Cash target"
  );

  if (dueCashTaregt.length > 0) {
    var targetValue = parseInt(dueCashTaregt[0].data().amount);
    var cashTargetValue = 0;
    for (let i = 0; i < saleRe.docs.length; i++) {
      if (saleRe.docs[i].data().paymentWay === "PayandGo") {
        let seeBool1 =
          new Date(saleRe.docs[i].data()?.date.seconds * 1000) >
            new Date(dueCashTaregt[0].data()?.start_date.seconds * 1000) &&
          new Date(saleRe.docs[i].data()?.date.seconds * 1000) <= new Date();

        if (seeBool1) {
          threePresentage =
            parseInt(threePresentage) +
            (parseInt(saleRe.docs[i].data().downpayment) * 3) / 100;
          fourPresentage =
            parseInt(fourPresentage) +
            (parseInt(saleRe.docs[i].data().downpayment) * 4) / 100;
          cashTargetValue =
            parseInt(cashTargetValue) +
            parseInt(saleRe.docs[i].data().downpayment);
        }
      }
    }

    for (let i = 0; i < installmentsRe.docs.length; i++) {
      let seeBool1 =
        new Date(installmentsRe.docs[i].data()?.date.seconds * 1000) >
          new Date(dueCashTaregt[0].data()?.start_date.seconds * 1000) &&
        new Date(installmentsRe.docs[i].data()?.date.seconds * 1000) <=
          new Date();

      if (seeBool1) {
        if (installmentsRe.docs[i].data().isExpired === false) {
          threePresentage =
            parseInt(threePresentage) +
            (parseInt(installmentsRe.docs[i].data().amount) * 3) / 100;
          fourPresentage =
            parseInt(fourPresentage) +
            (parseInt(installmentsRe.docs[i].data().amount) * 4) / 100;
          cashTargetValue =
            parseInt(cashTargetValue) +
            parseInt(installmentsRe.docs[i].data().amount);
        }
      }
    }
    if (cashTargetValue >= targetValue) {
      returnValue = fourPresentage;
    } else {
      returnValue = threePresentage;
    }
  } else {
    for (let i = 0; i < saleRe.docs.length; i++) {
      if (saleRe.docs[i].data().paymentWay === "PayandGo") {
        if (isFirstSalary) {
          threePresentage =
            parseInt(threePresentage) +
            (parseInt(saleRe.docs[i].data().downpayment) * 3) / 100;
        } else {
          let seeBool1 =
            new Date(saleRe.docs[i].data()?.date.seconds * 1000) >
              new Date(lastSalaryDate.seconds * 1000) &&
            new Date(saleRe.docs[i].data()?.date.seconds * 1000) <= new Date();

          if (seeBool1) {
            threePresentage =
              parseInt(threePresentage) +
              (parseInt(saleRe.docs[i].data().downpayment) * 3) / 100;
          }
        }
      }
    }

    for (let i = 0; i < installmentsRe.docs.length; i++) {
      if (isFirstSalary) {
        if (installmentsRe.docs[i].data().isExpired === false) {
          threePresentage =
            parseInt(threePresentage) +
            (parseInt(installmentsRe.docs[i].data().amount) * 3) / 100;
        }
      } else {
        let seeBool1 =
          new Date(installmentsRe.docs[i].data()?.date.seconds * 1000) >
            new Date(lastSalaryDate.seconds * 1000) &&
          new Date(installmentsRe.docs[i].data()?.date.seconds * 1000) <=
            new Date();

        if (seeBool1) {
          if (installmentsRe.docs[i].data().isExpired === false) {
            threePresentage =
              parseInt(threePresentage) +
              (parseInt(installmentsRe.docs[i].data().amount) * 3) / 100;
          }
        }
      }
    }

    returnValue = threePresentage;
  }

  return returnValue === 0 ? 0 : Math.round((returnValue / 2) * 10) / 10;
}

async function getCashSaleFunc(root, isFirstSalary, lastSalaryDate) {
  var saleRe = await db
    .collection("invoice")
    .where("selectedType", "==", root)
    .get();

  var cashSale = 0;

  for (var i = 0; i < saleRe.docs.length; i++) {
    if (saleRe.docs[i].data().paymentWay === "FullPayment") {
      if (isFirstSalary) {
        for (let n = 0; n < saleRe.docs[i].data().items.length; n++) {
          cashSale =
            parseInt(cashSale) +
            (parseInt(saleRe.docs[i].data().items[n].downpayment) * 2.5) / 100;
        }
      } else {
        let seeBool1 =
          new Date(saleRe.docs[i].data()?.date.seconds * 1000) >
            new Date(lastSalaryDate.seconds * 1000) &&
          new Date(saleRe.docs[i].data()?.date.seconds * 1000) <= new Date();

        if (seeBool1) {
          for (let n = 0; n < saleRe.docs[i].data().items.length; n++) {
            cashSale =
              parseInt(cashSale) +
              (parseInt(saleRe.docs[i].data().items[n].downpayment) * 2.5) /
                100;
          }
        }
      }
    }
  }

  return cashSale === 0 ? 0 : Math.round((cashSale / 2) * 10) / 10;
}

async function getExcardFunc(root, isFirstSalary, lastSalaryDate) {
  var installmentsRe = await db
    .collection("installment")
    .where("type", "==", root)
    .get();

  var excardAmount = 0;

  for (var i = 0; i < installmentsRe.docs.length; i++) {
    if (isFirstSalary) {
      if (installmentsRe.docs[i].data().isExpired) {
        excardAmount =
          parseInt(excardAmount) +
          (parseInt(installmentsRe.docs[i].data().amount) * 2) / 100;
      }
    } else {
      let seeBool1 =
        new Date(installmentsRe.docs[i].data()?.date.seconds * 1000) >
          new Date(lastSalaryDate.seconds * 1000) &&
        new Date(installmentsRe.docs[i].data()?.date.seconds * 1000) <=
          new Date();

      if (seeBool1) {
        if (installmentsRe.docs[i].data().isExpired) {
          excardAmount =
            parseInt(excardAmount) +
            (parseInt(installmentsRe.docs[i].data().amount) * 2) / 100;
        }
      }
    }
  }

  return excardAmount === 0 ? 0 : Math.round((excardAmount / 2) * 10) / 10;
}

export default function Add_Paysheet_Model({ nic }) {
  const [attendanceModel, setAttendanceModel] = useState(false);
  const [cashSaleModel, setCashSaleModel] = useState(false);
  const [cashTargetModel, setCashTargetModel] = useState(false);
  const [exCardModel, setExCardModel] = useState(false);
  const [saleTargetModel, setSaleTargetModel] = useState(false);
  const [shortageModel, setShortageModel] = useState(false);

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [basicSalary, setBasicSalary] = useState(0);
  const [insentive, setInsentive] = useState(0);
  const [phoneBill, setPhoneBill] = useState(0);
  // eslint-disable-next-line
  const [attendance, setAttendance] = useState(0);
  const [epf, setEPF] = useState(0);
  const [paidSecurityDepo, setPaidSecurityDepo] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [loan, setLoan] = useState(0);
  const [loanBalance, setLoanBalance] = useState(0);
  const [shortage, setShortage] = useState(0);
  const [saleTarget, setSaleTarget] = useState(0);
  const [cashTarget, setCashTarget] = useState(0);
  const [exCard, setExCard] = useState(0);
  const [cashSale, setCashSale] = useState(0);
  // eslint-disable-next-line
  const [root, setRoot] = useState("");
  // eslint-disable-next-line
  const [rootDocId, setRootDocId] = useState("");

  const [attendanceList, setAttendanceList] = useState([]);

  const AttendanceModel = () => {
    setAttendanceModel(true);
  };
  const CashSaleModel = () => {
    setCashSaleModel(true);
  };
  const CashTargetModel = () => {
    setCashTargetModel(true);
  };
  const ExCardModel = () => {
    setExCardModel(true);
  };
  const SaleTargetModel = () => {
    setSaleTargetModel(true);
  };
  const ShortageModel = () => {
    setShortageModel(true);
  };

  useEffect(() => {
    setLoading(true);

    db.collection("root")
      .get()
      .then((reRoot) => {
        reRoot.docs.forEach((eachRoot) => {
          let rootName = eachRoot.data().root;

          if (eachRoot.data().employee1 === nic) {
            getSaleTarget(rootName).then((reSaleTarget) => {
              setSaleTarget(reSaleTarget);
            });

            db.collection("salary")
              .where("nic", "==", nic)
              .get()
              .then((reSalary) => {
                if (reSalary.docs.length > 0) {
                  cashTargetFunc(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reCashTaregt) => {
                    setCashTarget(reCashTaregt);
                  });
                  getCashSaleFunc(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reCashSale) => {
                    setCashSale(reCashSale);
                  });
                  getExcardFunc(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reEx) => {
                    setExCard(reEx);
                  });
                  getShortage(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getInstallmentshort(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getGasshort(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  //================
                  getAllAttendance(
                    nic,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendance(reAtte);
                  });
                  getAllAttendanceForTable(
                    nic,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendanceList(reAtte);
                  });
                } else {
                  cashTargetFunc(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reCashTaregt) => {
                    setCashTarget(reCashTaregt);
                  });
                  getCashSaleFunc(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reCashSale) => {
                    setCashSale(reCashSale);
                  });
                  getExcardFunc(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reEx) => {
                    setExCard(reEx);
                  });
                  getShortage(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getInstallmentshort(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getGasshort(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  //===========
                  getAllAttendance(
                    nic,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendance(reAtte);
                  });
                  getAllAttendanceForTable(
                    nic,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendanceList(reAtte);
                  });
                }
              });
            setRoot(eachRoot?.data().root);
            setRootDocId(eachRoot.id);
          }

          if (eachRoot.data().employee2 === nic) {
            getSaleTarget(rootName).then((reSaleTarget) => {
              setSaleTarget(reSaleTarget);
            });

            db.collection("salary")
              .where("nic", "==", nic)
              .get()
              .then((reSalary) => {
                if (reSalary.docs.length > 0) {
                  cashTargetFunc(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reCashTaregt) => {
                    setCashTarget(reCashTaregt);
                  });
                  getCashSaleFunc(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reCashSale) => {
                    setCashSale(reCashSale);
                  });
                  getExcardFunc(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reEx) => {
                    setExCard(reEx);
                  });
                  getShortage(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getInstallmentshort(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getGasshort(
                    rootName,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  //==============
                  getAllAttendance(
                    nic,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendance(reAtte);
                  });

                  getAllAttendanceForTable(
                    nic,
                    false,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendanceList(reAtte);
                  });
                } else {
                  cashTargetFunc(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reCashTaregt) => {
                    setCashTarget(reCashTaregt);
                  });
                  getCashSaleFunc(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reCashSale) => {
                    setCashSale(reCashSale);
                  });
                  getExcardFunc(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reEx) => {
                    setExCard(reEx);
                  });
                  getShortage(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getInstallmentshort(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  getGasshort(
                    rootName,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reShort) => {
                    setShortage((sho) => sho + parseInt(reShort));
                  });
                  //=============
                  getAllAttendance(
                    nic,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendance(reAtte);
                  });
                  getAllAttendanceForTable(
                    nic,
                    true,
                    reSalary.docs[0]?.data().date
                  ).then((reAtte) => {
                    setAttendanceList(reAtte);
                  });
                }
              });
            setRoot(eachRoot.data().root);
            setRootDocId(eachRoot.id);
          }
        });
      });
    db.collection("employee")
      .where("nic", "==", nic)
      .get()
      .then((reEmp) => {
        setBasicSalary(parseInt(reEmp.docs[0].data().basic));
        setPaidSecurityDepo(parseInt(reEmp.docs[0].data().security_deposit));
        db.collection("loans")
          .where("nic", "==", nic)
          .get()
          .then((reLoan) => {
            if (reLoan.docs.length > 0) {
              if (reLoan.docs[0].data().balance > 0) {
                setLoanBalance(reLoan.docs[0].data().balance);
                setLoan(reLoan.docs[0].data().salary_cut);
              }
            }

            db.collection("salary_advance")
              .where("nic", "==", nic)
              .get()
              .then((salAd) => {
                var unpaidamount = 0;

                salAd.docs.forEach((reEach) => {
                  if (reEach.data().status === "unpaid") {
                    unpaidamount =
                      unpaidamount + parseInt(reEach.data().amount);
                  }
                });
                setAdvance(unpaidamount);
                setLoading(false);
              });
          });
      });
    // eslint-disable-next-line
  }, [nic]);

  return (
    <>
      {/*Start Attendance Model */}

      <Modal
        visible={attendanceModel}
        footer={null}
        className="model_attendce_add"
        onCancel={() => {
          setAttendanceModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <AttendanceHistorys list={attendanceList} />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Attendance Model  */}
      {/*Start CashSale Model */}

      <Modal
        visible={cashSaleModel}
        footer={null}
        className="model_CashSale"
        onCancel={() => {
          setCashSaleModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <CashSaleHistorys />
            </div>
          </div>
        </div>
      </Modal>

      {/* End CashSale Model  */}
      {/*Start CashTarget Model */}

      <Modal
        visible={cashTargetModel}
        footer={null}
        className="model_cashTargetModel_add"
        onCancel={() => {
          setCashTargetModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <CashTargetHistorys />
            </div>
          </div>
        </div>
      </Modal>

      {/* End CashTarget Model  */}
      {/*Start exCard Model */}

      <Modal
        visible={exCardModel}
        footer={null}
        className="model_exCardModel_add"
        onCancel={() => {
          setExCardModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ExcardHistorys />
            </div>
          </div>
        </div>
      </Modal>

      {/* End exCard Model  */}
      {/*Start saleTarget Model */}

      <Modal
        visible={saleTargetModel}
        footer={null}
        className="model_saleTarget_add"
        onCancel={() => {
          setSaleTargetModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <SaleTargetHistorys />
            </div>
          </div>
        </div>
      </Modal>

      {/* End saleTarget Model  */}
      {/*Start shortage Model */}

      <Modal
        visible={shortageModel}
        footer={null}
        className="model_shortage_add"
        onCancel={() => {
          setShortageModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ShortageHistorys />
            </div>
          </div>
        </div>
      </Modal>

      {/* End shortage Model  */}

      <Container component="main" className="conctainefr_main">
        <Typography className="titleffs" variant="h5" gutterBottom>
          Make Salary
        </Typography>
        <Grid item xs={12} sm={12}>
          <hr className="titl_hr" />
        </Grid>
        <div className="paper">
          <form className="form" noValidate>
            <Grid container spacing={2}>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Basic Salary(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="bsly"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Basic Salary"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={basicSalary}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setBasicSalary(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Insentive(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="insn"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Insentive"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={insentive}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setInsentive(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Phone Bill(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="pbill"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label=" Phone Bill"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={phoneBill}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setPhoneBill(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Attendant
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={5}>
                <p>{attendance}</p>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Fab className="icon1Fab" size="small" aria-label="like">
                  <HistoryIcon
                    onClick={(e) => (attendance > 0 ? AttendanceModel() : null)}
                  />
                </Fab>
              </Grid>

              <Grid className="lbl_topi" item xs={12} sm={4}>
                EPF(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="epf"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="EPF"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={epf}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setEPF(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Security Deposit(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="sdp"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Security Deposit"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={securityDeposit}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setSecurityDeposit(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  Paid security deposit amount(LKR) : {paidSecurityDepo}
                </p>
              </Grid>

              <Grid className="lbl_topi" item xs={12} sm={4}>
                Attendance deductions(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="sdp"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Security Deposit"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={deduction}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setDeduction(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Salary Advance(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="adv"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Advance"
                  size="small"
                  disabled={advance === 0}
                  InputProps={{ inputProps: { min: 0 } }}
                  value={advance}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setAdvance(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Loan(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  autoComplete="lon"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Loan"
                  size="small"
                  disabled={loanBalance === 0 ? true : false}
                  InputProps={{ inputProps: { min: 0 } }}
                  value={loan}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      if (loanBalance >= parseInt(e.target.value)) {
                        setLoan(parseInt(e.target.value.trim()));
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  Current loan balance(LKR) : {loanBalance}
                </p>
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Shortage(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="sho"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Shortage"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={shortage}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setShortage(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Fab className="icon1Fab" size="small" aria-label="like">
                  <HistoryIcon onClick={ShortageModel} />
                </Fab>
              </Grid>
              <Grid item xs={12} sm={12}>
                <hr />
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Sale Target(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="sho"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Sale Target"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={saleTarget}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setSaleTarget(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Fab className="icon1Fab" size="small" aria-label="like">
                  <HistoryIcon onClick={SaleTargetModel} />
                </Fab>
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Cash Target(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="trgtCASH"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label=" Cash Target"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={cashTarget}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setCashTarget(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Fab className="icon1Fab" size="small" aria-label="like">
                  <HistoryIcon onClick={CashTargetModel} />
                </Fab>
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                Cash Sale(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="cashsle"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label="Cash Sale"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={cashSale}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setCashSale(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Fab className="icon1Fab" size="small" aria-label="like">
                  <HistoryIcon onClick={CashSaleModel} />
                </Fab>
              </Grid>
              <Grid className="lbl_topi" item xs={12} sm={4}>
                EX Card(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  autoComplete="ex"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  label=" EX Card"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={exCard}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setExCard(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="icon1Fabgrid" item xs={12} sm={2}>
                <Fab className="icon1Fab" size="small" aria-label="like">
                  <HistoryIcon onClick={ExCardModel} />
                </Fab>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}></Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn_update"
                  // onClick={addRepair}
                  disabled={
                    loading ||
                    basicSalary.length === 0 ||
                    insentive.length === 0 ||
                    phoneBill.length === 0
                      ? true
                      : false
                  }
                >
                  {loading ? <Spin /> : "Done"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
