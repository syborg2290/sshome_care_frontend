import React, { useState } from "react";

import { Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// styles
import "./Salary_Advance.css";

// components
import AdvanceModel from "./components/make_advance_Model/Advance_Model";

export default function Salary_Advance() {
  
  
  const [salaryAdvanceModel, setSalaryAdvanceModel] = useState(false);

   // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
   // eslint-disable-next-line
  let history = useHistory();

  const SalaryAdvanceModel = () => {
    setSalaryAdvanceModel(true);
  };

    const columns = [
        {
            name: "Employee Name",
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
                filter: false,
                setCellHeaderProps: (value) => ({
                    style: { fontSize: "15px", color: "black", fontWeight: "600" },
                }),
            },
        },
        {
            name: "Amount",
            options: {
                filter: false,
                setCellHeaderProps: (value) => ({
                    style: { fontSize: "15px", color: "black", fontWeight: "600" },
                }),
            },
        },
        {
            name: "Balance",
            options: {
                filter: false,
                setCellHeaderProps: (value) => ({
                    style: { fontSize: "15px", color: "black", fontWeight: "600" },
                }),
            },
        },

    ];
    
       const tableData = [
        [ "Test", "Corp", "Saturday, November 21st 2020", "kers", "kers"],

];
  return (
      <>

       {/*Start Salary Advance Model */}

      <Modal
        visible={salaryAdvanceModel}
        footer={null}
        className="model_salary_advance"
        onCancel={() => {
          setSalaryAdvanceModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <AdvanceModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Salary Advance Model  */}

      <Grid container spacing={4}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            className="btn_tempary"
            // endIcon={<AvTimerIcon />}
            onClick={SalaryAdvanceModel}
          >
            Salary Advance
          </Button>
        </Grid>
      </Grid>
      
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <MUIDataTable
                    title={<span className="title_Span">Salary Advance</span>}
                    className="advance_Salary"
                    sty
                    data={tableData}
                    columns={columns}
                    options={{
                        selectableRows: "none",
                        customToolbarSelect: () => { },
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

