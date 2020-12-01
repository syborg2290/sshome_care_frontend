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
import CustomerTable from "../pages/customers/customer_table/Customer_table";
import ItemTable from "../pages/item/item_table/Item_table";
import AddItem from "../pages/item/add_Item/AddItem";
import Arreas from "../pages/arreas/Areas";
import BlackList from "../pages/black_list/Black_List";
import Accounts from "../pages/accounts/Accounts";
import Repairs from "../pages/repairs/Repairs";
import Seized from "../pages/seized_items/Seized_item";


import RepairReceipt from "../pages/repairs/repairs_Model/repair_update_Recipt/Repair_recipt";
import InvoiceHistory from "../pages/invoice_History/Invoice_history";
import PrintReceipt from "../pages/invoice_History/components/PayAndGoModel/UpdateModel/Make_Recipt/Recipt";
import PrintInvoice from "../pages/invoice/make_invoice/printInvoice/Print_invoice";

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
        <div className="content">
          <div className="fakeToolbar" />
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/ui/item/itemTable" component={ItemTable} />
            <Route path="/admin/ui/item/add_item" component={AddItem} />
            <Route
              path="/admin/ui/customers/customerTable"
              component={CustomerTable}
            />
            <Route path="/admin/ui/accounts" component={Accounts} />

            <Route path="/admin/ui/blackList" component={BlackList} />
            <Route path="/admin/ui/arreas" component={Arreas} />
            <Route path="/admin/ui/repairs" component={Repairs} />
            <Route path="/admin/ui/seized" component={Seized} />

            <Route path="/admin/ui/invoiceHistory" component={InvoiceHistory} />

            <Route
              path="/admin/repairs/repairs_Model/repair_update_Recipt/Repair_recipt"
              component={RepairReceipt}
            />

            <Route
              path="/admin/invoice_history/payAndGo/updateModel/PrintReceipt"
              component={PrintReceipt}
            />

            <Route
              path="/admin/invoice/printInvoice"
              component={PrintInvoice}
            />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
