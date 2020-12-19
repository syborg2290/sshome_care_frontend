import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Modal } from "antd";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// styles
import "./Shop.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";


// components
import ViewEmployee from "./components/View_emplyee_Model/View_Employee";
import AddEmployee from "./components/add_employee_Model/Add_Employee";


import db from "../../../../config/firebase.js";

export default function Shop() {
    const [employeeViewModel, setEmployeeViewModel] = useState(false); // Employee View model
    const [employeeAddModel, setEmployeeAddModel] = useState(false); // Employee Add model
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [allData, setallData] = useState([]);
  let history = useHistory();


  const EmployeeView = () => {
    setEmployeeViewModel(true);
    };
    
      const EmployeeAdd = () => {
    setEmployeeAddModel(true);
  };

  const columns = [
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
      name: "NIC",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Mobile",
      options: {
        filter: false,
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
    ["2020", "Test Corp", "Yonkers", "12",   
    <VisibilityIcon className="btnView" onClick={EmployeeView} />             
  ],

];

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

  return (
      <>
          
 {/*Start add Model */}

      <Modal
        visible={employeeAddModel}
        footer={null}
        className="model_Employee_View"
        onCancel={() => {
          setEmployeeAddModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <AddEmployee />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  add Model  */}


      {/*Start View Employee Model */}

      <Modal
        visible={employeeViewModel}
        footer={null}
        className="model_Employee_View"
        onCancel={() => {
          setEmployeeViewModel(false);
        }}
      >
        <div className="table__Employee_View">
          <div className="model__Employee_Main_View">
            <div className="model_Employee_Detail_View">
              <ViewEmployee
                key={allData[currentIndx]?.id}
                fname={allData[currentIndx]?.data.fname}
                lname={allData[currentIndx]?.data.lname}
                address1={allData[currentIndx]?.data.address1}
                address2={allData[currentIndx]?.data.addres2}
                basic={allData[currentIndx]?.data.basic}
                mobile1={allData[currentIndx]?.data.mobile1}
                mobile2={allData[currentIndx]?.data.mobile2}
                nic={allData[currentIndx]?.data.nic}
                deposit={allData[currentIndx]?.data.security_deposit}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End View Employee Model  */}

   

      <Button
        variant="contained"
        color="primary"
        className="btn_addEmployees"
        onClick={EmployeeAdd}
      >
       Add Employee
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Shop</span>}
            className="Employee_table"
            sty
            data={tableData}
            columns={columns}
            options={{
              // selectableRows: false,
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
