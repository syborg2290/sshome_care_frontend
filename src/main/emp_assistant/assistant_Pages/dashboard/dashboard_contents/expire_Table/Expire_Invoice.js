import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { Button, Grid } from "@material-ui/core";

// import db from "../../../../../../config/firebase.js";

// components
import UpdateInstallment from "../../../invoice_History/components/PayAndGoModel/UpdateModel/Update_Model";
import InstallmentHistory from "../../../invoice_History/components/PayAndGoModel/HistoryModel/History_Model";
import InstallmentView from "../../../invoice_History/components/PayAndGoModel/ViewModel/View_Model";

// styles
import "./Expire_Invoice.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function Expire_invoice({ expire_list }) {
  const [currentIndx, setCurrentIndx] = useState(0);
  const [payangoTableData, setpayangoTableData] = useState([]);
  const [payangoAllData, setpayangoAllData] = useState([]);
  const [installmentUpdate, setInstallmentUpdate] = useState(false); //  table models
  const [installmentvisible, setInstallmentVisible] = useState(false); //  table models
  const [installmentHistory, setInstallmentHistory] = useState(false); //  table models

  const showModalUpdate = () => {
    setInstallmentUpdate(true);
  };

  const closeModalUpdate = () => {
    setInstallmentUpdate(false);
  };

  const showModalHistory = () => {
    setInstallmentHistory(true);
  };

  const showInstallmentView = () => {
    setInstallmentVisible(true);
  };

  //START pay And Go EX Columns
  const payAndGoColumns = [
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
      name: "Type",
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
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Balance",
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
      name: "MID",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
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
  //END pay And Go EX Columns

  //START pay And Go Rows

  useEffect(() => {
    var rawData = [];
    var rawAllData = [];
    expire_list.forEach((each) => {
      rawAllData.push({
        id: each.id,
        data: each.data,
      });

      rawData.push({
        InvoiceNo: each.data.invoice_number,
        Type: each.data.selectedType,
        Date: moment(each.data.date?.toDate()).format("dddd, MMMM Do YYYY"),
        Balance: (
          <CurrencyFormat
            value={each.data.balance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={" "}
          />
        ),
        NIC: each.data.nic,
        MID: each.data.mid,
        Action: (
          <div>
            {
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="btn_pay"
                onClick={showModalUpdate}
                style={{
                  color: "white",
                  backgroundColor: "#ff8c00",
                }}
              >
                Update
              </Button>
            }
            <span className="icon_visibl">
              <HistoryIcon onClick={showModalHistory} />
            </span>
            <span className="icon_Edit">
              <VisibilityIcon onClick={showInstallmentView} />
            </span>
          </div>
        ),
      });
    });
    setpayangoAllData(rawAllData);
    setpayangoTableData(rawData);
  }, [expire_list]);
  //End pay And Go Rows

  return (
    <>
      {/*Start Installment Model Update */}

      <Modal
        visible={installmentUpdate}
        className="update_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentUpdate(false);
        }}
      >
        <div className="update_Installment_Model">
          <div className="update_Installment_Model_Main">
            <div className="update_Installment_Model_Detail">
              <UpdateInstallment
                key={payangoAllData[currentIndx]?.id}
                invoice_no={payangoAllData[currentIndx]?.data?.invoice_number}
                instAmountProp={
                  payangoAllData[currentIndx]?.data?.amountPerInstallment
                }
                instCount={payangoAllData[currentIndx]?.data?.noOfInstallment}
                customer_id={payangoAllData[currentIndx]?.data?.customer_id}
                closeModal={closeModalUpdate}
                isEx={true}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model Update */}

      {/*Start Installment Model History */}
      <Modal
        visible={installmentHistory}
        className="history_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentHistory(false);
        }}
      >
        <div className="Installment_Model">
          <div className="Installment_Model_Main">
            <div className="Installment_Model_Detail">
              <InstallmentHistory
                key={payangoAllData[currentIndx]?.id}
                invoice_no={payangoAllData[currentIndx]?.data?.invoice_number}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model History */}
      {/*Start Installment Model View */}
      <Modal
        visible={installmentvisible}
        className="view_Installment_Model"
        footer={null}
        onCancel={() => {
          setInstallmentVisible(false);
        }}
      >
        <div className="Installment_Model">
          <div className="Installment_Model_Main">
            <div className="Installment_Model_Detail">
              <InstallmentView
                key={payangoAllData[currentIndx]?.id}
                data={payangoAllData[currentIndx]?.data}
                items_list_props={payangoAllData[currentIndx]?.data?.items}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/*End Installment Model View */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span_blackList">Expired Cards</span>}
            className="payAndgo_table"
            data={payangoTableData}
            columns={payAndGoColumns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
