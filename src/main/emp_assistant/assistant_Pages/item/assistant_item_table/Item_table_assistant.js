import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import HelpIcon from "@material-ui/icons/Help";
import MUIDataTable from "mui-datatables";
import { Row, Col } from "antd";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import moment from "moment";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


// components
import EditModel from "./components/Edit_model";
// eslint-disable-next-line
import SelectedItem from "./components/selected_Items/SelectedItem_model";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";

// styles
import "./Item_table_assistant.css";


import db from "../../../../../config/firebase.js";

function createData(  SerialNo, ModelNo, ChasisseNo) {
  return {  SerialNo, ModelNo, ChasisseNo };
}


export default function Item_table_assistant() {
   
  const [selectedItemtVisible, setSelectedItemtVisible] = useState(false);
   const [tableData, setTableData] = useState([]);
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  // let socket = socketIOClient(RealtimeServerApi);
  const [isLoaingToInvoice, setLoaingToInvoice] = useState(false);
  // eslint-disable-next-line
  var [selectedItems, setSelectedItems] = useState([]);

  // eslint-disable-next-line
  const [itemList, SetItemList] = useState([]);

  const showModal = () => {
    setVisible(true);
  };

  const showModalConfirmModal = () => {
    setConfirmVisible(true);
  };

  const editModal = () => {
    setEditVisible(true);
  };

  const selectedModalClose = () => {
    window.location.reload();
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
            // element.data().serialNo,
            // element.data().modelNo,
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
    window.location.reload();
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

      {/*Selected Item Model */}

      <Modal
        className="confo_model"
        closable={null}
        visible={confirmVisible}
        cancelText="No"
        okText="Yes"
        bodyStyle={{ borderRadius: "30px" }}
        onOk={showDeleteItemsConfirm}
        onCancel={() => {
          window.location.reload();
          setConfirmVisible(false);
        }}
      >
        <div className="confoModel_body">
          <HelpIcon className="confo_Icon" />
          <h3 className="txtConfoModel_body">
            Do you want to delete this item?{" "}
          </h3>
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
          window.location.reload();
          setVisible(false);
        }}
      >
        <div className="table_Model">
          <div className="model_Main">
            <div className="model_Detail">
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
                {/* <Col span={12}>MODEL NO</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allTtemData[currentIndx] && allTtemData[currentIndx].data
                      ? allTtemData[currentIndx].data.modelNo
                      : " - "}{" "}
                  </span>
                </Col>
                <Col span={12}>SERIAL NO</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allTtemData[currentIndx] && allTtemData[currentIndx].data
                      ? allTtemData[currentIndx].data.serialNo
                      : " - "}{" "}
                  </span>
                </Col> */}
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
                {/* <Col span={12}>CHASSIS NO</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allTtemData[currentIndx] && allTtemData[currentIndx].data
                      ? allTtemData[currentIndx].data.chassisNo
                      : " - "}{" "}
                  </span>
                </Col> */}
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
                      allTtemData[currentIndx] && allTtemData[currentIndx].data
                        ? allTtemData[currentIndx].data.timestamp.seconds * 1000
                        : " - "
                    ).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </span>
                </Col>
              </Row>
               <hr />
         <TableContainer component={Paper} className="main_containerNo">
          <Table className="gass_Table" size="small" aria-label="a dense table">
            <TableHead className="No_Table_head">
              <TableRow>
                <TableCell className="tbl_cell">SerialNo</TableCell>
                <TableCell className="tbl_cell"align="right">ModelNo</TableCell>
                <TableCell className="tbl_cell" align="right">ChasisseNo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.SerialNo}>
                  <TableCell component="th" scope="row">
                    {row.SerialNo}
                  </TableCell>
                  <TableCell align="right">{row.ModelNo}</TableCell>
                  <TableCell align="right">{row.ChasisseNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
          window.location.reload();
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
                serialNoProp={
                  allTtemData[currentIndx] && allTtemData[currentIndx].data
                    ? allTtemData[currentIndx].data.serialNo
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

      <Grid className="tbl_Container" container spacing={4}>
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
              onRowsSelect: (curRowSelected, allRowsSelected) => {
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
