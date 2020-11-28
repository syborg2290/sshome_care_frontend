 // eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import { Modal } from "antd";
    // eslint-disable-next-line
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
// styles
import "./Vehical_Fuel.css";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
// components
import ViewFuel from "./components/View_Fuel";

export default function Vehical_Fuel() {
  const [fuelViewModel, setFuelViewModel] = useState(false); // table model
    // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  // eslint-disable-next-line
    const [allData, setallData] = useState([]);
  
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
    // eslint-disable-next-line
    const tableData = [
 ["Joe James", <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
      />
   ,<VisibilityIcon className="btnEdit" onClick={FuelView} />
        ],

];

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
              <ViewFuel  />
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
    )
}
