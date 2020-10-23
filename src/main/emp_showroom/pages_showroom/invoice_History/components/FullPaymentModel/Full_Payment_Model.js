<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { Spin } from "antd";
=======
import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
>>>>>>> 0ac513a42d947f0f20610b9259c8029b5f7da99b
import CurrencyFormat from "react-currency-format";
import db from "../../../../../../config/firebase.js";

export default function Full_Payment_Model({ items_list_props }) {
  const [itemsList, setItemList] = useState([]);

  useEffect(() => {
    items_list_props.forEach((each) => {
      db.collection("item")
        .doc(each.item_id)
        .get()
        .then((th) => {
          setItemList((old) => [
            ...old,
            {
              item_name: th.data().itemName,
              dp: each.downpayment,
              discount: each.discount,
              qty: each.qty,
              color: th.data().color,
              model_no: th.data().modelNo,
              gurantee_type: th.data().guarantee,
              gurantee_period: th.data().guaranteePeriod,
            },
          ]);
        });
    });
  }, [items_list_props]);

  return (
    <Container component="main" className="conctainers_main">
      <Typography className="titls" variant="h5" gutterBottom>
        View Full Payment Invoice
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
<<<<<<< HEAD
      {itemsList.length === 0 ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : (
        itemsList.map((eachItem) => {
          return (
            <div key={eachItem.item_name} className="paper">
              <form className="form" noValidate>
                <Grid container spacing={2}>
                  {" "}
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Item Name
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.item_name}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Basic Payment(LKR)
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <CurrencyFormat
                      value={eachItem.dp}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Discount(LKR)
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <CurrencyFormat
                      value={eachItem.discount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" "}
                    />
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Qty
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.qty}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Color
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.color}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Model No.
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>{eachItem.model_no}</p>
                  </Grid>
                  <Grid className="lbl_topis" item xs={12} sm={4}>
                    Guarantee Period
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    :
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <p>
                      {eachItem.gurantee_period.toString()+" "+eachItem.gurantee_type.value.toString()}
                    </p>
                  </Grid>
                </Grid>
              </form>
            </div>
          );
        })
      )}
=======
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topis" item xs={12} sm={4}>
              Item Name
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>Gass Cooker</p>
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={4}>
              Basic Payment(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <CurrencyFormat
                value={5700}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={4}>
              Discount(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <CurrencyFormat
                value={4500}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={4}>
              Qty
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>3</p>
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={4}>
              Color
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>Black</p>
            </Grid>

            <Grid className="lbl_topis" item xs={12} sm={4}>
              Model No.
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>934-UER</p>
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={4}>
              Guarantee Period
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <p>10 Years</p>
            </Grid>
          </Grid>
        </form>
      </div>
>>>>>>> 0ac513a42d947f0f20610b9259c8029b5f7da99b
    </Container>
  );
}
