import React, { useState, useEffect } from "react";

import { Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// styles
import "./Salary_Advance.css";

// components
import AdvanceModel from "./components/make_advance_Model/Advance_Model";
import AdvanceHistory from "./components/advance_history_Model/Advance_History";

// icons
import HistoryIcon from "@material-ui/icons/History";

import db from "../../../../../../config/firebase.js";

export default function Salary_Advance() {
  const [salaryAdvanceModel, setSalaryAdvanceModel] = useState(false);
  const [advanceHistoryModel, setAdvanceHistoryModel] = useState(false);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();

  const SalaryAdvanceModel = () => {
    setSalaryAdvanceModel(true);
  };

  const AdvanceHistoryModel = () => {
    setAdvanceHistoryModel(true);
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
              <HistoryIcon className="btnView" onClick={AdvanceHistoryModel} />
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="btnupdateLon"
                  onClick={SalaryAdvanceModel}
                >
                  Advance
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
              <AdvanceModel
                key={allData[currentIndx]?.id}
                docId={allData[currentIndx]?.id}
                nic={allData[currentIndx]?.data.nic}
                fname={allData[currentIndx]?.data.fname}
                lname={allData[currentIndx]?.data.lname}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Salary Advance Model  */}

      {/*Start Salary Advance HISTORY Model */}

      <Modal
        visible={advanceHistoryModel}
        footer={null}
        className="model_history_advance"
        onCancel={() => {
          setAdvanceHistoryModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <AdvanceHistory
                key={allData[currentIndx]?.id}
                nic={allData[currentIndx]?.data.nic}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Salary Advance HISTORY Model  */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Employees Salary Advance</span>}
            className="advance_salary"
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
