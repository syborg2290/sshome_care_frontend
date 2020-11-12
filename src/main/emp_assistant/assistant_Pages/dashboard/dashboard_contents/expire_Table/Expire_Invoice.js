import React, { useState } from "react";
import { Spin,Modal } from "antd";
import MUIDataTable from "mui-datatables";
import {  Grid,Button } from "@material-ui/core";

// styles
import "./Expire_Invoice.css";


// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";


export default function Expire_Invoice() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

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
      name: "SerialNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
      },
          {
      name: "FirstName",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
      },
                {
      name: "LastName",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
      },
                
                              {
      name: "Telephone",
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
      name: "MID",
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
      name: "Action",
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
  ];


    
    const tableData = [
 ["JoeJames", "TestCorp", "Yonkers", "NY", "rtrt", "gfgf", "NY", "rtrt",  <div>
                  <VisibilityIcon
                    className="icon_view"
                    // onClick={showModalView}
                  />
                  <span className="icon_histry">
         <HistoryIcon
        //   onClick={showModalHistory} 
         />
                  </span>
                  <span className="blk_btn">
                    <Button
                      variant="contained"
                      size="small"
                      className="btnublock"
                    //   onClick={showVisibleConfirmModal}
                    >
                      Blacklist
                    </Button>
                  </span>
                </div>],

];

    return (

        <>

        <Grid container spacing={4}>
            <Grid item xs={12}>
                <MUIDataTable
                    title={<span className="title_Span_blackList">Expired Cards</span>}
                    className="payAndgo_table"
                    data={tableData}
                    columns={columns}
                    options={{
                        selectableRows: false,
                        customToolbarSelect: () => { },
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
                                    <Spin
                                        className="tblSpinner"
                                        size="large"
                                        spinning="true"
                                    />
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
