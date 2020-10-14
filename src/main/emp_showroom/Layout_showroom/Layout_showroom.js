import React from "react";
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// styles
import "./Layout_showroom.css";

// components
import Header from "../Header_showroom/Header_showroom";
import Sidebar from "../Sidebar_showroom/Sidebar_showroom";

// pages
import ItemTable from "../pages_showroom/item/item_table/Item_table_showroom";
import CustomerTable from "../pages_showroom/customer/customer_table/Customer_table_showroom";
import MakeInvoice from "../pages_showroom/invoice/make_invoice/Make_invoice";

function LayoutShowroom(props) {
  return (
    <div className="root">
      <>
        <Header history={props.history} />
        <Sidebar />
        <div className="content">
          <div className="fakeToolbar" />
          <Switch>
            <Route path="/showroom/itemTable" component={ItemTable} />
            <Route path="/showroom/ui/customer" component={CustomerTable} />
            <Route path="/showroom/ui/makeInvoice" component={MakeInvoice} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutShowroom);
