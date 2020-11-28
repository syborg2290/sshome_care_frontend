 // eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
    // eslint-disable-next-line
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

// styles
import "./Other_Expences.css";

export default function Other_Expences() {
    // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  // eslint-disable-next-line
    const [allData, setallData] = useState([]);
    
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
      name: "Short",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
      },
     {
      name: "BOC Bank",
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
      name: "Banking_Install",
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
      name: "Loan",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
      },
               {
      name: "Reload",
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

  ];
    // eslint-disable-next-line
    const tableData = [
      ["Joe James", "Yonkers",
                     <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        , <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        , <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        , <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        , <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        , <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={65000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        , <CurrencyFormat
                        value={2000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        , <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={5000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ,  <CurrencyFormat
                        value={15000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                      />
        ],

];

    return (

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
    )
}
