import React, { useState, useEffect } from "react";

import { Modal } from "antd";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import NewLoan from "./components/new_loan_Model/New_Loan_Model";
import LoanHistory from "./components/history_loan_Model/Loan_History_Model";
import UpdateLoan from "./components/update_loan_Model/Update_Loan_Model";

// styles
import "./Loan.css";

// icons
import PostAddIcon from "@material-ui/icons/PostAdd";
import HistoryIcon from "@material-ui/icons/History";

export default function Loan() {
  const [addNewLoanModel, setAddNewLoanModel] = useState(false); // table model
  const [loanHistoryModel, setLoanHistoryModel] = useState(false); // table model
  const [updateLoanModel, setUpdateLoanModel] = useState(false); // table model

  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0);
  // eslint-disable-next-line
  const [allData, setallData] = useState([]);

  const AddNewLoanModel = () => {
    setAddNewLoanModel(true);
  };

  const HistoryLoanModel = () => {
    setLoanHistoryModel(true);
  };

  const UpdateLoanModel = () => {
    setUpdateLoanModel(true);
  };

  const columns = [
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
      name: "Amount",
      options: {
        filter: false,
        setCellHeaderProps: (value) => ({
          style: { fontSize: "15px", color: "black", fontWeight: "600" },
        }),
      },
    },

    {
      name: "Status",
      options: {
        filter: true,
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
            fontSize: "15px",
            color: "black",
            fontWeight: "600",
          },
        }),
      },
    },
  ];

  const tableData = [
    [
      "Joe ",
      "James",
      "Test",
      "Corp",
      <div className="sttLon">onGoing</div>,
      <div>
        <HistoryIcon className="btnView" onClick={HistoryLoanModel} />
        <span>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="btnupdateLon"
            onClick={UpdateLoanModel}
          >
            Update
          </Button>
        </span>
      </div>,
    ],
  ];

  return (
    <>
      {/*Start Add New Loan Model */}

      <Modal
        visible={addNewLoanModel}
        footer={null}
        className="model_loan_add"
        onCancel={() => {
          setAddNewLoanModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <NewLoan />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Add New Loan Model  */}

      {/*Start  Loan hitory Model */}

      <Modal
        visible={loanHistoryModel}
        footer={null}
        className="model_loan_history"
        onCancel={() => {
          setLoanHistoryModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <LoanHistory />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Loan hitory Model  */}

      {/*Start  Loan Update Model */}

      <Modal
        visible={updateLoanModel}
        footer={null}
        className="model_loan_update"
        onCancel={() => {
          setUpdateLoanModel(false);
        }}
      >
        <div>
          <div>
            <div>
              <UpdateLoan />
            </div>
          </div>
        </div>
      </Modal>

      {/* End Loan Update Model  */}

      <Grid container spacing={4}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            className="btn_loans"
            endIcon={<PostAddIcon />}
            onClick={AddNewLoanModel}
          >
            New Loans
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className="title_Span">Employees loan</span>}
            className="loans_table"
            sty
            data={tableData}
            columns={columns}
            options={{
              // selectableRows: false,
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
