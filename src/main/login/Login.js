import React, { useState, useEffect } from "react";
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

import Particles from "react-particles-js";
import particlesConfig from "../../config/particlesConfig.js";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import db from "../../config/firebase.js";
import firebase from "firebase";

import { useHistory } from "react-router-dom";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();
  let history = useHistory();

  var [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var itemsProcessed = 0;
    var iUsernameNot = true;
    var isPasswordNot = true;
    var length = await (await db.collection("user").get()).docs.length;

    (await db.collection("user").get()).docs.every(async (user) => {
      itemsProcessed++;

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
          setIsLoading(false);

          loginUser(
            userDispatch,
            loginValue,
            passwordValue,
            user.data().role,
            user.data().username,
            props.history,
            setIsLoading,
            setError
          );
        }
      }
    });
    if (itemsProcessed === length) {
      if (iUsernameNot || isPasswordNot) {
        setIsLoading(false);
        NotificationManager.info(
          "Username and password not matched,please try again!"
        );
      }
    }
  };

  return (
    <>
      <div style={{ position: "absolute", background: "#000022" }}>
        <Particles height="100vh" width="100vw" params={particlesConfig} />
      </div>
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
              <form>
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
                      type="submit"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </React.Fragment>
          </div>
        </div>
        <NotificationContainer />
      </Grid>
    </>
  );
}

export default withRouter(Login);
