import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";

import db from "../../../../config/firebase.js";


// styles
import "./Seized_item.css";

export default function Seized_item() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);


  let history = useHistory();

  
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
           
          });
        });
        setSeizedTableData(rowData);
        setSeizedAllData(rowAllData);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);
  
  
  return (
    <>
     
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
