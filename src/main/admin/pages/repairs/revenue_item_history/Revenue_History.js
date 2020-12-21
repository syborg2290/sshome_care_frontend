import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Modal } from "antd";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

export default function Revenue_History() {
       // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);
  const [allTtemData, setAllItemData] = useState([]);

  let history = useHistory();

    useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
          
    // eslint-disable-next-line
}, []);
  

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
      name: "NIC",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
     },
     {
      name: "Old_Serial",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
     },
      {
      name: "New_Serial",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
   },
];

const TableData = [
    ["Date", "Nic", "Old Serial", "New Serial"],
    ["Date", "Nic", "Old Serial", "New Serial" ],

];

    return (
       
        <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Revenue History</span>}
          className="selling_histable"
          sty
          data={TableData}
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
    )
}
