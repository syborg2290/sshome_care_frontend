import React, { useState, useEffect } from "react";
import { DatePicker, Space, Radio } from "antd";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Select,
  FormControl,
} from "@material-ui/core";
import { Spin } from "antd";

import db from "../../../../../../config/firebase.js";
import firebase from "firebase";

function daysCountOfMonth(month, year) {
  return parseInt(new Date(year, month, 0).getDate());
}

export default function Create_Target_Model() {
  const [allRoot, setAllRoot] = useState([]);
  const [sale_taregt_amount, setSaleAmount] = useState(0);
  const [cash_taregt_amount, setCashAmount] = useState(0);
  const [startDate, setStartdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [validation, setValidation] = useState("");
  const [targetType, setTargetType] = useState("sale_target");

  const handleChange = async (event) => {
    setSelectedType(event.target.value);

    if (targetType === "sale_target") {
      setSaleAmount(0);
      await getAllSaleTargetAmount(event.target.value);
    } else {
      setCashAmount(0);
      await getAllCashTargetAmount(event.target.value);
    }
  };

  const getAllSaleTargetAmount = async (type) => {
    setLoading(true);

    let daysCount = daysCountOfMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    let fromT = new Date(new Date().setDate(new Date().getDate() - daysCount));
    db.collection("invoice")
      .where("selectedType", "==", type)
      .get()
      .then((reInvoice) => {
        reInvoice.docs.forEach((reEa) => {
          if (
            new Date(fromT.toDateString()) <
            new Date(new Date(reEa.data()?.date.seconds * 1000).toDateString())
          ) {
            if (
              new Date(
                new Date(reEa.data()?.date.seconds * 1000).toDateString()
              ) <= new Date(new Date().toDateString())
            ) {
              reEa.data().items.forEach((eachItem) => {
                setSaleAmount(
                  parseInt(sale_taregt_amount) + parseInt(eachItem.downpayment)
                );
              });
            }
          }
        });
        setLoading(false);
      });
  };

  const getAllCashTargetAmount = async (type) => {
    setLoading(true);

    let daysCount = daysCountOfMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    let fromT = new Date(new Date().setDate(new Date().getDate() - daysCount));
    db.collection("invoice")
      .where("selectedType", "==", type)
      .get()
      .then((reInvoice) => {
        reInvoice.docs.forEach((reEa) => {
          if (reEa.data().paymentWay === "PayandGo") {
            if (
              new Date(fromT.toDateString()) <
              new Date(
                new Date(reEa.data()?.date.seconds * 1000).toDateString()
              )
            ) {
              if (
                new Date(
                  new Date(reEa.data()?.date.seconds * 1000).toDateString()
                ) <= new Date(new Date().toDateString())
              ) {
                setCashAmount(cash_taregt_amount + reEa.data()?.downpayment);
              }
            }
          }
        });
      });

    db.collection("installment")
      .where("type", "==", type)
      .get()
      .then((reInstall) => {
        reInstall.docs.forEach((reEa) => {
          if (
            new Date(fromT.toDateString()) <
            new Date(new Date(reEa.data()?.date.seconds * 1000).toDateString())
          ) {
            if (
              new Date(
                new Date(reEa.data()?.date.seconds * 1000).toDateString()
              ) <= new Date(new Date().toDateString())
            ) {
              setCashAmount(cash_taregt_amount + reEa.data()?.amount);
            }
          }
        });
        setLoading(false);
      });
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

    // ======================================

    let daysCount = daysCountOfMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    let fromT = new Date(new Date().setDate(new Date().getDate() - daysCount));
    db.collection("invoice")
      .where("selectedType", "==", selectedType)
      .get()
      .then((reInvoice) => {
        reInvoice.docs.forEach((reEa) => {
          if (reEa.data().paymentWay === "PayandGo") {
            if (
              new Date(fromT.toDateString()) <
              new Date(
                new Date(reEa.data()?.date.seconds * 1000).toDateString()
              )
            ) {
              if (
                new Date(
                  new Date(reEa.data()?.date.seconds * 1000).toDateString()
                ) <= new Date(new Date().toDateString())
              ) {
                setCashAmount(cash_taregt_amount + reEa.data()?.downpayment);
              }
            }
          }
        });
      });

    db.collection("installment")
      .where("type", "==", selectedType)
      .get()
      .then((reInstall) => {
        reInstall.docs.forEach((reEa) => {
          if (
            new Date(fromT.toDateString()) <
            new Date(new Date(reEa.data()?.date.seconds * 1000).toDateString())
          ) {
            if (
              new Date(
                new Date(reEa.data()?.date.seconds * 1000).toDateString()
              ) <= new Date(new Date().toDateString())
            ) {
              setSaleAmount(sale_taregt_amount + reEa.data()?.amount);
            }
          }
        });
      });
    // ======================================

    db.collection("invoice")
      .where("selectedType", "==", selectedType)
      .get()
      .then((reInvoice) => {
        reInvoice.docs.forEach((reEa) => {
          if (
            new Date(fromT.toDateString()) <
            new Date(new Date(reEa.data()?.date.seconds * 1000).toDateString())
          ) {
            if (
              new Date(
                new Date(reEa.data()?.date.seconds * 1000).toDateString()
              ) <= new Date(new Date().toDateString())
            ) {
              reEa.data().items.forEach((eachItem) => {
                setSaleAmount(
                  parseInt(sale_taregt_amount) + parseInt(eachItem.downpayment)
                );
              });
            }
          }
        });
      });
    // ======================================
    // eslint-disable-next-line
  }, []);

  const createTarget = async () => {
    setLoading(true);
    var dueCashTaregt = [];

    var cashTaregtRpp = await db
      .collection("targets")
      .where("selectedType", "==", selectedType)
      .get();

    if (targetType === "sale_target") {
      dueCashTaregt = cashTaregtRpp.docs.filter(
        (ob) =>
          ob.data().status === "ongoing" &&
          ob.data().target_type === "Sale target"
      );
    } else {
      dueCashTaregt = cashTaregtRpp.docs.filter(
        (ob) =>
          ob.data().status === "ongoing" &&
          ob.data().target_type === "Cash target"
      );
    }

    let totAmount =
      targetType === "sale_target" ? sale_taregt_amount : cash_taregt_amount;
    if (dueCashTaregt.length > 0) {
      db.collection("targets")
        .add({
          target_type:
            targetType === "sale_target" ? "Sale target" : "Cash target",
          selectedType: selectedType,
          start_date: startDate,
          amount: totAmount,
          status: "ongoing",
        })
        .then((_) => {
          setLoading(false);
          window.location.reload();
        });
    } else {
      setValidation("Previous target is still on 'ONGOING' ");
    }
  };

  return (
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Make Salary
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Target Amount(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="bsly"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Target Amount"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                value={
                  targetType === "sale_target"
                    ? sale_taregt_amount
                    : cash_taregt_amount
                }
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0) {
                    if (targetType === "sale_target") {
                      setSaleAmount(parseInt(e.target.value.trim()));
                    } else {
                      setCashAmount(parseInt(e.target.value.trim()));
                    }
                  }
                }}
              />
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Type
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                <FormControl variant="outlined" className="fcontrol">
                  <Select
                    className="roll_selector"
                    size="small"
                    native
                    onChange={handleChange}
                    value={selectedType}
                  >
                    <option onChange={handleChange} value={""}>
                      Select a type
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
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Start Date
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                <DatePicker
                  onChange={(e) => {
                    if (e !== null) {
                      setStartdate(
                        firebase.firestore.Timestamp.fromDate(e.toDate())
                      );
                    } else {
                      setStartdate(null);
                    }
                  }}
                />
              </Space>
            </Grid>
            <Grid className="lbl_topi" item xs={12} sm={4}>
              Target Type
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Radio.Group
                defaultValue="sale_target"
                buttonStyle="solid"
                onChange={(e) => {
                  setTargetType(e.target.value);
                }}
              >
                <Radio.Button value="sale_target">Sale Target</Radio.Button>
                <Radio.Button value="cash_target">Cash Target</Radio.Button>
              </Radio.Group>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {validation}
            </p>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                onClick={createTarget}
                disabled={
                  startDate === null || selectedType.length === 0 || loading
                }
              >
                {loading ? <Spin size="small" /> : "Done"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
