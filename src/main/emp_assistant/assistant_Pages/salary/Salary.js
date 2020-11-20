import React, { useState, useEffect } from "react";

import { Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// styles
import "./Salary.css";

// icons
import HistoryIcon from "@material-ui/icons/History";
import AddIcon from "@material-ui/icons/Add";

// components
import AddPaysheet from "./components/paysheet_Model/Add_Paysheet_Model";
import PayHistoryModel from "./components/pay_history_Model/Pay_History_Model";
import SalaryAdvanceMdl from "./components/salary_Advance_Model/Salary_Advance";
import CreateTargetModel from "./components/target_Model/Create_Target_Model";

import db from "../../../../config/firebase.js";

export default function Salary() {
  const [addPaysheetModel, setAddPaysheetModel] = useState(false); // table model
  const [payHistoryModel, setpayHistoryModel] = useState(false); // table model

  const [salaryAdvanceModel, setSalaryAdvanceModel] = useState(false);
  const [targetModel, setTargetModel] = useState(false);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();

  const AddPaysheetModel = () => {
    setAddPaysheetModel(true);
  };

  const PayHistoryModels = () => {
    setpayHistoryModel(true);
  };

  const SalaryAdvanceModels = () => {
    setSalaryAdvanceModel(true);
  };

  const TrgetModelCreate = () => {
    setTargetModel(true);
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
          Status: <div className="sttsal">Paied</div>,
          Action: (
            <div>
              <HistoryIcon className="btnView" onClick={PayHistoryModels} />
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="btnupdateLon"
                  onClick={SalaryAdvanceModels}
                >
                  Advance
                </Button>
              </span>
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="btnupdateLon"
                  onClick={AddPaysheetModel}
                >
                  Update
                </Button>
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
        className="model_histrySal"
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

      {/*Start Salry Advance Model */}

      <Modal
        visible={salaryAdvanceModel}
        footer={null}
        className="model_salry_advance"
        onCancel={() => {
          setSalaryAdvanceModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <SalaryAdvanceMdl />
            </div>
          </div>
        </div>
      </Modal>

      {/* End  Salry Advance Model  */}

      {/*Start TARGET Model */}

      <Modal
        visible={targetModel}
        footer={null}
        className="model_salry_target"
        onCancel={() => {
          setTargetModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <CreateTargetModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End TARGET Model  */}

      <Grid container spacing={4}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            className="btn_target"
            endIcon={<AddIcon />}
            onClick={TrgetModelCreate}
          >
            Target
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
