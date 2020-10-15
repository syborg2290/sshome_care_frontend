import React, { useState } from "react";
import { Form, Radio, Input, Layout, Button, Spin } from "antd";
import firebase from "firebase";
import "antd/dist/antd.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
// styles
import "./Additem.css";

import db from "../../../../../config/firebase.js";

const { Content } = Layout;
const { TextArea } = Input;

function AddItem() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNo, setModelNo] = useState("");
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

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImageFile(event.target.files[0]);
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImageUrl(e.target.result);
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };
  // let imageDownloadUrl = "null";
  //                   if (imageFile !== null) {
  //                     const formData = new FormData();
  //                     const options = {
  //                       maxSizeMB: 1,
  //                       maxWidthOrHeight: 1920,
  //                       useWebWorker: true,
  //                     };
  //                     const compressedFile = await imageCompression(
  //                       imageFile,
  //                       options
  //                     );
  //                     formData.append("image", compressedFile);
  //                     const configFile = {
  //                       headers: {
  //                         "content-type": "multipart/form-data",
  //                       },
  //                     };

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
                                              let variable = {
                                                itemName: itemName,
                                                brand: brand,
                                                modelNo: modelNo,
                                                chassisNo: chassisNo,
                                                color: color,
                                                qty: qty,
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
  };

  return (
    <div>
      <Content style={{ margin: "24px 16px 0", backgroundColor: "#FFFFFF" }}>
        <div className="site-layout-background">
          <h2>Add New Item</h2>
          <hr className="line"></hr>
          <div className="xx">
            <Form className="form">
              <Form.Item label="* Item Name">
                <Input
                  required={true}
                  allowClear
                  placeholder="xx Device"
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="* Brand">
                <Input
                  required={true}
                  allowClear
                  placeholder="xx Brand "
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="* Model no ">
                <Input
                  required={true}
                  allowClear
                  placeholder="xx 0091"
                  value={modelNo}
                  onChange={(e) => {
                    setModelNo(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Chassis no ">
                <Input
                  required={true}
                  allowClear
                  placeholder="xx 95091"
                  value={chassisNo}
                  onChange={(e) => {
                    setChassisNo(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="* Color ">
                <Input
                  required={true}
                  allowClear
                  placeholder="xx pink"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="* Qty">
                <Input
                  required={true}
                  type="number"
                  min={1}
                  allowClear
                  placeholder="120 "
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="* Cash price (LKR)">
                <Input
                  required={true}
                  type="number"
                  min={1}
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
                  required={true}
                  type="number"
                  min={1}
                  allowClear
                  placeholder="17000.00"
                  value={salePrice}
                  onChange={(e) => {
                    setSalePrice(e.target.value);
                    if (e.target.value > 0 || e.target.value != null) {
                      setAmountPerInstallment(0);
                    }
                    if (noOfInstallments > 0 && downPayment > 0) {
                      var value = e.target.value;
                      var rest = value - downPayment;
                      var amountPerIns = rest / noOfInstallments;
                      if (amountPerIns > 0) {
                        setAmountPerInstallment(Math.round(amountPerIns));
                      } else {
                        setAmountPerInstallment(0);
                      }
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="* Down Payment (LKR)">
                <Input
                  required={true}
                  type="number"
                  min={1}
                  allowClear
                  placeholder="5000.00"
                  value={downPayment}
                  onChange={(e) => {
                    if (
                      e.target.value > 0 ||
                      e.target.value != null ||
                      salePrice === e.target.value
                    ) {
                      setAmountPerInstallment(0);
                      setNoOfInstallments(0);
                    }
                    var rest = 0;
                    var amountPerIns = 0;
                    setDownPayment(e.target.value);
                    var value = e.target.value;

                    if (value > 0 && value <= 5000) {
                      setNoOfInstallments(3);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 3;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 5001 && value <= 8000) {
                      setNoOfInstallments(4);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 4;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 8001 && value <= 11000) {
                      setNoOfInstallments(5);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 5;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 11001 && value <= 14000) {
                      setNoOfInstallments(6);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 6;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 14001 && value <= 17000) {
                      setNoOfInstallments(7);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 7;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }
                    if (value > 17001 && value <= 20000) {
                      setNoOfInstallments(8);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 8;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 20001 && value <= 23000) {
                      setNoOfInstallments(9);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 9;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 23001 && value <= 26000) {
                      setNoOfInstallments(10);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 10;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 26001 && value <= 29000) {
                      setNoOfInstallments(11);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 11;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }

                    if (value > 29001 && value >= 32000) {
                      setNoOfInstallments(12);
                      if (salePrice > 0) {
                        rest = salePrice - value;
                        amountPerIns = rest / 12;
                        if (amountPerIns > 0) {
                          setAmountPerInstallment(Math.round(amountPerIns));
                        } else {
                          setAmountPerInstallment(0);
                        }
                      }
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="* No Of Installments">
                <Input
                  required={true}
                  type="number"
                  min={1}
                  allowClear
                  placeholder="20"
                  value={noOfInstallments}
                  onChange={(e) => {
                    setNoOfInstallments(e.target.value);
                    if (e.target.value > 0 || e.target.value != null) {
                      setAmountPerInstallment(0);
                    }
                    if (salePrice > 0 && downPayment > 0) {
                      var value = e.target.value;
                      var rest = salePrice - downPayment;
                      var amountPerIns = rest / value;
                      if (amountPerIns > 0) {
                        setAmountPerInstallment(Math.round(amountPerIns));
                      } else {
                        setAmountPerInstallment(0);
                      }
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="* Amount Per Installment (LKR)">
                <Input
                  required={true}
                  type="number"
                  min={1}
                  allowClear
                  placeholder="3000.00"
                  value={amountPerInstallment}
                  onChange={(e) => {
                    setAmountPerInstallment(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Guarantee Months / Years  ">
                <Radio.Group onChange={radioOnChange} value={guarantee.value}>
                  <Radio value={"Years"}>Years</Radio>
                  <Radio value={"Months"}>Months</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="* Guarantee Period">
                <Input
                  required={true}
                  type="number"
                  min={1}
                  allowClear
                  placeholder="6"
                  value={guaranteePeriod}
                  onChange={(e) => {
                    setGuaranteePeriod(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="* Discount (LKR)">
                <Input
                  required={true}
                  type="number"
                  min={1}
                  allowClear
                  placeholder="500.00"
                  value={discount}
                  onChange={(e) => {
                    var value = e.target.value;
                    if (value > 0) {
                      setDiscount(e.target.value);
                      if (salePrice > 0) {
                        var restSalePricce = salePrice - value;
                        if (restSalePricce > 0) {
                          setSalePrice(restSalePricce);
                          if (downPayment > 0 && noOfInstallments > 0) {
                            var amountInst =
                              (salePrice - downPayment) / noOfInstallments;
                            if (amountInst > 0) {
                              setAmountPerInstallment(Math.round(amountInst));
                            } else {
                              setAmountPerInstallment(0);
                            }
                          }
                        }
                      }
                    } else {
                      var newSalePrice = restSalePricce + discount;
                      if (newSalePrice > 0) {
                        setSalePrice(Math.round(newSalePrice));
                      }

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
              {/* <Form.Item label="Upload Image  ">
                <input
                  type="file"
                  accept="image/*"
                  name=""
                  onChange={onImageChange}
                  className="image"
                  id="item_image"
                  hidden
                />
                <img
                  alt="Item upload"
                  onClick={() => {
                    document.getElementById("item_image").click();
                  }}
                  src={
                    imageUrl == null
                      ? require("../../../../../assets/images_upload.png")
                      : imageUrl
                  }
                  className="image"
                />
              </Form.Item> */}

              <Button
                disabled={!loadingSubmit ? false : true}
                className="btn"
                type="primary"
                onClick={addItem}
              >
                {loadingSubmit ? (
                  <Spin spinning={loadingSubmit} size="large" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          </div>
          <NotificationContainer />
        </div>
      </Content>
    </div>
  );
}

export default AddItem;
