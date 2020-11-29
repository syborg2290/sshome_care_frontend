import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CurrencyFormat from "react-currency-format";
import { Modal } from "antd";

// components
import ViewRepair from "./components/View_Repair";

// styles
import "./Vehical_Repair.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

import db from "../../../../../../../../config/firebase.js";

export default function Vehical_Repair() {
  const [repairViewModel, setRepairViewModel] = useState(false); // table model
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const RepairView = () => {
    setRepairViewModel(true);
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
      .orderBy("date", "desc")
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
                value={each.data().total_repairs}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Action: <VisibilityIcon className="btnEdit" onClick={RepairView} />,
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
        visible={repairViewModel}
        footer={null}
        className="fuel_viewmdl"
        onCancel={() => {
          setRepairViewModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <ViewRepair
                key={allData[currentIndx]?.id}
                obj={allData[currentIndx]?.data.vehicles_repairs}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End view Model  */}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Repair For Vehical</span>}
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
