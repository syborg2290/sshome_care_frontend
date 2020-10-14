import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Grid, Button } from "@material-ui/core";
import { Spin, Modal } from "antd";
import MUIDataTable from "mui-datatables";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

// styles
import "./Customer_table_showroom.css";

import db from "../../../../../config/firebase.js";

export default function ItemTable() {
  const [customerTableData, setCustomerTableData] = useState([]);
  // eslint-disable-next-line
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // let socket = socketIOClient(RealtimeServerApi);

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    db.collection("customer")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var newData = [];
        var customermData = [];
        snapshot.docs.forEach((element) => {
          customermData.push({
            id: element.id,
            data: element.data(),
          });

          newData.push([
            element.data().img,
            element.data().customerName,
            element.data().nic,
            element.data().address,
            element.data().mobileNo,
            <div className="table_icon">
              <VisibilityIcon className="icon_Visible" onClick={showModal} />
            </div>,
          ]);
        });
        setCustomerTableData(newData);
        setAllCustomerData(customermData);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        className="model_Item"
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="table_Model">
          <div className="model_Main">
            {/* <img
              className="model_img"
              src={
                allTtemData.data && allTtemData.data[currentIndx]
                  ? allTtemData.data[currentIndx].photo === "null"
                    ? ""
                    : allTtemData.data[currentIndx].photo
                  : ""
              }
              alt=""
            /> */}
            <div className="model_Detail">
              <p>BRAND</p>
              <p>QTY</p>
              <p>COLOR</p>
              <p>MODEL NO</p>
              <p>SALE PRICE(LKR)</p>
              <p>CHASSIS NO</p>
              <p>CASH PRICE(LKR)</p>
              <p>DOWN PAYMENT(LKR)</p>
              <p>NO OF INSTALLMENT</p>
              <p>AMOUNT PER INSTALLMENT(LKR)</p>
              <p>GUARANTEE MONTHS/YEARS</p>
              <p>GUARANTEE PERIOD</p>
              <p>DISCOUNT(LKR)</p>
              <p>DESCRIPTION</p>
              <p>COMPANY INVOICE NO</p>
              <p>GUARANTEE CARD NO</p>
              <p>CREATED DATE</p>
            </div>
          </div>
        </div>
      </Modal>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">ALL CUSTOMERS</span>}
            className="customer_table"
            data={customerTableData}
            columns={[
              "IMG",
              "Customer Name",
              "NIC",
              "Address",
              "MODEL NO",
              "STATUS",
              "ACTION",
            ]}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
              filterType: "checkbox",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.rowIndex);
              },
              textLabels: {
                body: {
                  noMatch: isLoading ? (
                    <Spin className="tblSpinner" size="large" spinning="true" />
                  ) : (
                    <img
                      alt="Empty data"
                      className="empty_data"
                      src={require("../../../../../assets/empty.png")}
                    />
                  ),
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
