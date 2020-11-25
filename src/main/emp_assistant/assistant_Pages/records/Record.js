// eslint-disable-next-line
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Grid, Button } from "@material-ui/core";

// styles
import "./Record.css";

// components
import SalesReport from "./components/sales_Repots/Sales_Report";
import GassReport from "./components/gass_Reports/Gass_Reports";

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
                
            </Container>
        
        
        </>
    );
}
