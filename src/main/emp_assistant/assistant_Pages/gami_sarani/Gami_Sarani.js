import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import "react-notifications/lib/notifications.css";
import CurrencyFormat from "react-currency-format";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";

// components
import AddCustomer from "./components/add_customer/Add_Customer";
import ViewCustomer from "./components/view_customer/view_customer_Model";
import UpdateCustomer from "./components/update_customer/Update_Model";
import HistoryCustomer from "./components/customer_history/History_Model";
import WithdrawalCustomer from "./components/Withdrawal_customer/Withdrawal_Model";
import DepositModel from "./components/deposit_Model/Deposit_Model";

// style
import "./Gami_Sarani.css";

import db from "../../../../config/firebase.js";

export default function Gami_Sarani() {
  const [gamisaraniModel, setGamisaraniModel] = useState(false); // customer add model
  const [gamisaraniViewModel, setGamisaraniViewModel] = useState(false); // customer view model
  const [gamisaraniHistoryModel, setGamisaraniHistoryModel] = useState(false); // customer History model
  const [gamisaraniDepositModel, setGamisaraniDepositModel] = useState(false); // customer Deposit model
  const [gamisaraniUpdateModel, setGamisaraniUpdateModel] = useState(false); // customer Update model
  const [gamisaraniWithdrawalModel, setGamisaraniWithdrawalModel] = useState(
    false
  ); // customer Update model
  const [tableData, setTableData] = useState([]);
  const [allTableData, setAllTableData] = useState([]);

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
let history = useHistory();
  const GamisaraniAddCustomer = () => {
    setGamisaraniModel(true);
  };

  const GamisaraniAddCustomerClose = () => {
    setGamisaraniModel(false);
  };

  const GamisaraniViewCustomer = () => {
    setGamisaraniViewModel(true);
  };

  const GamisaraniUpdateCustomer = () => {
    setGamisaraniUpdateModel(true);
  };

  const GamisaraniHistoryCustomer = () => {
    setGamisaraniHistoryModel(true);
  };

  const GamisaraniWithdrawalCustomer = () => {
    setGamisaraniWithdrawalModel(true);
  };

  const GamisaraniDepositCustomer = () => {
    setGamisaraniDepositModel(true);
  };

  const columns = [
    {
      name: "IMG",
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
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "MemberID",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Current_Balance",
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
            display: "flex",
            justifyContent: "center",
            flexDirection: "row-reverse",
          },
        }),
      },
    },
  ];

  useEffect(() => {
     window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    db.collection("gami_sarani").onSnapshot((re) => {
      var rawAllData = [];
      var rawData = [];
      re.docs.forEach((each) => {
        rawAllData.push({
          id: each.id,
          data: each.data(),
        });
        rawData.push({
          IMG: (
            <img
              alt="Empty data"
              className="avatar_data"
              src={
                each.data().photo !== null
                  ? each.data().photo
                  : require("../../../../assets/avatar.png")
              }
            />
          ),
          FirstName: each.data().fname,
          LastName: each.data().lname,
          NIC: each.data().nic,
          MemberID: each.data().mid,
          Current_Balance: (
            <CurrencyFormat
              value={each.data().currentDeposit}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" "}
            />
          ),
          Action: (
            <div>
              <VisibilityIcon
                className="btnView"
                onClick={GamisaraniViewCustomer}
              />
              <span>
                <EditIcon
                  className="btnUpdate"
                  onClick={GamisaraniUpdateCustomer}
                />
              </span>
              <span>
                <AccountBalanceIcon
                  className="btnHisty"
                  onClick={GamisaraniHistoryCustomer}
                />
              </span>

              <span className="deposit_btn">
                <Button
                  variant="contained"
                  size="small"
                  className="btnDipo"
                  onClick={GamisaraniDepositCustomer}
                >
                  Deposit
                </Button>
              </span>
              <span>
                <HistoryIcon
                  className="WitdrHisty"
                  onClick={GamisaraniWithdrawalCustomer}
                />
              </span>
            </div>
          ),
        });
      });
      setAllTableData(rawAllData);
      setTableData(rawData);
    });
      // eslint-disable-next-line
  }, []);

  return (
    <>
      {/*Start Add Customer Model */}

      <Modal
        visible={gamisaraniModel}
        footer={null}
        className="model_Gamisarani_Cutomer"
        onCancel={() => {
          setGamisaraniModel(false);
        }}
      >
        <div className="table_Gamisarani_Cutomer">
          <div className="model_Gamisarani_Cutomer_Main">
            <div className="modelGamisarani_Cutomer_Detail">
              <AddCustomer close_model={GamisaraniAddCustomerClose} />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Add Customer Model  */}

      {/*Start view Customer Model */}

      <Modal
        visible={gamisaraniViewModel}
        footer={null}
        className="model_Gamisarani_ViewCutomer"
        onCancel={() => {
          setGamisaraniViewModel(false);
        }}
      >
        <div className="table_Gamisarani_ViewCutomer">
          <div className="model_Gamisarani_ViewCutomer_Main">
            <div className="modelGamisarani_ViewCutomer_Detail">
              <ViewCustomer
                key={allTableData[currentIndx]?.id}
                mid={allTableData[currentIndx]?.data.mid}
                fname={allTableData[currentIndx]?.data.fname}
                address1={allTableData[currentIndx]?.data.address1}
                address2={allTableData[currentIndx]?.data.addres2}
                lname={allTableData[currentIndx]?.data.lname}
                mobile1={allTableData[currentIndx]?.data.mobile1}
                mobile2={allTableData[currentIndx]?.data.mobile2}
                nic={allTableData[currentIndx]?.data.nic}
                photo={allTableData[currentIndx]?.data.photo}
                root={allTableData[currentIndx]?.data.root}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End view Customer Model  */}

      {/*Start UPDATE Customer Model */}

      <Modal
        visible={gamisaraniUpdateModel}
        footer={null}
        className="model_Gamisarani_UpdateCutomer"
        onCancel={() => {
          setGamisaraniUpdateModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <UpdateCustomer
                key={allTableData[currentIndx]?.id}
                midProp={allTableData[currentIndx]?.data.mid}
                fnameProp={allTableData[currentIndx]?.data.fname}
                address1Prop={allTableData[currentIndx]?.data.address1}
                address2Prop={allTableData[currentIndx]?.data.addres2}
                lnameProp={allTableData[currentIndx]?.data.lname}
                mobile1Prop={allTableData[currentIndx]?.data.mobile1}
                mobile2Prop={allTableData[currentIndx]?.data.mobile2}
                nicProp={allTableData[currentIndx]?.data.nic}
                imageUrlProp={allTableData[currentIndx]?.data.photo}
                rootProp={allTableData[currentIndx]?.data.root}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End UPDATE Customer Model  */}

      {/*Start History Customer Model */}

      <Modal
        visible={gamisaraniHistoryModel}
        footer={null}
        className="model_Gamisarani_historyCutomer"
        onCancel={() => {
          setGamisaraniHistoryModel(false);
        }}
      >
        <div className="table_Gamisarani_historyCutomer">
          <div className="model_Gamisarani_historyCutomer_Main">
            <div className="modelGamisarani_historyCutomer_Detail">
              <HistoryCustomer
                key={allTableData[currentIndx]?.id}
                mid={allTableData[currentIndx]?.data.mid}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End History Customer Model  */}

      {/*Start Withdrawal Customer Model */}

      <Modal
        visible={gamisaraniWithdrawalModel}
        footer={null}
        className="model_Gamisarani_WithdrawalCutomer"
        onCancel={() => {
          setGamisaraniWithdrawalModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <WithdrawalCustomer
                docId={allTableData[currentIndx]?.id}
                key={allTableData[currentIndx]?.id}
                midProp={allTableData[currentIndx]?.data.mid}
                nicProp={allTableData[currentIndx]?.data.nic}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Withdrawal Customer Model  */}

      {/*Start Deposit Customer Model */}

      <Modal
        visible={gamisaraniDepositModel}
        footer={null}
        className="model_Gamisarani_depositCutomer"
        onCancel={() => {
          setGamisaraniDepositModel(false);
        }}
      >
        <div className="table_Gamisarani_depositCutomer">
          <div className="model_Gamisarani_depositCutomer_Main">
            <div className="modelGamisarani_depositCutomer_Detail">
              <DepositModel
                key={allTableData[currentIndx]?.id}
                midProp={allTableData[currentIndx]?.data.mid}
                nicProp={allTableData[currentIndx]?.data.nic}
                close_model={() => {
                  setGamisaraniDepositModel(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Deposit Customer Model  */}

      <Button
        variant="contained"
        color="primary"
        className="btn_addSaraniCustomers"
        onClick={GamisaraniAddCustomer}
      >
        New Customer
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Gami Sarani Customers</span>}
            className="customer_table_sarani"
            sty
            data={tableData}
            columns={columns}
            options={{
              selectableRows: false,
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
