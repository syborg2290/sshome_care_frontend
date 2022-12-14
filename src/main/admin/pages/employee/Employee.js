import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import { Modal } from "antd";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// styles
import "./Employee.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";

// components
import AddEmployee from "./components/add _employee_Model/Add_Employee";
import ViewEmployee from "./components/View_emplyee_Model/View_Employee";
import UpdateEmployee from "./components/update _employee_Model/Update_Employee";

import db from "../../../../config/firebase.js";

export default function Employee() {
  const [employeeAddModel, setEmployeeAddModel] = useState(false); // Employee add model
  const [employeeUpdateModel, setEmployeeUpdateModel] = useState(false); // Employee Update model
  const [employeeViewModel, setEmployeeViewModel] = useState(false); // Employee View model
  // eslint-disable-next-line
  const [employeePurchasing, setEmployeePurchasing] = useState(false); // Employee Purchasing model
  // eslint-disable-next-line
  const [employeePurchasingHistory, setEmployeePurchasingHistory] = useState(
    false
  ); // Employee Purchasing history model
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [allData, setallData] = useState([]);

  let history = useHistory();

  const EmployeeAdd = () => {
    setEmployeeAddModel(true);
  };
  const EmployeeUpdate = () => {
    setEmployeeUpdateModel(true);
  };

  const EmployeeView = () => {
    setEmployeeViewModel(true);
  };

  const EmployeePurchasing = (empId) => {
    setEmployeePurchasing(true);

    let moveWith = {
      pathname: "/admin/pages/employeePurchasing",
      search: "?query=abc",
      state: { detail: empId },
    };
    history.push(moveWith);
  };

  const empPurchasedHistory = () => {
    setEmployeePurchasingHistory(true);
    history.push("/admin/pages/purchasedHistory");
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
      name: "Status",
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

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("employee")
      .get()
      .then((snap) => {
        var raw = [];
        var rawAlldata = [];
        snap.docs.forEach((each) => {
          rawAlldata.push({
            id: each.id,
            data: each.data(),
          });
          raw.push({
            FirstName: each.data().fname,
            LastName: each.data().lname,
            NIC: each.data().nic,
            Mobile: each.data().mobile1,
            Status:
              each.data().status === "work" ? (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    padding: "6px",
                    borderRadius: "20px",
                    width: "100%",
                  }}
                >
                  Work
                </span>
              ) : (
                <span
                  style={{
                    color: "white",
                    backgroundColor: "#ff8c00",
                    padding: "6px",
                    borderRadius: "20px",
                    width: "100%",
                  }}
                >
                  Not work
                </span>
              ),
            Action: (
              <div>
                <VisibilityIcon className="btnView" onClick={EmployeeView} />
                <span>
                  <EditIcon className="btnEdit" onClick={EmployeeUpdate} />
                </span>
                <span>
                  <AddShoppingCartRoundedIcon
                    className="btnShopping"
                    onClick={() => EmployeePurchasing(each.id)}
                  />
                </span>
              </div>
            ),
          });
        });
        setTableData(raw);
        setallData(rawAlldata);
      });
    // eslint-disable-next-line
  }, []);

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
              <AddEmployee
                close_model={() => {
                  setEmployeeAddModel(false);
                }}
              />
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
              <UpdateEmployee
                key={allData[currentIndx]?.id}
                fnameProp={allData[currentIndx]?.data.fname}
                lnameProp={allData[currentIndx]?.data.lname}
                address1Prop={allData[currentIndx]?.data.address1}
                address2Prop={allData[currentIndx]?.data.addres2}
                basicProp={allData[currentIndx]?.data.basic}
                mobile1Prop={allData[currentIndx]?.data.mobile1}
                mobile2Prop={allData[currentIndx]?.data.mobile2}
                nicProp={allData[currentIndx]?.data.nic}
                statusProp={allData[currentIndx]?.data.status}
                close_model={() => {
                  setEmployeeUpdateModel(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Update Employee Model  */}

      <Grid container spacing={4}>
        <Grid item xs={10}>
          <Button
            variant="contained"
            color="primary"
            className="btn_purchsHis"
            onClick={empPurchasedHistory}
          >
            Purchased History
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            className="btn_addEmployees"
            onClick={EmployeeAdd}
          >
            New Employee
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Employees</span>}
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
