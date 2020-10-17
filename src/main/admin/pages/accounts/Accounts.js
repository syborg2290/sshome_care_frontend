import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Modal, Spin } from "antd";
import HelpIcon from "@material-ui/icons/Help";

import MUIDataTable from "mui-datatables";
import moment from "moment";

// components
import Editmodel from "../accounts/components/Edit_model";
import NewUsermodel from "../accounts/components/NewUser_model";

// icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// styles
import "./Accounts.css";
import db from "../../../../config/firebase.js";

export default function Accounts() {
  const [editVisible, setEditVisible] = useState(false);
  const [newUserVisible, setNewUserVisible] = useState(false);
  const [users, setUsersTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [allUserData, setAllUserData] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    db.collection("user")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        var newData = [];
        var userData = [];
        snapshot.docs.forEach((element) => {
          userData.push({
            id: element.id,
            data: element.data(),
          });
          newData.push([
            element.data().username,
            element.data().role,
            moment
              .unix(element.data().lastlog)
              .format("dddd, MMMM Do YYYY, h:mm:ss a"),
            <div>
              <EditIcon onClick={editModal} />
              <span className="icon_delete">
                <DeleteIcon onClick={showModalConfirmModal} />
              </span>
            </div>,
          ]);
        });
        setAllUserData(userData);
        setUsersTable(newData);
        setIsLoading(false);
      });
  }, []);

  const newUserModal = () => {
    setNewUserVisible(true);
  };

  const newUserModalClose = () => {
    setNewUserVisible(false);
  };

  const showModalConfirmModal = () => {
    setConfirmVisible(true);
  };

  const editModal = () => {
    setEditVisible(true);
  };

  const editModalClose = () => {
    setEditVisible(false);
  };

  const showDeleteUsersConfirm = async () => {
    await db
      .collection("user")
      .doc(
        allUserData[currentIndx] && allUserData[currentIndx].id
          ? allUserData[currentIndx].id
          : ""
      )
      .delete()
      .then(function () {
        NotificationManager.success("User deletion successfully!", "Done");
        setConfirmVisible(false);
      })
      .catch(function (error) {
        NotificationManager.warning(
          "Failed to continue the process!",
          "Please try again"
        );
      });
  };

  const columns = [
    {
      name: "User Name",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Role",
      options: {
        filter: true,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
    {
      name: "Last logged at",
      options: {
        filter: false,
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
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={newUserModal}
        className="btn_newUser"
        endIcon={<PersonAddIcon />}
      >
        Add New User
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">ALL USERS</span>}
            className="account_table"
            data={users}
            columns={columns}
            options={{
              selectableRows: false,
              customToolbarSelect: () => {},
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
                      src={require("../../../../assets/empty.png")}
                    />
                  ),
                },
              },
              filterType: "textField",
              download: false,
              print: false,
              searchPlaceholder: "Search using any field",
              elevation: 4,
              sort: true,
            }}
          />
        </Grid>
      </Grid>

      <Modal
        className="aConfo_model"
        closable={null}
        visible={confirmVisible}
        cancelText="No"
        okText="Yes"
        bodyStyle={{ borderRadius: "30px" }}
        onOk={showDeleteUsersConfirm}
        onCancel={() => {
          setConfirmVisible(false);
        }}
      >
        <div className="aConfoModel_body">
          <HelpIcon className="aConfo_Icon" />
          <h3 className="atxtConfoModel_body">
            Do you want to delete this user?{" "}
          </h3>
        </div>
      </Modal>

      {/*Edit User Model */}

      <Modal
        title="Edit User"
        visible={editVisible}
        footer={null}
        className="model_edit_Item"
        onCancel={editModalClose}
      >
        <div className="table_edit_Model">
          <div className="model_edit_Main">
            <div className="model_edit_Detail">
              <Editmodel
                editModalClose={editModalClose}
                key={
                  allUserData[currentIndx] && allUserData[currentIndx].id
                    ? allUserData[currentIndx].id
                    : ""
                }
                docid={
                  allUserData[currentIndx] && allUserData[currentIndx].id
                    ? allUserData[currentIndx].id
                    : ""
                }
                usernameProp={
                  allUserData[currentIndx] && allUserData[currentIndx].data
                    ? allUserData[currentIndx].data.username
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </Modal>

      {/*End User Model */}

      {/*Start add new User Model */}

      <Modal
        title="Add New User"
        visible={newUserVisible}
        footer={null}
        className="model_add_User"
        onCancel={newUserModalClose}
      >
        <div className="table_add_Model">
          <div className="model_add_Main">
            <div className="model_add_Detail">
              <NewUsermodel newUserModal={newUserModalClose} />
            </div>
          </div>
        </div>
      </Modal>
      {/*End add new User Model */}
      <NotificationContainer />
    </>
  );
}
