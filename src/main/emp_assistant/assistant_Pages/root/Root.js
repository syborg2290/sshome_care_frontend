import React, { useState } from "react";
import { Button } from "@material-ui/core";

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

export default function Root() {
  const [rootAddModel, setRootAddModel] = useState(false); // ROOT add model
  const [rootUpdateModel, setRootUpdateModel] = useState(false); // ROOT Update model
  const [rootViewModel, setRootViewModel] = useState(false); // ROOT View model
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

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
      name: "Name",
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

  const tableData = [
    [
      "F/D",
      <div className="yes">Yes</div>,
      <div className="yes">Yes</div>,
      <div className="yes">Yes</div>,
      <div className="yes">Yes</div>,
      <div className="yes">Yes</div>,
      <div className="no">No</div>,
      <div className="no">No</div>,
      <div>
        <VisibilityIcon className="btnView-root" onClick={RootView} />
        <span>
          <EditIcon className="btnEdit-root" onClick={RootUpdate} />
        </span>
      </div>,
    ],
    [
      "F/B",
      <div className="no">No</div>,
      <div className="no">No</div>,
      <div className="no">No</div>,
      <div className="yes">Yes</div>,
      <div className="yes">Yes</div>,
      <div className="no">No</div>,
      <div className="no">No</div>,
      <div>
        <VisibilityIcon className="btnView-root" onClick={RootView} />
        <span>
          <EditIcon className="btnEdit-root" onClick={RootUpdate} />
        </span>
      </div>,
    ],
  ];

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
              <ViewRoot />
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
              <UpdateRoot />
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
