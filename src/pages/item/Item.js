import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
// components
import { Button } from "../../components/Admin/Wrappers/Wrappers";
import PageTitle from "../../components/Admin/PageTitle/PageTitle";

const datatableData = [
  [
    "Joe James",
    "Example Inc.",
    "Yonkers",
    <Button color="success" size="small" className="px-2" variant="contained">
      sent
    </Button>,
  ],
  [
    "John Walsh",
    "Example Inc.",
    "Hartford",
    <Button color="warning" size="small" className="px-2" variant="contained">
      Pending
    </Button>,
  ],
  [
    "Bob Herm",
    "Example Inc.",
    "Tampa",
    <Button color="secondary" size="small" className="px-2" variant="contained">
      Declined
    </Button>,
  ],
];

export default function Item() {
  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
           
            data={datatableData}
            columns={["Name", "Company", "City", "Status"]}
            options={{
              filterType: "checkbox",
              
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
