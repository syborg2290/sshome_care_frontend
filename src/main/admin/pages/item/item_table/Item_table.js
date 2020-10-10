import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import socketIOClient from "socket.io-client";
// components
import { Button } from "../../../Wrappers/Wrappers";

// icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';



// styles
import "./Item_table.css";

const {
  RealtimeServerApi,
  SeverApi,
} = require("../../../../../config/settings.js");



export default function ItemTable() {
  const [itemTableData, setItemTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible,setVisible] = useState(false);
   const [currentIndx,setCurrentIndx] = useState(0);
  

  const showModal = () => {
   setVisible(true)
  };

 

  const dumydata =[
  [<img alt="img"  className="Item_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTwQ_4WDaG622jZ5R3qrM7FREuRobYcWfo_Q&usqp=CAU" />,"dad","dada","dada","dada","dada","dada",
     <div
              color="secondary"
              size="small"
              className={true?false?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {true?false?"Available":"Low Stock":"Out Of Stock"}
            </div>,
            <div className="table_Icon">

            <VisibilityIcon/>
            <span className="icon_Edit"><EditIcon/></span>
            
          </div>
          
          ],

              [<img alt="img"  className="Item_img" src="https://upload.wikimedia.org/wikipedia/commons/9/92/The_death.png" />,"dad","dada","dada","dada","dada","dada",  
               <div
                 color="secondary"
              size="small"
              className={false?true?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {false?true?"Available":"Low Stock":"Out Of Stock"}
            </div>, 
             <div className="table_Icon">

            <VisibilityIcon/>
            <span className="icon_Edit"><EditIcon/></span>
            
          </div>
          ],

              [<img alt="img"  className="Item_img" src="https://www.thetoyshop.com/medias/542391-Primary-515Wx515H?context=bWFzdGVyfGltYWdlc3wyMTI4ODF8aW1hZ2UvcG5nfGltYWdlcy9oMGQvaGQ0LzkxNzkwMzk1NjM4MDYucG5nfDY5ZDM3MGExMzczNjU2NzBjM2ZmYjAwMmU3ZjhhZmI0ZmM1Y2ExZDc3Y2IwZDNjODhkMWY1ZDBiZDdmZDJiYTI" />,"dad","dada","dada","dada","dada","dada", 
                <div
                color="secondary"
              size="small"
              className={false?false?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {false?false?"Available":"Low Stock":"Out Of Stock"}
            </div>, 
             <div className="table_Icon">

            <VisibilityIcon/>
            <span className="icon_Edit"><EditIcon/></span>
            
          </div>
          ],

              [<img alt="img"  className="Item_img" src="https://www.nintendo.com/content/dam/noa/en_US/characters/Kirby_B_character.png" />,"dad","dada","dada","dada","dada","dada", 
                <div
                  color="secondary"
              size="small"
              className={true?true?"px-2":"px-3":"px-4"}
              variant="contained"
            >
             {true?true?"Available":"Low Stock":"Out Of Stock"}
            </div>, 
             <div className="table_Icon">

            <VisibilityIcon onClick={showModal}/>
            <span className="icon_Edit"><EditIcon/></span>
            
          </div>
          ]
]

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
    <Modal
        title="Basic Modal"
        visible={visible}
        footer={null}

        onCancel={
          ()=>{
            setVisible(false)       
           }
        }
        >
<div className="table_Model">

          <img className="model_img" src={dumydata[3][0]} alt={dumydata[3][1]}/>
</div>
          
        </Modal>
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
              "ACTION",
              
            ]}
            options={{
              filterType: "checkbox",
          onRowClick:(rowData, rowMeta)=>{
            setCurrentIndx(rowMeta.rowIndex);
          },
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
