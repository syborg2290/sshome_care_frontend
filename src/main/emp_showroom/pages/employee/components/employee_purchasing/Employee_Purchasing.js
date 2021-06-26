import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Spin } from "antd";
import MUIDataTable from "mui-datatables";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import { useHistory, useLocation } from "react-router-dom";

// components

// icons
import DescriptionIcon from "@material-ui/icons/Description";

// styles
import "./Employee_Purchasing.css";

import db from "../../../../../../config/firebase.js";

export default function Employee_Purchasing() {
  // eslint-disable-next-line
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [isLoaingToInvoice, setLoaingToInvoice] = useState(false);
  // eslint-disable-next-line
  var [selectedItems, setSelectedItems] = useState([]);
  const [empId, setEmpId] = useState(null);
  const location = useLocation();

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    if (location.state?.detail !== null) {
      setEmpId(location.state?.detail);
    }
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
      var nextData = [];

      for (var i = 0; i < selectedItems.length; i++) {
        let obj = {
          i: i,
          id: selectedItems[i].id,
          serialNo: selectedItems[i].data.serialNo,
          modelNo: selectedItems[i].data.modelNo,
          chassisNo: selectedItems[i].data.chassisNo,
          title: selectedItems[i].data.itemName,
          unitprice: selectedItems[i].data.salePrice,
          qty: selectedItems[i].data.qty,
          item: selectedItems[i].data,
          employee: empId,
        };
        nextData.push(obj);
      }
      if (nextData.length === selectedItems.length) {
        if (empId !== undefined) {
          let moveWith = {
            pathname: "/admin/pages/employeeInvoice",
            search: "?query=abc",
            state: { detail: nextData },
          };
          history.push(moveWith);
        } else {
          NotificationManager.info("Please select the employee again(Go back)");
        }
      }
    } else {
      setLoaingToInvoice(true);
      if (empId !== undefined) {
        NotificationManager.info("Please select items");
      } else {
        NotificationManager.info("Please select the employee again(Go back)");
      }

      setLoaingToInvoice(false);
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
      name: "Stock_type",
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
      <Button
        variant="contained"
        color="primary"
        className="btn_MakeInvoice_itm"
        endIcon={<DescriptionIcon />}
        onClick={onMakeInvoid}
        disabled={empId === null}
      >
        Make Invoice
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
