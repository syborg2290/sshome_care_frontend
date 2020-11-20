import React, { useState, useEffect } from "react";

import { Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// styles
import "./Salary.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

// components
import AddPaysheet from "./components/paysheet_Model/Add_Paysheet_Model";
import PayHistoryModel from "./components/pay_history_Model/Pay_History_Model";

import db from "../../../../config/firebase.js";

export default function Salary() {
  const [addPaysheetModel, setAddPaysheetModel] = useState(false); // table model
  const [payHistoryModel, setpayHistoryModel] = useState(false); // table model

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();

  const AddPaysheetModel = () => {
    setAddPaysheetModel(true);
  };

  const PayHistoryModel = () => {
    setAddPaysheetModel(true);
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

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("employee").onSnapshot((snap) => {
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

          Action: (
            <div>
              <VisibilityIcon className="btnView" onClick={PayHistoryModel} />
              <span>
                <EditIcon className="btnEdit" onClick={AddPaysheetModel} />
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
      {/*Start Add sheet Model */}

      <Modal
        visible={addPaysheetModel}
        footer={null}
        className="model_paysheet_add"
        onCancel={() => {
          setAddPaysheetModel(false);
        }}
      >
        <div className="table__paysheet_add">
          <div className="model__paysheet_Main_add">
            <div className="model_paysheet_Detail_add">
              <AddPaysheet />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Add sheet Model  */}

      {/*Start History sheet Model */}

      <Modal
        visible={payHistoryModel}
        footer={null}
        className="model_paysheet_add"
        onCancel={() => {
          setpayHistoryModel(false);
        }}
      >
        <div className="table__paysheet_add">
          <div className="model__paysheet_Main_add">
            <div className="model_paysheet_Detail_add">
              <PayHistoryModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End History sheet Model  */}
      <Grid container spacing={4}>
        <Grid item xs={7}></Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            className="btn_loans"
            endIcon={<AddIcon />}
            // onClick={showModalRepair}
          >
            Loans
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            className="btn_advance"
            endIcon={<AddIcon />}
            // onClick={showModalRepair}
          >
            Salary Advance
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Employees Salary</span>}
            className="salary_table"
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
