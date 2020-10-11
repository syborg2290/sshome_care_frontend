import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Spin, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import socketIOClient from "socket.io-client";
import Moment from "react-moment";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// components
import EditModel from "./components/Edit_model";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

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
  const [visible, setVisible] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  const { confirm } = Modal;
  const [editVisible, setEditVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const editModal = () => {
    setEditVisible(true);
  };

  useEffect(() => {
    axios.get(SeverApi + "item/getAllItems").then((response) => {
      if (response.status === 200) {
        setAllItemData(response);
        response.data.forEach((element) => {
          setItemTableData((oldArray) => [
            ...oldArray,
            [
              <img
                alt="img"
                className="Item_img"
                src={
                  element["photo"] !== null
                    ? element["photo"]
                    : require("../../../../../assets/empty_item.png")
                }
              />,
              element["item_name"],
              element["brand"],
              element["qty"],
              element["color"],
              element["model_no"],
              element["sale_price"],
              <div
                color="secondary"
                size="small"
                className={
                  element["qty"] !== 0
                    ? element["qty"] >= 3
                      ? "px-2"
                      : "px-3"
                    : "px-4"
                }
                variant="contained"
              >
                {element["qty"] !== 0
                  ? element["qty"] >= 3
                    ? "Available"
                    : "Low Stock"
                  : "Out Of Stock"}
              </div>,
              <div className="table_icon">
                <VisibilityIcon onClick={showModal} />,
                <span className="icon_Edit">
                  <EditIcon onClick={editModal} />
                </span>
              </div>,
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
        itemTableData.push([
          <img
            alt="img"
            className="Item_img"
            src={
              element["photo"] !== null
                ? element["photo"]
                : require("../../../../../assets/empty_item.png")
            }
          />,
          element["item_name"],
          element["brand"],
          element["qty"],
          element["color"],
          element["model_no"],
          element["sale_price"],
          <div
            color="secondary"
            size="small"
            className={
              element["qty"] !== 0
                ? element["qty"] >= 3
                  ? "px-2"
                  : "px-3"
                : "px-4"
            }
            variant="contained"
          >
            {element["qty"] !== 0
              ? element["qty"] >= 3
                ? "Available"
                : "Low Stock"
              : "Out Of Stock"}
          </div>,
          <div className="table_icon">
            <VisibilityIcon onClick={showModal} />,
            <span className="icon_Edit">
              <EditIcon onClick={editModal} />
            </span>
          </div>,
        ]);
      });
    });
    // eslint-disable-next-line
  }, []);

  const showDeleteItemsConfirm = (rowsDeleted) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Confirm your action",
      onOk() {
        for (var key in rowsDeleted.data) {
          // eslint-disable-next-line
          if (
            allTtemData.data && [rowsDeleted.data[key]["index"]] &&
            [rowsDeleted.data[key]["index"]].photo
          ) {
            // eslint-disable-next-line
            axios
              .post(SeverApi + "deleteImage/deleteImage", {
                imageUrl:
                  allTtemData.data[rowsDeleted.data[key]["index"]].photo,
              })
              // eslint-disable-next-line
              .then((response) => {
                if (response.status === 200) {
                  if (
                    allTtemData.data &&
                    [rowsDeleted.data[key]["index"]] !== null
                  ) {
                    axios
                      .post(SeverApi + "item/deleteItem", {
                        item_id:
                          allTtemData.data[rowsDeleted.data[key]["index"]]
                            .item_id,
                      })
                      .then((response) => {
                        if (response.status === 200) {
                          console.log("deleted");
                        }
                      });
                  }
                }
              });
          } else {
            // eslint-disable-next-line
            if (allTtemData.data && [rowsDeleted.data[key]["index"]] !== null) {
              axios
                .post(SeverApi + "item/deleteItem", {
                  item_id:
                    allTtemData.data[rowsDeleted.data[key]["index"]].item_id,
                })
                .then((response) => {
                  if (response.status === 200) {
                    NotificationManager.success(
                      "Item deletion successfully!",
                      "Done"
                    );
                    let socketDeleteItem = socketIOClient(RealtimeServerApi);
                    socketDeleteItem.emit("fetchItems");
                  } else {
                    NotificationManager.warning(
                      "Failed to continue the process!",
                      "Please try again"
                    );
                  }
                });
            }
          }
        }
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Modal
        title={
          <span className="model_title">
            {allTtemData.data && allTtemData.data[currentIndx]
              ? allTtemData.data[currentIndx].item_name
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
            <img
              className="model_img"
              src={
                allTtemData.data && allTtemData.data[currentIndx]
                  ? allTtemData.data[currentIndx].photo
                  : ""
              }
              alt=""
            />
            <div className="model_Detail">
              <p>
                BRAND
                <span className="load_Item">
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].brand
                    : " - "}
                </span>
              </p>
              <p>
                QTY
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].qty
                    : " - "}{" "}
                </span>
              </p>
              <p>
                COLOR
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].color
                    : " - "}{" "}
                </span>
              </p>
              <p>
                MODEL NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].model_no
                    : " - "}{" "}
                </span>
              </p>
              <p>
                SALE PRICE
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].sale_price
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CHASSIS NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].chassis_no
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CASH PRICE
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].cash_price
                    : " - "}{" "}
                </span>
              </p>
              <p>
                DOWN PAYMENT
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].down_payment
                    : " - "}{" "}
                </span>
              </p>
              <p>
                NO OF INSTALLMENT
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].no_of_installments
                    : " - "}{" "}
                </span>
              </p>
              <p>
                AMOUNT PER INSTALLMENT
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].amount_per_installment
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE MONTHS/YEARS
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].guarantee_months_years
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE PERIOD
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].guarantee_period
                    : " - "}{" "}
                </span>
              </p>
              <p>
                DISCOUNT
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].discount
                    : " - "}{" "}
                </span>
              </p>
              <p>
                DESCRIPTION
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].description
                    : " - "}{" "}
                </span>
              </p>
              <p>
                COMPANY INVOICE NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].company_invoice_no
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE CARD NO
                <span className="load_Item">
                  {" "}
                  :{" "}
                  {allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].guarantee_card_no
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CREATED DATE
                <span className="load_Item">
                  {" "}
                  :{" "}
                  <Moment format="YYYY/MM/DD">
                    {allTtemData.data && allTtemData.data[currentIndx]
                      ? allTtemData.data[currentIndx].created_at
                      : " - "}
                  </Moment>{" "}
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
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].item_id
                    : null
                }
                item_idProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].item_id
                    : null
                }
                imageUrlProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].photo
                    : null
                }
                itemNameProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].item_name
                    : ""
                }
                brandProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].brand
                    : ""
                }
                modelNoProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].model_no
                    : ""
                }
                chassisNoProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].chassis_no
                    : ""
                }
                colorProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].color
                    : ""
                }
                qtyProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].qty
                    : 1
                }
                cashpriceProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].cash_price
                    : 0
                }
                salepriceProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].sale_price
                    : 0
                }
                noOfInstallmentsProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].no_of_installments
                    : 0
                }
                amountPerInstallmentProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].amount_per_installment
                    : 0
                }
                downPaymentProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].down_payment
                    : 0
                }
                guaranteePeriodProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].guarantee_period
                    : 0
                }
                discountProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].discount
                    : 0
                }
                descriptionProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].description
                    : ""
                }
                cInvoiceNoProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].company_invoice_no
                    : ""
                }
                GCardNoProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].guarantee_card_no
                    : ""
                }
                guaranteeProp={
                  allTtemData.data && allTtemData.data[currentIndx]
                    ? allTtemData.data[currentIndx].guarantee_months_years
                    : "Years"
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
              onRowsDelete: (rowsDeleted) => {
                showDeleteItemsConfirm(rowsDeleted);
                let socketDeleteItem = socketIOClient(RealtimeServerApi);
                socketDeleteItem.emit("fetchItems");
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
