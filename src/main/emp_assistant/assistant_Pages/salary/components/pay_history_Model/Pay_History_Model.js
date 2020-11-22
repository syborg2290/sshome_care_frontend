import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

// styles
import "./Pay_History_Model.css";

// icons
import HistoryIcon from "@material-ui/icons/History";

export default function Pay_History_Model() {
  // eslint-disable-next-line
  const [payHistoryTabModel, setpayHistoryTabModel] = useState(false); // table model

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();

  const PayHistoryTabModels = () => {
    setpayHistoryTabModel(true);
    history.push("/assistant/salary/history_reports");
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
      name: "Basic Salary",
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
      name: "Phone Bill",
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
      name: " Attendance_Deductions",
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

  const tableData = [
    [
      "2020/03/01",
      <CurrencyFormat
              value={25000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={200}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={2000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      "29",
      <CurrencyFormat
              value={280}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={5000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={50}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={3000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={2500}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={120}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={50000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={25000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={25000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <CurrencyFormat
              value={25000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
      <div>
        <HistoryIcon className="btnView" onClick={PayHistoryTabModels} />
      </div>,
    ],
  ];

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Salary History</span>}
          className="salary_histable"
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
  );
}
