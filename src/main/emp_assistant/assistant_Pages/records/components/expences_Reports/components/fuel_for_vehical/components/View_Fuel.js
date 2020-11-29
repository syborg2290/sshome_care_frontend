// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import CurrencyFormat from "react-currency-format";

// styles
import "./View_Fuel.css";

export default function View_Fuel({ obj }) {
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);

  const columns = [
    {
      name: "Discription",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Vehical",
      options: {
        filter: false,
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
  ];

  useEffect(() => {
    var raw = [];

    raw.push({
      Discription: obj["F/B-DAA_9261"].description,
      Vehical: "F/B-DAA_9261",
      Cost: (
        <CurrencyFormat
          value={obj["F/B-DAA_9261"].cost}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
    });
    raw.push({
      Discription: obj["F/D-LI_5471"].description,
      Vehical: "F/D-LI_5471",
      Cost: (
        <CurrencyFormat
          value={obj["F/D-LI_5471"].cost}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
    });

    raw.push({
      Discription: obj["Boxer-W2_8626"].description,
      Vehical: "Boxer-W2_8626",
      Cost: (
        <CurrencyFormat
          value={obj["Boxer-W2_8626"].cost}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
    });

    raw.push({
      Discription: obj["CT_BPN_100-4581"].description,
      Vehical: "CT_BPN_100-4581",
      Cost: (
        <CurrencyFormat
          value={obj["CT_BPN_100-4581"].cost}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
    });

    raw.push({
      Discription: obj["GK_7586"].description,
      Vehical: "GK_7586",
      Cost: (
        <CurrencyFormat
          value={obj["GK_7586"].cost}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
    });

    raw.push({
      Discription: obj["otherFuel"].description,
      Vehical: "otherRepair",
      Cost: (
        <CurrencyFormat
          value={obj["otherFuel"].cost}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" "}
        />
      ),
    });

    for (var i = 0; i < Object.keys(obj.extra_inputs).length; i++) {
      raw.push({
        Discription: obj.extra_inputs[i].description,
        Vehical: obj.extra_inputs[i].vehi_name,
        Cost: (
          <CurrencyFormat
            value={obj.extra_inputs[i].cost}
            displayType={"text"}
            thousandSeparator={true}
            prefix={" "}
          />
        ),
      });
    }
    setallData(raw);
  }, [obj]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Fuel For Vehical</span>}
            className="salary_table"
            sty
            data={allData}
            columns={columns}
            options={{
              selectableRows: "none",
              customToolbarSelect: () => {},
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
