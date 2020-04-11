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

        <section className="inputForm">
            {interestPaidArray.length>0 && <div>
                <div className="dataSection">
                Typical Mortgage Payment: You Paid the Bank ${paidInAss}
                </div>
            <div className="dataSection">
                Total you paid {totalPaid} for a loan of ${mortgage}
            </div>
                <div className="bar inputSection">
                    <span id="principalBar" style={{width: `10px`, backgroundColor: "orange"}}>
                        {mortgage}
                    </span>
                    <span id="interestPaid" style={{width: `{${paidInAss}/${totalPaid}}%`, backgroundColor: "pink"}}>
                        {paidInAss}
                    </span>
                </div>
            </div>}
        </section>
    )
}

export default RevealData;