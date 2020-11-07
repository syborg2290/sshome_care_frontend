import React, { useState, useEffect } from "react";
import { Modal, DatePicker, Space } from "antd";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Select,
} from "@material-ui/core";

import "./Gass_Model.css";

// icon
import { ExclamationCircleOutlined } from "@ant-design/icons";

import db from "../../../../../config/firebase.js";
import firebase from "firebase";

export default function Gass_Model() {
  const { confirm } = Modal;
  let history = useHistory();
  const [allWeight, setAllWeight] = useState([]);
  const [allWeightData, setAllWeightData] = useState([]);
  const [allRoot, setAllRoot] = useState([]);
  // eslint-disable-next-line
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedType, setSelectedType] = useState("shop");
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [unit, setUnit] = useState(0);
  const [saveTimestamp, setTimestamp] = useState(null);
  const [validation, setValidation] = useState("");

  useEffect(() => {
    db.collection("gas")
      .get()
      .then((re) => {
        var rawWeight = [];
        var rawWeightdataRe = [];
        re.docs.forEach((each) => {
          rawWeightdataRe.push({
            id: each.id,
            data: each.data(),
          });
          rawWeight.push(each.data().weight);
        });
        setAllWeight(rawWeight);
        setAllWeightData(rawWeightdataRe);
      });

    db.collection("root")
      .get()
      .then((re) => {
        var rawRoot = [];
        re.docs.forEach((each) => {
          rawRoot.push(each.data().root);
        });
        setAllRoot(rawRoot);
      });
  }, []);

  const handleChangeWeight = (event) => {
    setSelectedWeight(event.target.value);

    allWeightData.forEach((reE) => {
      if (reE?.data.weight === event.target.value) {
        setTotal(reE?.data.price * qty);
        setUnit(reE?.data.price);
      }
    });
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const showConfirm = () => {
    if (qty === 0) {
      setValidation("Please set qty");
    } else {
      if (selectedWeight === "Select a weight") {
        setValidation("Select a weight");
      } else {
        confirm({
          title: "Do you Want to Print a Recipt?",
          icon: <ExclamationCircleOutlined />,

          onOk() {
            if (selectedWeight === "Select a weight") {
              setValidation("Select a weight");
            } else {
              db.collection("gas")
                .where("weight", "==", selectedWeight)
                .get()
                .then((reSe) => {
                  db.collection("gas")
                    .doc(reSe.docs[0].id)
                    .update({
                      qty: reSe.docs[0].data().qty - qty,
                    })
                    .then((_) => {
                      let moveWith = {
                        pathname:
                          "/assistant/gass/gass_Model/make_recipt/Gass_recipt",
                        search: "?query=abc",
                        state: {
                          detail: {
                            total: total,
                            list: [
                              {
                                weight: selectedWeight,
                                qty: qty,
                                unit: unit,
                                price: total,
                              },
                            ],
                          },
                        },
                      };
                      history.push(moveWith);
                    });
                });
            }
          },
          onCancel() {
            submit();
          },
        });
      }
    }
  };

  const submit = () => {
    if (selectedWeight === "Select a weight") {
      setValidation("Select a weight");
    } else {
      db.collection("gas")
        .where("weight", "==", selectedWeight)
        .get()
        .then((reSe) => {
          db.collection("gas_purchase_history").add({
            date: saveTimestamp,
            type: selectedType,
            price: total,
            qty: qty,
          });
          db.collection("gas")
            .doc(reSe.docs[0].id)
            .update({
              qty: reSe.docs[0].data().qty - qty,
            });
        })
        .then((_) => {
          window.location.reload();
        });
    }
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Sell
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Weight
            </Grid>
            <Grid item xs={12} sm={9}>
              <Space direction="vertical">
                <FormControl variant="outlined" className="fcontrol">
                  <InputLabel
                    className="rolllbl_selector"
                    htmlFor="outlined-age-native-simple"
                  >
                    weight
                  </InputLabel>
                  <Select
                    className="roll_selector"
                    size="small"
                    native
                    onChange={handleChangeWeight}
                  >
                    <option>Select a weight</option>
                    {allWeight.map((each) => (
                      <option
                        onChange={handleChangeWeight}
                        key={each}
                        value={each}
                      >
                        {each} Kg
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Space>
            </Grid>
            <Grid className="lbl_qty" item xs={12} sm={3}>
              Qty
            </Grid>
            <Grid className="qq" item xs={12} sm={5}>
              <TextField
                variant="outlined"
                required
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
                label="Qty"
                name="qty"
                autoComplete="qty"
                size="small"
                className="txt_qtyGas"
                value={qty}
                onChange={(e) => {
                  allWeightData.forEach((reE) => {
                    if (reE?.data.weight === selectedWeight) {
                      if (reE?.data.qty - parseInt(e.target.value) >= 0) {
                        setQty(parseInt(e.target.value));
                        setTotal(reE?.data.price * e.target.value.trim());
                      } else {
                        setValidation("Out of stock");
                      }
                    }
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Date :
            </Grid>
            <Grid item xs={12} sm={5}>
              <Space direction="vertical">
                <DatePicker
                  onChange={(e) => {
                    setTimestamp(
                      firebase.firestore.Timestamp.fromDate(e.toDate())
                    );
                  }}
                />
              </Space>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Type :
            </Grid>
            <Grid item xs={12} sm={5}>
              <Space direction="vertical">
                <FormControl variant="outlined" className="fcontrol">
                  <Select
                    className="roll_selector"
                    size="small"
                    native
                    onChange={handleChangeType}
                    value={selectedType}
                  >
                    <option onChange={handleChangeType} value={"shop"}>
                      shop
                    </option>
                    {allRoot.map((each) => (
                      <option
                        onChange={handleChangeType}
                        key={each}
                        value={each}
                      >
                        {each}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Space>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Total(LKR)
            </Grid>
            <Grid item xs={12} sm={5}>
              <p className="lbl_tots">
                {" "}
                <CurrencyFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>
          <p className="validate_Edit">{validation}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_updateGass"
                onClick={showConfirm}
                disabled={
                  saveTimestamp === null || allWeight.length === 0
                    ? true
                    : false
                }
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
