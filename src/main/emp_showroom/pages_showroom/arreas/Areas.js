import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
// eslint-disable-next-line
import CurrencyFormat from "react-currency-format";
import moment from "moment";

import db from "../../../../config/firebase.js";

// components
import UpdateArreas from "../arreas/arreas_update_Model/Arreas_update";
import ArreasHistory from "../arreas/arreas_history_Model/Arreas_History";

//styles
import "./Arreas.css";

// icons
import HistoryIcon from "@material-ui/icons/History";

export default function Areas() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [arreasUpdate, setArreasUpdate] = useState(false); //  table models
  const [arresHistory, setArresHistory] = useState(false); //  table models
  const [arreasTableData, setArreasTableData] = useState([]);
  const [arreasAllData, setArreasAllData] = useState([]);

  const showModalArreasUpdate = () => {
    setArreasUpdate(true);
  };

  const showModalArresHistory = () => {
    setArresHistory(true);
  };

  //START pay And Go Columns
  const arreasTableColomns = [
    {
      name: "InvoiceNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Delayed_Days",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Delayed_Charges",
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

    {
      name: "Action",

      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            width: "150px",
            margin: "auto",
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  useEffect(() => {
    db.collection("arrears").onSnapshot((onSnap) => {
      var rawData = [];
      var rawAllData = [];
      onSnap.docs.forEach((eachRe) => {
        rawAllData.push({
          id: eachRe.id,
          data: eachRe.data(),
        });
        rawData.push({
          InvoiceNo: eachRe.data().invoice_number,
          Delayed_Days: eachRe.data().delayed_days,
          Delayed_Charges: (
            <CurrencyFormat
              value={eachRe.data().delayed_charges}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />
          ),
          Date: moment(eachRe.data()?.date?.toDate()).format(
            "dddd, MMMM Do YYYY"
          ),
          Action: (
            <div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="btnpay"
                onClick={showModalArreasUpdate}
              >
                Update
              </Button>
              <span className="icon_hist">
                <HistoryIcon onClick={showModalArresHistory} />
              </span>
            </div>
          ),
        });
      });
      setArreasTableData(rawData);
      setArreasAllData(rawAllData);
    });

    setIsLoading(false);
  }, []);

  return (
    <div>
      {/*Start Arreas Model Update */}

      <Modal
        visible={arreasUpdate}
        className="arreas_update_Model"
        footer={null}
        onCancel={() => {
          setArreasUpdate(false);
        }}
      >
        <div className="arreas_Model">
          <div className="arreas_update_Model_Main">
            <div className="arreas_update_Modell_Detail">
              <UpdateArreas />
            </div>
          </div>
        </div>
      </Modal>

      {/*END Arreas Model Update */}

      {/*Start Arreas Model History */}

      <Modal
        visible={arresHistory}
        className="arreas_history_Model"
        footer={null}
        onCancel={() => {
          setArresHistory(false);
        }}
      >
        <div className="arreas_History">
          <div className="arreas_History_Model_Main">
            <div className="arreas_History_Modell_Detail">
              <ArreasHistory />
            </div>
          </div>
        </div>
      </Modal>

      {/*END Arreas Model History */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span_arries">ARRIES LIST</span>}
            className="arreas_Table"
            data={arreasTableData}
            columns={arreasTableColomns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "textfield",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.rowIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    <img
                      alt="Empty data"
                      className="empty_data"
                      src={require("../../../../assets/empty.png")}
                    />
                  ),
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
