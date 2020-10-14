import React from "react";
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// styles
import "./Layout_showroom.css";

// components
import Header from "../Header_showroom/Header_showroom";
import Sidebar from "../Sidebar_showroom/Sidebar_showroom";

// pages
import Dashboard from "../pages_showroom/dashboard/Dashboard_showroom";
import Charts from "../pages_showroom/charts/Charts_showroom";
import ItemTable from "../pages_showroom/item/item_table/Item_table_showroom";

function LayoutShowroom(props) {
  return (
    <div className="root">
      <>
        <Header history={props.history} />
        <Sidebar />
        <div className="content">
          <div className="fakeToolbar" />
          <Switch>
            <Route path="/showroom/dashboard" component={Dashboard} />
            <Route path="/showroom/ui/item/itemTable" component={ItemTable} />
            <Route path="/showroom/ui/charts" component={Charts} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutShowroom);
