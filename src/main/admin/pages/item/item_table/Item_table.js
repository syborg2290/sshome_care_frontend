import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import socketIOClient from "socket.io-client";
// components
import { Button } from "../../../Wrappers/Wrappers";

const {
  RealtimeServerApi,
  SeverApi,
} = require("../../../../../config/settings.js");

export default function ItemTable() {
  const [itemTableData, setItemTableData] = useState([]);

  useEffect(() => {
    axios.get(SeverApi + "item/getAllItems").then((response) => {
      if (response.status === 200) {
        response.data.forEach((element) => {
          setItemTableData((oldArray) => [
            ...oldArray,
            [
              element["item_name"],
              element["brand"],
              element["qty"],
              element["color"],
              element["model_no"],
              element["sale_price"],
              <Button
                color="secondary"
                size="small"
                className="px-2"
                variant="contained"
              >
                Declined
              </Button>,
            ],
          ]);
        });
      }
    });
  }, []);

  useEffect(() => {
    const socket = socketIOClient(RealtimeServerApi);
    socket.on("messageFromServer", (data) => {
      data.forEach((element) => {
        setItemTableData((oldArray) => [
          ...oldArray,
          [
            element["item_name"],
            element["brand"],
            element["qty"],
            element["color"],
            element["model_no"],
            element["sale_price"],
            <Button
              color="secondary"
              size="small"
              className="px-2"
              variant="contained"
            >
              Declined
            </Button>,
          ],
        ]);
      });
    });
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Item List" 
            data={itemTableData}
            columns={[
              "ITEM NAME",
              "BRAND",
              "QTY",
              "COLOR",
              "MODEL NO",
              "SALE PRICE(LKR)",
              "STATUS",
            ]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
