import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import { useHistory } from "react-router-dom";

import db from "../../../../config/firebase.js";

// icons
import AddIcon from "@material-ui/icons/Add";

// components
import SeizedAddModel from "../seized_items/seized_Model/addNew_Model/Add_Model";
import SellModel from "../seized_items/seized_Model/sellModel/SellModel";

// styles
import "./Seized_item.css";

export default function Seized_item() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const [seizedAddModel, setSeizedAddModel] = useState(false); //  table models

  let history = useHistory();

  const showModalAdd = () => {
    setSeizedAddModel(true);
  };

  const cancelModalAdd = () => {
    setSeizedAddModel(false);
  };

  //START pay And Go Columns
  const seizedTableColomns = [
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
      name: "Type",
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
      name: "To_Sell",
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

  const [seizedTableData, setSeizedTableData] = useState([]);
  // eslint-disable-next-line
  const [seizedAllData, setSeizedAllData] = useState([]);
  const [openAddToSell,setOpenAddToSell] =useState(false);

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

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
            // InvoiceNo: RESnap.data()?.invoice_number,
            Serial_number: RESnap.data()?.serialNo,
            Type: RESnap.data()?.type,
            Model_No: RESnap.data()?.model_no,
            Item_Name: RESnap.data()?.item_name,
            MID: RESnap.data()?.mid,
            NIC: RESnap.data()?.nic,
            Sized_date: RESnap.data()?.date,
            To_Sell:<div>
                <span className="icon_visibl">
                  <AddIcon onClick={toSell} />
                </span>
              </div>
          });
        });
        setSeizedTableData(rowData);
        setSeizedAllData(rowAllData);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);
  
  const toSell = () => {
    setOpenAddToSell(true);
  }

  return (
    <>
      {/*Start Seized Details models */}

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
      
      
      {/*Start Seized Details models */}

      {/*END customer Details models */}

      {/*Start Add Seized Model  */}
      <Modal
        visible={openAddToSell}
        className="seized_Add_Model"
        footer={null}
        onCancel={() => {
          setOpenAddToSell(false);
        }}
      >
        <div className="seized_Model">
          <div className="seized_Add_Model_Main">
            <div className="seized_Add_Model_Detail">
              <SellModel
                key={seizedAllData[currentIndx]?.id}
                invoice_no={seizedAllData[currentIndx]?.data.invoice_number}
                model_no={seizedAllData[currentIndx]?.data.model_no}
                serialNo={seizedAllData[currentIndx]?.data.serialNo}
              />
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
              // selectableRows: false,
              selectableRows: "none",
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
