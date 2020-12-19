import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Modal } from "antd";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";



// components
import ViewHistory from "./components/View_History";

// styles
import "./Purchased_History.css";

import db from "../../../../../../config/firebase.js";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Purchased_History() {
     // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);
  const [allTtemData, setAllItemData] = useState([]);
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
// eslint-disable-next-line
  const [itemListSeMo, setItemListSeMo] = useState([]);
// eslint-disable-next-line
  const [itemListSeMoCon, setItemListSeMoCon] = useState([]);

  let history = useHistory();

   const showModal = () => {
    setVisible(true);
  };


  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);
  
  // Columns
  const columns = [
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
      name: "First_Name",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
      },
  {
      name: "Last_Name",
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
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
         
            // maxWidth: "800px",
          },
        }),
      },
    },
  ];
  // Columns

const TableData = [
    ["2020", "Test Corp", "Yonkers", "12", "S/H",
       
     <VisibilityIcon
                    onClick={showModal}
                />
  ],

];

    
    return (

<>

  <Modal
        className="his_model"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>
            <ViewHistory />
        </div>
      </Modal>
   
  
        <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Purchased History</span>}
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
       
       </>
    );
}

