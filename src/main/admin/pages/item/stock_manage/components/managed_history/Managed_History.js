import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Modal } from "antd";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { Row, Col } from "antd";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import db from "../../../../../../../config/firebase.js";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Managed_History() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [visible, setVisible] = useState(false);

  let history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  const columns = [
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
      name: "Item_Name",
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
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "From",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "To",
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

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("managed_stock_history")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var itemDataTable = [];
        var itemDataAll = [];

        snapshot.docs.forEach((element) => {
          itemDataAll.push({
            id: element.id,
            data: element.data().item,
            serialNo: element.data().serialNo,
            modelNo: element.data().modelNo,
          });

          itemDataTable.push([
            new Date(element.data().date.seconds * 1000).toDateString(),
            element.data().item.itemName,
            element.data().item.brand,
            element.data().qty,
            element.data().from,
            element.data().to,
            <VisibilityIcon onClick={showModal} />,
          ]);
        });

        setTableData(itemDataTable);
        setAllData(itemDataAll);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/*Selected Item Model */}

      <Modal
        title={
          <span className="model_title">
            {allData[currentIndx] && allData[currentIndx].data
              ? allData[currentIndx].data.itemName
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
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.brand
                      : " - "}
                  </span>
                </Col>

                <Col span={12}>QTY</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.qty
                      : " - "}{" "}
                  </span>
                </Col>

                <Col span={12}> COLOR</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.color
                      : " - "}{" "}
                  </span>
                </Col>

                <Col span={12}>SALE PRICE(LKR)</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data ? (
                      <CurrencyFormat
                        value={allData[currentIndx].data.salePrice}
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
                    {allData[currentIndx] && allData[currentIndx].data ? (
                      <CurrencyFormat
                        value={allData[currentIndx].data.cashPrice}
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
                    {allData[currentIndx] && allData[currentIndx].data ? (
                      <CurrencyFormat
                        value={allData[currentIndx].data.downPayment}
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
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.noOfInstallments
                      : " - "}{" "}
                  </span>
                </Col>
                <Col span={12}>AMOUNT PER INSTALLMENT(LKR)</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data ? (
                      <CurrencyFormat
                        value={allData[currentIndx].data.amountPerInstallment}
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
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.guarantee.value
                      : " - "}{" "}
                  </span>
                </Col>
                <Col span={12}>GUARANTEE PERIOD</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.guaranteePeriod
                      : " - "}{" "}
                  </span>
                </Col>
                <Col span={12}>DISCOUNT(LKR)</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data ? (
                      <CurrencyFormat
                        value={allData[currentIndx].data.discount}
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
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.description
                      : " - "}{" "}
                  </span>
                </Col>
                <Col span={12}>COMPANY INVOICE NO</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.cInvoiceNo
                      : " - "}{" "}
                  </span>
                </Col>
                <Col span={12}>GUARANTEE CARD NO</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {allData[currentIndx] && allData[currentIndx].data
                      ? allData[currentIndx].data.GCardNo
                      : " - "}{" "}
                  </span>
                </Col>
                <Col span={12}>CREATED DATE</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span>{" "}
                    {moment(
                      allData[currentIndx] && allData[currentIndx].data
                        ? allData[currentIndx].data.timestamp.seconds * 1000
                        : " - "
                    ).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </span>
                </Col>
                <Col span={12}>STOCK TYPE</Col>
                <Col span={12}>
                  <span className="load_Item">
                    {" "}
                    <span className="colan">:</span> ABC Main
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
                      <TableCell className="tbl_cell" align="left">
                        ModelNo
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allData[currentIndx]?.data.serialNo.length > 0
                      ? allData[currentIndx]?.data.serialNo.map((row) => (
                          <TableRow key={0}>
                            <TableCell component="th" scope="row">
                              {allData[currentIndx]?.data.serialNo.map(
                                (serailNoT) => (
                                  <h5 key={serailNoT}>{serailNoT}</h5>
                                )
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {allData[currentIndx]?.data.modelNo.map(
                                (modelNoT) => (
                                  <h5 key={modelNoT}>{modelNoT}</h5>
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

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Managed Stock History</span>}
            className="selling_histable"
            sty
            data={tableData}
            columns={columns}
            options={{
              selectableRows: "none",
              customToolbarSelect: () => {},
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
