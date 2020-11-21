import React, { useState, useEffect } from "react";

import { Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// styles
import "./Temporary.css";

// components
import TemporaryModels from "./components/make_temporary_Model/Temporary_Make";
import TemporaryHistory from "./components/temporory_history_Model/Temporary_History";

// icons
import HistoryIcon from "@material-ui/icons/History";



import db from "../../../../../../config/firebase.js";

export default function Temporary() {
  
  const [temporaryModel, setTemporaryModel] = useState(false);
  const [temporaryHistoryModel, setTemporaryHistoryModel] = useState(false);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  let history = useHistory();

  const TemporaryModel = () => {
    setTemporaryModel(true);
  };

  const TemporaryHistoryModel = () => {
    setTemporaryHistoryModel(true);
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
              <HistoryIcon className="btnView"
                onClick={TemporaryHistoryModel}
              />
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="btnupdateLon"
                  onClick={TemporaryModel}
                >
                  Temporary
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

       {/*Start  Temporary Model */}

      <Modal
        visible={temporaryModel}
        footer={null}
        className="model_temporary"
        onCancel={() => {
          setTemporaryModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <TemporaryModels />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Temporary Model  */}


      {/*Start Temporary HISTORY Model */}

      <Modal
        visible={temporaryHistoryModel}
        footer={null}
        className="model_history_temporary"
        onCancel={() => {
          setTemporaryHistoryModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <TemporaryHistory />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Temporary HISTORY Model  */}

      
       <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Temporary</span>}
            className="temporary_table"
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


