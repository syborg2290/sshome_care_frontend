import React, { useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./Style";


export default function Connection_Error() {
  var classes = useStyles();

  useEffect(() => {
    window.addEventListener("online", function (e) {
      window.history.back();
    });
    window.addEventListener("offline", function (e) {
      window.history.forward();
    });
  }, []);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotype}>
        <Typography variant="h1" className={classes.logotypeText}>
          S S HOME CARE CITY
        </Typography>
      </div>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography
          variant="h1"
          color="primary"
          className={classnames(classes.textRow, classes.errorCode)}
        >
          505
        </Typography>
        <Typography variant="h5" color="primary" className={classes.textRow}>
          Oops. Looks like your internet connection is lost !
        </Typography>
        <Typography
          variant="h6"
          color="textPrimary"
          colorbrightness="secondary"
          className={classnames(classes.textRow, classes.safetyText)}
        >
          But we're here to bring you back to safety
        </Typography>
        <Button
          variant="contained"
          color="primary"
          // component={Link}
          // to="/"
          size="large"
          className={classes.backButton}
          onClick={(e) => {
            window.location.reload();
          }}
        >
          Refesh
        </Button>
      </Paper>
    </Grid>
  );
}
