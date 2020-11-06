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

export default function Gass_Model() {
  const { confirm } = Modal;
  let history = useHistory();
  const [allWeight, setAllWeight] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(0);

  useEffect(() => {
    db.collection("gas")
      .get()
      .then((re) => {
        var rawWeight = [];
        re.docs.forEach((each) => {
          rawWeight.push(each.data().weight);
        });
        setAllWeight(rawWeight);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedWeight(event.target.value);
  };

  const handleChangeWeight = (event) => {};

  const showConfirm = () => {
    confirm({
      title: "Do you Want to Print a Recipt?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        history.push("/assistant/gass/gass_Model/make_recipt/Gass_recipt");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
                  <Select className="roll_selector" size="small" native>
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
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
                label="Qty"
                name="qty"
                autoComplete="qty"
                size="small"
                className="txt_qtyGas"
              />
            </Grid>

            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Date :
            </Grid>
            <Grid item xs={12} sm={5}>
              <Space direction="vertical">
                <DatePicker />
              </Space>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Field :
            </Grid>
            <Grid item xs={12} sm={5}>
              <Space direction="vertical">
                <FormControl variant="outlined" className="fcontrol">
                  <InputLabel
                    className="rolllbl_selector"
                    htmlFor="outlined-age-native-simple"
                  >
                    Shop
                  </InputLabel>
                  <Select
                    className="roll_selector"
                    size="small"
                    native
                    // value={state.age}
                    onChange={handleChange}
                    label="Field"
                  >
                    <option value={10}>Shop</option>
                    <option value={20}>A</option>
                    <option value={30}>B</option>
                  </Select>
                </FormControl>
              </Space>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Tot(LKR)
            </Grid>
            <Grid item xs={12} sm={5}>
              <p className="lbl_tots">
                {" "}
                <CurrencyFormat
                  value={" 2500"}
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

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Total Price(LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <p className="price">
                {" "}
                <CurrencyFormat
                  value={"11200"}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </p>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_updateGass"
                onClick={showConfirm}
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
