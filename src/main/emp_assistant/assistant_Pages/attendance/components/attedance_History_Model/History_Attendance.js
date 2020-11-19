import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// styles
import "./History_Attendance.css";

// icons
import HistoryIcon from "@material-ui/icons/History";

//components
import HistroryModel from "./components/Histrory_Model";

import db from "../../../../../../config/firebase.js";

export default function Attedance_History() {
  let history = useHistory();
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  const [viewEmployeesHistory, setViewEmployeesHistory] = useState(false); // Table models

   const showModalHistory = () => {
    setViewEmployeesHistory(true);
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
              <HistoryIcon className="btnView" onClick={showModalHistory} />
              
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

        {/* START History model */}
      <Modal
        className="employee_hisstoryTbl"
        visible={viewEmployeesHistory}
        footer={null}
        onCancel={() => {
          setViewEmployeesHistory(false);
        }}
      >
        <div className="mark_body">
          <HistroryModel />
        </div>
      </Modal>

      {/* END History model */}
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Attendance History</span>}
            className="Attendance_hisstoryTbl"
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
