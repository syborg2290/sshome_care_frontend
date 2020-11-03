import React, { useState } from "react";
import { Radio, Button, Spin } from "antd";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import firebase from "firebase";
import "antd/dist/antd.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
// styles
import "./Add_Item.css";

import db from "../../../../../config/firebase.js";

export default function Add_Item() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [cashPrice, setCashPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [noOfInstallments, setNoOfInstallments] = useState(0);
  const [amountPerInstallment, setAmountPerInstallment] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [guaranteePeriod, setGuaranteePeriod] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [cInvoiceNo, setCInvoiceNo] = useState("");
  const [GCardNo, setGCardNo] = useState("");

  const [guarantee, setGuarantee] = useState({
    value: "Years",
  });

  const valuesInitialState = () => {
    setItemName("");
    setBrand("");
    setModelNo("");
    setSerialNo("");
    setSerialNo("");
    setChassisNo("");
    setColor("");
    setQty(1);
    setCashPrice(0);
    setSalePrice(0);
    setNoOfInstallments(0);
    setAmountPerInstallment(0);
    setDownPayment(0);
    setGuaranteePeriod(0);
    setDiscount(0);
    setDescription("");
    setCInvoiceNo("");
    setGCardNo("");
    setGuarantee({
      value: "Years",
    });
  };

  const radioOnChange = (e) => {
    setGuarantee({
      value: e.target.value,
    });
  };

  const addItem = async (e) => {
    e.preventDefault();

    if (itemName === "") {
      NotificationManager.info(
        "Item name is required!",
        "Remember validations"
      );
    } else {
      if (brand === "") {
        NotificationManager.info(
          "Item brand is required!",
          "Remember validations"
        );
      } else {
        if (modelNo === "") {
          NotificationManager.info(
            "Item model number is required!",
            "Remember validations"
          );
        } else {
          if (serialNo === "") {
            NotificationManager.info(
              "Item Serial number is required!",
              "Remember validations"
            );
          } else {
            if (color === "") {
              NotificationManager.info(
                "Item color is required!",
                "Remember validations"
              );
            } else {
              if (qty === "") {
                NotificationManager.info(
                  "Qty is required!",
                  "Remember validations"
                );
              } else {
                if (cashPrice === "") {
                  NotificationManager.info(
                    "Item cash price is required!",
                    "Remember validations"
                  );
                } else {
                  if (salePrice === "") {
                    NotificationManager.info(
                      "Item sale price is required!",
                      "Remember validations"
                    );
                  } else {
                    if (noOfInstallments === "") {
                      NotificationManager.info(
                        "Number of installment is required!",
                        "Remember validations"
                      );
                    } else {
                      if (amountPerInstallment === "") {
                        NotificationManager.info(
                          "Amount per installment is required!",
                          "Remember validations"
                        );
                      } else {
                        if (noOfInstallments === "") {
                          NotificationManager.info(
                            "Number of installment is required!",
                            "Remember validations"
                          );
                        } else {
                          if (guaranteePeriod === "") {
                            NotificationManager.info(
                              "Item guarantee period is required!",
                              "Remember validations"
                            );
                          } else {
                            if (downPayment === "") {
                              NotificationManager.info(
                                "Item down payment is required!",
                                "Remember validations"
                              );
                            } else {
                              if (discount === "") {
                                NotificationManager.info(
                                  "Item discount is required!",
                                  "Remember validations"
                                );
                              } else {
                                if (qty < 1) {
                                  NotificationManager.info(
                                    "Qty must be greater than 0",
                                    "Remember validations"
                                  );
                                } else {
                                  if (cashPrice < 0) {
                                    NotificationManager.info(
                                      "Check again the amount of cash price",
                                      "Remember validations"
                                    );
                                  } else {
                                    if (salePrice < 0) {
                                      NotificationManager.info(
                                        "Check again the amount of sale price",
                                        "Remember validations"
                                      );
                                    } else {
                                      if (noOfInstallments < 0) {
                                        NotificationManager.info(
                                          "Check again the value of installments value",
                                          "Remember validations"
                                        );
                                      } else {
                                        if (amountPerInstallment < 0) {
                                          NotificationManager.info(
                                            "Check again the amount per installment",
                                            "Remember validations"
                                          );
                                        } else {
                                          if (downPayment < 0) {
                                            NotificationManager.info(
                                              "Check again the amount of down payment",
                                              "Remember validations"
                                            );
                                          } else {
                                            if (guaranteePeriod < 0) {
                                              NotificationManager.info(
                                                "Check again the value of gurantee period",
                                                "Remember validations"
                                              );
                                            } else {
                                              if (discount < 0) {
                                                NotificationManager.info(
                                                  "Check again the amount of discount",
                                                  "Remember validations"
                                                );
                                              } else {
                                                //Rest of code here
                                                setLoadingSubmit(true);

                                                var value =
                                                  Math.round(salePrice) -
                                                  Math.round(downPayment);
                                                var inst = returnInstallmentCount(
                                                  value
                                                );

                                                var allItems = await db
                                                  .collection("item")
                                                  .get();
                                                if (allItems) {
                                                  if (
                                                    allItems.docs.some(
                                                      (ob) =>
                                                        ob.data().itemName ===
                                                          itemName.trim() &&
                                                        ob.data().brand ===
                                                          brand.trim() &&
                                                        ob.data().chassisNo ===
                                                          chassisNo.trim() &&
                                                        ob.data().color ===
                                                          color.trim() &&
                                                        ob.data().cashPrice ===
                                                          Math.round(
                                                            cashPrice
                                                          ) &&
                                                        ob.data().salePrice ===
                                                          Math.round(
                                                            salePrice
                                                          ) &&
                                                        ob.data()
                                                          .noOfInstallments ===
                                                          Math.round(inst) &&
                                                        ob.data()
                                                          .amountPerInstallment ===
                                                          Math.round(
                                                            amountPerInstallment
                                                          ) &&
                                                        ob.data()
                                                          .downPayment ===
                                                          Math.round(
                                                            downPayment
                                                          ) &&
                                                        ob.data().discount ===
                                                          Math.round(discount)
                                                    )
                                                  ) {
                                                    var newArray = allItems.docs.filter(
                                                      (ob) =>
                                                        ob.data().itemName ===
                                                          itemName.trim() &&
                                                        ob.data().brand ===
                                                          brand.trim() &&
                                                        ob.data().chassisNo ===
                                                          chassisNo.trim() &&
                                                        ob.data().color ===
                                                          color.trim() &&
                                                        ob.data().cashPrice ===
                                                          Math.round(
                                                            cashPrice
                                                          ) &&
                                                        ob.data().salePrice ===
                                                          Math.round(
                                                            salePrice
                                                          ) &&
                                                        ob.data()
                                                          .noOfInstallments ===
                                                          Math.round(inst) &&
                                                        ob.data()
                                                          .amountPerInstallment ===
                                                          Math.round(
                                                            amountPerInstallment
                                                          ) &&
                                                        ob.data()
                                                          .downPayment ===
                                                          Math.round(
                                                            downPayment
                                                          ) &&
                                                        ob.data().discount ===
                                                          Math.round(discount)
                                                    );
                                                    if (newArray) {
                                                      await db
                                                        .collection("item")
                                                        .doc(newArray[0].id)
                                                        .update({
                                                          qty:
                                                            Math.round(
                                                              newArray[0].data()
                                                                .qty
                                                            ) + Math.round(qty),
                                                        })
                                                        .then(function (
                                                          docRef
                                                        ) {
                                                          setLoadingSubmit(
                                                            false
                                                          );
                                                          valuesInitialState();
                                                          NotificationManager.success(
                                                            "Item creation successfully!",
                                                            "Done"
                                                          );
                                                        })
                                                        .catch(function (
                                                          error
                                                        ) {
                                                          setLoadingSubmit(
                                                            false
                                                          );
                                                          NotificationManager.warning(
                                                            "Failed to make the item!",
                                                            "Please try again"
                                                          );
                                                        });
                                                    }
                                                  } else {
                                                    if (inst) {
                                                      let variable = {
                                                        itemName: itemName.trim(),
                                                        brand: brand.trim(),
                                                        modelNo: modelNo.trim(),
                                                        serialNo: serialNo.trim(),
                                                        chassisNo: chassisNo.trim(),
                                                        color: color.trim(),
                                                        qty: Math.round(qty),
                                                        cashPrice: Math.round(
                                                          cashPrice
                                                        ),
                                                        salePrice: Math.round(
                                                          salePrice
                                                        ),
                                                        noOfInstallments: Math.round(
                                                          inst
                                                        ),
                                                        amountPerInstallment: Math.round(
                                                          amountPerInstallment
                                                        ),
                                                        downPayment: Math.round(
                                                          downPayment
                                                        ),
                                                        guaranteePeriod: Math.round(
                                                          guaranteePeriod
                                                        ),
                                                        discount: Math.round(
                                                          discount
                                                        ),
                                                        description: description,
                                                        cInvoiceNo: cInvoiceNo.trim(),
                                                        GCardNo: GCardNo.trim(),
                                                        guarantee: guarantee,
                                                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                      };

                                                      await db
                                                        .collection("item")
                                                        .add(variable)
                                                        .then(function (
                                                          docRef
                                                        ) {
                                                          setLoadingSubmit(
                                                            false
                                                          );
                                                          valuesInitialState();
                                                          NotificationManager.success(
                                                            "Item creation successfully!",
                                                            "Done"
                                                          );
                                                        })
                                                        .catch(function (
                                                          error
                                                        ) {
                                                          setLoadingSubmit(
                                                            false
                                                          );
                                                          NotificationManager.warning(
                                                            "Failed to make the item!",
                                                            "Please try again"
                                                          );
                                                        });
                                                    }
                                                  }
                                                } else {
                                                  if (inst) {
                                                    let variable = {
                                                      itemName: itemName.trim(),
                                                      brand: brand.trim(),
                                                      modelNo: modelNo.trim(),
                                                      serialNo: serialNo.trim(),
                                                      chassisNo: chassisNo.trim(),
                                                      color: color.trim(),
                                                      qty: Math.round(qty),
                                                      cashPrice: Math.round(
                                                        cashPrice
                                                      ),
                                                      salePrice: Math.round(
                                                        salePrice
                                                      ),
                                                      noOfInstallments: Math.round(
                                                        inst
                                                      ),
                                                      amountPerInstallment: Math.round(
                                                        amountPerInstallment
                                                      ),
                                                      downPayment: Math.round(
                                                        downPayment
                                                      ),
                                                      guaranteePeriod: Math.round(
                                                        guaranteePeriod
                                                      ),
                                                      discount: Math.round(
                                                        discount
                                                      ),
                                                      description: description,
                                                      cInvoiceNo: cInvoiceNo.trim(),
                                                      GCardNo: GCardNo.trim(),
                                                      guarantee: guarantee,
                                                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                    };

                                                    await db
                                                      .collection("item")
                                                      .add(variable)
                                                      .then(function (docRef) {
                                                        setLoadingSubmit(false);
                                                        valuesInitialState();
                                                        NotificationManager.success(
                                                          "Item creation successfully!",
                                                          "Done"
                                                        );
                                                      })
                                                      .catch(function (error) {
                                                        setLoadingSubmit(false);
                                                        NotificationManager.warning(
                                                          "Failed to make the item!",
                                                          "Please try again"
                                                        );
                                                      });
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const returnInstallmentCount = (value) => {
    if (value > 0 && value <= 5000) {
      return 3;
    }

    if (value > 5001 && value <= 8000) {
      return 4;
    }

    if (value > 8001 && value <= 11000) {
      return 5;
    }

    if (value > 11001 && value <= 14000) {
      return 6;
    }

    if (value > 14001 && value <= 17000) {
      return 7;
    }
    if (value > 17001 && value <= 20000) {
      return 8;
    }

    if (value > 20001 && value <= 23000) {
      return 9;
    }

    if (value > 23001 && value <= 26000) {
      return 10;
    }

    if (value > 26001 && value <= 29000) {
      return 11;
    }

    if (value > 29001 && value >= 32000) {
      return 12;
    }
  };

  const setInstallmentCount = (value) => {
    if (value > 0 && value <= 5000) {
      setNoOfInstallments(3);
    }

    if (value > 5001 && value <= 8000) {
      setNoOfInstallments(4);
    }

    if (value > 8001 && value <= 11000) {
      setNoOfInstallments(5);
    }

    if (value > 11001 && value <= 14000) {
      setNoOfInstallments(6);
    }

    if (value > 14001 && value <= 17000) {
      setNoOfInstallments(7);
    }
    if (value > 17001 && value <= 20000) {
      setNoOfInstallments(8);
    }

    if (value > 20001 && value <= 23000) {
      setNoOfInstallments(9);
    }

    if (value > 23001 && value <= 26000) {
      setNoOfInstallments(10);
    }

    if (value > 26001 && value <= 29000) {
      setNoOfInstallments(11);
    }

    if (value > 29001 && value >= 32000) {
      setNoOfInstallments(12);
    }
  };

  return (
    <Container component="main" className="main_container">
      <Typography className="titles" variant="h5" gutterBottom>
        Add New Item
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Item Name
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="iname"
                name="iname"
                variant="outlined"
                required={true}
                value={itemName}
                fullWidth
                id="iname"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                label="Name of Item"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Brand
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="brand"
                name="brand"
                variant="outlined"
                fullWidth
                id="brand"
                required={true}
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                label="Brand of Item"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Model no
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="modelNo"
                name="modelNo"
                variant="outlined"
                fullWidth
                id="modelNo"
                required={true}
                value={modelNo}
                onChange={(e) => {
                  setModelNo(e.target.value);
                }}
                label="xx 0091"
                autoFocus
                size="small"
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Chassis no
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="chassisNo"
                name="chassisNo"
                variant="outlined"
                fullWidth
                id="chassisNo"
                required={true}
                value={chassisNo}
                onChange={(e) => {
                  setChassisNo(e.target.value);
                }}
                label="xx 0091"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Serial no
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="serialNo"
                name="serialNo"
                variant="outlined"
                fullWidth
                id="serialNo"
                required={true}
                value={serialNo}
                onChange={(e) => {
                  setSerialNo(e.target.value);
                }}
                label="xx-20097"
                autoFocus
                size="small"
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Color
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="color"
                name="color"
                variant="outlined"
                fullWidth
                id="color"
                required={true}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                label="color of Item"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Qty
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="qty"
                name="qty"
                InputProps={{ inputProps: { min: 1 } }}
                type="number"
                variant="outlined"
                fullWidth
                id="qty"
                required={true}
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                label="Item Qty"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Cash price (LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="cPrice"
                name="cPrice"
                InputProps={{ inputProps: { min: 1 } }}
                type="number"
                variant="outlined"
                fullWidth
                id="cPrice"
                required={true}
                value={cashPrice}
                onChange={(e) => {
                  setCashPrice(e.target.value);
                }}
                label="Cash Price of Item"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Sale Price (LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="sPrice"
                name="sPrice"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                fullWidth
                id="sPrice"
                required={true}
                value={salePrice}
                onChange={(e) => {
                  if (e.target.value.length === 0) {
                    setNoOfInstallments(0);
                  } else {
                    if (e.target.value === downPayment) {
                      setNoOfInstallments(0);
                    } else {
                      if (e.target.value === 0) {
                        setNoOfInstallments(0);
                      } else {
                        if (downPayment > 0 && downPayment < e.target.value) {
                          setInstallmentCount(e.target.value - downPayment);
                        } else {
                          setNoOfInstallments(0);
                        }
                      }
                    }
                  }

                  setSalePrice(e.target.value);
                }}
                label="sale Price"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Down Payment (LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                disabled={salePrice > 0 ? false : true}
                autoComplete="dPayment"
                name="dPayment"
                InputProps={{ inputProps: { min: 0 } }}
                type="number"
                variant="outlined"
                fullWidth
                id="dPayment"
                required={true}
                value={downPayment}
                onChange={(e) => {
                  if (e.target.value.length === 0) {
                    setNoOfInstallments(0);
                  } else {
                    if (e.target.value === salePrice) {
                      setNoOfInstallments(0);
                    } else {
                      if (e.target.value === 0) {
                        setNoOfInstallments(0);
                      } else {
                        if (e.target.value > 0) {
                          setInstallmentCount(salePrice - e.target.value);
                        } else {
                          setNoOfInstallments(0);
                        }
                      }
                    }
                  }

                  setDownPayment(e.target.value);
                }}
                label="Down payment"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * No Of Installments
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                disabled={salePrice > 0 ? false : true}
                autoComplete="nInstallments"
                name="nInstallments"
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
                id="nInstallments"
                required={true}
                value={noOfInstallments}
                onChange={(e) => {
                  setNoOfInstallments(e.target.value);
                }}
                label="Installments"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Amount Per Installment (LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="aPerInstallments"
                disabled={salePrice > 0 ? false : true}
                name="aPerInstallments"
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
                id="aPerInstallments"
                required={true}
                value={amountPerInstallment}
                onChange={(e) => {
                  setAmountPerInstallment(e.target.value);
                }}
                label="Installments Amount"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Guarantee Months / Years
            </Grid>
            <Grid item xs={12} sm={4}>
              <Radio.Group onChange={radioOnChange} value={guarantee.value}>
                <Radio value={"Years"}>Years</Radio>
                <Radio value={"Months"}>Months</Radio>
              </Radio.Group>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Guarantee Period
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="gPeriod"
                name="gPeriod"
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
                id="gPeriod"
                required={true}
                value={guaranteePeriod}
                onChange={(e) => {
                  setGuaranteePeriod(e.target.value);
                }}
                label="Guarantee"
                autoFocus
                size="small"
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Discount (LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                disabled={salePrice > 0 ? false : true}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                fullWidth
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
                label="Discount"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Description :
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="txt_rHofdfme"
                autoComplete="description"
                name="description"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                id="description"
                label="About Item"
                autoFocus
                size="small"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Company Invoice No
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="cInvoiceNo"
                variant="outlined"
                fullWidth
                id="cInvoiceNo"
                required={true}
                value={cInvoiceNo}
                onChange={(e) => {
                  setCInvoiceNo(e.target.value);
                }}
                label="Compny Invoice"
                autoFocus
                size="small"
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              * Guarantee Card No
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="txtt_nic"
                autoComplete="gCardNo"
                name="gCardNo"
                variant="outlined"
                fullWidth
                id="gCardNo"
                required={true}
                value={GCardNo}
                onChange={(e) => {
                  setGCardNo(e.target.value);
                }}
                label="Guarantee No"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={8}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              <Button
                disabled={!loadingSubmit ? false : true}
                className="btnAdd"
                type="primary"
                onClick={addItem}
              >
                {loadingSubmit ? (
                  <Spin spinning={loadingSubmit} size="large" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <NotificationContainer />
    </Container>
  );
}
