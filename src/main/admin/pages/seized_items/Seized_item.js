import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import { useHistory } from "react-router-dom";

import db from "../../../../config/firebase.js";

// icons
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import AddIcon from '@material-ui/icons/Add';

// components
import SeizedAddModel from "../seized_items/seized_Model/addNew_Model/Add_Model";

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
      name: "Serial_No",
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
      name: "Brand",
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
      name: "Color",
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
      name: "Price",
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
            Serial_No: RESnap.data()?.serialNo,
            Model_No: RESnap.data()?.modelNo,
            Item_Name: RESnap.data()?.itemName,
            Brand: RESnap.data()?.brand,
            Color: RESnap.data()?.color,
            Price: RESnap.data()?.price,
            Action:<div>
                <span className="icon_visibl">
                <AddShoppingCartRoundedIcon onClick={()=>sellItem(RESnap.id)} />
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
  
  const sellItem= (id) => {
    db.collection("seized").doc(id).delete().then((_) => {
       window.location.reload()
    });
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
