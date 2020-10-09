import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin } from "antd";
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
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
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
            className="item_table"
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
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin
                      size="large"
                      spinning="true"
                      style={{ margin: "auto", width: "50%" }}
                    />
                  ) : (
                    <img
                      alt="Empty data"
                      className="empty_data"
                      src={require("../../../../../assets/empty.png")}
                    />
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
