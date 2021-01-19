import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import MUIDataTable from "mui-datatables";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

// components
import SelectedItem from "./components/selected_Items/SelectedItem_model";

// icons
import DescriptionIcon from "@material-ui/icons/Description";

// styles
import "./Make_Invoice_table.css";

import db from "../../../../config/firebase.js";

export default function Make_Invoice_table() {
  const [selectedItemtVisible, setSelectedItemtVisible] = useState(false);
  // eslint-disable-next-line
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [isLoaingToInvoice, setLoaingToInvoice] = useState(false);
  // eslint-disable-next-line
  var [selectedItems, setSelectedItems] = useState([]);
  // eslint-disable-next-line
  const [itemList, setItemList] = useState([]);
  const [rowsCount, setRowsCount] = useState(0);

  let history = useHistory();

  const selectedModalClose = () => {
    window.location.reload();
    setSelectedItemtVisible(false);
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
        var itemDataSeMo = [];
        var itemDataSeMoCon = [];

        if (snapshot.docs.length > 0) {
          itemDataSeMoCon.push({
            serialNo: snapshot.docs[0].data().serialNo,
            modelNo: snapshot.docs[0].modelNo,
            chassisNo: snapshot.docs[0].chassisNo,
          });
        }
        snapshot.docs.forEach((element) => {
          itemData.push({
            id: element.id,
            data: element.data(),
          });

          itemDataSeMo.push({
            serialNo: element.data().serialNo,
            modelNo: element.data().modelNo,
            chassisNo: element.data().chassisNo,
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

  const onMakeInvoid = () => {
    if (selectedItems.length > 0) {
      setLoaingToInvoice(true);

      selectedItems.forEach((reItem) => {
        itemList.push({
          qty: 1,
          item: reItem,
          paymentWay: "PayandGo",
        });
      });
      setLoaingToInvoice(false);

      setSelectedItemtVisible(true);
    } else {
      NotificationManager.info("Please select items");
    }
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
      name: "Stock type",
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
      {/*Selected Item Model */}

      <Modal
        title="Selected Items"
        visible={selectedItemtVisible}
        footer={null}
        className="model_selected_Item"
        onCancel={selectedModalClose}
      >
        <div className="table_selected_Model">
          <div className="model_selected_Main">
            <div className="model_selected_Detail">
              <SelectedItem
                closeModel={selectedModalClose}
                itemListProps={itemList}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Button
        variant="contained"
        color="primary"
        className="btn_MakeInvoice_itm"
        endIcon={<DescriptionIcon />}
        onClick={onMakeInvoid}
      >
        {isLoaingToInvoice ? (
          <Spin spinning={isLoaingToInvoice} size="large" />
        ) : (
          "Make Invoice"
        )}
      </Button>

      <Button
        variant="contained"
        className="loadAll"
        color="secondary"
        onClick={() => {
          setIsLoading(true);
          db.collection("item")
            .orderBy("timestamp", "desc")
            .get()
            .then((snapshot) => {
              var newData = [];
              var itemData = [];
              var itemDataSeMo = [];
              var itemDataSeMoCon = [];

              if (snapshot.docs.length > 0) {
                itemDataSeMoCon.push({
                  serialNo: snapshot.docs[0].data().serialNo,
                  modelNo: snapshot.docs[0].modelNo,
                  chassisNo: snapshot.docs[0].chassisNo,
                });
              }
              snapshot.docs.forEach((element) => {
                itemData.push({
                  id: element.id,
                  data: element.data(),
                });

                itemDataSeMo.push({
                  serialNo: element.data().serialNo,
                  modelNo: element.data().modelNo,
                  chassisNo: element.data().chassisNo,
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
            className="item_table"
            data={itemTableData}
            columns={columns}
            options={{
              rowHover: true,
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any field",
              elevation: 4,
              sort: true,
              onRowSelectionChange: (curRowSelected, allRowsSelected) => {
                selectedItems = [];
                allRowsSelected.forEach((single) => {
                  if (allTtemData[single.dataIndex].data.qty > 0) {
                    selectedItems.push(allTtemData[single.dataIndex]);
                  } else {
                    NotificationManager.warning("Out Of Stock");
                  }
                });
              },
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
                    var itemDataSeMo = [];
                    var itemDataSeMoCon = [];

                    if (snapshot.docs.length > 0) {
                      itemDataSeMoCon.push({
                        serialNo: snapshot.docs[0].data().serialNo,
                        modelNo: snapshot.docs[0].modelNo,
                        chassisNo: snapshot.docs[0].chassisNo,
                      });
                    }
                    snapshot.docs.forEach((element) => {
                      itemData.push({
                        id: element.id,
                        data: element.data(),
                      });

                      itemDataSeMo.push({
                        serialNo: element.data().serialNo,
                        modelNo: element.data().modelNo,
                        chassisNo: element.data().chassisNo,
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
                    var itemDataSeMo = [];
                    var itemDataSeMoCon = [];

                    if (snapshot.docs.length > 0) {
                      itemDataSeMoCon.push({
                        serialNo: snapshot.docs[0].data().serialNo,
                        modelNo: snapshot.docs[0].modelNo,
                        chassisNo: snapshot.docs[0].chassisNo,
                      });
                    }
                    snapshot.docs.forEach((element) => {
                      itemData.push({
                        id: element.id,
                        data: element.data(),
                      });

                      itemDataSeMo.push({
                        serialNo: element.data().serialNo,
                        modelNo: element.data().modelNo,
                        chassisNo: element.data().chassisNo,
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
