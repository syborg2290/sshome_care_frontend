import React from "react";
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// styles
import "./Assistant_Layout.css";

// components
import Header from "../assistant_Header/Assistant_Header";
import Sidebar from "../assistant_Side_Bar/Assistant_Sidebar";

// pages
import Dashboard from "../assistant_Pages/dashboard/Dashboard";
// import ItemTable from "../pages_showroom/item/item_table/Item_table_showroom";

function LayoutShowroom(props) {
  return (
    <div className="root">
      <>
        <Header history={props.history} />
        <Sidebar />
        <div className="content">
          <div className="fakeToolbar" />
          <Switch>
            <Route path="/assistant/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutShowroom);
