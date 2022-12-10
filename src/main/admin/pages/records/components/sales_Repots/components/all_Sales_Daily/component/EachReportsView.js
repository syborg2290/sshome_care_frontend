import { Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";

function EachReportsView({
  date,
  saleData,
  cashSaleData,
  docCharges,
  cardsSale,
  credit_reviceved,
}) {
  const [saleDataConst, setAllSaleData] = useState([]);
  const [cashSaleDataConst, setAllCashSaleData] = useState([]);
  const [recivedCardSaleConst, setAllRecivedCardSale] = useState([]);
  const [creditRecivedConst, setCreditRecivedData] = useState([]);
  // eslint-disable-next-line
  const [docChargesConst, setDocCharges] = useState([]);

  useEffect(() => {
    setAllSaleData(
      saleData.filter(
        (ob) =>
          new Date(ob.date).getFullYear() === new Date(date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(date).getMonth() &&
          new Date(ob.date).getDate() === new Date(date).getDate()
      )
    );

    setAllCashSaleData(
      cashSaleData.filter(
        (ob) =>
          new Date(ob.date).getFullYear() === new Date(date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(date).getMonth() &&
          new Date(ob.date).getDate() === new Date(date).getDate()
      )
    );

    setDocCharges(
      docCharges.filter(
        (ob) =>
          new Date(ob.date).getFullYear() === new Date(date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(date).getMonth() &&
          new Date(ob.date).getDate() === new Date(date).getDate()
      )
    );

    setAllRecivedCardSale(
      cardsSale.filter(
        (ob) =>
          new Date(ob.date).getFullYear() === new Date(date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(date).getMonth() &&
          new Date(ob.date).getDate() === new Date(date).getDate()
      )
    );

    setCreditRecivedData(
      credit_reviceved.filter(
        (ob) =>
          new Date(ob.date).getFullYear() === new Date(date).getFullYear() &&
          new Date(ob.date).getMonth() === new Date(date).getMonth() &&
          new Date(ob.date).getDate() === new Date(date).getDate()
      )
    );

    // eslint-disable-next-line
  }, [date]);

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper
            style={{
              textAlign: "center",
            }}
          >
            <h2>All</h2>
            <div>
              <hr />
            </div>
            <div></div>
            {saleDataConst.map((eSale) => (
              <p
                key={Math.random()}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {eSale?.type} :{" "}
                <span
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {eSale?.total} LKR
                </span>
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              textAlign: "center",
            }}
          >
            <h2>Cash Sales</h2>
            <div>
              <hr />
            </div>
            <div></div>
            {cashSaleDataConst.map((eSale) => (
              <p
                key={Math.random()}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {eSale?.type} :{" "}
                <span
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {eSale?.total} LKR
                </span>
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              textAlign: "center",
            }}
          >
            <h2>All Cards sale</h2>
            <div>
              <hr />
            </div>
            <div></div>
            {recivedCardSaleConst.map((eSale) => (
              <p
                key={Math.random()}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {eSale?.type} :{" "}
                <span
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {eSale?.total} LKR
                </span>
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              textAlign: "center",
            }}
          >
            <h2>Recieved credits</h2>
            <div>
              <hr />
            </div>
            <div></div>
            {creditRecivedConst.map((eSale) => (
              <p
                key={Math.random()}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {eSale?.type} :{" "}
                <span
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {eSale?.total} LKR
                </span>
              </p>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default EachReportsView;
