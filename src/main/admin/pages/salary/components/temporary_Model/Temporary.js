import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { Modal } from "antd";

import MakeTemp from "./components/make_temporary_Model/Temporary_Make";

import AvTimerIcon from "@material-ui/icons/AvTimer";

// styles
import "./Temporary.css";

import db from "../../../../../../config/firebase.js";

export default function Temporary_History() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  const [makeTemp, setMakeTemp] = useState(false);
  let history = useHistory();

  const openMakeTemp = () => {
    setMakeTemp(true);
  };

  const columns = [
    {
      name: "Date",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Amount",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Reason",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("temporary")
      .get()
      .then((reTemp) => {
        var rawData = [];
        reTemp.docs.forEach((reT) => {
          rawData.push({
            Date: moment(reT.data()?.date?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Amount: (
              <CurrencyFormat
                value={reT.data()?.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Reason: reT.data()?.reason,
          });
        });
        setallData(rawData);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal
        visible={makeTemp}
        footer={null}
        className="model_paysheet_add"
        onCancel={() => {
          setMakeTemp(false);
        }}
      >
        <div>
          <div>
            <div>
              <MakeTemp />
            </div>
          </div>
        </div>
      </Modal>
      <Grid container spacing={4}>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            className="btn_tempary"
            endIcon={<AvTimerIcon />}
            onClick={openMakeTemp}
          >
            Make Temporary
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <MUIDataTable
            title={<span className="title_Span">Temporary History</span>}
            className="temporary_istable"
            sty
            data={allData}
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
