import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin } from "antd";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import socketIOClient from "socket.io-client";
// components
import { Button } from "../../../Wrappers/Wrappers";

// styles
import "./Item_table.css";

const {
  RealtimeServerApi,
  SeverApi,
} = require("../../../../../config/settings.js");

const dumydata =[
  [<img alt="img"  className="Item_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTwQ_4WDaG622jZ5R3qrM7FREuRobYcWfo_Q&usqp=CAU" />,"dad","dada","dada","dada","dada","dada",
     <div
              color="secondary"
              size="small"
              className={true?false?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {true?false?"Available":"Low Stock":"Out Of Stock"}
            </div>,],

              [<img alt="img"  className="Item_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTwQ_4WDaG622jZ5R3qrM7FREuRobYcWfo_Q&usqp=CAU" />,"dad","dada","dada","dada","dada","dada",  
               <div
                 color="secondary"
              size="small"
              className={false?true?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {false?true?"Available":"Low Stock":"Out Of Stock"}
            </div>,],

              [<img alt="img"  className="Item_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTwQ_4WDaG622jZ5R3qrM7FREuRobYcWfo_Q&usqp=CAU" />,"dad","dada","dada","dada","dada","dada", 
                <div
                color="secondary"
              size="small"
              className={false?false?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {false?false?"Available":"Low Stock":"Out Of Stock"}
            </div>,],

              [<img alt="img"  className="Item_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTwQ_4WDaG622jZ5R3qrM7FREuRobYcWfo_Q&usqp=CAU" />,"dad","dada","dada","dada","dada","dada", 
                <div
                  color="secondary"
              size="small"
              className={true?true?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {true?true?"Available":"Low Stock":"Out Of Stock"}
            </div>,]
]

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
            title={<span className="title_Span">ITEM LIST</span>}
            className="item_table"
            data={dumydata}
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
