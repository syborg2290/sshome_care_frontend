import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import CurrencyFormat from "react-currency-format";
import { Modal } from "antd";

// components
import ExpencesModel from "./components/Other_Expences_Model";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

// styles
import "./Other_Expences.css";

import db from "../../../../../../../../config/firebase.js";

export default function Other_Expences() {
  const [expencesViewModel, setExpencesViewModel] = useState(false); // table model

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const ExpencesView = () => {
    setExpencesViewModel(true);
  };

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
      name: "Discription",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Rent",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Salary",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Advance",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Temporary",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Salary_Installments",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Stationary",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "MR_sampath",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "MRS_Monika",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Sithu",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Shorts",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "BOC_Bank",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Union_Bank",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Banking_Installments",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Pay_for_workers",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Loans",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Reload_cards",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Other",
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
    db.collection("expences")
      .get()
      .then((reEx) => {
        var raw = [];
        var rawAll = [];
        reEx.docs.forEach((each) => {
          rawAll.push({
            id: each.id,
            data: each.data(),
          });
          raw.push({
            Date: new Date(each.data().date).toDateString(),
            Discription: each.data().mainDescription,
            Rent: (
              <CurrencyFormat
                value={each.data().rentVehi.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Salary: (
              <CurrencyFormat
                value={each.data().totalSalary}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Advance: (
              <CurrencyFormat
                value={each.data().totalAdvance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Temporary: (
              <CurrencyFormat
                value={each.data().totalTemp}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Salary_Installments: (
              <CurrencyFormat
                value={each.data().salaryDeductables.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Stationary: (
              <CurrencyFormat
                value={each.data().stationary.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            MR_sampath: (
              <CurrencyFormat
                value={each.data().totalSampath}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            MRS_Monika: (
              <CurrencyFormat
                value={each.data().totalMonika}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Sithu: (
              <CurrencyFormat
                value={each.data().totalSithu}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Shorts: (
              <CurrencyFormat
                value={each.data().shorts.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            BOC_Bank: (
              <CurrencyFormat
                value={each.data().boc_bank.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Union_Bank: (
              <CurrencyFormat
                value={each.data().unionBank.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Banking_Installments: (
              <CurrencyFormat
                value={each.data().bankingInstall.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Pay_for_workers: (
              <CurrencyFormat
                value={each.data().pay_for_workers.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Loan: (
              <CurrencyFormat
                value={each.data().loans_for.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Reload_cards: (
              <CurrencyFormat
                value={each.data().cards_reload.cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Other: (
              <CurrencyFormat
                value={each.data().totalOthers}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Action: (
              <VisibilityIcon className="btnEdit" onClick={ExpencesView} />
            ),
          });
        });
        setTableData(raw);
        setallData(rawAll);
      });
  }, []);

  return (
    <>
      {/*Start view Model */}

      <Modal
        visible={expencesViewModel}
        footer={null}
        className="expences_viewmdl"
        onCancel={() => {
          setExpencesViewModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ExpencesModel
                key={allData[currentIndx]?.id}
                data={allData[currentIndx]?.data}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End view Model  */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Expences</span>}
            className="salary_table"
            sty
            data={tableData}
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
    </>
  );
}
