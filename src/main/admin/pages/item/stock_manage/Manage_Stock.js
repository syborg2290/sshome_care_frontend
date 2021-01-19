import React, { useState, useEffect } from "react";
import { Spin, Modal } from "antd";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";

import CurrencyFormat from "react-currency-format";

import { useHistory } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// components
import SelectedItem from "./components/Selected_item_Model/Selected_Item";

// styles
import "./Manage_Stock.css";

import db from "../../../../../config/firebase.js";

export default function Manage_Stock() {
  // const [selectedItemtVisible, setSelectedItemtVisible] = useState(false);
  const [itemTableData, setItemTableData] = useState([]);
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemModel, setSelectedItemModel] = useState(false);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [managedHistory, setManagedHistory] = useState(false);
  // eslint-disable-next-line
  var [selectedItems, setSelectedItems] = useState([]);

  // eslint-disable-next-line
  const [itemList, setItemList] = useState([]);

  let history = useHistory();

  const [rowsCount, setRowsCount] = useState(0);

  const selectedModalClose = () => {
    window.location.reload();
    setSelectedItemModel(false);
  };

  const onSelectedItem = () => {
    if (selectedItems.length > 0) {
      selectedItems.forEach((reItem) => {
        itemList.push({
          qty: 1,
          item: reItem,
          paymentWay: "PayandGo",
        });
      });
      setSelectedItemModel(true);
    } else {
      NotificationManager.info("Please select items");
    }
  };

  const ManagedHistory = () => {
    setManagedHistory(true);
    history.push("/admin/pages/managedHistory");
  };

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    let rowsCountUse = rowsCount + 25;
    setRowsCount(rowsCountUse);

    db.collection("item")
      .orderBy("timestamp", "desc")
      .limit(25)
      .get()
      .then((snapshot) => {
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
            element.data().modelNoExtra,
            element.data().qty,
            element.data().color === "" ? " - " : element.data().color,
            element.data().guaranteePeriod === ""
              ? " - "
              : element.data().guaranteePeriod +
                " " +
                element.data().guarantee.value.toLowerCase(),
            <CurrencyFormat
              value={element.data().salePrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
            <CurrencyFormat
              value={element.data().cashPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
            element.data().stock_type,
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
          ]);
        });
        setItemTableData(newData);
        setAllItemData(itemData);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);

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
      name: "Model No",
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
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Gurantee period",
      options: {
        filter: false,
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
      name: "Cash price(LKR)",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Stock_Type",
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
  ];

  return (
    <>
      {/*Start Selected Item Model */}

      <Modal
        visible={selectedItemModel}
        footer={null}
        className="selectedItems"
        onCancel={() => {
          window.location.reload();
        }}
      >
        <div>
          <div>
            <div>
              <SelectedItem
                closeModel={selectedModalClose}
                itemListProps={itemList}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Selected Item Model  */}

      <Grid container spacing={4}>
        <Grid item xs={10}>
          <Button
            variant="contained"
            className="btn_manage_his"
            onClick={ManagedHistory}
          >
            Exchange History
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            className="btn_manage_itm"
            onClick={onSelectedItem}
          >
            Manage Item
          </Button>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        className="loadAll"
        onClick={() => {
          setIsLoading(true);
          db.collection("item")
            .orderBy("timestamp", "desc")
            .get()
            .then((snapshot) => {
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
                  element.data().modelNoExtra,
                  element.data().qty,
                  element.data().color === "" ? " - " : element.data().color,
                  element.data().guaranteePeriod === ""
                    ? " - "
                    : element.data().guaranteePeriod +
                      " " +
                      element.data().guarantee.value.toLowerCase(),
                  <CurrencyFormat
                    value={element.data().salePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" "}
                  />,
                  <CurrencyFormat
                    value={element.data().cashPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" "}
                  />,
                  element.data().stock_type,
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
                ]);
              });
              setItemTableData(newData);
              setAllItemData(itemData);
              setIsLoading(false);
            });
        }}
      >
        {isLoading ? <Spin spinning={isLoading} size="small" /> : "Load All"}
      </Button>

      <Grid className="tbl_Container" container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">All Items</span>}
            className="manage_item_table"
            data={itemTableData}
            columns={columns}
            options={{
              rowHover: true,
              draggableColumns: {
                enabled: true,
              },
              responsive: "standard",
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any field",
              elevation: 4,
              sort: true,
              selectableRowsHeader: false,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
              onChangeRowsPerPage: (rowsCountNumber) => {
                setIsLoading(true);
                let rowsCountUseIn = rowsCount + rowsCountNumber;
                setRowsCount(rowsCountUseIn);
                db.collection("item")
                  .orderBy("timestamp", "desc")
                  .limit(rowsCountUseIn)
                  .get()
                  .then((snapshot) => {
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
                        element.data().modelNoExtra,
                        element.data().qty,
                        element.data().color === ""
                          ? " - "
                          : element.data().color,
                        element.data().guaranteePeriod === ""
                          ? " - "
                          : element.data().guaranteePeriod +
                            " " +
                            element.data().guarantee.value.toLowerCase(),
                        <CurrencyFormat
                          value={element.data().salePrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />,
                        <CurrencyFormat
                          value={element.data().cashPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />,
                        element.data().stock_type,
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
                      ]);
                    });
                    setItemTableData(newData);
                    setAllItemData(itemData);
                    setIsLoading(false);
                  });
              },
              onChangePage: () => {
                setIsLoading(true);
                let rowsCountUseIn = rowsCount + 25;
                setRowsCount(rowsCountUseIn);
                db.collection("item")
                  .orderBy("timestamp", "desc")
                  .limit(rowsCountUseIn)
                  .get()
                  .then((snapshot) => {
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
                        element.data().modelNoExtra,
                        element.data().qty,
                        element.data().color === ""
                          ? " - "
                          : element.data().color,
                        element.data().guaranteePeriod === ""
                          ? " - "
                          : element.data().guaranteePeriod +
                            " " +
                            element.data().guarantee.value.toLowerCase(),
                        <CurrencyFormat
                          value={element.data().salePrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />,
                        <CurrencyFormat
                          value={element.data().cashPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />,
                        element.data().stock_type,
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
                      ]);
                    });
                    setItemTableData(newData);
                    setAllItemData(itemData);
                    setIsLoading(false);
                  });
              },
              onRowSelectionChange: (curRowSelected, allRowsSelected) => {
                selectedItems = [];
                allRowsSelected.forEach((single) => {
                  if (allTtemData[single.dataIndex].data.qty > 0) {
                    if (selectedItems.length === 0) {
                      selectedItems.push(allTtemData[single.dataIndex]);
                    } else {
                      NotificationManager.warning(
                        "Only one item can be selected!"
                      );
                    }
                  } else {
                    NotificationManager.warning("Out Of Stock");
                  }
                });
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    ""
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
