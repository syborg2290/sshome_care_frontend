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
import firebase from "firebase";

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
    var iUsernameNot = true;
    var isPasswordNot = true;
    var userDocs = await (await db.collection("user").get()).docs;
    var useLast = userDocs[userDocs.length-1];
    await (await db.collection("user").get()).docs.forEach(async (user) => {
      if (
        user.data().username.toString().toLowerCase().trim() ===
        loginValue.toString().toLowerCase().trim()
      ) {
        iUsernameNot = false;
        if (
          user.data().password.toString().toLowerCase().trim() ===
          passwordValue.toString().toLowerCase().trim()
        ) {
          isPasswordNot = false;
          await db.collection("login_logs").add({
            user_id: user.id,
            login_at: firebase.firestore.FieldValue.serverTimestamp(),
          });
          await db.collection("user").doc(user.id).update({
            lastlog: firebase.firestore.FieldValue.serverTimestamp(),
          });

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
          isPasswordNot = true;
        }
      } else {
        iUsernameNot = true;
      }
      if (useLast.id === user.id) {
        if (iUsernameNot) {
          NotificationManager.info("Username not found,please try again!");
        } else {
          if (isPasswordNot) {
            NotificationManager.info(
              "Username and password not matched,please try again!"
            );
          }
        }
      }
    });
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
