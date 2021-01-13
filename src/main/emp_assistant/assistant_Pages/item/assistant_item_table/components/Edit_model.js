import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import firebase from "firebase";

const { Content } = Layout;
const { TextArea } = Input;

export default function Edit_model({
  itemNameProp,
  brandProp,
  colorProp,
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
  purchasedPriceProp,
  docId,
}) {
   const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [itemName, setItemName] = useState(itemNameProp);
  const [brand, setBrand] = useState(brandProp);
  const [color, setColor] = useState(colorProp);
  const [cashPrice, setCashPrice] = useState(cashpriceProp);
  const [salePrice, setSalePrice] = useState(salepriceProp);
  const [purchasedPrice, setPurchasedPrice] = useState(purchasedPriceProp);
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
  // const [inputsModelNo, setInputsModelNo] = useState({});
  //const [inputsChassisNo, setInputsChassisNo] = useState({});

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
  });

  //add InputSerial No
  const addInputSerialNo = () => {
    if (Object.keys(inputsSerialNo).length > 0) {
      // let previous = Object.keys(inputsSerialNo).length - 1;
      db.collection("serail_no")
        .get()
        .then((re) => {
          if (re.docs.length > 0) {
            if (
              re.docs[0]
                .data()
                .serail_no.some(
                  (ob) =>
                    ob ===
                    inputsSerialNo[Object.keys(inputsSerialNo).length - 1]
                )
            ) {
              delete inputsSerialNo[Object.keys(inputsSerialNo).length - 1];
              setInputsSerialNo({
                ...inputsSerialNo,
              });
              NotificationManager.info("Item serial number must be unique !");
            } else {
              let randomNumber = Math.floor(Math.random() * 1000000000) + 1000;

              setInputsSerialNo({
                ...inputsSerialNo,
                [Object.keys(inputsSerialNo).length]: `SE-${randomNumber}`,
              });
            }
          } else {
            let randomNumber = Math.floor(Math.random() * 1000000000) + 1000;

            setInputsSerialNo({
              ...inputsSerialNo,
              [Object.keys(inputsSerialNo).length]: `SE-${randomNumber}`,
            });
          }
        });
    } else {
      let randomNumber = Math.floor(Math.random() * 1000000000) + 1000;

      setInputsSerialNo({
        ...inputsSerialNo,
        [Object.keys(inputsSerialNo).length]: `SE-${randomNumber}`,
      });
    }
  };

  const checkSerialNumber = async () => {
    await db
      .collection("serail_no")
      .get()
      .then((re) => {
        if (re.docs.length > 0) {
          if (
            re.docs[0]
              .data()
              .serail_no.some(
                (ob) =>
                  ob === inputsSerialNo[Object.keys(inputsSerialNo).length - 1]
              )
          ) {
            delete inputsSerialNo[Object.keys(inputsSerialNo).length - 1];
            setInputsSerialNo({
              ...inputsSerialNo,
            });
            NotificationManager.info("Item serial number must be unique !");
          }
        }
      });
  };

  const handleOnChangeAddSerialNoInputs = (e, i) => {
    const { value } = e.target;

    setInputsSerialNo({ ...inputsSerialNo, [i]: value });
  };

  //add InputModel No
  // const addInputModelNo = () => {
  //   if (Object.keys(inputsModelNo).length < 1) {
  //     setInputsModelNo({
  //       ...inputsModelNo,
  //       [Object.keys(inputsModelNo).length]: "",
  //     });
  //   }
  // };
  // const handleChangeAddModelNoInputs = (e, i) => {
  //   setInputsModelNo({ ...inputsModelNo, [i]: e.target.value });
  // };

  const radioOnChange = (e) => {
    setGuarantee({
      value: e.target.value,
    });
  };

  const updateItem = async (e) => {
    e.preventDefault();

    checkSerialNumber().then((reCheckS) => {
      let serialNosList = [];
      let chassisNosList = [];
   

      for (var k = 0; k < Object.keys(inputsSerialNo).length; k++) {
        serialNosList.push(inputsSerialNo[k]);
      }

      let duplicatesSerial = serialNosList.reduce(
        (acc, currentValue, index, array) => {
          if (
            array.indexOf(currentValue) !== index &&
            !acc.includes(currentValue)
          )
            acc.push(currentValue);
          return acc;
        },
        []
      );

      let emptySerial = serialNosList.includes("");

      if (duplicatesSerial.length > 0) {
        NotificationManager.info("Serail number must be unique !");
      } else {
        if (emptySerial) {
          NotificationManager.info("Serail number can not be empty !");
        } else {
          if (serialNosList.length >= Object.keys(inputsSerialNo).length) {
            if (itemName === "") {
              setValidation("Item name is required!");
            } else {
              if (brand === "") {
                setValidation("Item brand is required!");
              } else {
                if (serialNosList.includes("")) {
                  setValidation("Serial number is required!");
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
                            setValidation(
                              "Amount per installment is required!"
                            );
                          } else {
                            if (noOfInstallments === "") {
                              setValidation(
                                "Number of installment is required!"
                              );
                            } else {
                              if (guaranteePeriod === "") {
                                setValidation(
                                  "Item guarantee period is required!"
                                );
                              } else {
                                if (downPayment === "") {
                                  setValidation(
                                    "Item down payment is required!"
                                  );
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
                                                      let modelNoNewList = [];
                                                       
                                                      for (
                                                        let k = 0;
                                                        k <
                                                        serialNosList.length;
                                                        k++
                                                      ) {
                                                        modelNoNewList.push(
                                                          docRe.data()
                                                            .modelNoExtra
                                                        );
                                                      }

                                                      if (
                                                        modelNoNewList.length >=
                                                        serialNosList.length
                                                      ) {
                                                        let newTTTTMo = modelNoNewList.concat(
                                                          docRe.data().modelNo
                                                        );

                                                        let serialNoNewList = serialNosList.concat(
                                                          docRe.data().serialNo
                                                        );
                                                        let chassisNoNewList = chassisNosList.concat(
                                                          docRe.data().chassisNo
                                                        );
                                                        let variable = {
                                                          itemName: itemName,
                                                          brand: brand,
                                                          modelNo: newTTTTMo,
                                                            modelNoExtra:newTTTTMo[0],
                                                          serialNo: serialNoNewList,
                                                          chassisNo: chassisNoNewList,
                                                          color: color,
                                                          purchasedPrice: docRe.data()
                                                            .purchasedPrice,
                                                          qty:
                                                            Math.round(
                                                              docRe.data().qty
                                                            ) +
                                                            serialNosList.length,
                                                          cashPrice:
                                                            cashPrice === ""
                                                              ? 0
                                                              : cashPrice,
                                                          salePrice:
                                                            salePrice === ""
                                                              ? 0
                                                              : salePrice,
                                                          noOfInstallments:
                                                            noOfInstallments ===
                                                            ""
                                                              ? 0
                                                              : noOfInstallments,
                                                          amountPerInstallment:
                                                            amountPerInstallment ===
                                                            ""
                                                              ? 0
                                                              : amountPerInstallment,
                                                          downPayment:
                                                            downPayment === ""
                                                              ? 0
                                                              : downPayment,
                                                          guaranteePeriod:
                                                            guaranteePeriod ===
                                                            ""
                                                              ? 0
                                                              : guaranteePeriod,
                                                          discount:
                                                            discount === ""
                                                              ? 0
                                                              : discount,
                                                          description: description,
                                                          cInvoiceNo: cInvoiceNo,
                                                          GCardNo: GCardNo,
                                                          guarantee: guarantee,
                                                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                        };

                                                        let variable2 = {
                                                          itemName: itemName,
                                                          brand: brand,
                                                          modelNo: modelNoNewList,
                                                            modelNoExtra:modelNoNewList[0],
                                                          serialNo: serialNosList,
                                                          chassisNo: chassisNosList,
                                                          purchasedPrice: docRe.data()
                                                            .purchasedPrice,
                                                          color: color,
                                                          qty:
                                                            serialNosList.length,
                                                          cashPrice:
                                                            cashPrice === ""
                                                              ? 0
                                                              : cashPrice,
                                                          salePrice:
                                                            salePrice === ""
                                                              ? 0
                                                              : salePrice,
                                                          noOfInstallments:
                                                            noOfInstallments ===
                                                            ""
                                                              ? 0
                                                              : noOfInstallments,
                                                          amountPerInstallment:
                                                            amountPerInstallment ===
                                                            ""
                                                              ? 0
                                                              : amountPerInstallment,
                                                          downPayment:
                                                            downPayment === ""
                                                              ? 0
                                                              : downPayment,
                                                          guaranteePeriod:
                                                            guaranteePeriod ===
                                                            ""
                                                              ? 0
                                                              : guaranteePeriod,
                                                          discount:
                                                            discount === ""
                                                              ? 0
                                                              : discount,
                                                          description: description,
                                                          cInvoiceNo: cInvoiceNo,
                                                          GCardNo: GCardNo,
                                                          guarantee: guarantee,
                                                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                        };

                                                        db.collection("item")
                                                          .doc(docId)
                                                          .update(variable)
                                                          .then(function async(
                                                            docRef
                                                          ) {
                                                            if (
                                                              serialNoNewList.length >
                                                              0
                                                            ) {
                                                              db.collection(
                                                                "item_history"
                                                              ).add(variable2);
                                                              db.collection(
                                                                "serail_no"
                                                              )
                                                                .get()
                                                                .then(
                                                                  (
                                                                    reSerial
                                                                  ) => {
                                                                    if (
                                                                      reSerial
                                                                        .docs
                                                                        .length >
                                                                      0
                                                                    ) {
                                                                      let reSerialChange = reSerial?.docs[0]
                                                                        ?.data()
                                                                        .serail_no.concat(
                                                                          serialNosList
                                                                        );
                                                                      db.collection(
                                                                        "serail_no"
                                                                      )
                                                                        .doc(
                                                                          reSerial
                                                                            .docs[0]
                                                                            .id
                                                                        )
                                                                        .update(
                                                                          {
                                                                            serail_no: reSerialChange,
                                                                          }
                                                                        );
                                                                    }
                                                                  }
                                                                );
                                                            }

                                                            setLoadingSubmit(
                                                              false
                                                            );
                                                            NotificationManager.success(
                                                              "Item updated!"
                                                            );
                                                            window.location.reload();
                                                          })
                                                          .catch(function (
                                                            error
                                                          ) {
                                                            setLoadingSubmit(
                                                              false
                                                            );
                                                            NotificationManager.warning(
                                                              "Failed to update the item!",
                                                              "Please try again"
                                                            );
                                                          });
                                                      }
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
    });
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
                disabled={true}
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
                  if (e.target.value !== "") {
                    setCashPrice(e.target.value);
                  }
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
                  if (e.target.value !== "") {
                    setSalePrice(e.target.value);
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="* Purchased Price (LKR)">
              <Input
                type="number"
                min={0}
                allowClear
                placeholder="17000.00"
                value={purchasedPrice}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setPurchasedPrice(e.target.value);
                  }
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
                  if (e.target.value !== "") {
                    setNoOfInstallments(e.target.value);
                  }
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
                  if (e.target.value !== "") {
                    setAmountPerInstallment(e.target.value);
                  }
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
                  if (e.target.value !== "") {
                    setGuaranteePeriod(e.target.value);
                  }
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
                  if (e.target.value !== "") {
                    setDownPayment(e.target.value);
                  }
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
                  if (e.target.value < salePrice && e.target.value !== "") {
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
            <Grid container spacing={2}></Grid>

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
                        value={inputsSerialNo[i]}
                        onChange={(e) => handleOnChangeAddSerialNoInputs(e, i)}
                      />

                      {i >= Object.keys(inputsSerialNo).length - 1 ? (
                        <>
                          <MinusCircleOutlined
                            key={i + 3}
                            className="rmov_icos"
                            onClick={() => {
                              delete inputsSerialNo[i];
                              setInputsSerialNo({ ...inputsSerialNo });
                            }}
                          />
                          {
                            <h4>
                              {"Serial numbers count :  " +
                                Object.keys(inputsSerialNo).length}
                            </h4>
                          }
                        </>
                      ) : (
                        ""
                      )}
                    </Form.Item>
                  </div>
                ))}
              </Grid>
            </Grid>

            {/* <Grid container spacing={2}>
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
                        onChange={(e) => handleChangeAddModelNoInputs(e, i)}
                      />

                      {i >= Object.keys(inputsModelNo).length - 1 ? (
                        <MinusCircleOutlined
                          key={i + 3}
                          className="rmov_icos"
                          onClick={() => {
                            delete inputsModelNo[i];
                            setInputsModelNo({ ...inputsModelNo });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Form.Item>
                  </div>
                ))}
              </Grid>
            </Grid> */}

            <p className="validate_Edit">{validation}</p>
            <Button
              // disabled={!loadingSubmit ? false : true}
              className="btn"
              type="primary"
              onClick={updateItem}
              disabled={
                loadingSubmit || itemName.length === 0 || brand.length === 0
              }
            >
              {loadingSubmit ? (
                <Spin spinning={loadingSubmit} size="default" />
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
