import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Managed_History() {
         // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);

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
        {
      name: "Action",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
];


    const TableData = [
    ["2020", "Test Corp", "Yonkers", "12", "S/H",
       "S/H",
         <VisibilityIcon
                    // onClick={showModal}
                />
        
        ],

];
    
    return (
           <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Managed Stock History</span>}
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
