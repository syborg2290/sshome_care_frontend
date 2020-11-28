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

export default function Other_Expences_Model() {

  
    return (
        <>
        <div>
        <RentTable />
            </div>
             <div>
        <SalaryTable />
            </div>
                  <div>
        <Advance />
            </div>
                     <div>
        <Temporary />
        </div>
             <div>
        <Short />
            </div>
                <div>
        <SalaryInstallment />
            </div>
               <div>
        <PayforWorkers />
            </div>
             <div>
        <Boc />
            </div>
        <div>
        <UnionBank />
            </div>
            <div>
        <Bankinginstallment />
            </div>
                <div>
        <Loan />
            </div>
                   <div>
        <Sampath />
            </div>
                   <div>
        <Monika />
            </div>
                     <div>
        <Sithu />
            </div>
                            <div>
        <Reload />
            </div>
                         <div>
        <Stationary />
            </div>
                         <div>
        <Other />
        </div>
        </>
    )
}