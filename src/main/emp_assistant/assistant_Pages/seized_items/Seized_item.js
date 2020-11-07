import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";

import db from "../../../../config/firebase.js";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";

// components
import SeizedViewModel from "../seized_items/seized_Model/view_Model/View_Model";
import SeizedAddModel from "../seized_items/seized_Model/addNew_Model/Add_Model";

// styles
import "./Seized_item.css";

export default function Seized_item() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const [seizedViewModel, setSeizedViewModel] = useState(false); //  table models
  const [seizedAddModel, setSeizedAddModel] = useState(false); //  table models

  const showModalView = () => {
    setSeizedViewModel(true);
  };

  const showModalAdd = () => {
    setSeizedAddModel(true);
  };

  const cancelModalAdd = () => {
    setSeizedAddModel(false);
  };

  //START pay And Go Columns
  const seizedTableColomns = [
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
      name: "Serial_number",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Model_No",
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
      name: "MID",
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
      name: "NIC",
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
      name: "Sized_date",
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

  const [seizedTableData, setSeizedTableData] = useState([]);
  const [seizedAllData, setSeizedAllData] = useState([]);

  useEffect(() => {
    var rowData = [];
    var rowAllData = [];
    db.collection("seized")
      .get()
      .then((snap) => {
        snap.docs.forEach((RESnap) => {
          rowAllData.push({
            id: RESnap.id,
            data: RESnap?.data(),
          });

          rowData.push({
            InvoiceNo: RESnap.data()?.invoice_number,
            SerialNo: RESnap.data()?.serialNo,
            Model_No: RESnap.data()?.model_no,
            Item_Name: RESnap.data()?.item_name,
            MID: RESnap.data()?.mid,
            NIC: RESnap.data()?.nic,
            Sized_date: RESnap.data()?.date,
            Action: (
              <div>
                <VisibilityIcon onClick={showModalView} />
              </div>
            ),
          });
        });
        setSeizedTableData(rowData);
        setSeizedAllData(rowAllData);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {/*Start Seized Details models */}

      <Modal
        visible={seizedViewModel}
        className="customer_Model"
        footer={null}
        onCancel={() => {
          setSeizedViewModel(false);
        }}
      >
        <div className="customer_Model">
          <div className="customer_Model_Main">
            <div className="customer_Modell_Detail">
              <SeizedViewModel
                key={seizedAllData[currentIndx]?.id}
                invoice_num={seizedAllData[currentIndx]?.data?.invoice_number}
                nic={seizedAllData[currentIndx]?.data?.nic}
                seized_date={seizedAllData[currentIndx]?.data?.date}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/*END customer Details models */}

      {/*Start Add Seized Model  */}
      <Modal
        visible={seizedAddModel}
        className="seized_Add_Model"
        footer={null}
        onCancel={() => {
          setSeizedAddModel(false);
        }}
      >
        <div className="seized_Model">
          <div className="seized_Add_Model_Main">
            <div className="seized_Add_Model_Detail">
              <SeizedAddModel closeModel={cancelModalAdd} />
            </div>
          </div>
        </div>
      </Modal>

      {/*END Add repairs Model */}

      <Button
        variant="contained"
        color="primary"
        className="btn_AddnewSeized"
        endIcon={<AddIcon />}
        onClick={showModalAdd}
      >
        Add New
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span_seized">SEIZED ITEMS</span>}
            className="seized_Table"
            data={seizedTableData}
            columns={seizedTableColomns}
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
