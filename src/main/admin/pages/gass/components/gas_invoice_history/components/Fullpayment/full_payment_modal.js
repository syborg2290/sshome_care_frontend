import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

export default function Full_Payment_Model({ items_list_props, data }) {
  const [itemsList, setItemList] = useState([]);

  useEffect(() => {
    items_list_props.forEach((each) => {
      setItemList((old) => [
        ...old,
        {
          weight: each.weight,
          stock_type: data?.selectedType,
          price: each.price,
          discount: each.discount,
          qty: each.qty,
          withCylinder: each.withCylinder ? "Yes" : "No",
        },
      ]);
    });
  }, [items_list_props, data]);

  return (
    <>
      <Container component="main" className="conctainers_main">
        <Typography className="titls" variant="h5" gutterBottom>
          View Full Payment Invoice
        </Typography>
        <Grid item xs={12} sm={12}>
          <hr className="titl_hr" />
        </Grid>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="lbl_topis" item xs={12} sm={5}>
              Gamisarani
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              {data.gamisarani ? "Yes" : "No"}
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={5}>
              Gamisarani withdrawal Amount(LKR)
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              <CurrencyFormat
                value={data.gamisarani_amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={5}>
              Full name
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              {data?.fullname}
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={5}>
              NIC
            </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={6}>
              {data?.nic}
            </Grid>
            <Grid className="lbl_topis" item xs={12} sm={12}>
              <hr />
              <h2>Gas details</h2>
            </Grid>
          </Grid>
        </form>

        {itemsList.map((eachItem) => {
          return (
            <Grid key={eachItem.weight} container spacing={2}>
              {" "}
              <Grid className="lbl_topis" item xs={12} sm={4}>
                Stock type
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <p>{eachItem.stock_type}</p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={4}>
                With cylinder
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <p>{eachItem.withCylinder}</p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={4}>
                Weight(KG)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <p>{eachItem.weight}</p>
              </Grid>
              <Grid className="lbl_topis" item xs={12} sm={4}>
                Price(LKR)
              </Grid>
              <Grid item xs={12} sm={1}>
                :
              </Grid>
              <Grid item xs={12} sm={7}>
                <CurrencyFormat
                  value={eachItem.price}
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
              <Grid item xs={12} sm={12}>
                <hr />
              </Grid>
            </Grid>
          );
        })}
      </Container>
    </>
  );
}
