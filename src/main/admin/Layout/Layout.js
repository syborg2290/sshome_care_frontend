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

import AttendatHistory from "../pages/attendance/components/attedance_History_Model/History_Attendance";
import Advance from "../pages/salary/components/salary_Advance_Model/Salary_Advance";
import TemporarySalary from "../pages/salary/components/temporary_Model/Temporary";
import SalaryHistory from "../pages/salary/components/pay_history_Model/Pay_History_Model";
import PayHistoryReports from "../pages/salary/components/pay_history_Model/components/Pay_History_Tabs";

import Record from "../pages/records/Record";
import Expences from "../pages/expences/Expences";

import EmployeePurchasing from "../pages/employee/components/employee_purchasing/Employee_Purchasing";
import EmployeeInvoice from "../pages/employee/components/employee_purchasing/components/employee_make_invoice/Employee_Invoice";
import PurchasedHistory from "../pages/employee/components/purchased_history/Purchased_History";


// pages
import Dashboard from "../pages/dashboard/Dashboard";
import MakeInvoiceTable from "../pages/make_invoice/Make_Invoice_table";
import Arries from "../pages/arreas/Areas";
import BlackList from "../pages/black_list/Black_List";
import Customer from "../pages/customer/customer_table/Customer_table_assistant";
import InvoiceHistory from "../pages/invoice_History/Invoice_history";
import Gass from "../pages/gass/Gass";
import Loans from "../pages/loans/Loan";
import Repair from "../pages/repairs/Repairs";
import GamiSarani from "../pages/gami_sarani/Gami_Sarani";
import SeizedItems from "../pages/seized_items/Seized_item";
import Employee from "../pages/employee/Employee";
import Salary from "../pages/salary/Salary";
import Attendance from "../pages/attendance/Attendance";
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
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route
              path="/admin/ui/MakeInvoiceTable"
              component={MakeInvoiceTable}
            />
            <Route path="/admin/ui/Customer" component={Customer} />
            <Route path="/admin/ui/accounts" component={Accounts} />
            <Route path="/admin/ui/InvoiceHistory" component={InvoiceHistory} />
            <Route path="/admin/ui/arries" component={Arries} />
            <Route path="/admin/ui/Gamisarani" component={GamiSarani} />
            <Route path="/admin/ui/Gass" component={Gass} />
            <Route path="/admin/ui/loan" component={Loans} />
            <Route path="/admin/ui/Repair" component={Repair} />
            <Route path="/admin/ui/BlackList" component={BlackList} />
            <Route path="/admin/ui/SeizedItems" component={SeizedItems} />
            <Route path="/admin/ui/employee" component={Employee} />
            <Route path="/admin/ui/salary" component={Salary} />
            <Route path="/admin/ui/attendance" component={Attendance} />
            <Route path="/admin/ui/root" component={Root} />
            <Route path="/admin/ui/shop" component={Shop} />
            {/* components */}
            <Route path="/admin/ui/ItemTable" component={ItemTable} />
            <Route path="/admin/ui/AddItem" component={AddItem} />
            <Route path="/admin/ui/StockHistory" component={StockHistory} />
            <Route path="/admin/ui/ManageStock" component={ManageStock} />
            <Route path="/admin/ui/SellingHistory" component={SellingHistory} />
            <Route path="/admin/ui/addCustomer" component={AddCustomer} />

            <Route
              path="/admin/invoice/printInvoice"
              component={PrintInvoice}
            />

            <Route path="/admin/ui/makeInvoice" component={MakeInvoice} />
            {/* recipt */}
            <Route path="/admin/repair/repairRecipt" component={RepairRecipt} />
            <Route
              path="/admin/invoice_history/payAndGo/updateModel/PrintReceipt"
              component={PrintReceipt}
            />

            <Route
              path="/admin/gass/gass_Model/make_recipt/Gass_recipt"
              component={GassRecipt}
            />

            <Route
              path="/admin/attendant/attendat_history"
              component={AttendatHistory}
            />

            <Route path="/admin/salary/advance" component={Advance} />

            <Route path="/admin/salary/Temporary" component={TemporarySalary} />

            <Route path="/admin/salary/pay_history" component={SalaryHistory} />
            <Route
              path="/admin/salary/history_reports"
              component={PayHistoryReports}
            />

            <Route path="/admin/pages/records" component={Record} />

            <Route path="/admin/pages/expences" component={Expences} />
            <Route
              path="/admin/pages/managedHistory"
              component={ManagedHistory}
            />
            <Route
              path="/admin/pages/employeePurchasing"
              component={EmployeePurchasing}
            />
            <Route
              path="/admin/pages/employeeInvoice"
              component={EmployeeInvoice}
            />
            <Route
              path="/admin/pages/purchasedHistory"
              component={PurchasedHistory}
            />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
