import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
// styles
import "./Root.css";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

// components
import AddRoot from "./components/add_root_Model/Add_Root";
import ViewRoot from "./components/view_root_Model/View_Root";
import UpdateRoot from "./components/update_root_Model/Update_Root";

import db from "../../../../config/firebase.js";

export default function Root() {
  const [tableData, setTableData] = useState([]);
  const [allTableData, setAllTableData] = useState([]);
  const [rootAddModel, setRootAddModel] = useState(false); // ROOT add model
  const [rootUpdateModel, setRootUpdateModel] = useState(false); // ROOT Update model
  const [rootViewModel, setRootViewModel] = useState(false); // ROOT View model
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  let history = useHistory();
  
  const RootAdd = () => {
    setRootAddModel(true);
  };
  const RootUpdate = () => {
    setRootUpdateModel(true);
  };

  const RootView = () => {
    setRootViewModel(true);
  };

  const columns = [
    {
      name: "Root",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Monday",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Tuseday",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Wednesday",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Thursday",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Friday",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Saturday",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Sunday",
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

    db.collection("root").onSnapshot((snap) => {
      var raw = [];
      var rawAll = [];
      snap.docs.forEach((each) => {
        rawAll.push({
          id: each.id,
          data: each.data(),
        });
        raw.push({
          Root: each.data().root,
          Monday: each.data().days[0].monday ? (
            <div className="yes">Out</div>
          ) : (
            <div className="no">In</div>
          ),
          Tuseday: each.data().days[0].tuesday ? (
            <div className="yes">Out</div>
          ) : (
            <div className="no">In</div>
          ),
          Wednesday: each.data().days[0].wendsday ? (
            <div className="yes">Out</div>
          ) : (
            <div className="no">In</div>
          ),
          Thursday: each.data().days[0].thursday ? (
            <div className="yes">Out</div>
          ) : (
            <div className="no">In</div>
          ),
          Friday: each.data().days[0].friday ? (
            <div className="yes">Out</div>
          ) : (
            <div className="no">In</div>
          ),
          Saturday: each.data().days[0].saturday ? (
            <div className="yes">Out</div>
          ) : (
            <div className="no">In</div>
          ),
          Sunday: each.data().days[0].sunday ? (
            <div className="yes">Out</div>
          ) : (
            <div className="no">In</div>
          ),
          Action: (
            <div>
              <VisibilityIcon className="btnView-root" onClick={RootView} />
              <span>
                <EditIcon className="btnEdit-root" onClick={RootUpdate} />
              </span>
            </div>
          ),
        });
      });
      setTableData(raw);
      setAllTableData(rawAll);
    });
      // eslint-disable-next-line
  }, []);

  return (
    <>
      {/*Start Add root Model */}

      <Modal
        visible={rootAddModel}
        footer={null}
        className="model_root_add"
        onCancel={() => {
          setRootAddModel(false);
        }}
      >
        <div className="table__root_add">
          <div className="model__root_Main_add">
            <div className="model_root_Detail_add">
              <AddRoot />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Add root Model  */}

      {/*Start View root Model */}

      <Modal
        visible={rootViewModel}
        footer={null}
        className="model_root_View"
        onCancel={() => {
          setRootViewModel(false);
        }}
      >
        <div className="table__root_View">
          <div className="model__root_Main_View">
            <div className="model_root_Detail_View">
              <ViewRoot
                key={allTableData[currentIndx]?.id}
                description={allTableData[currentIndx]?.data.description}
                empName={allTableData[currentIndx]?.data.empName1}
                empName2={allTableData[currentIndx]?.data.empName2}
                rootName={allTableData[currentIndx]?.data.root}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End View root Model  */}

      {/*Start Update root Model */}

      <Modal
        visible={rootUpdateModel}
        footer={null}
        className="model_root_Update"
        onCancel={() => {
          setRootUpdateModel(false);
        }}
      >
        <div className="table__root_Update">
          <div className="model__root_Main_Update">
            <div className="model_root_Detail_Update">
              <UpdateRoot
                key={allTableData[currentIndx]?.id}
                docId={allTableData[currentIndx]?.id}
                descProp={allTableData[currentIndx]?.data.description}
                empName1={allTableData[currentIndx]?.data.empName1}
                empName2={allTableData[currentIndx]?.data.empName2}
                rootProp={allTableData[currentIndx]?.data.root}
                daysProp={allTableData[currentIndx]?.data.days}
                employee2Prop={allTableData[currentIndx]?.data.employee2}
                employeeProp={allTableData[currentIndx]?.data.employee1}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Update root Model  */}

      <Button
        variant="contained"
        color="primary"
        className="btn_addRoots"
        onClick={RootAdd}
      >
        Add Root
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Roots</span>}
            className="root_table"
            sty
            data={tableData}
            columns={columns}
            options={{
              selectableRows: false,
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
