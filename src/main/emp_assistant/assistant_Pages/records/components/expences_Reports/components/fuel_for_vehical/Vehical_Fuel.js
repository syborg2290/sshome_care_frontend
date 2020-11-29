// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import { Modal } from "antd";

import CurrencyFormat from "react-currency-format";
// styles
import "./Vehical_Fuel.css";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
// components
import ViewFuel from "./components/View_Fuel";

import db from "../../../../../../../../config/firebase.js";

export default function Vehical_Fuel() {
  const [fuelViewModel, setFuelViewModel] = useState(false); // table model
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const FuelView = () => {
    setFuelViewModel(true);
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
      name: "Cost",
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
    db.collection("expences")
      .orderBy("date", "asc")
      .get()
      .then((reEx) => {
        var raw = [];
        var rawAll = [];

        reEx.docs.forEach((each) => {
          rawAll.push({
            id: each.id,
            data: each.data(),
          });
          raw.push({
            Date: new Date(each.data().date.seconds * 1000).toDateString(),
            Cost: (
              <CurrencyFormat
                value={each.data().total_fuel}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Action: <VisibilityIcon className="btnEdit" onClick={FuelView} />,
          });
        });
        setallData(rawAll);
        setTableData(raw);
      });
  }, []);

  return (
    <>
      {/*Start view Model */}

      <Modal
        visible={fuelViewModel}
        footer={null}
        className="fuel_viewmdl"
        onCancel={() => {
          setFuelViewModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ViewFuel
                key={allData[currentIndx]?.id}
                obj={allData[currentIndx]?.data.vehicles_fuel}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End view Model  */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Fuel For Vehical</span>}
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
