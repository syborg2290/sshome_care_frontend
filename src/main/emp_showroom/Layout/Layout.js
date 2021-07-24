import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// styles
import "./Layout.css";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import ItemTable from "../pages/item/assistant_item_table/Item_table_assistant";
import StockHistory from "../pages/item/stock_History/Stock_History";
import SellingHistory from "../pages/item/selling_History/Selling_History";

import RepairRecipt from "../pages/repairs/repairs_Model/repair_update_Recipt/Repair_recipt";

// pages
import Dashboard from "../pages/dashboard/Dashboard";
import Arries from "../pages/arreas/Areas";
import BlackList from "../pages/black_list/Black_List";
import Customer from "../pages/customer/customer_table/Customer_table_assistant";
import InvoiceHistory from "../pages/invoice_History/Invoice_history";
import Repair from "../pages/repairs/Repairs";
import GamiSarani from "../pages/gami_sarani/Gami_Sarani";
import SeizedItems from "../pages/seized_items/Seized_item";
import Shop from "../pages/shop/Shop";

function Layout(props) {
  return (
    <div className="root">
      <>
        <Header history={props.history} />
        <Sidebar />
        <div className="content">
          <div className="fakeToolbar" />
          <Switch>
            <Route path="/showroom/dashboard" component={Dashboard} />
           
            <Route path="/showroom/ui/Customer" component={Customer} />
            <Route
              path="/showroom/ui/InvoiceHistory"
              component={InvoiceHistory}
            />
            <Route path="/showroom/ui/arries" component={Arries} />
            <Route path="/showroom/ui/Gamisarani" component={GamiSarani} />
            <Route path="/showroom/ui/Repair" component={Repair} />
            <Route path="/showroom/ui/BlackList" component={BlackList} />
            <Route path="/showroom/ui/SeizedItems" component={SeizedItems} />
            <Route path="/showroom/ui/shop" component={Shop} />
            {/* components */}
            <Route path="/showroom/ui/ItemTable" component={ItemTable} />
            <Route path="/showroom/ui/StockHistory" component={StockHistory} />
            <Route
              path="/showroom/ui/SellingHistory"
              component={SellingHistory}
            />

            {/* recipt */}
            <Route
              path="/showroom/repair/repairRecipt"
              component={RepairRecipt}
            />
           
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
