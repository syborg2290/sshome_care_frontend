import React, { useState, useEffect } from "react";
import { Grid, Button, TableCell } from "@material-ui/core";
import { Spin, Modal } from "antd";
// import axios from "axios";
import MUIDataTable from "mui-datatables";
// import socketIOClient from "socket.io-client";

import CurrencyFormat from "react-currency-format";
import moment from "moment";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import DescriptionIcon from "@material-ui/icons/Description";

// styles
import "./Item_table_showroom.css";

import db from "../../../../../config/firebase.js";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate";

export default function ItemTable() {
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  // let socket = socketIOClient(RealtimeServerApi);

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    db.collection("item")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var newData = [];
        var itemData = [];
        snapshot.docs.forEach((element) => {
          itemData.push({
            id: element.id,
            data: element.data(),
          });

          newData.push([
            element.data().itemName,
            element.data().brand,
            element.data().qty,
            element.data().color,
            element.data().modelNo,
            <CurrencyFormat
              value={element.data().salePrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
            <div
              className={
                element.data().qty !== 0
                  ? element.data().qty >= 3
                    ? "px-2"
                    : "px-3"
                  : "px-4"
              }
              variant="contained"
            >
              {element.data().qty !== 0 ? (
                element.data().qty >= 3 ? (
                  <p className="status">Available</p>
                ) : (
                  <p className="status">Low Stock</p>
                )
              ) : (
                <p className="status">Out Of Stock</p>
              )}
            </div>,
            <div className="table_icon">
              <VisibilityIcon className="icon_Visible" onClick={showModal} />
            </div>,
          ]);
        });
        setItemTableData(newData);
        setAllItemData(itemData);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   socket.on("messageFromServer", (data) => {
  //     var newData = [];
  //     if (itemTableData.length < 1) {
  //       data.forEach((element) => {
  //         allTtemData.push(element);

  //         newData.push([
  //           <img
  //             alt="img"
  //             className="Item_img"
  //             src={
  //               element["photo"] !== "null"
  //                 ? element["photo"]
  //                 : require("../../../../../assets/empty_item.png")
  //             }
  //           />,
  //           element["item_name"],
  //           element["brand"],
  //           element["qty"],
  //           element["color"],
  //           element["model_no"],
  //           <CurrencyFormat
  //             value={element["sale_price"]}
  //             displayType={"text"}
  //             thousandSeparator={true}
  //             prefix={" "}
  //           />,
  //           <div
  //             color="secondary"
  //             size="small"
  //             className={
  //               element["qty"] !== 0
  //                 ? element["qty"] >= 3
  //                   ? "px-2"
  //                   : "px-3"
  //                 : "px-4"
  //             }
  //             variant="contained"
  //           >
  //             {element["qty"] !== 0
  //               ? element["qty"] >= 3
  //                 ? "Available"
  //                 : "Low Stock"
  //               : "Out Of Stock"}
  //           </div>,
  //           <div className="table_icon">
  //             <VisibilityIcon onClick={showModal} />,
  //             <span className="icon_Edit">
  //               <EditIcon onClick={editModal} />
  //             </span>
  //           </div>,
  //         ]);
  //       });
  //       setItemTableData(newData);
  //     }
  //   });
  //   // eslint-disable-next-line
  // }, [itemTableData]);

  return (
    <>
      <Modal
        title={
          <span className="model_title">
            {allTtemData[currentIndx] && allTtemData[currentIndx].data
              ? allTtemData[currentIndx].data.itemName
              : null}
          </span>
        }
        visible={visible}
        footer={null}
        className="model_Item"
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="table_Model">
          <div className="model_Main">
            {/* <img
              className="model_img"
              src={
                allTtemData.data && allTtemData.data[currentIndx]
                  ? allTtemData.data[currentIndx].photo === "null"
                    ? ""
                    : allTtemData.data[currentIndx].photo
                  : ""
              }
              alt=""
            /> */}
            <div className="model_Detail">
              <p>
                BRAND
                <span className="load_Item">
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.brand
                    : " - "}
                </span>
              </p>
              <p>
                QTY
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.qty
                    : " - "}{" "}
                </span>
              </p>
              <p>
                COLOR
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.color
                    : " - "}{" "}
                </span>
              </p>
              <p>
                MODEL NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.modelNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                SALE PRICE(LKR)
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data ? (
                    <CurrencyFormat
                      value={allTtemData[currentIndx].data.salePrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"  "}
                    />
                  ) : (
                    " - "
                  )}{" "}
                </span>
              </p>
              <p>
                CHASSIS NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.chassisNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CASH PRICE(LKR)
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data ? (
                    <CurrencyFormat
                      value={allTtemData[currentIndx].data.cashPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  ) : (
                    " - "
                  )}{" "}
                </span>
              </p>
              <p>
                DOWN PAYMENT(LKR)
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data ? (
                    <CurrencyFormat
                      value={allTtemData[currentIndx].data.downPayment}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  ) : (
                    " - "
                  )}{" "}
                </span>
              </p>
              <p>
                NO OF INSTALLMENT
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.noOfInstallments
                    : " - "}{" "}
                </span>
              </p>
              <p>
                AMOUNT PER INSTALLMENT(LKR)
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data ? (
                    <CurrencyFormat
                      value={allTtemData[currentIndx].data.amountPerInstallment}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  ) : (
                    " - "
                  )}{" "}
                </span>
              </p>
              <p>
                GUARANTEE MONTHS/YEARS
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee.value
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE PERIOD
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guaranteePeriod
                    : " - "}{" "}
                </span>
              </p>
              <p>
                DISCOUNT(LKR)
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data ? (
                    <CurrencyFormat
                      value={allTtemData[currentIndx].data.discount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  ) : (
                    " - "
                  )}{" "}
                </span>
              </p>
              <p>
                DESCRIPTION
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.description
                    : " - "}{" "}
                </span>
              </p>
              <p>
                COMPANY INVOICE NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.cInvoiceNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE CARD NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.GCardNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CREATED DATE
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {moment
                    .unix(
                      allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.timestamp
                        : " - "
                    )
                    .format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Button
        variant="contained"
        color="primary"
        className="btn_MakeInvoice"
        endIcon={<DescriptionIcon />}
      >
        Make Invoice
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">All Items</span>}
            className="item_table"
            data={itemTableData}
            columns={[
              "Item Name",
              "Brand",
              "Qty",
              "Color",
              "Model No",
              "Sale Price(LKR)",
              "Status",
              "Action",
            ]}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "checkbox",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.rowIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
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
