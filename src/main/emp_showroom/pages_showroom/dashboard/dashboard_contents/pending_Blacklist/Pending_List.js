import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Spin, Modal } from "antd";
import { Button } from "@material-ui/core";

import db from "../../../../../../config/firebase.js";

// styles
import "./Pending_List.css";

// components
import PendingViewModel from "./blackList_Models/View_Model/View_Model";
import PendingHistoryModel from "./blackList_Models/History_Model/History_Model";

import { useHistory } from "react-router-dom";

//icone
import { ExclamationCircleOutlined } from "@ant-design/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function View_Model({ pendingBlackList }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingList, setPendingList] = useState([]);

  const [pendingViewModel, setPendingViewModel] = useState(false); //  table models
  const [pendingHistoryModel, setPendingHistoryModel] = useState(false); //  table models

  const { confirm } = Modal;

  let history = useHistory();

  const showConfirm = () => {
    confirm({
      title: "Are You Sure?",
      icon: <ExclamationCircleOutlined />,
      onOk() {},
      onCancel() {},
    });
  };

  const showModalView = () => {
    setPendingViewModel(true);
  };

  const showModalHistory = () => {
    setPendingHistoryModel(true);
  };

  //START pay And Go Columns
  const blockTableColomns = [
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
      name: "FirstName",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "LastName",
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
        filter: false,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "Telephone",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: {
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },

    {
      name: "Action",

      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: {
            width: "190px",
            margin: "auto",
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  useEffect(() => {
    pendingBlackList.forEach((each) => {
      db.collection("customer")
        .where("nic", "==", each.nic)
        .get()
        .then((reThen) => {
          setPendingList((old) => [
            ...old,
            {
              InvoiceNo: each.invoice_number,
              FirstName: reThen.docs[0].data().fname,
              LastName: reThen.docs[0].data().lname,
              NIC: each.nic,
              Telephone: reThen.docs[0].data().mobile1,
              Action: (
                <div>
                  <VisibilityIcon
                    className="icon_view"
                    onClick={showModalView}
                  />
                  <span className="icon_histry">
                    <HistoryIcon onClick={showModalHistory} />
                  </span>
                  <span className="blk_btn">
                    <Button
                      variant="contained"
                      size="small"
                      className="btnublock"
                      onClick={showConfirm}
                    >
                      Block
                    </Button>
                  </span>
                </div>
              ),
            },
          ]);
          setIsLoading(false);
        });
    });
  }, [pendingBlackList]);

  return (
    <>
      {/*Start Blacklist PENDING VIEW  model */}

      <Modal
        visible={pendingViewModel}
        className="pending_Model"
        footer={null}
        onCancel={() => {
          setPendingViewModel(false);
        }}
      >
        <div className="pending_Model">
          <div className="pending_Model_Main">
            <div className="pending_Modell_Detail">
              <PendingViewModel />
            </div>
          </div>
        </div>
      </Modal>

      {/*END Blacklist PENDING VIEW  model */}

      {/*Start Blacklist HISTORY  model */}

      <Modal
        visible={pendingHistoryModel}
        className="pending_history_Model"
        footer={null}
        onCancel={() => {
          setPendingHistoryModel(false);
        }}
      >
        <div className="history_Model">
          <div className="pending_history_Model_Main">
            <div className="pending_history_Modell_Detail">
              <PendingHistoryModel />
            </div>
          </div>
        </div>
      </Modal>

      {/*END Blacklist HISTORY  model */}

      <MUIDataTable
        title={<span className="title_Span_blackList">Pending black list</span>}
        className="blackList_Table"
        data={pendingList}
        columns={blockTableColomns}
        options={{
          setRowProps: (row, rowIndex) => {
            return {
              style: { backgroundColor: "#F6CECE" },
            };
          },
          selectableRows: false,
          customToolbarSelect: () => {},
          filterType: "textfield",
          download: false,
          print: false,
          searchPlaceholder: "Search using any column names",
          elevation: 4,
          sort: true,
          onRowClick: (rowData, rowMeta) => {
            setCurrentIndx(rowMeta.dataIndex);
          },
          textLabels: {
            body: {
              noMatch: isLoading ? (
                <Spin className="tblSpinner" size="large" spinning="true" />
              ) : (
                "No records for pending black list"
              ),
            },
          },
        }}
      />
    </>
  );
}
