import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// styles
import "./Record.css";

// components
import SalesReport from "./components/sales_Repots/Sales_Report";
import GassReport from "./components/gass_Reports/Gass_Reports";
import ExpencesReport from "./components/expences_Reports/Expences_Report";
import VehicalServiceReport from "./components/vehical_service/Vehical_Service_Report";
import ReportCards from "../dashboard/dashboard_contents/reports_cards/Report_Cards";

export default function Record() {
  let history = useHistory();
  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container component="main" className="main_containerRec">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ReportCards />
          </Grid>
        </Grid>
        {/*START Sales Table */}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SalesReport />
          </Grid>
        </Grid>

        {/* END Sales Table */}

        {/*START Gass Table */}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <GassReport />
          </Grid>
        </Grid>

        {/* END Gass Table */}

        {/*START Gass Table */}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ExpencesReport />
          </Grid>
        </Grid>

        {/* END Gass Table */}

        {/*START Vehical Table */}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <VehicalServiceReport />
          </Grid>
        </Grid>

        {/* END Vehical Table */}
      </Container>
    </>
  );
}
