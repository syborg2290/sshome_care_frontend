import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Modal } from "antd";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

// components
import ViewHistory from "./components/View_History";

// styles
import "./Purchased_History.css";

import db from "../../../../../../config/firebase.js";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Purchased_History() {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);
  const [itemTableData, setItemTableData] = useState([]);
  const [visible, setVisible] = useState(false);
  let history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("emp_purchased")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var newData = [];
        var itemData = [];

        snapshot.docs.forEach((element) => {
          itemData.push({
            id: element.id,
            data: element.data(),
          });

          newData.push([
            element.data().invoice_number,
            element.data().fname,
            element.data().lname,
            element.data().nic,
            <CurrencyFormat
              value={element.data().total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />,
            new Date(element.data().date.seconds * 1000).toDateString(),
            <VisibilityIcon onClick={showModal} />,
          ]);
        });
        setItemTableData(newData);
        setAllData(itemData);
      });

    // eslint-disable-next-line
  }, []);

  // Columns
  const columns = [
    {
      name: "InvoiceNo",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "First_Name",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Last_Name",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "NIC",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Total",
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

    {
      name: "Action",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",

            // maxWidth: "800px",
          },
        }),
      },
    },
  ];
  // Columns

  return (
    <>
      <Modal
        className="his_model"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>
          <ViewHistory
            key={allData[currentIndx]?.data.id}
            itemsList={allData[currentIndx]?.data.items}
          />
        </div>
      </Modal>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Purchased History</span>}
            className="selling_histable"
            sty
            data={itemTableData}
            columns={columns}
            options={{
              selectableRows: "none",
              customToolbarSelect: () => {},
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex);
              },
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
