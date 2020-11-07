import React, { useState } from "react";
import { Button } from "@material-ui/core";
// eslint-disable-next-line
import { Modal, Spin } from "antd";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";

// styles
import "./Employee.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

// components
import AddEmployee from "./components/add _employee_Model/Add_Employee";
import ViewEmployee from "./components/View_emplyee_Model/View_Employee";
import UpdateEmployee from "./components/update _employee_Model/Update_Employee";

export default function Employee() {
  const [employeeAddModel, setEmployeeAddModel] = useState(false); // Employee add model
  const [employeeUpdateModel, setEmployeeUpdateModel] = useState(false); // Employee Update model
  const [employeeViewModel, setEmployeeViewModel] = useState(false); // Employee View model

  const EmployeeAdd = () => {
    setEmployeeAddModel(true);
  };
  const EmployeeUpdate = () => {
    setEmployeeUpdateModel(true);
  };

  const EmployeeView = () => {
    setEmployeeViewModel(true);
  };

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

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
      name: "Role",
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
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "NY",
      <div>
        <VisibilityIcon className="btnView" onClick={EmployeeView} />
        <span>
          <EditIcon className="btnEdit" onClick={EmployeeUpdate} />
        </span>
      </div>,
    ],
  ];
  return (
    <>
      {/*Start Add Employee Model */}

      <Modal
        visible={employeeAddModel}
        footer={null}
        className="model_Employee_add"
        onCancel={() => {
          setEmployeeAddModel(false);
        }}
      >
        <div className="table__Employee_add">
          <div className="model__Employee_Main_add">
            <div className="model_Employee_Detail_add">
              <AddEmployee />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Add Employee Model  */}

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
              <ViewEmployee />
            </div>
          </div>
        </div>
      </Modal>

      {/* End View Employee Model  */}

      {/*Start Update Employee Model */}

      <Modal
        visible={employeeUpdateModel}
        footer={null}
        className="model_Employee_Update"
        onCancel={() => {
          setEmployeeUpdateModel(false);
        }}
      >
        <div className="table__Employee_Update">
          <div className="model__Employee_Main_Update">
            <div className="model_Employee_Detail_Update">
              <UpdateEmployee />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Update Employee Model  */}

      <Button
        variant="contained"
        color="primary"
        className="btn_addEmployees"
        onClick={EmployeeAdd}
      >
        New Employee
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Employees</span>}
            className="Employee_table"
            sty
            data={tableData}
            columns={columns}
            options={{
              selectableRows: false,
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
