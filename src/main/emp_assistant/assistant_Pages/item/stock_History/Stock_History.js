import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import {Modal } from "antd";
import MUIDataTable from "mui-datatables";

// styles
import "./Stock_History.css";

// components
 import ViewModel from "./components/Item_View_Model";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Stock_History() {
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [visible, setVisible] = useState(false);


   const showModal = () => {
    setVisible(true);
  };

    const columns = [
   
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
    // {
    //   name: "Model_No",
    //   options: {
    //     filter: true,
    //     setCellHeaderProps: (value) => ({
    //       style: { fontSize: "15px", color: "black", fontWeight: "600" },
    //     }),
    //   },
    // },
    {
      name: "Qty",
      options: {
        filter: true,
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
      name: "Date",
      options: {
        filter: true,
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
      name: "Cash_Price",
      options: {
        filter: true,
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
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

    const allTableData = [
      ["mes", "Torp", "Yonkers", "Yonkers", "NY",
        <VisibilityIcon
      onClick={showModal} 
        />
      ],

];
    
    
    return (
<>

       <Modal
        title={
          <span className="model_title">
            {allTtemData[currentIndx] && allTtemData[currentIndx].data
              ? allTtemData[currentIndx].data.itemName
              : null}
          </span>
        }
        visible={visible}
        footer={null}
        className="model_Item"
        onCancel={() => {
          window.location.reload();
          setVisible(false);
        }}
      >
        <div className="table_Model">
          <div className="model_Main">
            <div className="model_Detail">
            <ViewModel />
            </div>
          </div>
        </div>
      </Modal>



    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MUIDataTable
          title={<span className="title_Span">Stock History</span>}
          className="stock_history"
          sty
          data={allTableData}
          columns={columns}
          options={{
            selectableRows: false,
            customToolbarSelect: () => {},
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
