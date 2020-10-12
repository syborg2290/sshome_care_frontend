import React, { useState } from "react";
import { Grid, Button} from "@material-ui/core";
import { Modal  } from "antd";

import MUIDataTable from "mui-datatables";

// components
import Edit_model from "../accounts/components/Edit_model";
import NewUser_model from "../accounts/components/NewUser_model";

// icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

// styles
import "./Accounts.css";

export default function Accounts() {

  const [editVisible, setEditVisible] = useState(false);
  const [newUserVisible, setNewUserVisible] = useState(false);

const newUserModal = () => {
    setNewUserVisible(true);
  };

  const editModal = () => {
    setEditVisible(true);
  };


    const dumydata = [
    [
  
      "Y. K. H.Susantha Perera",
      "Assistant",
      <div className="active">
      Active
      </div>,
      <div>
          <EditIcon onClick={editModal}/>
         <span className="icon_delete">
          <DeleteIcon />
            </span>
      </div>,
    ],
       [
  
      "L. W. M.Kapila Sampath",
      "Showroom",
      <div className="active">
      Active
      </div>,
      <div>
          <EditIcon onClick={editModal}/>
         <span className="icon_delete">
          <DeleteIcon />
            </span>
      </div>,
    ],
          [
  
      "S. S. Kapila Suresh",
      "Admin",
      <div className="offline">
      Offline
      </div>,
     
      <div>
          <EditIcon onClick={editModal}/>
         <span className="icon_delete">
          <DeleteIcon />
            </span>
      </div>,
    ],
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
            data={dumydata}
            columns={[
              "User Name",
              "Roll",
              "last seen",
              "Action",
            ]}
            options={{
              filterType: "checkbox",
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
        onCancel={() => {
          setEditVisible(false);
        }}
      >
        <div className="table_edit_Model">
          <div className="model_edit_Main">
            <div className="model_edit_Detail">
              <Edit_model />
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
        onCancel={() => {
          setNewUserVisible(false);
        }}
      >
        <div className="table_add_Model">
          <div className="model_add_Main">
            <div className="model_add_Detail">
              <NewUser_model />
            </div>
          </div>
        </div>
      </Modal>
{/*End add new User Model */}
</>
    )
}
