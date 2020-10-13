import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// styles
import useStyles from "./styles";
import "./Login.css";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import db from "../../config/firebase.js";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local

  var [isLoading, setIsLoading] = useState(false);
  var [, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    var isLogged = false;
    await (await db.collection("user").get()).docs.forEach((user) => {
      if (
        user.data().username === loginValue.trim() &&
        user.data().username === passwordValue.trim()
      ) {
        isLogged = true;
        loginUser(
          userDispatch,
          loginValue,
          passwordValue,
          user.data().role,
          props.history,
          setIsLoading,
          setError
        );
      } else {
        isLogged = false;
      }
    });
    if (!isLogged) {
       NotificationManager.info(
          "Username && passsword incorrect,please try again!"
        );
    }
  };

  return (
    <Grid container className="container">
      <div className="formContainer">
        <div className="form">
          <Typography className="lbl_Login">Login</Typography>
          <React.Fragment>
            <Typography variant="h3" className="greeting">
              S S HOME CARE CITY
            </Typography>
            <div className={classes.formDividerContainer}>
              <div className={classes.formDivider} />
              <Typography className={classes.formDividerWord}>
                <LockOpenIcon className="lock_Icon" />
              </Typography>
              <div className={classes.formDivider} />
            </div>
            <TextField
              id="name"
              className="txt_login"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              placeholder="Username"
              type="name"
              label="Username"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              className="txt_login"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className="loginLoader" />
              ) : (
                <Button
                  className="btn_Login"
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={onLogin}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
      </div>
      <NotificationContainer />
    </Grid>
  );
}

export default withRouter(Login);
