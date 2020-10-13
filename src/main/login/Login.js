import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tab,
  TextField,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";

// styles
import useStyles from "./styles";
import "./Login.css";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <Grid container className="container">
      <div className="formContainer">
        <div className="form">
          <Tab label="Login" className="lbl_Login" />
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
              // InputProps={{
              //   classes: {
              //     underline: classes.textFieldUnderline,
              //     input: classes.textField,
              //   },
              // }}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              // margin="normal"
              placeholder="User Name"
              type="name"
              label="User Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              className="txt_login"
              // InputProps={{
              //   classes: {
              //     underline: classes.textFieldUnderline,
              //     input: classes.textField,
              //   },
              // }}
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
                  onClick={() =>
                    loginUser(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                      setError
                    )
                  }
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
    </Grid>
  );
}

export default withRouter(Login);
