import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "../src/main/admin/Layout/Layout";
import Layoutshowroom from "../src/main/emp_showroom/Layout_showroom/Layout_showroom";

// pages
import Error from "./main/error/Error";
import Login from "./main/login/Login";

// context
import { useUserState } from "./context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <PrivateRoute path="/admin" component={Layout} />
        <PrivateRoute path="/showroom" component={Layoutshowroom} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    var role = localStorage.getItem("role");
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname:
                  role === "admin" ? "/admin/dashboard" : "/showroom/itemTable",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
