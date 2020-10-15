import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import HelpIcon from "@material-ui/icons/Help";
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
import DeleteIcon from "@material-ui/icons/Delete";

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
  const [editVisible, setEditVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  // let socket = socketIOClient(RealtimeServerApi);

  const showModal = () => {
    setVisible(true);
  };

  const showModalConfirmModal = () => {
    setConfirmVisible(true);
  };

  const editModal = () => {
    setEditVisible(true);
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
              <VisibilityIcon onClick={showModal} />
              <span className="icon_Edit">
                <EditIcon onClick={editModal} />
              </span>
              <span className="icon_delete">
                <DeleteIcon onClick={showModalConfirmModal} />
              </span>
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

  const showDeleteItemsConfirm = async () => {
    await db
      .collection("item")
      .doc(
        allTtemData[currentIndx] && allTtemData[currentIndx].id
          ? allTtemData[currentIndx].id
          : ""
      )
      .delete()
      .then(function () {
        NotificationManager.success("Item deletion successfully!", "Done");
        setConfirmVisible(false);
      })
      .catch(function (error) {
        NotificationManager.warning(
          "Failed to continue the process!",
          "Please try again"
        );
      });
  };

  const editModalClose = () => {
    setEditVisible(false);
  };

  const columns = [
    {
      name: "Item name",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Brand",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Qty",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Color",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Model no",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Sale price(LKR)",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Status",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Action",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  return (
    <>
      <Modal
        title="Confirm your action"
        visible={confirmVisible}
        cancelText="No"
        okText="Yes"
        bodyStyle={{ borderRadius: "30px" }}
        onOk={showDeleteItemsConfirm}
        onCancel={() => {
          setConfirmVisible(false);
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <HelpIcon style={{ color: "red", fontSize: "40" }} />
          <h2 style={{ marginLeft: "20" }}>
            Do you want to delete this item?{" "}
          </h2>
        </div>
      </Modal>
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
                key={
                  allTtemData[currentIndx] && allTtemData[currentIndx].id
                    ? allTtemData[currentIndx].id
                    : ""
                }
                itemNameProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.itemName
                    : ""
                }
                brandProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.brand
                    : ""
                }
                modelNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.modelNo
                    : ""
                }
                chassisNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.chassisNo
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
                    ? allTtemData[currentIndx].data.cashPrice
                    : 0
                }
                salepriceProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.salePrice
                    : 0
                }
                noOfInstallmentsProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.noOfInstallments
                    : 0
                }
                amountPerInstallmentProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.amountPerInstallment
                    : 0
                }
                downPaymentProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.downPayment
                    : 0
                }
                guaranteePeriodProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guaranteePeriod
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
                    ? allTtemData[currentIndx].data.cInvoiceNo
                    : ""
                }
                GCardNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.GCardNo
                    : ""
                }
                guaranteeProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee.value
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

      <Grid className="tbl_Container" container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Item List</span>}
            className="item_table"
            data={itemTableData}
            columns={columns}
            options={{
              selectableRows: false,

              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any field",
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
