import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import moment from "moment";

import db from "../../../../config/firebase.js";

// components
import RepairModel from "../repairs/repairs_Model/Repair_model";
import RepairUpdateModel from "../repairs/repair_Update_Model/Repair_Update";
import RepairViewModel from "../repairs/repair_view_Model/Repair_View";

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

  const [repairTableData, setRepairTableData] = useState([]);
  const [repairAllData, setRepairAllData] = useState([]);

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
            <span
              style={{
                color: "black",
                backgroundColor: "#e6e600",
                padding: "6px",
                borderRadius: "20px",
                font: "10px",
              }}
            >
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
            </div>
          ),
        });
      });
      setRepairTableData(rawData);
      setRepairAllData(allRawData);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
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
    </>
  );
}
