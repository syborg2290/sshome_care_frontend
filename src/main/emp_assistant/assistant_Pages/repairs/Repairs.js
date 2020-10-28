import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import moment from "moment";

import db from "../../../../config/firebase.js";

import { useHistory } from "react-router-dom";

// icons
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";

// components
import RepairModel from "./repairs_Model/Repair_model";
import RepairUpdateModel from "./repair_Update_Model/Repair_Update";
import RepairViewModel from "./repair_view_Model/Repair_View";

// styles
import "./Repairs.css";

//icons
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Repairs() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const [repairModel, setrepairModel] = useState(false); //  table models
  const [repairUpdateModel, setRepairUpdateModel] = useState(false); //  table models
  const [repairViewModel, setRepairViewModel] = useState(false); //  table models
  const [visibleConfirmPrint, setVisibleConfirmPrint] = useState(false);
  const [repairTableData, setRepairTableData] = useState([]);
  const [repairAllData, setRepairAllData] = useState([]);

  let history = useHistory();

  const showVisibleConfirmPrintModal = () => {
    setVisibleConfirmPrint(true);
  };

  const repairRecieptPrint = () => {
    db.collection("repair")
      .doc(repairAllData[currentIndx].id)
      .get()
      .then((reRepair) => {
        var passingWithCustomerObj = {
          invoice_no: reRepair.data().invoice_no,
          model_no: reRepair.data().model_no,
          nic: reRepair.data().nic,
          item_name: reRepair.data().item_name,
        };
        let moveWith = {
          pathname: "/assistant/repair/repairRecipt",
          search: "?query=abc",
          state: { detail: passingWithCustomerObj },
        };
        history.push(moveWith);
      });
  };

  const showModalRepair = () => {
    setrepairModel(true);
  };

  const cancelModalRepair = () => {
    setrepairModel(false);
  };

  const showModalUpdateRepair = () => {
    setRepairUpdateModel(true);
  };

  const cancelModalUpdateRepair = () => {
    setRepairUpdateModel(false);
  };

  const showModalViewRepair = () => {
    setRepairViewModel(true);
  };

  //START pay And Go Columns
  const repairTableColomns = [
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
      name: "ModalNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Item_Name",
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
      name: "STATUS",
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
            width: "190px",
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
    db.collection("repair").onSnapshot((snap) => {
      var rawData = [];
      var allRawData = [];
      snap.docs.forEach((re) => {
        allRawData.push({
          id: re.id,
          data: re.data(),
        });
        rawData.push({
          InvoiceNo: re.data().invoice_no,
          ModalNo: re.data().model_no,
          Item_Name: re.data().item_name,
          NIC: re.data().nic,
          STATUS: (
            <span className="statusRepir">
              {re.data().status === "accepted"
                ? "Accepted"
                : re.data().status === "return_to_company"
                ? "Returned"
                : re.data().status === "return_from_company"
                ? "Issued from company"
                : "Delivered"}
            </span>
          ),
          Date: moment(re.data()?.date?.toDate()).format("dddd, MMMM Do YYYY"),
          Action: (
            <div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="btnupdate"
                onClick={showModalUpdateRepair}
              >
                Update
              </Button>
              <span>
                <VisibilityIcon
                  onClick={showModalViewRepair}
                  className="icon_views"
                />
              </span>
              <span>
                <PrintRoundedIcon
                  className="icon_print"
                  onClick={showVisibleConfirmPrintModal}
                />
              </span>
            </div>
          ),
        });
      });
      setRepairTableData(rawData);
      setRepairAllData(allRawData);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal
        className="confo_model"
        closable={null}
        visible={visibleConfirmPrint}
        cancelText="No"
        okText="Yes"
        bodyStyle={{ borderRadius: "30px" }}
        onOk={repairRecieptPrint}
        onCancel={() => {
          setVisibleConfirmPrint(false);
        }}
      >
        <div className="confoModel_body">
          <PrintRoundedIcon className="confo_Icon" />
          <h3 className="txtConfoModel_body">
            Do you want to print an reciept?{" "}
          </h3>
        </div>
      </Modal>
      {/*Start add repairs Model  */}
      <Modal
        visible={repairModel}
        className="Item_repairt_Model"
        footer={null}
        onCancel={() => {
          setrepairModel(false);
        }}
      >
        <div className="Repairt_Model">
          <div className="Repairt_Model_Main">
            <div className="Repairt_Model_Detail">
              <RepairModel closeModel={cancelModalRepair} />
            </div>
          </div>
        </div>
      </Modal>
      {/*END add repairs Model */}

      {/*Start UPDATE repairs Model  */}
      <Modal
        visible={repairUpdateModel}
        className="Item_repairt_update_Model"
        footer={null}
        onCancel={() => {
          setRepairUpdateModel(false);
        }}
      >
        <div className="Repairt_Model_update">
          <div className="Repairt_Model_Main_update">
            <div className="Repairt_Model_Detail_update">
              <RepairUpdateModel
                key={repairAllData[currentIndx]?.id}
                invoice_number={repairAllData[currentIndx]?.data?.invoice_no}
                statusProp={repairAllData[currentIndx]?.data?.status}
                docId={repairAllData[currentIndx]?.id}
                closeModel={cancelModalUpdateRepair}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/*END UPDATE repairs Model */}

      {/*Start VIEW repairs Model  */}
      <Modal
        visible={repairViewModel}
        className="Item_repairt_update_Model"
        footer={null}
        onCancel={() => {
          setRepairViewModel(false);
        }}
      >
        <div className="Repairt_Model_update">
          <div className="Repairt_Model_Main_update">
            <div className="Repairt_Model_Detail_update">
              <RepairViewModel
                key={repairAllData[currentIndx]?.id}
                description={repairAllData[currentIndx]?.data?.description}
                invoice_number={repairAllData[currentIndx]?.data?.invoice_no}
                cust_Name={repairAllData[currentIndx]?.data?.cust_name}
                mobile_1={repairAllData[currentIndx]?.data?.mobil_no1}
                mobile_2={repairAllData[currentIndx]?.data?.mobil_no2}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/*END VIEW repairs Model */}

      <Button
        variant="contained"
        color="primary"
        className="btn_AddnewRepair"
        endIcon={<AddIcon />}
        onClick={showModalRepair}
      >
        Add New
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span_repairs">ITEM REPAIRS</span>}
            className="repair_Table"
            data={repairTableData}
            columns={repairTableColomns}
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
                setCurrentIndx(rowMeta.dataIndex);
              },
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