import React from 'react';
// eslint-disable-next-line
import {Route, Switch, withRouter} from 'react-router-dom';

// styles
import './Layout_showroom.css';

// components
import Header from '../Header_showroom/Header_showroom';
import Sidebar from '../Sidebar_showroom/Sidebar_showroom';

// pages
import Dashboard from '../pages_showroom/dashboard/Dashboard';
import ItemTable from '../pages_showroom/item/assistant_item_table/Item_table_assistant';
import CustomerTable from '../pages_showroom/customer/customer_table/Customer_table_assistant';

import InvoiceHistory from '../pages_showroom/invoice_History/Invoice_history';
import Arreas from '../pages_showroom/arreas/Areas';
import Repairs from '../pages_showroom/repairs/Repairs';
import BlackList from '../pages_showroom/black_list/Black_List';
import GamiSarani from '../pages_showroom/gami_sarani/Gami_Sarani';
import Gass from '../pages_showroom/gass/Gass';
import GassCustomer from '../pages_showroom/gass/components/gas_customer_form/gas_customer';
import GassInvoice from '../pages_showroom/gass/components/gas_make_invoice/gas_make_invoice';
import PrintInvoice from '../pages_showroom/invoice_History/printInvoice/Print_invoice';
import PrintReceipt from '../pages_showroom/invoice_History/components/PayAndGoModel/UpdateModel/Make_Recipt/Recipt';
import RepairReceipt from '../pages_showroom/repairs/repairs_Model/repair_update_Recipt/Repair_recipt';
import GassRecipt from '../pages_showroom/gass/components/Make_Recipt/Gass_Recipt';
import GassInvoiceHistory from '../pages_showroom/gass/components/gas_invoice_history/gas_in_history';

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
              path="/showroom/invoice/PrintReceipt"
              component={PrintReceipt}
            />

            {/* <Route
              path="/showroom/arreas/arreasUpdateModel/ArreasReceipt"
              component={ArriesReceipt}
            /> */}
            <Route
              path="/showroom/repair/repairRecipt"
              component={RepairReceipt}
            />
            <Route
              path="/showroom/gass/gass_Model/make_recipt/Gass_recipt"
              component={GassRecipt}
            />

            <Route path="/showroom/ui/arreas" component={Arreas} />
            <Route path="/showroom/ui/repairs" component={Repairs} />
            <Route path="/showroom/ui/blackList" component={BlackList} />
            <Route path="/showroom/ui/Gamisarani" component={GamiSarani} />
            <Route path="/showroom/ui/gass" component={Gass} />
            <Route
              path="/showroom/ui/gas_invoice_history"
              component={GassInvoiceHistory}
            />
            <Route path="/showroom/ui/Gass_customer" component={GassCustomer} />
            <Route path="/showroom/ui/Gass_invoice" component={GassInvoice} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutShowroom);
