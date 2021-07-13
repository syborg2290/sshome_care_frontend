import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// styles
import "./Layout.css";

// components
import Accounts from "../pages/accounts/Accounts";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import ItemTable from "../pages/item/assistant_item_table/Item_table_assistant";
import AddItem from "../pages/item/add_Item/Add_Item";
import StockHistory from "../pages/item/stock_History/Stock_History";
import ManageStock from "../pages/item/stock_manage/Manage_Stock";
import SellingHistory from "../pages/item/selling_History/Selling_History";
import ManagedHistory from "../pages/item/stock_manage/components/managed_history/Managed_History";
import AddCustomer from "../pages/customer/add_Customer/Add_Customer";
import MakeInvoice from "../pages/invoice/Make_invoice";

import PrintReceipt from "../pages/invoice_History/components/PayAndGoModel/UpdateModel/Make_Recipt/Recipt";
import RepairRecipt from "../pages/repairs/repairs_Model/repair_update_Recipt/Repair_recipt";
import PrintInvoice from "../pages/invoice/printInvoice/Print_invoice";
import GassRecipt from "../pages/gass/components/Make_Recipt/Gass_Recipt";

// pages
import Dashboard from "../pages/dashboard/Dashboard";
import MakeInvoiceTable from "../pages/make_invoice/Make_Invoice_table";
import Arries from "../pages/arreas/Areas";
import BlackList from "../pages/black_list/Black_List";
import Customer from "../pages/customer/customer_table/Customer_table_assistant";
import InvoiceHistory from "../pages/invoice_History/Invoice_history";
import Gass from "../pages/gass/Gass";
import GassCustomer from "../pages/gass/components/gas_customer_form/gas_customer";
import GassInvoice from "../pages/gass/components/gas_make_invoice/gas_make_invoice";
import GassInvoiceHistory from "../pages/gass/components/gas_invoice_history/gas_in_history";
import Repair from "../pages/repairs/Repairs";
import GamiSarani from "../pages/gami_sarani/Gami_Sarani";
import SeizedItems from "../pages/seized_items/Seized_item";
import Root from "../pages/root/Root";
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
            <Route
              path="/showroom/ui/MakeInvoiceTable"
              component={MakeInvoiceTable}
            />
            <Route path="/showroom/ui/Customer" component={Customer} />
            <Route path="/showroom/ui/accounts" component={Accounts} />
            <Route
              path="/showroom/ui/InvoiceHistory"
              component={InvoiceHistory}
            />
            <Route path="/showroom/ui/arries" component={Arries} />
            <Route path="/showroom/ui/Gamisarani" component={GamiSarani} />
            <Route path="/showroom/ui/Gass" component={Gass} />
            <Route
              path="/showroom/ui/gas_invoice_history"
              component={GassInvoiceHistory}
            />
            <Route path="/showroom/ui/Gass_customer" component={GassCustomer} />
            <Route path="/showroom/ui/Gass_invoice" component={GassInvoice} />
            <Route path="/showroom/ui/Repair" component={Repair} />
            <Route path="/showroom/ui/BlackList" component={BlackList} />
            <Route path="/showroom/ui/SeizedItems" component={SeizedItems} />
            <Route path="/showroom/ui/root" component={Root} />
            <Route path="/showroom/ui/shop" component={Shop} />
            {/* components */}
            <Route path="/showroom/ui/ItemTable" component={ItemTable} />
            <Route path="/showroom/ui/AddItem" component={AddItem} />
            <Route path="/showroom/ui/StockHistory" component={StockHistory} />
            <Route path="/showroom/ui/ManageStock" component={ManageStock} />
            <Route
              path="/showroom/ui/SellingHistory"
              component={SellingHistory}
            />
            <Route path="/showroom/ui/addCustomer" component={AddCustomer} />

            <Route
              path="/showroom/invoice/printInvoice"
              component={PrintInvoice}
            />

            <Route path="/showroom/ui/makeInvoice" component={MakeInvoice} />
            {/* recipt */}
            <Route
              path="/showroom/repair/repairRecipt"
              component={RepairRecipt}
            />
            <Route
              path="/showroom/invoice_history/payAndGo/updateModel/PrintReceipt"
              component={PrintReceipt}
            />

            <Route
              path="/showroom/gass/gass_Model/make_recipt/Gass_recipt"
              component={GassRecipt}
            />

            <Route
              path="/showroom/pages/managedHistory"
              component={ManagedHistory}
            />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
