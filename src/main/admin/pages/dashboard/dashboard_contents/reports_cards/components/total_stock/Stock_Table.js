import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//styles
import "./Stock_Table.css";

// icons
import db from "../../../../../../../../config/firebase.js";

export default function Stock_Table() {
  const [itemTableData, setItemTableData] = useState([]);
  // eslint-disable-next-line
  const [allTtemData, setAllItemData] = useState([]);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);

  const [stock_total, setStockTotal] = useState(0);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("item_history")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        var newData = [];
        var itemData = [];
        var itemDataSeMo = [];
        var itemDataSeMoCon = [];
        if (snapshot.docs.length > 0) {
          itemDataSeMoCon.push({
            serialNo: snapshot.docs[0].data().serialNo,
            modelNo: snapshot.docs[0].modelNo,
            chassisNo: snapshot.docs[0].chassisNo,
          });
        }

        snapshot.docs.forEach((element) => {
          itemData.push({
            id: element.id,
            data: element.data(),
          });

          itemDataSeMo.push({
            serialNo: element.data().serialNo,
            modelNo: element.data().modelNo,
            chassisNo: element.data().chassisNo,
          });

          let stockTotalCal =
            stock_total + element.data().stock_type === "main"
              ? element.data().purchasedPrice
              : 0;

          setStockTotal(stockTotalCal);

          newData.push({
            Item_name: element.data().itemName,
            Brand: element.data().brand,
            Qty: element.data().qty,
            Cash_price: (
              <CurrencyFormat
                value={element.data().cashPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Sale_price: (
              <CurrencyFormat
                value={element.data().salePrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Purchased_Price: (
              <CurrencyFormat
                value={element.data().purchasedPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" "}
              />
            ),
            Date: moment(element.data()?.timestamp?.toDate()).format(
              "dddd, MMMM Do YYYY"
            ),
          });
        });
        setItemTableData(newData);
        setAllItemData(itemData);
      });
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: "Item_name",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Brand",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Qty",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Cash_price",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Sale_price",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Purchased_Price",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Date",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  return (
    <>
      <Grid className="cardStockGrid" container spacing={3}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <Card className="cardStock" variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid className="cardStocktot" item xs={12} sm={4}>
                  Total :
                </Grid>
                <Grid className="cardStocktot" item xs={12} sm={8}>
                  <CurrencyFormat
                    value={stock_total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" "}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid className="tbl_Container" container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Stock history</span>}
            className="stock_tables"
            data={itemTableData}
            columns={columns}
            options={{
              rowHover: true,
              // selectableRows: false,
              selectableRows: "none",
              customToolbarSelect: () => {},
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any field",
              elevation: 4,
              sort: true,
              selectableRowsHeader: false,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
