import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Modal, Spin } from "antd";

import MUIDataTable from "mui-datatables";
import moment from "moment";

// components
import Editmodel from "../accounts/components/Edit_model";
import NewUsermodel from "../accounts/components/NewUser_model";

// icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
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
                <DeleteIcon />
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

  const editModal = () => {
    setEditVisible(true);
  };

  const editModalClose = () => {
    setEditVisible(false);
  };

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
            columns={["User Name", "Role", "Last logged at", "Action"]}
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
              searchPlaceholder: "Search using any column names",
              elevation: 4,
              sort: true,
            }}
          />
        </Grid>
      </Grid>

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
                docid={  allUserData[currentIndx] && allUserData[currentIndx].id
                    ? allUserData[currentIndx].id
                  : ""}
                usernameProp={ allUserData[currentIndx] && allUserData[currentIndx].data
                    ? allUserData[currentIndx].data.username
                  : ""}
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
    </>
  );
}
