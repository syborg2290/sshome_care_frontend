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
import StockHistory from "../assistant_Pages/item/stock_History/Stock_History";
import ManageStock from "../assistant_Pages/item/stock_manage/Manage_Stock";
import SellingHistory from "../assistant_Pages/item/selling_History/Selling_History";
import ManagedHistory from "../assistant_Pages/item/stock_manage/components/managed_history/Managed_History";
import AddCustomer from "../assistant_Pages/customer/add_Customer/Add_Customer";
import MakeInvoice from "../assistant_Pages/invoice/Make_invoice";

import PrintReceipt from "../assistant_Pages/invoice_History/components/PayAndGoModel/UpdateModel/Make_Recipt/Recipt";
import RepairRecipt from "../assistant_Pages/repairs/repairs_Model/repair_update_Recipt/Repair_recipt";
import PrintInvoice from "../assistant_Pages/invoice/printInvoice/Print_invoice";
import GassRecipt from "../assistant_Pages/gass/components/Make_Recipt/Gass_Recipt";

import AttendatHistory from "../assistant_Pages/attendance/components/attedance_History_Model/History_Attendance";
import Advance from "../assistant_Pages/salary/components/salary_Advance_Model/Salary_Advance";
import TemporarySalary from "../assistant_Pages/salary/components/temporary_Model/Temporary";
import SalaryHistory from "../assistant_Pages/salary/components/pay_history_Model/Pay_History_Model";
import PayHistoryReports from "../assistant_Pages/salary/components/pay_history_Model/components/Pay_History_Tabs";

import Record from "../assistant_Pages/records/Record";
import Expences from "../assistant_Pages/expences/Expences";

import EmployeePurchasing from "../assistant_Pages/employee/components/employee_purchasing/Employee_Purchasing";
import EmployeeInvoice from "../assistant_Pages/employee/components/employee_purchasing/components/employee_make_invoice/Employee_Invoice";
import PurchasedHistory from "../assistant_Pages/employee/components/purchased_history/Purchased_History";


// pages
import Dashboard from "../assistant_Pages/dashboard/Dashboard";
import MakeInvoiceTable from "../assistant_Pages/make_invoice/Make_Invoice_table";
import Arries from "../assistant_Pages/arreas/Areas";
import BlackList from "../assistant_Pages/black_list/Black_List";
import Customer from "../assistant_Pages/customer/customer_table/Customer_table_assistant";
import InvoiceHistory from "../assistant_Pages/invoice_History/Invoice_history";
import Gass from "../assistant_Pages/gass/Gass";
import Loans from "../assistant_Pages/loans/Loan";
import Repair from "../assistant_Pages/repairs/Repairs";
import GamiSarani from "../assistant_Pages/gami_sarani/Gami_Sarani";
import SeizedItems from "../assistant_Pages/seized_items/Seized_item";
import Employee from "../assistant_Pages/employee/Employee";
import Salary from "../assistant_Pages/salary/Salary";
import Attendance from "../assistant_Pages/attendance/Attendance";
import Root from "../assistant_Pages/root/Root";
import Shop from "../assistant_Pages/shop/Shop";
 

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
            <Route path="/assistant/ui/MakeInvoiceTable" component={MakeInvoiceTable} />
            <Route path="/assistant/ui/Customer" component={Customer} />
            <Route
              path="/assistant/ui/InvoiceHistory"
              component={InvoiceHistory}
            />
            <Route path="/assistant/ui/arries" component={Arries} />
            <Route path="/assistant/ui/Gamisarani" component={GamiSarani} />
            <Route path="/assistant/ui/Gass" component={Gass} />
            <Route path="/assistant/ui/loan" component={Loans} />
            <Route path="/assistant/ui/Repair" component={Repair} />
            <Route path="/assistant/ui/BlackList" component={BlackList} />
            <Route path="/assistant/ui/SeizedItems" component={SeizedItems} />
            <Route path="/assistant/ui/employee" component={Employee} />
            <Route path="/assistant/ui/salary" component={Salary} />
            <Route path="/assistant/ui/attendance" component={Attendance} />
            <Route path="/assistant/ui/root" component={Root} />
            <Route path="/assistant/ui/shop" component={Shop} />
            {/* components */}
            <Route path="/assistant/ui/ItemTable" component={ItemTable} />
            <Route path="/assistant/ui/AddItem" component={AddItem} />
            <Route path="/assistant/ui/StockHistory" component={StockHistory} />
            <Route path="/assistant/ui/ManageStock" component={ManageStock} />
            <Route path="/assistant/ui/SellingHistory" component={SellingHistory} />
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

            <Route
              path="/assistant/attendant/attendat_history"
              component={AttendatHistory}
            />

             <Route
              path="/assistant/salary/advance"
              component={Advance}
            />

             <Route
              path="/assistant/salary/Temporary"
              component={TemporarySalary}
            />

             <Route
              path="/assistant/salary/pay_history"
              component={SalaryHistory}
            />
               <Route
              path="/assistant/salary/history_reports"
              component={PayHistoryReports}
            />

             <Route
              path="/assistant/pages/records"
              component={Record}
            />

             <Route
              path="/assistant/pages/expences"
              component={Expences}
            />
              <Route
              path="/assistant/pages/managedHistory"
              component={ManagedHistory}
            />
             <Route
              path="/assistant/pages/employeePurchasing"
              component={EmployeePurchasing}
            />
            <Route
              path="/assistant/pages/employeeInvoice"
              component={EmployeeInvoice}
            />
            <Route
              path="/assistant/pages/purchasedHistory"
              component={PurchasedHistory}
            />
           
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(LayoutAssistant);
