import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
// eslint-disable-next-line
import CurrencyFormat from "react-currency-format";

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
  const showModalUpdateRepair = () => {
    setRepairUpdateModel(true);
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

  const repairTableData = [
    {
      InvoiceNo: "test",
      ModalNo: "test",
      Item_Name: "test",
      NIC: "test",
      Date: "test",
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
    },
  ];

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
              <RepairModel />
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
              <RepairUpdateModel />
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
              <RepairViewModel />
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
