import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";

// styles
import "./Sale_Target_Table.css";

export default function Sale_Target_Table({ list }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);

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
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Serial_Number",
      options: {
        filter: false,
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
      name: "Total",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    if (list !== undefined) {
      var rawData = [];
      list.forEach((reEa) => {
        rawData.push({
          Date: moment(new Date(reEa.date.seconds * 1000)).format(
            "dddd, MMMM Do YYYY"
          ),
          Item_Name: reEa.item_name,
          Serial_Number: reEa.serail_number,
          Qty: reEa.qty,
          Total: reEa.total,
        });
      });
      setallData(rawData);
    }
  }, [list]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Sale Target History</span>}
            className="sale_Tarhistable"
            sty
            data={allData}
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
