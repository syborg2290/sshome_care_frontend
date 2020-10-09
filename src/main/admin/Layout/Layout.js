import React from "react";
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../pages/dashboard";
import Charts from "../pages/charts/Charts";
import ItemTable from "../pages/item/item_table/Item_table";
import AddItem from "../pages/item/add_Item/AddItem";
import View_Item from "../pages/item/View_Item";

// context
import { useLayoutState } from "../../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/ui/item/itemTable" component={ItemTable} />
            <Route path="/app/ui/item/add_item" component={AddItem} />
            <Route path="/app/ui/item/view_item" component={View_Item} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
