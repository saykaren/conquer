import React, { useState } from 'react';
import numberConverter from './numberConverter';

const RevealData = ({interestPaidArray})=>{

    const arrayResults = interestPaidArray;
    // const interestPaid =
    return(

        <section className="inspectionData">

            {interestPaidArray.length>0 && <div>
                Typical Mortgage Payment: You Paid the Bank ${numberConverter(interestPaidArray.reduce((accu, cur)=>(

                accu + cur
            )))}
            </div>}
        </section>
    )
}

export default RevealData;