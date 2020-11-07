import React from "react";
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// styles
import "./Assistant_Layout.css";

// components
import Header from "../assistant_Header/Assistant_Header";
import Sidebar from "../assistant_Side_Bar/Assistant_Sidebar";
import ItemTable from "../assistant_Pages/item/assistant_item_table/Item_table_assistant";
import AddItem from "../assistant_Pages/item/add_Item/Add_Item";
import AddCustomer from "../assistant_Pages/customer/add_Customer/Add_Customer";
import MakeInvoice from "../assistant_Pages/invoice/Make_invoice";

import PrintReceipt from "../assistant_Pages/invoice_History/components/PayAndGoModel/UpdateModel/Make_Recipt/Recipt";
import RepairRecipt from "../assistant_Pages/repairs/repairs_Model/repair_update_Recipt/Repair_recipt";
import PrintInvoice from "../assistant_Pages/invoice/printInvoice/Print_invoice";
import GassRecipt from "../assistant_Pages/gass/components/Make_Recipt/Gass_Recipt";

// pages
import Dashboard from "../assistant_Pages/dashboard/Dashboard";
import Arries from "../assistant_Pages/arreas/Areas";
import BlackList from "../assistant_Pages/black_list/Black_List";
import Customer from "../assistant_Pages/customer/customer_table/Customer_table_assistant";
import InvoiceHistory from "../assistant_Pages/invoice_History/Invoice_history";
import Gass from "../assistant_Pages/gass/Gass";
import Repair from "../assistant_Pages/repairs/Repairs";
import GamiSarani from "../assistant_Pages/gami_sarani/Gami_Sarani";
import SeizedItems from "../assistant_Pages/seized_items/Seized_item";
import Employee from "../assistant_Pages/employee/Employee";

function LayoutAssistant(props) {
  return (
    <div className="root">
      <>
        <Header history={props.history} />
        <Sidebar />
        <div className="content">
          <div className="fakeToolbar" />
          <Switch>
            <Route path="/assistant/dashboard" component={Dashboard} />
            <Route path="/assistant/ui/Customer" component={Customer} />
            <Route
              path="/assistant/ui/InvoiceHistory"
              component={InvoiceHistory}
            />
            <Route path="/assistant/ui/arries" component={Arries} />
            <Route path="/assistant/ui/Gamisarani" component={GamiSarani} />
            <Route path="/assistant/ui/Gass" component={Gass} />
            <Route path="/assistant/ui/Repair" component={Repair} />
            <Route path="/assistant/ui/BlackList" component={BlackList} />
            <Route path="/assistant/ui/SeizedItems" component={SeizedItems} />
            <Route path="/assistant/ui/employee" component={Employee} />
            {/* components */}
            <Route path="/assistant/ui/ItemTable" component={ItemTable} />
            <Route path="/assistant/ui/AddItem" component={AddItem} />
            <Route path="/assistant/ui/addCustomer" component={AddCustomer} />

            <Route
              path="/assistant/invoice/printInvoice"
              component={PrintInvoice}
            />

            <Route path="/assistant/ui/makeInvoice" component={MakeInvoice} />
            {/* recipt */}
            <Route
              path="/assistant/repair/repairRecipt"
              component={RepairRecipt}
            />
            <Route
              path="/assistant/invoice_history/payAndGo/updateModel/PrintReceipt"
              component={PrintReceipt}
            />

            <Route
              path="/assistant/gass/gass_Model/make_recipt/Gass_recipt"
              component={GassRecipt}
            />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutAssistant);
