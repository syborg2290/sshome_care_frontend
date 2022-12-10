import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

// styles
import "./Pay_History_Model.css";

// icons
import HistoryIcon from "@material-ui/icons/History";

import db from "../../../../../../config/firebase.js";

export default function Pay_History_Model() {
  // eslint-disable-next-line
  const [payHistoryTabModel, setpayHistoryTabModel] = useState(false); // table model

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);
  const [allTableData, setallTableData] = useState([]);
  let history = useHistory();
  const location = useLocation();

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
      name: "Basic_Salary",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Insentive",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Phone_Bills",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Attendant",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "EPF",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Security_Deposit",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Attendance_Deductions",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Purchased_Goods",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Salary_Advance",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Loan",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Shortage",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Sale_Target",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Cash_Target",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Cash_Sale",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Ex_Card",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Arreas_Target",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Net_Salary",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },

    {
      name: "Action",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    if (location?.state?.detail !== undefined) {
      db.collection("salary")
        .where("nic", "==", location?.state?.detail)
        .orderBy("date", "desc")
        .get()
        .then((reSal) => {
          let rawAllData = [];
          let rawNormdata = [];
          reSal.docs.forEach((saDoc) => {
            rawNormdata.push({
              id: saDoc.id,
              data: saDoc.data(),
            });

            rawAllData.push({
              Date: moment(saDoc.data()?.date?.toDate()).format(
                "dddd, MMMM Do YYYY"
              ),
              Basic_Salary: (
                <CurrencyFormat
                  value={saDoc.data()?.basicSalary}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Insentive: (
                <CurrencyFormat
                  value={saDoc.data()?.insentive}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Phone_Bills: (
                <CurrencyFormat
                  value={saDoc.data()?.phoneBill}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Attendant: saDoc.data()?.attendance,
              EPF: (
                <CurrencyFormat
                  value={saDoc.data()?.epf}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Security_Deposit: (
                <CurrencyFormat
                  value={saDoc.data()?.securityDeposit}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Attendance_Deductions: (
                <CurrencyFormat
                  value={saDoc.data()?.deduction}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Purchased_Goods: (
                <CurrencyFormat
                  value={saDoc.data()?.goodsValue}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),

              Salary_Advance: (
                <CurrencyFormat
                  value={saDoc.data()?.advance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Loan: (
                <CurrencyFormat
                  value={saDoc.data()?.loan}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Shortage: (
                <CurrencyFormat
                  value={saDoc.data()?.shortage}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Sale_Target: (
                <CurrencyFormat
                  value={saDoc.data()?.saleTarget}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Cash_Target: (
                <CurrencyFormat
                  value={saDoc.data()?.cashTarget}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Cash_Sale: (
                <CurrencyFormat
                  value={saDoc.data()?.cashSale}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Ex_Card: (
                <CurrencyFormat
                  value={saDoc.data()?.exCard}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Arreas_Target: (
                <CurrencyFormat
                  value={saDoc.data()?.arresTarget}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Net_Salary: (
                <CurrencyFormat
                  value={Math.round(saDoc.data()?.net_Salery)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              ),
              Action: (
                <div>
                  <HistoryIcon
                    className="btnView"
                    onClick={(e) => PayHistoryTabModels(saDoc.data())}
                  />
                </div>
              ),
            });
          });
          setAllData(rawNormdata);
          setallTableData(rawAllData);
        });
    }

    // eslint-disable-next-line
  }, []);

  const PayHistoryTabModels = (allDataParam) => {
    if (location?.state?.detail !== undefined) {
      setpayHistoryTabModel(true);

      var passingObj = {
        attendanceList: JSON.parse(allDataParam.attendanceList),
        shortageList: JSON.parse(allDataParam.shortageList),
        saleTargetList: JSON.parse(allDataParam.saleTargetList),
        cashTargetList: JSON.parse(allDataParam.cashTargetList),
        cashSaleList: JSON.parse(allDataParam.cashSaleList),
        excardsList: JSON.parse(allDataParam.excardsList),
        shortage: allDataParam.shortage,
        saleTarget: allDataParam.saleTarget,
        cashTarget: allDataParam.cashTarget,
        exCard: allDataParam.exCard,
        cashSale: allDataParam.cashSale,
      };

      let moveWith = {
        pathname: "/assistant/salary/history_reports",
        search: "?query=abc",
        state: { detail: passingObj },
      };

      history.push(moveWith);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Salary History</span>}
          className="salary_histable"
          sty
          data={allTableData}
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
  );
}
