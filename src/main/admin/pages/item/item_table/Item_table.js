import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin } from "antd";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import socketIOClient from "socket.io-client";

// styles
import "./Item_table.css";

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
              <img alt="img" className="Item_img" src={element["photo"]!==null?element["photo"]: require("../../../../../assets/empty_item.png")} />,
              element["item_name"],
              element["brand"],
              element["qty"],
              element["color"],
              element["model_no"],
              element["sale_price"],
              <div
                  color="secondary"
              size="small"
              className={element["qty"]!==0?element["qty"]>=3?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {element["qty"]!==0?element["qty"]>=3?"Available":"Low Stock":"Out Of Stock"}
            </div>
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
            <img alt="img" className="Item_img" src={element["photo"]!==null?element["photo"]: require("../../../../../assets/empty_item.png")} />,
            element["item_name"],
            element["brand"],
            element["qty"],
            element["color"],
            element["model_no"],
            element["sale_price"],
            <div
                  color="secondary"
              size="small"
              className={element["qty"]!==0?element["qty"]>=3?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {element["qty"]!==0?element["qty"]>=3?"Available":"Low Stock":"Out Of Stock"}
            </div>
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
            title={<span className="title_Span">ITEM LIST</span>}
            className="item_table"
            data={itemTableData}
            columns={[
              "IMG",
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
                    className="tblSpinner"
                      size="large"
                      spinning="true"
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
