import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import axios from "axios";
import MUIDataTable from "mui-datatables";
// import socketIOClient from "socket.io-client";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

// components
import EditModel from "./components/Edit_model";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

// styles
import "./Item_table.css";

// const {
//   RealtimeServerApi,
//   SeverApi,
// } = require("../../../../../config/settings.js");

import db from "../../../../../config/firebase.js";

export default function ItemTable() {
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  const { confirm } = Modal;
  const [editVisible, setEditVisible] = useState(false);
  // let socket = socketIOClient(RealtimeServerApi);

  const showModal = () => {
    setVisible(true);
  };

  const editModal = () => {
    setEditVisible(true);
  };

  useEffect(() => {
    db.collection("item")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var newData = [];
        snapshot.docs.forEach((element) => {
          allTtemData.push({
            id: element.id,
            data: element.data(),
          });
          newData.push( [
              element.data().item_name,
              element.data().brand,
              element.data().qty,
              element.data().color,
              element.data().model_no,
              <CurrencyFormat
                value={element.data().sale_price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />,
              <div
                color="secondary"
                size="small"
                className={
                  element.data().qty !== 0
                    ? element.data().qty >= 3
                      ? "px-2"
                      : "px-3"
                    : "px-4"
                }
                variant="contained"
              >
                {element.data().qty !== 0
                  ? element.data().qty >= 3
                    ? "Available"
                    : "Low Stock"
                  : "Out Of Stock"}
              </div>,
              <div className="table_icon">
                <VisibilityIcon onClick={showModal} />
                <span className="icon_Edit">
                  <EditIcon onClick={editModal} />
                </span>
              </div>
            ],);

         
        });
        setItemTableData(newData);
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

  const showDeleteItemsConfirm = (rowsDeleted) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Confirm your action",
      onOk() {
        for (var key in rowsDeleted.data) {
          // eslint-disable-next-line

          db.collection("item")
            .doc(
              allTtemData[currentIndx] && allTtemData[currentIndx].data
                ? allTtemData[rowsDeleted.data[key]["index"]].id
                : ""
            )
            .delete()
            .then(function () {
              NotificationManager.success(
                "Item deletion successfully!",
                "Done"
              );
            })
            .catch(function (error) {
              NotificationManager.warning(
                "Failed to continue the process!",
                "Please try again"
              );
            });
        }
      },
      onCancel() {},
    });
  };

  const editModalClose = () => {
    setEditVisible(false);
  };

  return (
    <>
      <Modal
        title={
          <span className="model_title">
            {allTtemData[currentIndx] && allTtemData[currentIndx].data
              ? allTtemData[currentIndx].data.item_name
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
                  {allTtemData.data && allTtemData.data[currentIndx]
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
                    ? allTtemData[currentIndx].data.model_no
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
                      value={allTtemData[currentIndx].data.sale_price}
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
                    ? allTtemData[currentIndx].data.chassis_no
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
                      value={allTtemData[currentIndx].data.cash_price}
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
                      value={allTtemData[currentIndx].data.down_payment}
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
                    ? allTtemData[currentIndx].data.no_of_installments
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
                      value={
                        allTtemData[currentIndx].data.amount_per_installment
                      }
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
                    ? allTtemData[currentIndx].data.guarantee_months_years
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE PERIOD
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee_period
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
                    ? allTtemData[currentIndx].data.company_invoice_no
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE CARD NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee_card_no
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CREATED DATE
                <span className="load_Item">
                 {" "}
                  :{" "} {moment
                    .unix(
                      allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.timestamp
                        : " - "
                    )
                    .format("MMMM Do YYYY, h:mma")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit item"
        visible={editVisible}
        footer={null}
        className="model_edit_Item"
        onCancel={() => {
          setEditVisible(false);
        }}
      >
        <div className="table_edit_Model">
          <div className="model_edit_Main">
            <div className="model_edit_Detail">
              <EditModel
                itemNameProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.item_name
                    : ""
                }
                brandProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.brand
                    : ""
                }
                modelNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.model_no
                    : ""
                }
                chassisNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.chassis_no
                    : ""
                }
                colorProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.color
                    : ""
                }
                qtyProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.qty
                    : 1
                }
                cashpriceProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.cash_price
                    : 0
                }
                salepriceProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.sale_price
                    : 0
                }
                noOfInstallmentsProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.no_of_installments
                    : 0
                }
                amountPerInstallmentProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.amount_per_installment
                    : 0
                }
                downPaymentProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.down_payment
                    : 0
                }
                guaranteePeriodProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee_period
                    : 0
                }
                discountProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.discount
                    : 0
                }
                descriptionProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.description
                    : ""
                }
                cInvoiceNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.company_invoice_no
                    : ""
                }
                GCardNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee_card_no
                    : ""
                }
                guaranteeProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee_months_years
                    : "Years"
                }
                editModalClose={editModalClose}
                docId={
                  allTtemData[currentIndx] && allTtemData[currentIndx].id
                    ? allTtemData[currentIndx].id
                    : ""
                }
              />
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
              onRowsDelete: (rowsDeleted) => {
                showDeleteItemsConfirm(rowsDeleted);
              },
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
          <NotificationContainer />
        </Grid>
      </Grid>
    </>
  );
}
