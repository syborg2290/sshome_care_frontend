import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Modal } from "antd";
import { Button } from "@material-ui/core";

import db from "../../../../../../config/firebase.js";

// styles
import "./Pending_List.css";

// components
import PendingViewModel from "./blackList_Models/View_Model/View_Model";
import PendingHistoryModel from "./blackList_Models/History_Model/History_Model";

//icone
import { ExclamationCircleOutlined } from "@ant-design/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HistoryIcon from "@material-ui/icons/History";

export default function View_Model({ pendingBlackList }) {
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  const [pendingList, setPendingList] = useState([]);

  const [pendingViewModel, setPendingViewModel] = useState(false); //  table models
  const [pendingHistoryModel, setPendingHistoryModel] = useState(false); //  table models
  const [allViewData, setAllViewData] = useState([]);
  const [visibleConfirmPrint, setVisibleConfirmPrint] = useState(false);

  const showVisibleConfirmModal = () => {
    setVisibleConfirmPrint(true);
  };

  const changeToBlacklist = () => {
    db.collection("arrears")
      .where("invoice_number", "==", allViewData[currentIndx]?.invoice_no)
      .get()
      .then(async (reArreas) => {
        await db.collection("arrears").doc(reArreas.docs[0].id).delete();
        await db
          .collection("invoice")
          .where("invoice_number", "==", allViewData[currentIndx]?.invoice_no)
          .get()
          .then(async (reInVo) => {
            await db.collection("invoice").doc(reInVo.docs[0].id).update({
              status_of_payandgo: "blacklist",
            });
          });
        await db
          .collection("customer")
          .doc(reArreas.docs[0].data().customer_id)
          .update({
            status: "blacklist",
          });

        await db
          .collection("blacklist")
          .add({
            InvoiceNo: allViewData[currentIndx]?.invoice_no,
            FirstName: await (
              await db
                .collection("customer")
                .doc(reArreas.docs[0].data().customer_id)
                .get()
            ).data().fname,
            LastName: await (
              await db
                .collection("customer")
                .doc(reArreas.docs[0].data().customer_id)
                .get()
            ).data().lname,
            NIC: await (
              await db
                .collection("customer")
                .doc(reArreas.docs[0].data().customer_id)
                .get()
            ).data().nic,
            Telephone: await (
              await db
                .collection("customer")
                .doc(reArreas.docs[0].data().customer_id)
                .get()
            ).data().mobile1,
          })
          .then((_) => {
            setVisibleConfirmPrint(false);
            window.location.reload();
          });
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
                      onClick={showVisibleConfirmModal}
                    >
                      Blacklist
                    </Button>
                  </span>
                </div>
              ),
            },
          ]);

          db.collection("trustee")
            .where("invoice_number", "==", each.invoice_number)
            .get()
            .then((reTruste) => {
              setAllViewData((oldAll) => [
                ...oldAll,
                {
                  invoice_no: each.invoice_number,
                  cname:
                    reThen.docs[0].data().fname +
                    " " +
                    reThen.docs[0].data().lname,
                  nic: each.nic,
                  addres1: reThen.docs[0].data().address1,
                  addres2: reThen.docs[0].data().address2,
                  mobil1: reThen.docs[0].data().mobile1,
                  mobil2: reThen.docs[0].data().mobile2,
                  t_name:
                    reTruste.docs[0].data().fname +
                    " " +
                    reTruste.docs[0].data().lname,
                  t_nic: reTruste.docs[0].data().nic,
                  t_address1: reTruste.docs[0].data().address1,
                  t_address2: reTruste.docs[0].data().address2,
                  t_mobile1: reTruste.docs[0].data().mobile1,
                  t_mobile2: reTruste.docs[0].data().mobile2,
                  t2_name:
                    reTruste.docs.length <= 1
                      ? ""
                      : reTruste.docs[1]?.data().fname +
                        " " +
                        reTruste.docs[1]?.data().lname,
                  t2_nic:
                    reTruste.docs.length <= 1
                      ? ""
                      : reTruste.docs[1]?.data().nic,
                  t2_address1:
                    reTruste.docs.length <= 1
                      ? ""
                      : reTruste.docs[1]?.data().address1,
                  t2_address2:
                    reTruste.docs.length <= 1
                      ? ""
                      : reTruste.docs[1]?.data().address2,
                  t2_mobile1:
                    reTruste.docs.length <= 1
                      ? ""
                      : reTruste.docs[1]?.data().mobile1,
                  t2_mobile2:
                    reTruste.docs.length <= 1
                      ? ""
                      : reTruste.docs[1]?.data().mobile2,
                },
              ]);
            });
        });
    });

    // eslint-disable-next-line
  }, [pendingBlackList]);

  return (
    <>
      <Modal
        className="confo_model"
        closable={null}
        visible={visibleConfirmPrint}
        cancelText="No"
        okText="Yes"
        bodyStyle={{ borderRadius: "30px" }}
        onOk={changeToBlacklist}
        onCancel={() => {
          setVisibleConfirmPrint(false);
        }}
      >
        <div className="confoModel_body">
          <ExclamationCircleOutlined className="confo_Icon" />
          <h3 className="txtConfoModel_body">Are you sure to continue? </h3>
        </div>
      </Modal>
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
              <PendingViewModel
                addres1={allViewData[currentIndx]?.addres1}
                addres2={allViewData[currentIndx]?.addres2}
                cname={allViewData[currentIndx]?.cname}
                invoice_no={allViewData[currentIndx]?.invoice_no}
                mobil1={allViewData[currentIndx]?.mobil1}
                mobil2={allViewData[currentIndx]?.mobil2}
                nic={allViewData[currentIndx]?.nic}
                t2_address1={allViewData[currentIndx]?.t2_address1}
                t2_address2={allViewData[currentIndx]?.t2_address2}
                t2_mobile1={allViewData[currentIndx]?.t2_mobile1}
                t2_mobile2={allViewData[currentIndx]?.t2_mobile2}
                t2_name={allViewData[currentIndx]?.t2_name}
                t2_nic={allViewData[currentIndx]?.t2_nic}
                t_address1={allViewData[currentIndx]?.t_address1}
                t_address2={allViewData[currentIndx]?.t_address2}
                t_mobile1={allViewData[currentIndx]?.t_mobile1}
                t_mobile2={allViewData[currentIndx]?.t_mobile2}
                t_name={allViewData[currentIndx]?.t_name}
                t_nic={allViewData[currentIndx]?.t_nic}
                key={allViewData[currentIndx]?.invoice_no}
              />
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
              <PendingHistoryModel
                invoice_no={allViewData[currentIndx]?.invoice_no}
                key={allViewData[currentIndx]?.invoice_no}
              />
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
        }}
      />
    </>
  );
}
