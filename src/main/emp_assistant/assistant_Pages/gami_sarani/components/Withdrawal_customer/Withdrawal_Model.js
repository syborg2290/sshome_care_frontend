import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import MUIDataTable from "mui-datatables";
import moment from "moment";

// style
import "./Withdrawal_Model.css";

import db from "../../../../../../config/firebase.js";

export default function Withdrawal_Model({ mid }) {
  const [allTableData, setTableData] = useState([]);
  const columns = [
    {
      name: "MID",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "NIC",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Date",
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
      name: "Withdrawal_Amount",
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
      name: "Current_Balance",
      options: {
        filter: false,
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
  // useEffect(() => {
  //   db.collection("gami_sarani_withdrawal")
  //     .where("mid", "==", mid)
  //     .onSnapshot((re) => {
  //       var raw = [];
  //       re.docs.forEach((each) => {
  //         raw.push({
  //           MID: mid,
  //          NIC: nic,
  //           Date: moment(each.data()?.date?.toDate()).format(
  //             "dddd, MMMM Do YYYY"
  //           ),
  //           Withdrawal_Amount: (
  //             <div className="cBalance">
  //               {" "}
  //               <CurrencyFormat
  //                 value={each.data()?.deposit_amount}
  //                 displayType={"text"}
  //                 thousandSeparator={true}
  //                 prefix={" "}
  //               />
  //             </div>
  //           ),
  //           Current_Balance: (
  //             <div className="cBalance">
  //               {" "}
  //               <CurrencyFormat
  //                 value={each.data()?.current_Balance}
  //                 displayType={"text"}
  //                 thousandSeparator={true}
  //                 prefix={" "}
  //               />
  //             </div>
  //           ),
  //         });
  //       });
  //       setTableData(raw);
  //     });
  // }, [mid]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Withdrawals</span>}
          className="customer_Withdrawals_table"
          sty
          data={allTableData}
          columns={columns}
          options={{
            selectableRows: false,
            customToolbarSelect: () => {},
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
