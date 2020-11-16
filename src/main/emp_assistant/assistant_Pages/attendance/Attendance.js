import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid,Button } from "@material-ui/core";
// eslint-disable-next-line
import { Modal } from "antd";


// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
// eslint-disable-next-line
import HistoryIcon from "@material-ui/icons/History";
// eslint-disable-next-line
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useHistory } from "react-router-dom";

// components
import ViewEmployee from "./components/view_Employee_Model/View_Employee";
import UpdateStatus from "./components/status_Update_Model/Update_Status";
import MarkAttendance from "./components/mark_Attendance_Model/Mark_Attendance";
// import HistoryAttendance from "./components/attedance_History_Model/History_Attendance";

// styles
import "./Attendance.css";

export default function Attendance() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const [viewEmployeesModel, setviewEmployeesModel] = useState(false); // Table models
  const [statusUpdateModel, setStatusUpdateModel] = useState(false); // Table models

  const [markAttendanceModel, setMarkAttendanceModel] = useState(false);
   // eslint-disable-next-line
  const [historyAttendanceModel, setHistoryAttendanceModel] = useState(false);
  let history = useHistory();
   let history2 = useHistory();

   const showModalView = () => {
    setviewEmployeesModel(true);
  };

  const showModalStatusUpdate = () => {
    setStatusUpdateModel(true);
  };

  const showModalMarkAttendance = () => {
    setMarkAttendanceModel(true);
  };

    const showModalHistoryAttendance = () => {
      setHistoryAttendanceModel(true);
      history2.push("/assistant/attendant/attendat_history");
  };

  //START Attendance Table Colomns
  const attendanceTableColomns = [
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
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Status",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },

    {
      name: "Action",

      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            width: "150px",
            margin: "auto",
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  const attendanceTableRow = [
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
       "Yonkers",
      <div className="workingStts">Working</div>,
      <div>
        <VisibilityIcon onClick={showModalView}/>
        <span className="icon_Edit">
          <AutorenewIcon  onClick={showModalStatusUpdate}/>
        </span>
      </div>,
    ],

  ];

  useEffect(() => {

    window.addEventListener("offline", function (e) {
      history.push("/assistant/connection/error/lost_connection");
    });
  });

  return (
    <>

      {/* START Mark model */}
        <Modal
        className="mark_bodyModel"
        visible={markAttendanceModel}
        footer={null}
        onCancel={() => {
          setMarkAttendanceModel(false);
        }}
      >
        <div className="mark_body">
          <MarkAttendance />
        </div>
      </Modal>

      {/* END Mark model */}

      {/* START History model */}
{/*       
        <Modal
        className="confo_model"
        visible={historyAttendanceModel}
        footer={null}
        onCancel={() => {
          setHistoryAttendanceModel(false);
        }}
      >
        <div className="history_body">
          <HistoryAttendance />
        </div>
      </Modal> */}

      {/* END History model */}
      

  {/* START View model */}
        <Modal
        className="confo_model"
        visible={viewEmployeesModel}
        footer={null}
        onCancel={() => {
          setviewEmployeesModel(false);
        }}
      >
        <div className="view_body">
          <ViewEmployee />
        </div>
      </Modal>

      {/* END View model */}

      
  {/* START View model */}
        <Modal
        className="sttsUp_model"
        visible={statusUpdateModel}
        footer={null}
        onCancel={() => {
          setStatusUpdateModel(false);
        }}
      >
        <div className="view_body">
          <UpdateStatus />
        </div>
      </Modal>

      {/* END View model */}
      
      <Button
        onClick={showModalHistoryAttendance}
        variant="contained" className="btn_attendanceHistory">
        Attendance History
      </Button>
      <Button onClick={showModalMarkAttendance}
        variant="contained" color="primary"
        className="btn_attendance">
        Mark Attendance
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <span className="title_Span_blackList">Employee Attendance</span>
            }
            className="attemdance_Table"
            data={attendanceTableRow}
            columns={attendanceTableColomns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "textfield",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
