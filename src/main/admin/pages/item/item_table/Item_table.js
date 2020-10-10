import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import socketIOClient from "socket.io-client";
import Moment from 'react-moment';

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
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible,setVisible] = useState(false);
  const [currentIndx,setCurrentIndx] = useState(0);
  
  const showModal = () => {
   setVisible(true)
  };

  useEffect(() => {
    axios.get(SeverApi + "item/getAllItems").then((response) => {
      if (response.status === 200) {
        setAllItemData(response);
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
              </div>,
               <div className="table_icon">
                <VisibilityIcon onClick={showModal}/>,
            <span className="icon_Edit"><EditIcon/></span>
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
     setAllItemData(data);
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
            </div>,
            <div className="table_icon">
                <VisibilityIcon onClick={showModal}/>,
            <span className="icon_Edit"><EditIcon/></span>
            </div>
          
          ],
        ]);
      });
    });
    
  }, []);

  return (
   
    <>
    <Modal
        title={<span className="model_title">{allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].item_name : null}</span>}
        visible={visible}
        footer={null}
        className="model_Item"
        onCancel={
          () => {
            setVisible(false)       
           }
        }
        >
<div className="table_Model">
<div className="model_Main">
          <img className="model_img" src={allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].photo : ""} alt="" />
           <div className="model_Detail">
            <p>BRAND<span className="load_Item">: {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].brand : " - "}</span></p>
            <p>QTY<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].qty : " - "} </span></p>
            <p>COLOR<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].color : " - "} </span></p>
            <p>MODEL NO<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].model_no : " - "} </span></p>
            <p>SALE PRICE<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].sale_price : " - "} </span></p>
            <p>CHASSIS NO<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].chassis_no : " - "} </span></p>
            <p>CASH PRICE<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].cash_price : " - "} </span></p>
            <p>DOWN PAYMENT<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].down_payment : " - "} </span></p>
            <p>NO OF INSTALLMENT<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].no_of_installments : " - "} </span></p>
            <p>AMOUNT PER INSTALLMENT<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].amount_per_installment : " - "} </span></p>
            <p>GUARANTEE MONTHS/YEARS<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].guarantee_months_years : " - "} </span></p>
            <p>GUARANTEE PERIOD<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].guarantee_period : " - "} </span></p>
            <p>DISCOUNT<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].discount : " - "} </span></p>
            <p>DESCRIPTION<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].description : " - "} </span></p>
            <p>COMPANY INVOICE NO<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].company_invoice_no : " - "} </span></p>
              <p>GUARANTEE CARD NO<span className="load_Item"> : {allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].guarantee_card_no : " - "} </span></p>
              <p>CREATED DATE<span className="load_Item"> : <Moment format="YYYY/MM/DD">{allTtemData.data && allTtemData.data[currentIndx] ? allTtemData.data[currentIndx].created_at  : " - "}</Moment> </span></p>
            </div>
            </div>
</div>
          
        </Modal>
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
              "ACTION",
              
            ]}
            options={{
              filterType: "checkbox",
              download:false,
              print:false,
              searchPlaceholder:"Search using any column names",
              elevation: 4,
              sort: true,
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
