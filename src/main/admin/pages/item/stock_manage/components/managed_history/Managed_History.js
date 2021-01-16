import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

import db from "../../../../../../../config/firebase.js";

export default function Managed_History() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState([]);

  let history = useHistory();

  const columns = [
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
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Qty",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "From",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "To",
      options: {
        filter: true,
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

    db.collection("managed_stock_history")
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        var itemDataTable = [];
        var itemDataAll = [];

        snapshot.docs.forEach((element) => {
          itemDataAll.push({
            id: element.id,
            data: element.data().item,
            serialNo: element.data().serialNo,
            modelNo: element.data().modelNo,
          });

          itemDataTable.push([
            new Date(element.data().date.seconds * 1000).toDateString(),
            element.data().item.itemName,
            element.data().item.brand,
            element.data().qty,
            element.data().from,
            element.data().to,
          ]);
        });

        setTableData(itemDataTable);
        setAllData(itemDataAll);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Managed Stock History</span>}
            className="selling_histable"
            sty
            data={tableData}
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
