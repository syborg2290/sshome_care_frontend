// eslint-disable-next-line
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
    // eslint-disable-next-line
import { Grid, Button } from "@material-ui/core";

// styles
import "./Record.css";

// components
import SalesReport from "./components/sales_Repots/Sales_Report";
import GassReport from "./components/gass_Reports/Gass_Reports";
import ExpencesReport from "./components/expences_Reports/Expences_Report";

export default function Record() {
    return (
        <>
            <Container component="main" className="main_containerRec">
                
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
                
            </Container>
        
        
        </>
    );
}
