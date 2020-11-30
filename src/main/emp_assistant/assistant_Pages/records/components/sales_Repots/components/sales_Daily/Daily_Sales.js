// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Spin } from "antd";
import { Modal } from "antd";

// styles
import "./Daily_Sales.css";

import db from "../../../../../../../../config/firebase.js";

//components
import ViewDailySales from "./components/View_Daily_Sales";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

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
        type: reduceDup[indexFor].type,
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

async function sumEachSameDaySales(allSales) {
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
          parseInt(reduceDup[indexFor].total) + parseInt(allSales[i].total),
        type: reduceDup[indexFor].type,
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

async function dateEachSameDaySales(allSales, date) {
  var reduceDup = [];

  for (let i = 0; i < allSales.length; i++) {
    if (
      new Date(date).getFullYear() ===
        new Date(allSales[i].date).getFullYear() &&
      new Date(date).getMonth() === new Date(allSales[i].date).getMonth() &&
      new Date(date).getDate() === new Date(allSales[i].date).getDate()
    ) {
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
  const [viewVarModel, setViewModel] = useState(false); // View model
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState(null);

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
    {
      name: "Action",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    db.collection("invoice")
      .orderBy("date", "asc")
      .get()
      .then((custIn) => {
        var sales = [];
        var tableDataRE = [];

        for (let i = 0; i < custIn.docs.length; i++) {
          for (let j = 0; j < custIn.docs[i].data().items.length; j++) {
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

        sumSameDaySales(sales).then((reSumWith) => {
          let totalBalance = 0;

          for (let n = 0; n < reSumWith.length; n++) {
            totalBalance = totalBalance + parseInt(reSumWith[n].total);

            tableDataRE.push({
              Date: new Date(reSumWith[n].date).toDateString(),
              Total: (
                <CurrencyFormat
                  value={reSumWith[n].total}
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
              Action: (
                <div>
                  <VisibilityIcon
                    className="btnEdit"
                    onClick={(e) =>
                      viewModel(new Date(reSumWith[n].date), sales)
                    }
                  />
                </div>
              ),
            });
          }

          setTableData(tableDataRE);
        });
        setIsLoading(false);
      });
  }, []);

  const viewModel = async (date, sales) => {
    sumEachSameDaySales(sales).then((reAllTypesSale) => {
      dateEachSameDaySales(reAllTypesSale, date).then((reList) => {
        setList(reList);
        setViewModel(true);
      });
    });
  };

  return (
    <>
      {/*Start View Model */}

      <Modal
        visible={viewVarModel}
        footer={null}
        className="model_viw"
        onCancel={() => {
          setViewModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ViewDailySales
                // key={new Date(allSalesType[currentIndx]?.date).getTime()}
                list={list}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End View Model  */}

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
              sort: false,
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
    </>
  );
}
