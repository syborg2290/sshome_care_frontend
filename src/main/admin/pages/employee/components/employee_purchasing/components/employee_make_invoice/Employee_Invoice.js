import React, { useState, useEffect } from "react";
import { Modal, Spin, DatePicker, Space, Radio } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
} from "@material-ui/core";

import firebase from "firebase";
import CurrencyFormat from "react-currency-format";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import db from "../../../../../../../../config/firebase.js";

//style
import "./Employee_Invoice.css";

// icon
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function Employee_Invoice() {
  const location = useLocation();
  const [loadingsubmit, setLoadingSubmit] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [tablerows, setTableRows] = useState([]);
  const [itemQty, setItemQty] = useState({});
  const [itemDP, setItemDP] = useState({});
  const [itemDiscount, setItemDiscount] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  // eslint-disable-next-line
  const [days, setDays] = useState(new Date().getDay());
  // eslint-disable-next-line
  const [dates, setDates] = useState(new Date().getDate());
  const [intialTimestamp, setInititialTimestamp] = useState(null);
  const [visibleSerial, setVisibleSerial] = useState(false);
  const [inputsSerialNo, setInputsSerialNo] = useState({});
  const [empId, setEmpId] = useState(null);
  const [invoiceStatus, setInvoiceStatus] = useState("new");
  const [currentIndex, setCurrentIndex] = useState(0);

  let history = useHistory();
  let history2 = useHistory();

  const showModal = () => {
    setVisibleSerial(true);
  };

  const addInput = () => {
    setInputsSerialNo({
      [currentIndex]: {
        ...inputsSerialNo[currentIndex],
        [inputsSerialNo[currentIndex] === undefined
          ? 0
          : Object.keys(inputsSerialNo[currentIndex]).length]: "",
      },
    });
  };
  const handleChangeAddSerialInputs = (e) => {
    setInputsSerialNo({
      [currentIndex]: {
        ...inputsSerialNo[currentIndex],
        [e.target.id]: e.target.value,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history2.push("/connection_lost");
    });

    window.addEventListener(
      "popstate",
      (event) => {
        if (event.state) {
          history.push("/admin/pages/employeePurchasing");
        }
      },
      false
    );

    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );

    setInvoiceNumber("IN-" + Math.floor(Math.random() * 1000000000 + 1));

    if (location.state != null) {
      var tableData = [];
      var keepDataQTY = {};
      var keepDataDP = {};
      var keepDataDiscount = {};
      location.state.detail.forEach((obj) => {
        keepDataQTY[obj.i] = obj.qty;
        keepDataDP[obj.i] = obj.item.salePrice;
        keepDataDiscount[obj.i] = obj.item.discount;
        tableData.push(obj);
      });
      setEmpId(location.state.detail[0].employee);
      setItemDiscount(keepDataDiscount);
      setItemQty(keepDataQTY);
      setItemDP(keepDataDP);
      setTableRows(tableData);
    }

    // eslint-disable-next-line
  }, []);

  const subTotalFunc = () => {
    var subTotalValue = 0;
    for (var a = 0; a < tablerows.length; a++) {
      subTotalValue =
        subTotalValue +
        (itemDP[tablerows[a].i] - itemDiscount[tablerows[a].i]) *
          itemQty[tablerows[a].i];
    }
    let fTotoS = subTotalValue <= 0 ? 0 : subTotalValue;
    return fTotoS;
  };

  const handleQTYChange = (e, itemid, row) => {
    try {
      const { value } = e.target;
      db.collection("item")
        .doc(itemid)
        .get()
        .then((doc) => {
          if (Math.round(doc.data().qty) >= (value === "" ? 1 : value)) {
            setItemQty({
              ...itemQty,
              [row.i]: value,
            });
          } else {
            NotificationManager.warning("Out Of Stock");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line
  const invoiceIntoDb = async () => {
    if (empId !== undefined) {
      setLoadingSubmit(true);

      let arrayItems = [];

      tablerows.forEach((one) => {
        let listOfSerilNo = [];
        let listOfModelNo = [];
        let listOfChassisNo = [];
        for (var n = 0; n < parseInt(itemQty[one.i]); n++) {
          listOfSerilNo.push(one.serialNo[n]);
          listOfModelNo.push(one.modelNo[n]);
        }
        if (listOfSerilNo.length === parseInt(itemQty[one.i])) {
          let objItem = {
            item_id: one.id,
            serialNo: listOfSerilNo,
            modelNo: listOfModelNo,
            chassisNo: listOfChassisNo,
            downpayment: itemDP[one.i] === "" ? 0 : parseInt(itemDP[one.i]),
            qty: parseInt(itemQty[one.i]),
            discount: itemDiscount[one.i] === "" ? 0 : itemDiscount[one.i],
            item_name: one.title,
            stock_type: tablerows[0].item.stock_type,
          };
          arrayItems.push(objItem);
        }
      });

      db.collection("employee")
        .doc(empId)
        .get()
        .then((reEmployee) => {
          db.collection("emp_purchased").add({
            invoice_number: invoiceNumber,
            empId: empId,
            nic: reEmployee.data().nic,
            fname: reEmployee.data().fname,
            lname: reEmployee.data().lname,
            items: arrayItems,
            total: subTotalFunc() - (totalDiscount === "" ? 0 : totalDiscount),
            discount: totalDiscount === "" ? 0 : totalDiscount,
            date: intialTimestamp,
          });
        });

      tablerows.forEach(async (itemUDoc) => {
        let newArray = await await db.collection("item").doc(itemUDoc.id).get();

        let serialNoList = [];
        let modelNoList = [];
        let chassisiNoList = [];
        serialNoList = newArray.data().serialNo;
        modelNoList = newArray.data().modelNo;
        chassisiNoList = newArray.data().chassisNo;

        //++++++++++++++++++++++++++++++++++++++++++++
        let countOfExist = 0;
        for (
          let q = 0;
          q < Object.keys(inputsSerialNo[itemUDoc.i]).length;
          q++
        ) {
          if (serialNoList.indexOf(inputsSerialNo[itemUDoc.i][q]) !== -1) {
            countOfExist++;
            let indexVal = serialNoList.indexOf(inputsSerialNo[itemUDoc.i][q]);
            serialNoList.splice(indexVal, 1);
          } else {
            console.log("Value does not exists!");
          }
        }

        let spliceCount = itemQty[itemUDoc.i] - countOfExist;

        if (spliceCount <= 0) {
          serialNoList.splice(0, spliceCount);
        }

        modelNoList.splice(0, itemQty[itemUDoc.i]);

        //++++++++++++++++++++++++++++++++++++++++++++

        if (invoiceStatus === "new") {
          await db
            .collection("item")
            .doc(itemUDoc.id)
            .update({
              qty: Math.round(newArray.data().qty) - itemQty[itemUDoc.i],
              serialNo: serialNoList,
              modelNo: modelNoList,
              chassisNo: chassisiNoList,
            })
            .then((_) => {
              setLoadingSubmit(false);
              history.push("/admin/ui/employee");
            });
        } else {
          setLoadingSubmit(false);
          history.push("/admin/ui/employee");
        }
      });
    } else {
      NotificationManager.info("Please select the employee again(Go back)");
    }
  };

  return (
    <>
      {/*Start Serial Number Model */}

      <Modal
        visible={visibleSerial}
        footer={null}
        className="serialNumberMod"
        onCancel={() => {
          setVisibleSerial(false);
        }}
      >
        <div>
          <div>
            <div>
              <Container component="main" className="main_container_root">
                <Typography className="title_root" variant="h5" gutterBottom>
                  Add Serial Numbers
                </Typography>
                <Grid item xs={12} sm={2}>
                  <hr className="titles_hr_root" />
                </Grid>
                <div className="paper_root">
                  <form className="form_root" noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <div>
                          <Button className="reltion_add" onClick={addInput}>
                            Add Numbers
                            <PlusOutlined className="reltion_addIcon" />
                          </Button>
                          {Object.keys(inputsSerialNo).length === 0
                            ? null
                            : Object.keys(inputsSerialNo[currentIndex]).map(
                                (i) => (
                                  <div key={i + 1}>
                                    <TextField
                                      key={i + 2}
                                      id={i.toString()}
                                      className="txt_serials"
                                      autoComplete="serial"
                                      name="serial"
                                      variant="outlined"
                                      label="Serial Numbers"
                                      onChange={handleChangeAddSerialInputs}
                                      size="small"
                                      value={inputsSerialNo[currentIndex][i]}
                                    />

                                    {i >=
                                    Object.keys(inputsSerialNo[currentIndex])
                                      .length -
                                      1 ? (
                                      <MinusCircleOutlined
                                        key={i + 3}
                                        className="rmov_iconss"
                                        onClick={() => {
                                          delete inputsSerialNo[currentIndex][
                                            i
                                          ];
                                          setInputsSerialNo({
                                            ...inputsSerialNo,
                                          });
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                )
                              )}
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </Modal>

      {/* End Serial Number Model  */}

      <div className="main_In">
        <Container className="container_In" component="main" maxWidth="xl">
          <div className="paper_in">
            <form className="form_in" noValidate>
              <Typography component="h1" variant="h5">
                Invoice
              </Typography>
              <hr className="hr_invoice" />
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="lbl_invoice">Invoice#</div>
                </Grid>
                <Grid item xs={5}>
                  <h3>{invoiceNumber}</h3>
                </Grid>
                <Grid item xs={5}></Grid>

                <TableContainer className="tbl_Container" component={Paper}>
                  <Table className="table" aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="tbl_Cell">Item</TableCell>
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          Qty
                        </TableCell>
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          Serial Number
                        </TableCell>
                        <TableCell
                          className="tbl_Cell"
                          align="right"
                          colSpan={1}
                        >
                          Sale Price(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Discount(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell" align="right">
                          Sum(LKR)
                        </TableCell>
                        <TableCell className="tbl_Cell_Ac" align="right">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tablerows.map((row) => (
                        <TableRow key={row.i}>
                          <TableCell>{row.title}</TableCell>
                          <TableCell align="right">
                            <TextField
                              key={row.i}
                              id={row.i.toString()}
                              className="txt_qty"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 1 } }}
                              type="number"
                              fullWidth
                              value={itemQty[row.i]}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  handleQTYChange(e, row.id, row);
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <AddCircleOutlineIcon
                              onClick={() => {
                                setCurrentIndex(row.i);
                                showModal();
                              }}
                            />
                          </TableCell>

                          <TableCell align="right">
                            {" "}
                            <TextField
                              className="txt_dpayment"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 0 } }}
                              type="number"
                              fullWidth
                              key={row.i}
                              id={row.i.toString()}
                              value={itemDP[row.i]}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setItemDP({
                                    ...itemDP,
                                    [row.i]: e.target.value,
                                  });
                                }
                              }}
                            />
                          </TableCell>

                          <TableCell align="right">
                            {" "}
                            <TextField
                              className="txt_dpayment"
                              variant="outlined"
                              size="small"
                              InputProps={{ inputProps: { min: 0 } }}
                              type="number"
                              fullWidth
                              key={row.i}
                              id={row.i.toString()}
                              value={itemDiscount[row.i]}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  if (e.target.value < itemDP[row.i]) {
                                    setItemDiscount({
                                      ...itemDiscount,
                                      [row.i]: e.target.value,
                                    });
                                  }
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell
                            align="right"
                            key={row.i}
                            id={row.i.toString()}
                          >
                            {" "}
                            <CurrencyFormat
                              value={
                                parseInt(itemDP[row.i] - itemDiscount[row.i]) *
                                itemQty[row.i]
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={" Rs. "}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <CloseOutlinedIcon
                              className="iconcls_invTbl"
                              onClick={(e) => {
                                tablerows.forEach((itemRe) => {
                                  if (itemRe.i === row.i) {
                                    let index = tablerows.findIndex(
                                      // eslint-disable-next-line
                                      (element) => {
                                        if (element.i === row.i) {
                                          return true;
                                        }
                                      }
                                    );
                                    tablerows.splice(index, 1);
                                    setTableRows([...tablerows]);
                                    if (tablerows.length === 0) {
                                      history.push(
                                        "/admin/pages/employeePurchasing"
                                      );
                                    }
                                    delete itemQty[row.i];
                                    delete itemDP[row.i];
                                    delete itemDiscount[row.i];
                                  }
                                });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell align="right" colSpan={4}>
                          Subtotal(LKR)
                        </TableCell>
                        <TableCell align="right" colSpan={1}>
                          <CurrencyFormat
                            value={subTotalFunc()}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={" Rs. "}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right" colSpan={4}>
                          Discount(LKR)
                        </TableCell>
                        <TableCell className="cel" align="right" colSpan={1}>
                          <TextField
                            className="txt_distg"
                            variant="outlined"
                            size="small"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            fullWidth
                            disabled={true}
                            value={totalDiscount}
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                if (e.target.value < subTotalFunc()) {
                                  setTotalDiscount(e.target.value);
                                }
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="right" colSpan={4}>
                          Total(LKR)
                        </TableCell>
                        <TableCell align="right" colSpan={1}>
                          <CurrencyFormat
                            value={subTotalFunc() - totalDiscount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={" Rs. "}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              {/* //     */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card className="empIn_card">
                    <Grid container spacing={2}>
                      <Grid className="txt_ip_setting" item xs={12} sm={7}>
                        Invoice Status :
                      </Grid>
                      <Grid
                        className="txt_ip_setting"
                        item
                        xs={12}
                        sm={5}
                      ></Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}>
                        Invoice Status
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Radio.Group
                          defaultValue="new"
                          buttonStyle="solid"
                          onChange={(e) => {
                            setInvoiceStatus(e.target.value);
                          }}
                        >
                          <Radio.Button value="new">New record</Radio.Button>
                          <Radio.Button value="old">Old record</Radio.Button>
                        </Radio.Group>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <br />
                      </Grid>
                      <Grid className="lbl_MI" item xs={12} sm={4}></Grid>
                      <Grid item xs={12} sm={6}></Grid>
                      <Grid item xs={12} sm={2}></Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card className="empIn_card">
                    <Grid container spacing={2}>
                      <Grid className="txt_ip_setting" item xs={12} sm={7}>
                        Invoice Dates :
                      </Grid>
                      <Grid
                        className="txt_ip_setting"
                        item
                        xs={12}
                        sm={5}
                      ></Grid>

                      <Grid className="txt_description" item xs={12} sm={4}>
                        Date
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Space direction="vertical">
                          <DatePicker
                            onChange={(e) => {
                              if (e !== null) {
                                setInititialTimestamp(
                                  firebase.firestore.Timestamp.fromDate(
                                    e.toDate()
                                  )
                                );
                                setDates(
                                  new Date(
                                    firebase.firestore.Timestamp.fromDate(
                                      e.toDate()
                                    )?.seconds * 1000
                                  ).getDate()
                                );
                                setDays(
                                  new Date(
                                    firebase.firestore.Timestamp.fromDate(
                                      e.toDate()
                                    )?.seconds * 1000
                                  ).getDay()
                                );
                              } else {
                                setInititialTimestamp(null);
                                setDates(new Date().getDate());
                                setDays(new Date().getDay());
                              }
                            }}
                          />
                        </Space>
                      </Grid>
                      <Grid className="xxx" item xs={12} sm={4}></Grid>

                      <Grid item xs={12} sm={4}></Grid>
                      <Grid item xs={12} sm={4}></Grid>
                      <Grid item xs={12} sm={4}></Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="btn_addCustomer"
                    disabled={
                      empId === undefined ||
                      loadingsubmit ||
                      itemDP.length === 0 ||
                      tablerows.length === 0 ||
                      intialTimestamp === null
                        ? true
                        : false
                    }
                    onClick={invoiceIntoDb}
                    endIcon={<ArrowForwardIcon />}
                  >
                    {loadingsubmit ? <Spin size="large" /> : "Next"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
          <NotificationContainer />
        </Container>
      </div>
    </>
  );
}

export default Employee_Invoice;
