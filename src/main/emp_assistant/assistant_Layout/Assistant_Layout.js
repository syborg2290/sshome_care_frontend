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
import Arries from "../assistant_Pages/arreas/Arries";
import BlackList from "../assistant_Pages/black_list/Black_List";
import Customer from "../assistant_Pages/customer/Customer";
import Invoice from "../assistant_Pages/invoice/Invoice";
import Item from "../assistant_Pages/item/Item";
import Repair from "../assistant_Pages/repairs/Repair";
import SeizedItems from "../assistant_Pages/seized_items/Seized_items";

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
            <Route path="/assistant/ui/Item" component={Item} />
            <Route path="/assistant/ui/Customer" component={Customer} />
            <Route path="/assistant/ui/Invoice" component={Invoice} />
            <Route path="/assistant/ui/arries" component={Arries} />
            <Route path="/assistant/ui/Repair" component={Repair} />
            <Route path="/assistant/ui/BlackList" component={BlackList} />
            <Route path="/assistant/ui/SeizedItems" component={SeizedItems} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutShowroom);
