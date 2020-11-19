import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import { Spin, Checkbox } from "antd";

// styles
import "./Mark_Attendance.css";

//icons
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import db from "../../../../../../config/firebase.js";
import firebase from "firebase";

async function doStuff(nics, allNames) {
  for (var i = 0; i < nics.length; i++) {
    await db.collection("attendance_history").add({
      date: firebase.firestore.FieldValue.serverTimestamp(),
      nic: nics[i],
      fname: allNames[i].fname,
      lname: allNames[i].lname,
      status: "full",
    });
  }
}

export default function Mark_Attendance() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [attendanceMarkTable, setAttendanceMarkTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [marks, setMarks] = useState({});
  // eslint-disable-next-line
  const [nics, setNics] = useState([]);
  // eslint-disable-next-line
  const [allNames, setAllNames] = useState([]);

  let history = useHistory();

  const attendanceMarkTableColomns = [
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
      name: "Mark",
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

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    var allNicExist = [];

    db.collection("attendance_history")
      .get()
      .then((cur) => {
        cur.docs.forEach((checkIsIn) => {
          if (
            new Date(checkIsIn.data().date?.seconds * 1000).getFullYear() ===
            new Date().getFullYear()
          ) {
            if (
              new Date(checkIsIn.data().date?.seconds * 1000).getMonth() ===
              new Date().getMonth()
            ) {
              if (
                new Date(checkIsIn.data().date?.seconds * 1000).getDate() ===
                new Date().getDate()
              ) {
                allNicExist.push(checkIsIn.data().nic);
              }
            }
          }
        });

        db.collection("employee")
          .get()
          .then((reEmployee) => {
            let reMr = [];
            reEmployee.docs.forEach((eachEmployee) => {
              if (!allNicExist.includes(eachEmployee.data().nic)) {
                if (!reMr.includes(eachEmployee.data().nic)) {
                  marks[eachEmployee.data().nic] = false;
                  reMr.push(eachEmployee.data().nic);
                }
              }
            });

            reMr.forEach((eachNic) => {
              db.collection("employee")
                .where("nic", "==", eachNic)
                .get()
                .then((reEmployeeAd) => {
                  setAttendanceMarkTable((old) => [
                    ...old,
                    {
                      FirstName: reEmployeeAd.docs[0].data().fname,
                      LastName: reEmployeeAd.docs[0].data().lname,
                      NIC: reEmployeeAd.docs[0].data().nic,
                      Mark: (
                        <Checkbox
                          className="checkboxAtt"
                          id={reEmployeeAd.docs[0].data().nic}
                          key={reEmployeeAd.docs[0].data().nic}
                         
                          value={
                            marks[reEmployeeAd.docs[0].data().nic] === true
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            if (
                              marks[reEmployeeAd.docs[0].data().nic] === true
                            ) {
                              nics.splice(
                                nics.indexOf(reEmployeeAd.docs[0].data().nic),
                                1
                              );
                              allNames.splice(
                                nics.indexOf(reEmployeeAd.docs[0].data().nic),
                                1
                              );
                              setMarks({
                                ...marks,
                                [reEmployeeAd.docs[0].data().nic]: false,
                              });
                            } else {
                              nics.push(reEmployeeAd.docs[0].data().nic);
                              allNames.push({
                                fname: reEmployeeAd.docs[0].data().fname,
                                lname: reEmployeeAd.docs[0].data().lname,
                              });
                              setMarks({
                                ...marks,
                                [reEmployeeAd.docs[0].data().nic]: true,
                              });
                            }
                          }}
                        />
                          
                      ),
                    },
                  ]);
                });
            });
          });

        setIsLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  const markFunc = () => {
    setSubmitLoading(true);
    doStuff(nics, allNames).then((_) => {
      setSubmitLoading(false);
      window.location.reload();
    });
  };

  return (
    <>
      <Grid container spacing={4}>
       
        <Grid className="sub_btnGrid" item xs={6}>
          <Button 
            className="sub_btnAtt"
            endIcon={<AssignmentTurnedInOutlinedIcon />}
            disabled={
              submitLoading || Object.keys(marks).length === 0 ? true : false
            }
            onClick={markFunc}
          >
            {submitLoading ? (
              <Spin className="tblSpinner" size="small" spinning="true" />
            ) : (
              "Submit"
            )}
          </Button>

        </Grid>
         <Grid className="sub_btnGrid" item xs={6}></Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <span className="title_Span_blackList">
                Mark Employee Attendance
              </span>
            }
            className="attemdanceMark_Table"
            data={attendanceMarkTable}
            columns={attendanceMarkTableColomns}
            options={{
              // selectableRows: false,
              selectableRows: "none",
              customToolbarSelect: () => { },
               setRowProps: (row) => ({
                style: { backgroundColor: "#f2faff" },
              }),   
              filterType: "textfield",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    "Pending..."
                  ),
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
