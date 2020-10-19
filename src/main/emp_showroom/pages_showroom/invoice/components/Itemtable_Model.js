import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Button } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
// eslint-disable-next-line
import { Spin, Modal } from "antd";
import { Row, Col } from "antd";
import moment from "moment";
// eslint-disable-next-line
import {
  // eslint-disable-next-line
  NotificationContainer,
  // eslint-disable-next-line
  NotificationManager,
  // eslint-disable-next-line
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// styles
import "./Item_table.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import db from "../../../../../config/firebase.js";

export default function Itemtable_Model() {
  const [itemTableData, setItemTableData] = useState([]);
  const [allTtemData, setAllItemData] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

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
      <Button
        variant="contained"
        color="primary"
        className="btn_Addnew"
        endIcon={<AddOutlinedIcon />}
      >
        Add New
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">All Items</span>}
            className="item_table"
            data={itemTableData}
            columns={columns}
            options={{
              rowHover: true,
              selectableRows: true,
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any field",
              elevation: 4,
              sort: true,

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
                <Row>
                  <Col span={12}>BRAND</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.brand
                        : " - "}
                    </span>
                  </Col>

                  <Col span={12}>QTY</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.qty
                        : " - "}{" "}
                    </span>
                  </Col>

                  <Col span={12}> COLOR</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.color
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>MODEL NO</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.modelNo
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>SALE PRICE(LKR)</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] &&
                      allTtemData[currentIndx].data ? (
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
                  </Col>
                  <Col span={12}>CHASSIS NO</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.chassisNo
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>CASH PRICE(LKR)</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] &&
                      allTtemData[currentIndx].data ? (
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
                  </Col>
                  <Col span={12}>DOWN PAYMENT(LKR)</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] &&
                      allTtemData[currentIndx].data ? (
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
                  </Col>
                  <Col span={12}>NO OF INSTALLMENT</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.noOfInstallments
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>AMOUNT PER INSTALLMENT(LKR)</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] &&
                      allTtemData[currentIndx].data ? (
                        <CurrencyFormat
                          value={
                            allTtemData[currentIndx].data.amountPerInstallment
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />
                      ) : (
                        " - "
                      )}{" "}
                    </span>
                  </Col>

                  <Col span={12}>GUARANTEE MONTHS/YEARS</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.guarantee.value
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>GUARANTEE PERIOD</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.guaranteePeriod
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>DISCOUNT(LKR)</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] &&
                      allTtemData[currentIndx].data ? (
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
                  </Col>
                  <Col span={12}>DESCRIPTION</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.description
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>COMPANY INVOICE NO</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.cInvoiceNo
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>GUARANTEE CARD NO</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.GCardNo
                        : " - "}{" "}
                    </span>
                  </Col>
                  <Col span={12}>CREATED DATE</Col>
                  <Col span={12}>
                    <span className="load_Item">
                      {" "}
                      <span className="colan">:</span>{" "}
                      {moment(
                        allTtemData[currentIndx] &&
                          allTtemData[currentIndx].data
                          ? allTtemData[currentIndx].data.timestamp.seconds *
                              1000
                          : " - "
                      ).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Modal>
      </Grid>
    </>
  );
}
