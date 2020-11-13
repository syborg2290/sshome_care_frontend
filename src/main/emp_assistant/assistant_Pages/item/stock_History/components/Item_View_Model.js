import React, { useState } from "react";

import { Row, Col } from "antd";
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



// styles
import "./Item_View_Model.css";

function createData(  SerialNo, ModelNo, ChasisseNo) {
  return {  SerialNo, ModelNo, ChasisseNo };
}

export default function Item_View_Model() {
// eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  const [tableData, setTableData] = useState([]);
 // eslint-disable-next-line
    const [currentIndx, setCurrentIndx] = useState(0);
    
    return (
        <div>
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
    )
}
