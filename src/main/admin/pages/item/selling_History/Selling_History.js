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

// styles
import "./Selling_History.css";

import db from "../../../../../config/firebase.js";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Selling_History() {
  const [currentIndx, setCurrentIndx] = useState(0);
  const [allTtemData, setAllItemData] = useState([]);
  const [itemTableData, setItemTableData] = useState([]);
  const [visible, setVisible] = useState(false);

  let history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("selling_history")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        var allItemData = [];
        var tableData = [];

        snapshot.docs.forEach((element) => {
          allItemData.push({
            id: element.id,
            data: element.data(),
          });

          tableData.push({
            Date: new Date(element.data().date.seconds * 1000).toDateString(),
            Invoice_number: element.data().invoice_number,
            Type: element.data().selectedType,
            Total: (
              <CurrencyFormat
                value={element.data().total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Payment_type: element.data().paymentWay,
            Action: <VisibilityIcon onClick={showModal} />,
          });
        });

        setAllItemData(allItemData);
        setItemTableData(tableData);
      });
    // eslint-disable-next-line
  }, []);

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
      name: "Invoice_number",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Type",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Total",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Payment_type",
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
              ? allTtemData[currentIndx]?.data.invoice_number
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
              {allTtemData[currentIndx]?.data.items.map((eachItem) => (
                <div>
                  <Row>
                    <Col span={12}>Item name</Col>
                    <Col span={12}>
                      <span className="load_Item">
                        {" "}
                        <span className="colan">:</span> {eachItem.item_name}
                      </span>
                    </Col>

                    <Col span={12}>QTY</Col>
                    <Col span={12}>
                      <span className="load_Item">
                        {" "}
                        <span className="colan">:</span> {eachItem.qty}
                      </span>
                    </Col>

                    <Col span={12}>SALE PRICE(LKR)</Col>
                    <Col span={12}>
                      <span className="load_Item">
                        {" "}
                        <span className="colan">:</span>{" "}
                        <CurrencyFormat
                          value={eachItem.downpayment}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"  "}
                        />
                      </span>
                    </Col>

                    <Col span={12}>STOCK TYPE</Col>
                    <Col span={12}>
                      <span className="load_Item">
                        {" "}
                        <span className="colan">:</span> {eachItem.stock_type}
                      </span>
                    </Col>
                  </Row>
                  <hr />
                  <TableContainer
                    component={Paper}
                    className="main_containerNo"
                  >
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
                        {eachItem.serialNo.length > 0
                          ? eachItem.serialNo.map((row) => (
                              <TableRow key={0}>
                                <TableCell component="th" scope="row">
                                  {<h5 key={row}>{row}</h5>}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {eachItem.modelNo.map((modelNoT) => (
                                    <h5 key={Math.random()}>{modelNoT}</h5>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ))
                          : ""}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Selling History</span>}
            className="selling_histable"
            sty
            data={itemTableData}
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
