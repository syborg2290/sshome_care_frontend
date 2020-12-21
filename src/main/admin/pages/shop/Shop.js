import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Modal } from "antd";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// styles
import "./Shop.css";
import AddEmployee from "./components/add_employee_Model/Add_Employee";

import db from "../../../../config/firebase.js";

export default function Shop() {
  const [employeeAddModel, setEmployeeAddModel] = useState(false); // Employee Add model
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [alltableData, setTableData] = useState([]);
  let history = useHistory();

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
  ];

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("shop")
      .get()
      .then((reShop) => {
        var raw = [];

        reShop.docs.forEach((each) => {
          db.collection("employee")
            .where("nic", "==", each.data().nic)
            .get()
            .then((reThe) => {
              raw.push({
                FirstName: reThe.docs[0].data().fname,
                LastName: reThe.docs[0].data().lname,
                NIC: reThe.docs[0].data().nic,
                Mobile: reThe.docs[0].data().mobile1,
              });
            });
        });
        setTableData(raw);
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
            data={alltableData}
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
