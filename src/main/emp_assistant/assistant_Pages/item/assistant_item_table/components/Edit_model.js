import React, { useState } from "react";
import { Form, Radio, Input, Layout, Button, Spin } from "antd";
import Grid from "@material-ui/core/Grid";

import "antd/dist/antd.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// styles
import "../components/Edit_model.css";

//icon
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import db from "../../../../../../config/firebase.js";

const { Content } = Layout;
const { TextArea } = Input;

export default function Edit_model({
  itemNameProp,
  brandProp,
  modelNoProp,
  serialNoProp,
  chassisNoProp,
  colorProp,
  qtyProp,
  cashpriceProp,
  salepriceProp,
  noOfInstallmentsProp,
  amountPerInstallmentProp,
  downPaymentProp,
  guaranteePeriodProp,
  discountProp,
  descriptionProp,
  cInvoiceNoProp,
  GCardNoProp,
  guaranteeProp,
  editModalClose,
  docId,
}) {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [itemName, setItemName] = useState(itemNameProp);
  const [brand, setBrand] = useState(brandProp);
  const [color, setColor] = useState(colorProp);
  const [cashPrice, setCashPrice] = useState(cashpriceProp);
  const [salePrice, setSalePrice] = useState(salepriceProp);
  const [noOfInstallments, setNoOfInstallments] = useState(
    noOfInstallmentsProp
  );
  const [amountPerInstallment, setAmountPerInstallment] = useState(
    amountPerInstallmentProp
  );
  const [downPayment, setDownPayment] = useState(downPaymentProp);
  const [guaranteePeriod, setGuaranteePeriod] = useState(guaranteePeriodProp);
  const [discount, setDiscount] = useState(discountProp);
  const [description, setDescription] = useState(descriptionProp);
  const [cInvoiceNo, setCInvoiceNo] = useState(cInvoiceNoProp);
  const [GCardNo, setGCardNo] = useState(GCardNoProp);
  const [guarantee, setGuarantee] = useState({
    value: guaranteeProp,
  });

  const [validation, setValidation] = useState("");

  const [inputsSerialNo, setInputsSerialNo] = useState({});
  const [inputsModelNo, setInputsModelNo] = useState({});
  const [inputsChassisNo, setInputsChassisNo] = useState({});

  //add InputSerial No
  const addInputSerialNo = () => {
    setInputsSerialNo({
      ...inputsSerialNo,
      [Object.keys(inputsSerialNo).length]: "",
    });
  };
  const handleChangeAddSerialNoInputs = (e,i) => {
    setInputsSerialNo({ ...inputsSerialNo, [i]: e.target.value });
  };

  //add InputModel No
  const addInputModelNo = () => {
    setInputsModelNo({
      ...inputsModelNo,
      [Object.keys(inputsModelNo).length]: "",
    });
  };
  const handleChangeAddModelNoInputs = (e,i) => {
    setInputsModelNo({ ...inputsModelNo, [i]: e.target.value });
  };

  //add InputChassis No
  const addInputChassisNo = () => {
    setInputsChassisNo({
      ...inputsChassisNo,
      [Object.keys(inputsChassisNo).length]: "",
    });
  };
  const handleChangeAddChassisNoInputs = (e,i) => {
    setInputsChassisNo({ ...inputsChassisNo, [i]: e.target.value });
  };
  //

  const radioOnChange = (e) => {
    setGuarantee({
      value: e.target.value,
    });
  };

  const updateItem = async (e) => {
    e.preventDefault();
    let modelNosList = [];
    let serialNosList = [];
    let chassisNosList = [];
    let isInAlreadySerial = false;
    let isInAlreadyModel = false;

    for (var k = 0; k < Object.keys(inputsSerialNo).length; k++) {
      chassisNosList.push(
        inputsChassisNo[k] === null ? null : inputsChassisNo[k]
      );
      db.collection("item")
        .where("modelNo", "==", inputsModelNo[k])
        .get()
        .then((reModel) => {
          if (reModel.docs.length > 0) {
            isInAlreadyModel = true;
          }
        });
      db.collection("item")
        .where("serialNo", "==", inputsSerialNo[k])
        .get()
        .then((reSeril) => {
          if (reSeril.docs.length > 0) {
            isInAlreadySerial = true;
          }
        });
      modelNosList.push(inputsModelNo[k]);
      serialNosList.push(inputsSerialNo[k]);
    }

    if (serialNosList.length === Object.keys(inputsSerialNo).length) {
      if (isInAlreadySerial || isInAlreadyModel) {
        NotificationManager.info(
          "Item serial no & model no must be unique !",
          "Remember validations"
        );
      } else {
        if (itemName === "") {
          setValidation("Item name is required!");
        } else {
          if (brand === "") {
            setValidation("Item brand is required!");
          } else {
            if (
              Object.keys(inputsModelNo).length !==
              Object.keys(inputsSerialNo).length
            ) {
              setValidation("Item model number is required!");
            } else {
              if (
                Object.keys(inputsModelNo).length !==
                Object.keys(inputsSerialNo).length
              ) {
                setValidation("Item Serial number is required!");
              } else {
                if (color === "") {
                  setValidation("Item color is required!");
                } else {
                  if (cashPrice === "") {
                    setValidation("Item cash price is required!");
                  } else {
                    if (salePrice === "") {
                      setValidation("Item sale price is required!");
                    } else {
                      if (noOfInstallments === "") {
                        setValidation("Number of installment is required!");
                      } else {
                        if (amountPerInstallment === "") {
                          setValidation("Amount per installment is required!");
                        } else {
                          if (noOfInstallments === "") {
                            setValidation("Number of installment is required!");
                          } else {
                            if (guaranteePeriod === "") {
                              setValidation(
                                "Item guarantee period is required!"
                              );
                            } else {
                              if (downPayment === "") {
                                setValidation("Item down payment is required!");
                              } else {
                                if (discount === "") {
                                  setValidation("Item discount is required!");
                                } else {
                                  if (cashPrice < 0) {
                                    setValidation(
                                      "Check again the amount of cash price"
                                    );
                                  } else {
                                    if (salePrice < 0) {
                                      setValidation(
                                        "Check again the amount of sale price"
                                      );
                                    } else {
                                      if (noOfInstallments < 0) {
                                        setValidation(
                                          "Check again the value of installments value"
                                        );
                                      } else {
                                        if (amountPerInstallment < 0) {
                                          setValidation(
                                            "Check again the amount per installment"
                                          );
                                        } else {
                                          if (downPayment < 0) {
                                            setValidation(
                                              "Check again the amount of down payment"
                                            );
                                          } else {
                                            if (guaranteePeriod < 0) {
                                              setValidation(
                                                "Check again the value of gurantee period"
                                              );
                                            } else {
                                              if (discount < 0) {
                                                setValidation(
                                                  "Check again the amount of discount"
                                                );
                                              } else {
                                                //Rest of code here
                                                setLoadingSubmit(true);
                                                db.collection("item")
                                                  .doc(docId)
                                                  .get()
                                                  .then((docRe) => {
                                                    let variable = {
                                                      itemName: itemName,
                                                      brand: brand,
                                                      modelNo: modelNosList,
                                                      serialNo: serialNosList,
                                                      chassisNo: chassisNosList,
                                                      color: color,
                                                      qty:
                                                        Math.round(
                                                          docRe.data().qty
                                                        ) +
                                                        serialNosList.length,
                                                      cashPrice: cashPrice,
                                                      salePrice: salePrice,
                                                      noOfInstallments: noOfInstallments,
                                                      amountPerInstallment: amountPerInstallment,
                                                      downPayment: downPayment,
                                                      guaranteePeriod: guaranteePeriod,
                                                      discount: discount,
                                                      description: description,
                                                      cInvoiceNo: cInvoiceNo,
                                                      GCardNo: GCardNo,
                                                      guarantee: guarantee,
                                                    };

                                                    db.collection("item")
                                                      .doc(docId)
                                                      .update(variable)
                                                      .then(function async(
                                                        docRef
                                                      ) {
                                                        db.collection(
                                                          "item_history"
                                                        ).add(variable);
                                                        setLoadingSubmit(false);
                                                        NotificationManager.success(
                                                          "Item updated!",
                                                          "Done"
                                                        );
                                                        editModalClose();
                                                      })
                                                      .catch(function (error) {
                                                        setLoadingSubmit(false);
                                                        NotificationManager.warning(
                                                          "Failed to update the item!",
                                                          "Please try again"
                                                        );
                                                      });
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
  };

  return (
    <>
      <div>
        <Content>
          <Form className="form">
            <Form.Item label="* Item Name">
              <Input
                allowClear
                placeholder="xx Device"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Brand ">
              <Input
                allowClear
                placeholder="xx Brand "
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Color ">
              <Input
                allowClear
                placeholder="xx pink"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="* Cash price (LKR)">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder=" 15000.00"
                value={cashPrice}
                onChange={(e) => {
                  setCashPrice(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="* Sale Price (LKR)">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder="17000.00"
                value={salePrice}
                onChange={(e) => {
                  setSalePrice(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="* No Of Installments  ">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder="20"
                value={noOfInstallments}
                onChange={(e) => {
                  setNoOfInstallments(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="* Amount Per Installment  (LKR)">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder="3000.00"
                value={amountPerInstallment}
                onChange={(e) => {
                  setAmountPerInstallment(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="* Guarantee Months / Years  ">
              <Radio.Group onChange={radioOnChange} value={guarantee.value}>
                <Radio value={"Years"}>Years</Radio>
                <Radio value={"Months"}>Months</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="* Guarantee Period">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder="6"
                value={guaranteePeriod}
                onChange={(e) => {
                  setGuaranteePeriod(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="* Down Payment (LKR)">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder="5000.00"
                value={downPayment}
                onChange={(e) => {
                  setDownPayment(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Discount (LKR)">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder="500.00"
                value={discount}
                onChange={(e) => {
                  if (e.target.value < salePrice) {
                    setDiscount(e.target.value);
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Description ">
              <TextArea
                placeholder="About Item"
                autoSize={{ minRows: 3, maxRows: 5 }}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Company Invoice No ">
              <Input
                allowClear
                placeholder="In-6101"
                value={cInvoiceNo}
                onChange={(e) => {
                  setCInvoiceNo(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Guarantee Card No  ">
              <Input
                allowClear
                placeholder="00101"
                value={GCardNo}
                onChange={(e) => {
                  setGCardNo(e.target.value);
                }}
              />
            </Form.Item>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <hr />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button className="chassisNo_add" onClick={addInputChassisNo}>
                  Chassis Numbers
                  <PlusOutlined className="inpu_addIcon" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={7}>
                {Object.keys(inputsChassisNo).map((i) => (
                  <div key={i + 1}>
                    <Form.Item>
                      <Input
                        className="finput"
                        allowClear
                        key={i + 2}
                        id={i.toString()}
                        onChange={(e)=>handleChangeAddChassisNoInputs(e,i)}
                        placeholder="xxx-chas"
                        end="true"
                      />

                      <MinusCircleOutlined
                        key={i + 3}
                        className="rmov_icos"
                        onClick={() => {
                          delete inputsChassisNo[i];
                          setInputsChassisNo({ ...inputsChassisNo });
                        }}
                      />
                    </Form.Item>
                  </div>
                ))}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button className="inputess" onClick={addInputSerialNo}>
                  Serial Numbers
                  <PlusOutlined className="reltion_addIcon" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={7}>
                {Object.keys(inputsSerialNo).map((i) => (
                  <div key={i + 1}>
                    <Form.Item>
                      <Input
                        className="finput"
                        allowClear
                        key={i + 2}
                        id={i.toString()}
                        placeholder="xxx-serial"
                        onChange={(e)=>handleChangeAddSerialNoInputs(e,i)}
                      />

                      <MinusCircleOutlined
                        key={i + 3}
                        className="rmov_icos"
                        onClick={() => {
                          delete inputsSerialNo[i];
                          setInputsSerialNo({ ...inputsSerialNo });
                        }}
                      />
                    </Form.Item>
                  </div>
                ))}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button className="inputess" onClick={addInputModelNo}>
                  Model Numbers
                  <PlusOutlined className="reltion_addIcon" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={7}>
                {Object.keys(inputsModelNo).map((i) => (
                  <div key={i + 1}>
                    <Form.Item>
                      <Input
                        allowClear
                        key={i + 2}
                        id={i.toString()}
                        placeholder="xxx-model"
                        onChange={(e)=>handleChangeAddModelNoInputs(e,i)}
                      />

                      <MinusCircleOutlined
                        key={i + 3}
                        className="rmov_icos"
                        onClick={() => {
                          delete inputsModelNo[i];
                          setInputsModelNo({ ...inputsModelNo });
                        }}
                      />
                    </Form.Item>
                  </div>
                ))}
              </Grid>
            </Grid>

            <p className="validate_Edit">{validation}</p>
            <Button
              disabled={!loadingSubmit ? false : true}
              className="btn"
              type="primary"
              onClick={updateItem}
            >
              {loadingSubmit ? (
                <Spin spinning={loadingSubmit} size="large" />
              ) : (
                "Update"
              )}
            </Button>
          </Form>

          <NotificationContainer />
        </Content>
      </div>
    </>
  );
}
