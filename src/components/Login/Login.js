import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import "./Login.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    // console.log("dwad");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className="login__card">
        <div className="login__paper">
          <Avatar className="login__avatar">
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <h1 className="login__title">S S Home Care City</h1>
          <form className="login__form">
            <TextField
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              className="login__btn"
              onClick={login}
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

// export default Login;
