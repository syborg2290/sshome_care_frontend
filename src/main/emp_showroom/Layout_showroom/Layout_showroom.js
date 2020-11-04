import React from "react";
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// styles
import "./Layout_showroom.css";

// components
import Header from "../Header_showroom/Header_showroom";
import Sidebar from "../Sidebar_showroom/Sidebar_showroom";

// pages
import Dashboard from "../pages_showroom/dashboard/Dashboard";
import ItemTable from "../pages_showroom/item/item_table/Item_table_showroom";
import CustomerTable from "../pages_showroom/customer/customer_table/Customer_table_showroom";
import MakeInvoice from "../pages_showroom/invoice/make_invoice/Make_invoice";
import InvoiceHistory from "../pages_showroom/invoice_History/Invoice_history";
import Arreas from "../pages_showroom/arreas/Areas";
import Repairs from "../pages_showroom/repairs/Repairs";
import BlackList from "../pages_showroom/black_list/Black_List";
// import Seized from "../pages_showroom/seized_items/Seized_item";

import InvoiceCustomer from "../pages_showroom/customer/add_Customer/Add_Customer";
import PrintInvoice from "../pages_showroom/invoice/make_invoice/printInvoice/Print_invoice";
import PrintReceipt from "../pages_showroom/invoice_History/components/PayAndGoModel/UpdateModel/Make_Recipt/Recipt";
import ArriesReceipt from "../pages_showroom/arreas/arreas_update_Model/arreas_update_Recipt/Arreas_recipt";
import RepairReceipt from "../pages_showroom/repairs/repairs_Model/repair_update_Recipt/Repair_recipt";

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
            <Route path="/showroom/ui/itemTable" component={ItemTable} />
            <Route path="/showroom/ui/customer" component={CustomerTable} />
            <Route
              path="/showroom/ui/invoiceHistory"
              component={InvoiceHistory}
            />
            <Route
              path="/showroom/invoice/printInvoice"
              component={PrintInvoice}
            />
            <Route
              path="/showroom/invoice_history/payAndGo/updateModel/PrintReceipt"
              component={PrintReceipt}
            />
            <Route
              path="/showroom/arreas/arreasUpdateModel/ArreasReceipt"
              component={ArriesReceipt}
            />
            <Route
              path="/showroom/repairs/repairs_Model/repair_update_Recipt/Repair_recipt"
              component={RepairReceipt}
            />
            <Route path="/showroom/ui/makeInvoice" component={MakeInvoice} />
            <Route
              path="/showroom/invoice/addCustomer"
              component={InvoiceCustomer}
            />

            <Route path="/showroom/ui/arreas" component={Arreas} />
            <Route path="/showroom/ui/repairs" component={Repairs} />
            <Route path="/showroom/ui/blackList" component={BlackList} />
            {/* <Route path="/showroom/ui/seized" component={Seized} /> */}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutShowroom);
