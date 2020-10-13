import React from "react";
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from "react-router-dom";


// styles
import "./Layout.css";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../pages/dashboard/Dashboard";
import Charts from "../pages/charts/Charts";
import ItemTable from "../pages/item/item_table/Item_table";
import AddItem from "../pages/item/add_Item/AddItem";
import Accounts from "../pages/accounts/Accounts";
import Settings from "../pages/settings/Settings";


// context
// import { useLayoutState } from "../../../context/LayoutContext";

function Layout(props) {

  // global
  // var layoutState = useLayoutState();

  return (
    <div className="root">
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className="content"
        >
          <div className="fakeToolbar" />
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/ui/item/itemTable" component={ItemTable} />
            <Route path="/admin/ui/item/add_item" component={AddItem} />
            <Route path="/admin/ui/charts" component={Charts} />
            <Route path="/admin/ui/accounts" component={Accounts} />
            <Route path="/admin/ui/settings" component={Settings} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
