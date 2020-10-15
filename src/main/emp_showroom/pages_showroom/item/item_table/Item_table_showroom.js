import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

import CurrencyFormat from "react-currency-format";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

//components
import SelectedtModel from "./components/SelectedItem_model";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import DescriptionIcon from "@material-ui/icons/Description";

// styles
import "./Item_table_showroom.css";

import db from "../../../../../config/firebase.js";

export default function ItemTable() {
  const [selectedItemtVisible, setSelectedItemtVisible] = useState(false);

  const [isLoaingToInvoice, setLoaingToInvoice] = useState(false);
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  var [selectedItems, setSelectedItems] = useState([]);
  let history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  const selectedModal = () => {
    setSelectedItemtVisible(true);
  };
  const selectedModalClose = () => {
    setSelectedItemtVisible(false);
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

  const onMakeInvoid = () => {
    if (selectedItems.length > 0) {
      setLoaingToInvoice(true);
      var itemList = [];
      selectedItems.forEach((reItem) => {
        itemList.push({
          qty: 1,
          item: reItem,
        });
      });

      var moveWith = {
        pathname: "/showroom/ui/makeInvoice",
        search: "?query=abc",
        state: { detail: itemList },
      };
      setLoaingToInvoice(false);
      history.push(moveWith);
    } else {
      NotificationManager.info("Please select items");
    }
  };

  // function getIndex(value, arr, prop) {
  //   for (var i = 0; i < arr.length; i++) {
  //     if (arr[i][prop] === value) {
  //       return i;
  //     }
  //   }
  //   return -1; //to handle the case where the value doesn't exist
  // }

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
      {/*Selected Item Model */}

      <Modal
        title="Selected Items"
        visible={selectedItemtVisible}
        footer={null}
        className="model_selected Item"
        onCancel={selectedModalClose}
      >
        <div className="table_selected_Model">
          <div className="model_selected_Main">
            <div className="model_selected_Detail">
              <SelectedtModel />
            </div>
          </div>
        </div>
      </Modal>

      {/*Selected Item Model */}

      <Modal
        title={
          <span className="model_title_Showroom">
            {allTtemData[currentIndx] && allTtemData[currentIndx].data
              ? allTtemData[currentIndx].data.itemName
              : null}
          </span>
        }
        visible={visible}
        footer={null}
        className="model_Item_Showroom"
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="table_Model_Showroom">
          <div className="model_Main_Showroom">
            <div className="model_Detail_Showroom">
              <p className="model_List_Showroom">
                BRAND
                <span className="load_Item_Showroom">
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.brand
                    : " - "}
                </span>
              </p>
              <p>
                QTY
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.qty
                    : " - "}{" "}
                </span>
              </p>
              <p>
                COLOR
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.color
                    : " - "}{" "}
                </span>
              </p>
              <p>
                MODEL NO
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.modelNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                SALE PRICE(LKR)
                <span className="load_Item_Showroom">
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
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.chassisNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CASH PRICE(LKR)
                <span className="load_Item_Showroom">
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
                <span className="load_Item_Showroom">
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
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.noOfInstallments
                    : " - "}{" "}
                </span>
              </p>
              <p>
                AMOUNT PER INSTALLMENT(LKR)
                <span className="load_Item_Showroom">
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
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guarantee.value
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE PERIOD
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.guaranteePeriod
                    : " - "}{" "}
                </span>
              </p>
              <p>
                DISCOUNT(LKR)
                <span className="load_Item_Showroom">
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
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.description
                    : " - "}{" "}
                </span>
              </p>
              <p>
                COMPANY INVOICE NO
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.cInvoiceNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                GUARANTEE CARD NO
                <span className="load_Item_Showroom">
                  {" "}
                  :{" "}
                  {allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.GCardNo
                    : " - "}{" "}
                </span>
              </p>
              <p>
                CREATED DATE
                <span className="load_Item_Showroom">
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
        // onClick={onMakeInvoid}
        onClick={selectedModal}
      >
        {isLoaingToInvoice ? (
          <Spin spinning={isLoaingToInvoice} size="large" />
        ) : (
          "Make Invoice"
        )}
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">All Items</span>}
            className="item_table"
            data={itemTableData}
            columns={columns}
            options={{
              selectableRows: true,
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any field",
              elevation: 4,
              sort: true,

              onRowsSelect: (curRowSelected, allRowsSelected) => {
                selectedItems = [];
                allRowsSelected.forEach((single) => {
                  selectedItems.push(allTtemData[single.dataIndex]);
                });

                // if (
                //   !selectedItems.some(
                //     (item) =>
                //       item.id ===
                //       allTtemData[curRowSelected[0].dataIndex].id
                //   )
                // ) {
                //   selectedItems.push(allTtemData[curRowSelected[0].dataIndex]);
                // } else {

                //   var index = getIndex(
                //     allTtemData[curRowSelected[0].dataIndex],
                //     selectedItems,
                //     "id"
                //   );
                //   if (index >= 0) {
                //     selectedItems.splice(index, 1);
                //   }
                // }
              },
              selectableRowsHeader: false,
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
        <NotificationContainer />
      </Grid>
    </>
  );
}
