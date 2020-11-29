import React from "react";

// components
import RentTable from "./rent_table/Rent_Table";
import SalaryTable from "./salary_table/Salary_Table";
import Advance from "./advance_table/Advance";
import Temporary from "./temporary_table/Temporary";
import Short from "./short_table/Short";
import SalaryInstallment from "./salary_installment_table/Salary_Installment";
import PayforWorkers from "./workers_table/Pay_for_Workers";
import Boc from "./boc_table/Boc";
import UnionBank from "./union_bank_table/Union_Bank";
import Bankinginstallment from "./banking_installment_table/Banking_installment";
import Loan from "./loan_table/Loan";
import Sampath from "./mr_sampath_table/Sampath";
import Monika from "./mrs_monika_table/Monika";
import Sithu from "./sithu_table/Sithu";
import Reload from "./reload_table/Reload";
import Stationary from "./Stationary/Stationary";
import Other from "./other_table/Other";

// styles
import "./Other_Expences_Model.css";

export default function Other_Expences_Model({ data }) {
  return (
    <>
      <div>
        <RentTable obj={data.rentVehi} />
      </div>
      <div>
        <SalaryTable obj={data.salary} />
      </div>
      <div>
        <Advance obj={data.advance} />
      </div>
      <div>
        <Temporary obj={data.temp} />
      </div>
      <div>
        <Short obj={data.shorts} />
      </div>
      <div>
        <SalaryInstallment obj={data.salaryDeductables} />
      </div>
      <div>
        <PayforWorkers obj={data.pay_for_workers} />
      </div>
      <div>
        <Boc obj={data.boc_bank} />
      </div>
      <div>
        <UnionBank obj={data.unionBank} />
      </div>
      <div>
        <Bankinginstallment obj={data.bankingInstall} />
      </div>
      <div>
        <Loan obj={data.loans_for} />
      </div>
      <div>
        <Sampath obj={data.mr_sampath} />
      </div>
      <div>
        <Monika obj={data.mrs_monika} />
      </div>
      <div>
        <Sithu obj={data.sithu} />
      </div>
      <div>
        <Reload obj={data.cards_reload} />
      </div>
      <div>
        <Stationary obj={data.stationary} />
      </div>
      <div>
        <Other obj={data.other} />
      </div>
    </>
  );
}
