import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  FormControl,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import { Spin, DatePicker, Space, Row, Col, List, Divider } from "antd";

// icons
import { CloseOutlined } from "@ant-design/icons";

import firebase from "firebase";
import db from "../../../../../../../config/firebase";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// styles
import "./Selected_Item.css";

async function getQtyStatus(qty) {
  let isOkay = true;

  for (let i = 0; i < Object.keys(qty).length; i++) {
    if (qty[i] <= 0 || qty[i] === null) {
      isOkay = false;
    }
  }
  return isOkay;
}

export default function Selected_Item({ itemListProps, closeModel }) {
  const [selectedType, setSelectedType] = useState("shop");
  const [itemsData, setItemsData] = useState([]);
  // eslint-disable-next-line
  const [qty, setQty] = useState({});
  const [allRoot, setAllRoot] = useState([]);
  // eslint-disable-next-line
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  // eslint-disable-next-line
  const [date, setDate] = useState(null);

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    db.collection("root")
      .get()
      .then((re) => {
        var rawRoot = [];
        re.docs.forEach((each) => {
          rawRoot.push(each.data().root);
        });
        setAllRoot(rawRoot);
      });

    var keepData = [];
    var i = 0;
    itemListProps.forEach((ele) => {
      qty[i] = 1;

      keepData.push({
        i: i,
        id: ele.item.id,
        serialNo: ele.item.data.serialNo,
        modelNo: ele.item.data.modelNo,
        chassisNo: ele.item.data.chassisNo,
        title: ele.item.data.itemName,
        unitprice: ele.item.data.salePrice,
        qty: ele.qty,
        item: ele.item.data,
      });
      i = i + 1;
    });

    setItemsData(keepData);

    // eslint-disable-next-line
  }, [itemListProps]);

  const removeItems = (i, itemId) => {
    var itemsDataLength = itemsData.length;
    let index = itemsData.indexOf((re) => re.id === itemId);
    itemsData.splice(index, 1);
    setItemsData([...itemsData]);
    itemsDataLength = itemsDataLength - 1;
    if (itemsDataLength === 0) {
      closeModel();
    }
  };

  const exchangeItems = async () => {
    getQtyStatus(qty).then(async (reStatus) => {
      if (reStatus) {
        var allItems = await db.collection("item").get();
        itemsData.forEach(async (eachItem) => {
          if (qty[eachItem.i] > 0) {
            if (allItems) {
              if (
                allItems.docs.some(
                  (ob) =>
                    ob.data().itemName === eachItem.item.itemName &&
                    ob.data().brand === eachItem.item.brand &&
                    ob.data().color === eachItem.item.color &&
                    ob.data().cashPrice === eachItem.item.cashPrice &&
                    ob.data().salePrice === eachItem.item.salePrice &&
                    ob.data().noOfInstallments ===
                      eachItem.item.noOfInstallments &&
                    ob.data().amountPerInstallment ===
                      eachItem.item.amountPerInstallment &&
                    ob.data().downPayment === eachItem.item.downPayment &&
                    ob.data().discount === eachItem.item.discount &&
                    ob.data().stock_type === selectedType &&
                    ob.data().modelNo === eachItem.item.modelNo[0]
                )
              ) {
                console.log("dfghjhgjf");

                var newArray = allItems.docs.filter(
                  (ob) =>
                    ob.data().itemName === eachItem.item.itemName &&
                    ob.data().brand === eachItem.item.brand &&
                    ob.data().color === eachItem.item.color &&
                    ob.data().cashPrice === eachItem.item.cashPrice &&
                    ob.data().salePrice === eachItem.item.salePrice &&
                    ob.data().noOfInstallments ===
                      eachItem.item.noOfInstallments &&
                    ob.data().amountPerInstallment ===
                      eachItem.item.amountPerInstallment &&
                    ob.data().downPayment === eachItem.item.downPayment &&
                    ob.data().discount === eachItem.item.discount &&
                    ob.data().stock_type === selectedType &&
                    ob.data().modelNo === eachItem.item.modelNo[0]
                );
                if (newArray) {
                  let modelNosList = [];
                  let serialNosList = [];
                  let chassisNosList = [];

                  for (let q = 0; q < qty[eachItem.i]; q++) {
                    modelNosList.push(eachItem.item.modelNo[q]);
                    serialNosList.push(eachItem.item.serialNo[q]);
                  }

                  let modelNoNewList = modelNosList.concat(
                    newArray[0].data().modelNo
                  );
                  let serialNoNewList = serialNosList.concat(
                    newArray[0].data().serialNo
                  );
                  let chassisNoNewList = chassisNosList.concat(
                    newArray[0].data().chassisNo
                  );

                  let prevUpdaModel = eachItem.item.modelNo.splice(
                    0,
                    qty[eachItem.i]
                  );
                  let prevUpdaSerail = eachItem.item.serialNo.splice(
                    0,
                    qty[eachItem.i]
                  );
                  await db
                    .collection("item")
                    .doc(eachItem.id)
                    .update({
                      qty:
                        eachItem.item.qty - qty[eachItem.i] >= 0
                          ? eachItem.item.qty - qty[eachItem.i]
                          : 0,
                      chassisNo: chassisNoNewList,
                      modelNo: prevUpdaModel,
                      serialNo: prevUpdaSerail,
                    });
                  await db
                    .collection("item")
                    .doc(newArray[0].id)
                    .update({
                      qty: newArray[0].data().qty + qty[eachItem.i],
                      modelNo: modelNoNewList,
                      serialNo: serialNoNewList,
                      chassisNo: chassisNoNewList,
                    })
                    .then((_) => {
                      db.collection("managed_stock_history")
                        .add({
                          date: date,
                          itemId: eachItem.id,
                          item: eachItem.item,
                          qty: qty[eachItem.i],
                          from: eachItem.stock_type,
                          to: selectedType,
                          modelNo: modelNoNewList,
                          serialNo: serialNoNewList,
                        })
                        .then((_) => {
                          setLoadingSubmit(false);
                          window.location.reload();
                        });
                    })
                    .catch(function (error) {
                      setLoadingSubmit(false);
                      window.location.reload();
                    });
                }
              } else {
                let modelNosList = [];
                let serialNosList = [];
                let chassisNosList = [];

                for (let q = 0; q < qty[eachItem.i]; q++) {
                  modelNosList.push(eachItem.item.modelNo[q]);
                  serialNosList.push(eachItem.item.serialNo[q]);
                }

                let prevUpdaModel = eachItem.item.modelNo.splice(
                  0,
                  qty[eachItem.i]
                );
                let prevUpdaSerail = eachItem.item.serialNo.splice(
                  0,
                  qty[eachItem.i]
                );

                await db
                  .collection("item")
                  .doc(eachItem.id)
                  .update({
                    qty:
                      eachItem.item.qty - qty[eachItem.i] >= 0
                        ? eachItem.item.qty - qty[eachItem.i]
                        : 0,
                    chassisNo: chassisNosList,
                    modelNo: prevUpdaModel,
                    serialNo: prevUpdaSerail,
                  });

                let variable = {
                  itemName: eachItem.item.itemName,
                  brand: eachItem.item.brand,
                  modelNo: modelNosList,
                  serialNo: serialNosList,
                  chassisNo: chassisNosList,
                  color: eachItem.item.color,
                  stock_type: selectedType,
                  qty: serialNosList.length,
                  cashPrice: eachItem.item.cashPrice,
                  salePrice: eachItem.item.salePrice,
                  noOfInstallments: eachItem.item.noOfInstallments,
                  amountPerInstallment: eachItem.item.amountPerInstallment,
                  downPayment: eachItem.item.downPayment,
                  guaranteePeriod: eachItem.item.guaranteePeriod,
                  discount: eachItem.item.discount,
                  description: eachItem.item.description,
                  cInvoiceNo: eachItem.item.cInvoiceNo,
                  GCardNo: eachItem.item.GCardNo,
                  guarantee: eachItem.item.guarantee,
                  timestamp: date,
                };

                await db
                  .collection("item")
                  .add(variable)
                  .then((_) => {
                    db.collection("managed_stock_history")
                      .add({
                        date: date,
                        itemId: eachItem.id,
                        item: eachItem.item,
                        qty: qty[eachItem.i],
                        from: eachItem.stock_type,
                        to: selectedType,
                        modelNo: modelNosList,
                        serialNo: serialNosList,
                      })
                      .then((_) => {
                        setLoadingSubmit(false);
                        window.location.reload();
                      });
                  })
                  .catch(function (error) {
                    setLoadingSubmit(false);
                    window.location.reload();
                  });
              }
            }
          } else {
            NotificationManager.warning("Please set qty!");
          }
        });
      } else {
        NotificationManager.warning("Please check again qty of each item!");
      }
    });
  };

  return (
    <Container component="main" className="main_container_root">
      <Typography className="title_root" variant="h5" gutterBottom>
        Selected Items
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_root" />
      </Grid>
      <div className="paper_root">
        <form className="form_root" noValidate>
          <List
            className="model_List"
            itemLayout="horizontal"
            dataSource={itemsData}
            renderItem={(item) => (
              <div className="selcted_model">
                <List.Item>
                  <span className="icons_List"></span>
                  <List.Item.Meta
                    title={
                      <Row>
                        <Col span={5}> {item.title}</Col>
                        <Col span={2}></Col>
                        <Col span={12}>
                          <TextField
                            className="manage_qty"
                            autoComplete="mQty"
                            name="mQty"
                            variant="outlined"
                            required
                            type="number"
                            id="mQty"
                            label="Qty"
                            autoFocus
                            size="small"
                            InputProps={{ inputProps: { min: 0 } }}
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                try {
                                  const { value } = e.target;
                                  db.collection("item")
                                    .doc(item.id)
                                    .get()
                                    .then((doc) => {
                                      if (
                                        Math.round(doc.data().qty) >=
                                        (value === "" ? 1 : value)
                                      ) {
                                        qty[item.i] = parseInt(value);
                                      } else {
                                        NotificationManager.warning(
                                          "Out Of Stock"
                                        );
                                      }
                                    });
                                } catch (error) {
                                  console.error(error);
                                }
                              }
                            }}
                          />
                        </Col>
                        <Col span={5}>
                          <span className="icons_Close">
                            <CloseOutlined
                              onClick={() => removeItems(item.i, item.id)}
                            />
                          </span>
                        </Col>
                      </Row>
                    }
                    description={<span>{item.modelNo[0]}</span>}
                  />
                </List.Item>
                <Divider />
              </div>
            )}
          ></List>

          {/* <p className="validate_updateRoot">{validation}</p> */}
          <Grid className="hr-yt" item xs={12} sm={12}>
            <hr />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              Select a type
            </Grid>
            <Grid item xs={12} sm={6}>
              <Space direction="vertical">
                <FormControl variant="outlined" className="fcontrol">
                  <Select
                    className="roll_selector"
                    size="small"
                    native
                    onChange={handleChange}
                    value={selectedType}
                  >
                    <option onChange={handleChange} value={"main"}>
                      main
                    </option>
                    <option onChange={handleChange} value={"shop"}>
                      shop
                    </option>

                    {allRoot.map((each) => (
                      <option onChange={handleChange} key={each} value={each}>
                        {each}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Space>
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Date :
            </Grid>
            <Grid item xs={12} sm={8}>
              <DatePicker
                onChange={(e) => {
                  if (e !== null) {
                    setDate(firebase.firestore.Timestamp.fromDate(e.toDate()));
                  } else {
                    setDate(null);
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                className="btn_SelectdeDone"
                onClick={exchangeItems}
                  disabled={
                  date === null ||
                  isLoadingSubmit
                    ? true
                    : false
                }
              >
                {isLoadingSubmit ? <Spin size="large" /> : "Done"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <NotificationContainer />
    </Container>
  );
}
