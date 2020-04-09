import React, { useState } from 'react';
import numberConverter from './numberConverter';

const RevealData = ({interestPaidArray, mortgage})=>{

    let paidInAss;


    const arrayResults = interestPaidArray;
    if(interestPaidArray.length > 0){
        paidInAss = numberConverter(interestPaidArray.reduce((accu, cur)=>(

            accu + cur
        )))

    }
    const totalPaid = paidInAss + parseInt(mortgage);

    return(

        <section className="inspectionData">
            {interestPaidArray.length>0 && <div>
                Typical Mortgage Payment: You Paid the Bank ${paidInAss}
            <div>
                Total you paid {totalPaid} for a loan of ${mortgage}
            </div>
            </div>}
        </section>
    )
}

export default RevealData;