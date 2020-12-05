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
import AvTimerIcon from "@material-ui/icons/AvTimer";
import CardTravelIcon from "@material-ui/icons/CardTravel";

// components
import AddPaysheet from "./components/paysheet_Model/Add_Paysheet_Model";
import CreateTargetModel from "./components/target_Model/Create_Target_Model";
import TargetHistoryModel from "./components/target_History_Model/Target_History_Model";

import db from "../../../../config/firebase.js";

export default function Salary() {
  const [addPaysheetModel, setAddPaysheetModel] = useState(false); // table model
  // eslint-disable-next-line
  const [payHistoryModel, setpayHistoryModel] = useState(false); // table model
  // eslint-disable-next-line
  const [salaryAdvanceModel, setSalaryAdvanceModel] = useState(false);
  // eslint-disable-next-line
  const [temporaryModel, setTemporaryModel] = useState(false);

  const [targetModel, setTargetModel] = useState(false);
  const [targetHistoryModel, setTargetHistoryModel] = useState(false);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();

  const AddPaysheetModel = () => {
    setAddPaysheetModel(true);
  };

  const SalaryAdvanceModels = () => {
    setSalaryAdvanceModel(true);
    history.push("/assistant/salary/advance");
  };

  const SalaryTemporaryModel = () => {
    setTemporaryModel(true);
    history.push("/assistant/salary/Temporary");
  };

  const TrgetModelCreate = () => {
    setTargetModel(true);
  };

  const TrgetModelHistory = () => {
    setTargetHistoryModel(true);
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
              <HistoryIcon
                className="btnView"
                onClick={(e) => PayHistoryModels(each.data().nic)}
              />
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="btnupdateLon"
                  onClick={AddPaysheetModel}
                >
                  Pay Sheet
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

  const PayHistoryModels = (nic) => {
    setpayHistoryModel(true);
    let moveWith = {
      pathname: "/assistant/salary/pay_history",
      search: "?query=abc",
      state: { detail: nic },
    };
    history.push(moveWith);
  };

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
        <div>
          <div>
            <div>
              <AddPaysheet
                key={allData[currentIndx]?.id}
                nic={allData[currentIndx]?.data.nic}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Add sheet Model  */}

      {/*Start TARGET HISTORY Model */}

      <Modal
        visible={targetHistoryModel}
        footer={null}
        className="model_salry_targetHistry"
        onCancel={() => {
          setTargetHistoryModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <TargetHistoryModel />
            </div>
          </div>
        </div>
      </Modal>

      {/* End TARGET HISTORY Model  */}

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
        <Grid item xs={2}>
          <Button
            variant="contained"
            className="btn_tempary"
            endIcon={<AvTimerIcon />}
            onClick={SalaryTemporaryModel}
          >
            Temporary
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            className="btn_advance"
            endIcon={<CardTravelIcon />}
            onClick={SalaryAdvanceModels}
          >
            Salary Advance
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            className="btn_targetHis"
            endIcon={<HistoryIcon />}
            onClick={TrgetModelHistory}
          >
            Target History
          </Button>
        </Grid>
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
