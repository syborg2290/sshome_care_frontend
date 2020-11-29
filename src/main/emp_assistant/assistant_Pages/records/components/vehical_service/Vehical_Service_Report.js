import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Modal } from "antd";
import Checkbox from "@material-ui/core/Checkbox";

// icons
import EditIcon from "@material-ui/icons/Edit";

// styles
import "./Vehical_Service_Report.css";

// components
import UpdateServiceModel from "./components/Update_Service_Model";

import db from "../../../../../../config/firebase.js";

export default function Vehical_Service_Report() {
  const [updateModel, setUpdateModel] = useState(false); // Update model

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const UpdateModel = () => {
    setUpdateModel(true);
  };

  const columns = [
    {
      name: "Date",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Vehicle",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Oil",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Diesel_Filters",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Oil_Filters",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "ServiceKm_Total",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Service_Center",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Next_ServiceKm",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Diesel",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Other",
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
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  useEffect(() => {
    db.collection("vehi_service")
      .get()
      .then((reGet) => {
        var raw = [];
        var rawAll = [];

        reGet.docs.forEach((reEach) => {
          rawAll.push({
            id: reEach.id,
            data: reEach.data(),
          });
          raw.push({
            Date: new Date(reEach.data().date.seconds * 1000).toDateString(),
            Vehicle: reEach.data().vehical,
            Oil: (
              <Checkbox
                checked={reEach.data().oil}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            ),
            Diesel_Filters: (
              <Checkbox
                checked={reEach.data().dieselFilter}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            ),
            Oil_Filters: (
              <Checkbox
                checked={reEach.data().oilFilter}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            ),
            ServiceKm_Total: reEach.data().serviceKm,
            Service_Center: reEach.data().serviceCenter,
            Next_ServiceKm: reEach.data().nextService,
            Diesel: (
              <Checkbox
                checked={reEach.data().diesel}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            ),
            Other: reEach.data().other,
            Action: <EditIcon className="btnEdit" onClick={UpdateModel} />,
          });
        });
        setTableData(raw);
        setallData(rawAll);
      });
  }, []);

  return (
    <>
      {/*Start Update Model */}

      <Modal
        visible={updateModel}
        footer={null}
        className="modet_update"
        onCancel={() => {
          setUpdateModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <UpdateServiceModel
                data={allData[currentIndx]?.data}
                id={allData[currentIndx]?.id}
                key={allData[currentIndx]?.id}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Update Model  */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Vehical Service</span>}
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
