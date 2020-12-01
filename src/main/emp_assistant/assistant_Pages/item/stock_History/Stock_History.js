import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Modal } from "antd";
import MUIDataTable from "mui-datatables";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Row, Col } from "antd";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { useHistory } from "react-router-dom";

// styles
import "./Stock_History.css";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import db from "../../../../../config/firebase.js";

export default function Stock_History() {
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [itemListSeMo, setItemListSeMo] = useState([]);
  const [itemListSeMoCon, setItemListSeMoCon] = useState([]);
  let history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("item_history")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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

          newData.push({
            Item_name: element.data().itemName,
            Brand: element.data().brand,
            Qty: element.data().qty,
            Cash_price: (
              <CurrencyFormat
                value={element.data().cashPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Date: moment(element.data()?.timestamp?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
            Action: (
              <div className="table_icon">
                <VisibilityIcon onClick={showModal} />
              </div>
            ),
          });
        });
        setItemTableData(newData);
        setAllItemData(itemData);
        setItemListSeMoCon(itemDataSeMoCon);
        setItemListSeMo(itemDataSeMo);
      });
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: "Item_name",
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
      name: "Cash_price",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Date",
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
                <Table
                  className="gass_Table"
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead className="No_Table_head">
                    <TableRow>
                      <TableCell className="tbl_cell">SerialNo</TableCell>
                      <TableCell className="tbl_cell" align="right">
                        ModelNo
                      </TableCell>
                      <TableCell className="tbl_cell" align="right">
                        ChasisseNo
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemListSeMoCon.length > 0
                      ? itemListSeMoCon.map((row) => (
                          <TableRow key={0}>
                            <TableCell component="th" scope="row">
                              {itemListSeMo[currentIndx]?.serialNo.map(
                                (serailNoT) => (
                                  <h5 key={serailNoT}>{serailNoT}</h5>
                                )
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {itemListSeMo[currentIndx]?.modelNo.map(
                                (modelNoT) => (
                                  <h5 key={modelNoT}>{modelNoT}</h5>
                                )
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {itemListSeMo[currentIndx]?.chassisNo.map(
                                (chassisNoT) => (
                                  <h5 key={chassisNoT}>{chassisNoT}</h5>
                                )
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      : ""}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </Modal>

      <Grid className="tbl_Container" container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Stock history</span>}
            className="item_table"
            data={itemTableData}
            columns={columns}
            options={{
              rowHover: true,
              // selectableRows: false,
              selectableRows: "none",
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
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
