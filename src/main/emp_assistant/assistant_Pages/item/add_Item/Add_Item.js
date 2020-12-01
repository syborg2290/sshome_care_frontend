import React, { useState, useEffect } from "react";
import { Radio, Button, Spin } from "antd";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import firebase from "firebase";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

//icon
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

// styles
import "./Add_Item.css";

import db from "../../../../../config/firebase.js";

export default function Add_Item() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
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

  const [inputsSerialNo, setInputsSerialNo] = useState({});
  const [inputsModelNo, setInputsModelNo] = useState({});
  const [inputsChassisNo, setInputsChassisNo] = useState({});
  const [isInAlreadySerial, setIsInAlreadySerial] = useState(false);
  const [isInAlreadyModel, setIsInAlreadyModel] = useState(false);

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
              setInputsSerialNo({
                ...inputsSerialNo,
                [Object.keys(inputsSerialNo).length]: "",
              });
            }
          } else {
            setInputsSerialNo({
              ...inputsSerialNo,
              [Object.keys(inputsSerialNo).length]: "",
            });
          }
        });
    } else {
      setInputsSerialNo({
        ...inputsSerialNo,
        [Object.keys(inputsSerialNo).length]: "",
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

  const handleChangeAddSerialNoInputs = (e, i) => {
    const { value } = e.target;

    setInputsSerialNo({ ...inputsSerialNo, [i]: value });
  };

  //add InputModel No
  const addInputModelNo = () => {
    setInputsModelNo({
      ...inputsModelNo,
      [Object.keys(inputsModelNo).length]: "",
    });
  };
  const handleChangeAddModelNoInputs = (e, i) => {
    setInputsModelNo({ ...inputsModelNo, [i]: e.target.value });
  };

  //add InputChassis No
  const addInputChassisNo = () => {
    setInputsChassisNo({
      ...inputsChassisNo,
      [Object.keys(inputsChassisNo).length]: "",
    });
  };
  const handleChangeAddChassisNoInputs = (e, i) => {
    setInputsChassisNo({ ...inputsChassisNo, [i]: e.target.value });
  };
  //

  const [guarantee, setGuarantee] = useState({
    value: "Years",
  });

  const valuesInitialState = () => {
    setItemName("");
    setBrand("");
    setColor("");
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
    setInputsSerialNo({});
    setInputsChassisNo({});
    setInputsModelNo({});
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

    checkSerialNumber().then(async (checks) => {
      let modelNosList = [];
      let serialNosList = [];
      let chassisNosList = [];

      if (
        Object.keys(inputsSerialNo).length ===
          Object.keys(inputsModelNo).length &&
        Object.keys(inputsSerialNo).length ===
          Object.keys(inputsChassisNo).length &&
        Object.keys(inputsModelNo).length ===
          Object.keys(inputsChassisNo).length
      ) {
        for (var k = 0; k < Object.keys(inputsSerialNo).length; k++) {
          chassisNosList.push(
            inputsChassisNo[k] === "" ? "" : inputsChassisNo[k]
          );
          db.collection("item")
            .where("modelNo", "==", inputsModelNo[k])
            .get()
            .then((reModel) => {
              if (reModel.docs.length > 0) {
                setIsInAlreadyModel(true);
              }
            });
          db.collection("item")
            .where("serialNo", "==", inputsSerialNo[k])
            .get()
            .then((reSeril) => {
              if (reSeril.docs.length > 0) {
                setIsInAlreadySerial(true);
              }
            });
          modelNosList.push(inputsModelNo[k]);
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

        let duplicatesModel = modelNosList.reduce(
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

        let emptyModels = modelNosList.includes("");

        let duplicatesChassis = chassisNosList.reduce(
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

        let emptyChassis = chassisNosList.includes("");

        if (duplicatesSerial.length > 0) {
          NotificationManager.info("Serail number must be unique !");
        } else {
          if (duplicatesModel.length > 0) {
            NotificationManager.info("Model number must be unique !");
          } else {
            if (duplicatesChassis.length > 0) {
              NotificationManager.info("Chassis number must be unique !");
            } else {
              if (emptySerial) {
                NotificationManager.info("Serail number can not be empty !");
              } else {
                if (emptyModels) {
                  NotificationManager.info("Model number can not be empty !");
                } else {
                  if (emptyChassis) {
                    NotificationManager.info(
                      "Chassis number can not be empty !"
                    );
                  } else {
                    if (
                      serialNosList.length >= Object.keys(inputsSerialNo).length
                    ) {
                      if (isInAlreadySerial && isInAlreadyModel) {
                        NotificationManager.info(
                          "Item serial no & model no must be unique !"
                        );
                      } else {
                        if (itemName === "") {
                          NotificationManager.info("Item name is required!");
                        } else {
                          if (brand === "") {
                            NotificationManager.info("Item brand is required!");
                          } else {
                            if (
                              Object.keys(inputsModelNo).length === 0 ||
                              Object.keys(inputsModelNo).length !==
                                Object.keys(inputsSerialNo).length ||
                              modelNosList.includes("")
                            ) {
                              NotificationManager.info(
                                "Item model number & serial number is required!"
                              );
                            } else {
                              if (
                                Object.keys(inputsSerialNo).length === 0 ||
                                Object.keys(inputsModelNo).length !==
                                  Object.keys(inputsSerialNo).length ||
                                serialNosList.includes("")
                              ) {
                                NotificationManager.info(
                                  "Item model number & serial number is required!"
                                );
                              } else {
                                if (color === "") {
                                  NotificationManager.info(
                                    "Item color is required!"
                                  );
                                } else {
                                  if (cashPrice === "") {
                                    NotificationManager.info(
                                      "Item cash price is required!"
                                    );
                                  } else {
                                    if (salePrice === "") {
                                      NotificationManager.info(
                                        "Item sale price is required!"
                                      );
                                    } else {
                                      if (noOfInstallments === "") {
                                        NotificationManager.info(
                                          "Number of installment is required!"
                                        );
                                      } else {
                                        if (amountPerInstallment === "") {
                                          NotificationManager.info(
                                            "Amount per installment is required!"
                                          );
                                        } else {
                                          if (guaranteePeriod === "") {
                                            NotificationManager.info(
                                              "Item guarantee period is required!"
                                            );
                                          } else {
                                            if (downPayment === "") {
                                              NotificationManager.info(
                                                "Item down payment is required!"
                                              );
                                            } else {
                                              if (discount === "") {
                                                NotificationManager.info(
                                                  "Item discount is required!"
                                                );
                                              } else {
                                                if (cashPrice < 0) {
                                                  NotificationManager.info(
                                                    "Check again the amount of cash price"
                                                  );
                                                } else {
                                                  if (salePrice < 0) {
                                                    NotificationManager.info(
                                                      "Check again the amount of sale price"
                                                    );
                                                  } else {
                                                    if (noOfInstallments < 0) {
                                                      NotificationManager.info(
                                                        "Check again the value of installments value"
                                                      );
                                                    } else {
                                                      if (
                                                        amountPerInstallment < 0
                                                      ) {
                                                        NotificationManager.info(
                                                          "Check again the amount per installment"
                                                        );
                                                      } else {
                                                        if (downPayment < 0) {
                                                          NotificationManager.info(
                                                            "Check again the amount of down payment"
                                                          );
                                                        } else {
                                                          if (
                                                            guaranteePeriod < 0
                                                          ) {
                                                            NotificationManager.info(
                                                              "Check again the value of gurantee period"
                                                            );
                                                          } else {
                                                            if (discount < 0) {
                                                              NotificationManager.info(
                                                                "Check again the amount of discount"
                                                              );
                                                            } else {
                                                              //Rest of code here
                                                              setLoadingSubmit(
                                                                true
                                                              );
                                                              var value =
                                                                Math.round(
                                                                  salePrice
                                                                ) -
                                                                Math.round(
                                                                  downPayment
                                                                );
                                                              var inst = returnInstallmentCount(
                                                                value
                                                              );
                                                              var allItems = await db
                                                                .collection(
                                                                  "item"
                                                                )
                                                                .get();
                                                              if (allItems) {
                                                                if (
                                                                  allItems.docs.some(
                                                                    (ob) =>
                                                                      ob.data()
                                                                        .itemName ===
                                                                        itemName.trim() &&
                                                                      ob.data()
                                                                        .brand ===
                                                                        brand.trim() &&
                                                                      ob.data()
                                                                        .color ===
                                                                        color.trim() &&
                                                                      ob.data()
                                                                        .cashPrice ===
                                                                        Math.round(
                                                                          cashPrice
                                                                        ) &&
                                                                      ob.data()
                                                                        .salePrice ===
                                                                        Math.round(
                                                                          salePrice
                                                                        ) &&
                                                                      ob.data()
                                                                        .noOfInstallments ===
                                                                        Math.round(
                                                                          inst
                                                                        ) &&
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
                                                                      ob.data()
                                                                        .discount ===
                                                                        Math.round(
                                                                          discount
                                                                        )
                                                                  )
                                                                ) {
                                                                  var newArray = allItems.docs.filter(
                                                                    (ob) =>
                                                                      ob.data()
                                                                        .itemName ===
                                                                        itemName.trim() &&
                                                                      ob.data()
                                                                        .brand ===
                                                                        brand.trim() &&
                                                                      ob.data()
                                                                        .color ===
                                                                        color.trim() &&
                                                                      ob.data()
                                                                        .cashPrice ===
                                                                        Math.round(
                                                                          cashPrice
                                                                        ) &&
                                                                      ob.data()
                                                                        .salePrice ===
                                                                        Math.round(
                                                                          salePrice
                                                                        ) &&
                                                                      ob.data()
                                                                        .noOfInstallments ===
                                                                        Math.round(
                                                                          inst
                                                                        ) &&
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
                                                                      ob.data()
                                                                        .discount ===
                                                                        Math.round(
                                                                          discount
                                                                        )
                                                                  );
                                                                  if (
                                                                    newArray
                                                                  ) {
                                                                    let modelNoNewList = modelNosList.concat(
                                                                      newArray[0].data()
                                                                        .modelNo
                                                                    );
                                                                    let serialNoNewList = serialNosList.concat(
                                                                      newArray[0].data()
                                                                        .serialNo
                                                                    );
                                                                    let chassisNoNewList = chassisNosList.concat(
                                                                      newArray[0].data()
                                                                        .chassisNo
                                                                    );
                                                                    let variable2 = {
                                                                      itemName: itemName.trim(),
                                                                      brand: brand.trim(),
                                                                      modelNo: modelNosList,
                                                                      serialNo: serialNosList,
                                                                      chassisNo: chassisNosList,
                                                                      color: color.trim(),
                                                                      qty:
                                                                        serialNoNewList.length,
                                                                      cashPrice:
                                                                        cashPrice ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              cashPrice
                                                                            ),
                                                                      salePrice:
                                                                        salePrice ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              salePrice
                                                                            ),
                                                                      noOfInstallments:
                                                                        inst ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              inst
                                                                            ),
                                                                      amountPerInstallment:
                                                                        amountPerInstallment ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              amountPerInstallment
                                                                            ),
                                                                      downPayment:
                                                                        downPayment ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              downPayment
                                                                            ),
                                                                      guaranteePeriod:
                                                                        guaranteePeriod ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              guaranteePeriod
                                                                            ),
                                                                      discount:
                                                                        discount ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              discount
                                                                            ),
                                                                      description: description,
                                                                      cInvoiceNo: cInvoiceNo,
                                                                      GCardNo: GCardNo,
                                                                      guarantee: guarantee,
                                                                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                                    };
                                                                    await db
                                                                      .collection(
                                                                        "item_history"
                                                                      )
                                                                      .add(
                                                                        variable2
                                                                      );
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
                                                                            let reSerialChange = reSerial.docs[0]
                                                                              .data()
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
                                                                          } else {
                                                                            db.collection(
                                                                              "serail_no"
                                                                            ).add(
                                                                              {
                                                                                serail_no: serialNosList,
                                                                              }
                                                                            );
                                                                          }
                                                                        }
                                                                      );
                                                                    await db
                                                                      .collection(
                                                                        "item"
                                                                      )
                                                                      .doc(
                                                                        newArray[0]
                                                                          .id
                                                                      )
                                                                      .update({
                                                                        qty:
                                                                          Math.round(
                                                                            newArray[0].data()
                                                                              .qty
                                                                          ) +
                                                                          serialNosList.length,
                                                                        modelNo: modelNoNewList,
                                                                        serialNo: serialNoNewList,
                                                                        chassisNo: chassisNoNewList,
                                                                      })
                                                                      .then(
                                                                        function (
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
                                                                        }
                                                                      )
                                                                      .catch(
                                                                        function (
                                                                          error
                                                                        ) {
                                                                          setLoadingSubmit(
                                                                            false
                                                                          );
                                                                          NotificationManager.warning(
                                                                            "Failed to make the item!",
                                                                            "Please try again"
                                                                          );
                                                                        }
                                                                      );
                                                                  }
                                                                } else {
                                                                  if (inst) {
                                                                    let variable = {
                                                                      itemName: itemName.trim(),
                                                                      brand: brand.trim(),
                                                                      modelNo: modelNosList,
                                                                      serialNo: serialNosList,
                                                                      chassisNo: chassisNosList,
                                                                      color: color.trim(),
                                                                      qty:
                                                                        serialNosList.length,
                                                                      cashPrice:
                                                                        cashPrice ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              cashPrice
                                                                            ),
                                                                      salePrice:
                                                                        salePrice ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              salePrice
                                                                            ),
                                                                      noOfInstallments:
                                                                        inst ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              inst
                                                                            ),
                                                                      amountPerInstallment:
                                                                        amountPerInstallment ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              amountPerInstallment
                                                                            ),
                                                                      downPayment:
                                                                        downPayment ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              downPayment
                                                                            ),
                                                                      guaranteePeriod:
                                                                        guaranteePeriod ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              guaranteePeriod
                                                                            ),
                                                                      discount:
                                                                        discount ===
                                                                        ""
                                                                          ? 0
                                                                          : Math.round(
                                                                              discount
                                                                            ),
                                                                      description: description,
                                                                      cInvoiceNo: cInvoiceNo,
                                                                      GCardNo: GCardNo,
                                                                      guarantee: guarantee,
                                                                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                                    };
                                                                    await db
                                                                      .collection(
                                                                        "item_history"
                                                                      )
                                                                      .add(
                                                                        variable
                                                                      );
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
                                                                            let reSerialChange = reSerial.docs[0]
                                                                              .data()
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
                                                                          } else {
                                                                            db.collection(
                                                                              "serail_no"
                                                                            ).add(
                                                                              {
                                                                                serail_no: serialNosList,
                                                                              }
                                                                            );
                                                                          }
                                                                        }
                                                                      );
                                                                    await db
                                                                      .collection(
                                                                        "item"
                                                                      )
                                                                      .add(
                                                                        variable
                                                                      )
                                                                      .then(
                                                                        function (
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
                                                                        }
                                                                      )
                                                                      .catch(
                                                                        function (
                                                                          error
                                                                        ) {
                                                                          setLoadingSubmit(
                                                                            false
                                                                          );
                                                                          NotificationManager.warning(
                                                                            "Failed to make the item!",
                                                                            "Please try again"
                                                                          );
                                                                        }
                                                                      );
                                                                  }
                                                                }
                                                              } else {
                                                                if (inst) {
                                                                  let variable = {
                                                                    itemName: itemName.trim(),
                                                                    brand: brand.trim(),
                                                                    modelNo: modelNosList,
                                                                    serialNo: serialNosList,
                                                                    chassisNo: chassisNosList,
                                                                    color: color.trim(),
                                                                    qty:
                                                                      serialNosList.length,
                                                                    cashPrice:
                                                                      cashPrice ===
                                                                      ""
                                                                        ? 0
                                                                        : Math.round(
                                                                            cashPrice
                                                                          ),
                                                                    salePrice:
                                                                      salePrice ===
                                                                      ""
                                                                        ? 0
                                                                        : Math.round(
                                                                            salePrice
                                                                          ),
                                                                    noOfInstallments:
                                                                      inst ===
                                                                      ""
                                                                        ? 0
                                                                        : Math.round(
                                                                            inst
                                                                          ),
                                                                    amountPerInstallment:
                                                                      amountPerInstallment ===
                                                                      ""
                                                                        ? 0
                                                                        : Math.round(
                                                                            amountPerInstallment
                                                                          ),
                                                                    downPayment:
                                                                      downPayment ===
                                                                      ""
                                                                        ? 0
                                                                        : Math.round(
                                                                            downPayment
                                                                          ),
                                                                    guaranteePeriod:
                                                                      guaranteePeriod ===
                                                                      ""
                                                                        ? 0
                                                                        : Math.round(
                                                                            guaranteePeriod
                                                                          ),
                                                                    discount:
                                                                      discount ===
                                                                      ""
                                                                        ? 0
                                                                        : Math.round(
                                                                            discount
                                                                          ),
                                                                    description: description,
                                                                    cInvoiceNo: cInvoiceNo,
                                                                    GCardNo: GCardNo,
                                                                    guarantee: guarantee,
                                                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                                  };
                                                                  await db
                                                                    .collection(
                                                                      "item_history"
                                                                    )
                                                                    .add(
                                                                      variable
                                                                    );
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
                                                                          let reSerialChange = reSerial.docs[0]
                                                                            .data()
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
                                                                        } else {
                                                                          db.collection(
                                                                            "serail_no"
                                                                          ).add(
                                                                            {
                                                                              serail_no: serialNosList,
                                                                            }
                                                                          );
                                                                        }
                                                                      }
                                                                    );
                                                                  await db
                                                                    .collection(
                                                                      "item"
                                                                    )
                                                                    .add(
                                                                      variable
                                                                    )
                                                                    .then(
                                                                      function (
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
                                                                      }
                                                                    )
                                                                    .catch(
                                                                      function (
                                                                        error
                                                                      ) {
                                                                        setLoadingSubmit(
                                                                          false
                                                                        );
                                                                        NotificationManager.warning(
                                                                          "Failed to make the item!",
                                                                          "Please try again"
                                                                        );
                                                                      }
                                                                    );
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
                }
              }
            }
          }
        }
      } else {
        NotificationManager.info(
          "Serail,model and chassis number's count must be equal!"
        );
      }
    });
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
    <>
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
                    if (e.target.value !== "") {
                      setCashPrice(e.target.value);
                    }
                  }}
                  label="Cash Price of Item"
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
                    if (e.target.value !== "") {
                      setSalePrice(e.target.value);
                    }
                  }}
                  label="sale Price"
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
                    if (e.target.value !== "") {
                      setDownPayment(e.target.value);
                    }
                  }}
                  label="Down payment"
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
                    if (e.target.value !== "") {
                      setNoOfInstallments(e.target.value);
                    }
                  }}
                  label="Installments"
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
                    if (e.target.value !== "") {
                      setAmountPerInstallment(e.target.value);
                    }
                  }}
                  label="Installments Amount"
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
                    if (e.target.value !== "") {
                      setGuaranteePeriod(e.target.value);
                    }
                  }}
                  label="Guarantee"
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
                    if (e.target.value !== "") {
                      setDiscount(e.target.value);
                    }
                  }}
                  label="Discount"
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
                  size="small"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}></Grid>

              <Grid className="txt_Labels" item xs={12} sm={2}>
                Company Invoice No :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="cInvoiceNo"
                  variant="outlined"
                  fullWidth
                  id="cInvoiceNo"
                  value={cInvoiceNo}
                  onChange={(e) => {
                    setCInvoiceNo(e.target.value);
                  }}
                  label="Compny Invoice"
                  size="small"
                />
              </Grid>

              <Grid className="txt_Labels" item xs={12} sm={2}>
                Guarantee Card No :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="gCardNo"
                  name="gCardNo"
                  variant="outlined"
                  fullWidth
                  id="gCardNo"
                  value={GCardNo}
                  onChange={(e) => {
                    setGCardNo(e.target.value);
                  }}
                  label="Guarantee No"
                  size="small"
                />
              </Grid>

              <Grid className="txt_Labels" item xs={12} sm={12}>
                <hr className="hr_divider" />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Button className="serialNo_add" onClick={addInputChassisNo}>
                  Chassis Numbers
                  <PlusOutlined className="inpu_addIcon" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {Object.keys(inputsChassisNo).map((i) => (
                  <div key={i + 1}>
                    <TextField
                      key={i + 2}
                      id={i.toString()}
                      className="txt_input"
                      autoComplete="chassisNo"
                      name="chassisNo"
                      variant="outlined"
                      label="xxy-54091"
                      size="small"
                      required={true}
                      onChange={(e) => handleChangeAddChassisNoInputs(e, i)}
                    />

                    {i >= Object.keys(inputsChassisNo).length - 1 ? (
                      <MinusCircleOutlined
                        key={i + 3}
                        className="rmov_iconss"
                        onClick={() => {
                          delete inputsChassisNo[i];
                          setInputsChassisNo({ ...inputsChassisNo });
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}></Grid>

              <Grid item xs={12} sm={2}>
                <Button className="serialNo_add" onClick={addInputSerialNo}>
                  Serial Numbers
                  <PlusOutlined className="reltion_addIcon" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {Object.keys(inputsSerialNo).map((i) => (
                  <div key={i + 1}>
                    <TextField
                      key={i + 2}
                      id={i.toString()}
                      className="txt_input"
                      autoComplete="serialNo"
                      name="serialNo"
                      variant="outlined"
                      required={true}
                      label="xx-20097"
                      size="small"
                      onChange={(e) => handleChangeAddSerialNoInputs(e, i)}
                    />

                    {i >= Object.keys(inputsSerialNo).length - 1 ? (
                      <MinusCircleOutlined
                        key={i + 3}
                        className="rmov_iconss"
                        onClick={() => {
                          delete inputsSerialNo[i];
                          setInputsSerialNo({ ...inputsSerialNo });
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}></Grid>

              <Grid item xs={12} sm={2}>
                <Button className="serialNo_add" onClick={addInputModelNo}>
                  Model Numbers
                  <PlusOutlined className="reltion_addIcon" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {Object.keys(inputsModelNo).map((i) => (
                  <div key={i + 1}>
                    <TextField
                      key={i + 2}
                      id={i.toString()}
                      className="txt_input"
                      autoComplete="modelNo"
                      name="modelNo"
                      variant="outlined"
                      label="xx 0091"
                      size="small"
                      required={true}
                      onChange={(e) => handleChangeAddModelNoInputs(e, i)}
                    />

                    {i >= Object.keys(inputsModelNo).length - 1 ? (
                      <MinusCircleOutlined
                        key={i + 3}
                        className="rmov_iconss"
                        onClick={() => {
                          delete inputsModelNo[i];
                          setInputsModelNo({ ...inputsModelNo });
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}></Grid>

              <Grid className="txt_Labels" item xs={12} sm={8}></Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}>
                <Button
                  // disabled={!loadingSubmit ? false : true}
                  className="btnAdd"
                  type="primary"
                  onClick={addItem}
                  disabled={
                    loadingSubmit || itemName.length === 0 || brand.length === 0
                      ? true
                      : false
                  }
                >
                  {loadingSubmit ? (
                    <Spin spinning={loadingSubmit} size="default" />
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
    </>
  );
}
