import React, {useState} from 'react';
import '../../styling/App1.scss';
import Table from "./TableContent";
import Calculations from "./calculations";

const App = ()=>{

    const [mortgage, setMortgage] = useState(172000);
    const [interest, setInterest] = useState(3.75);
    const [bankPayment, setBankPayment] = useState(1500);

    return(
        <section className="App">
            <div id="inputSection">
            <div className="inputSection">
                Mortgage {mortgage}
            </div>
                <div className="inputSection">
                Interest Rate {interest}
            </div>
                <div className="inputSection">
                Monthly Payment {bankPayment}
            </div>
            </div>
        {/*<Table mortgage={mortgage} bankPayment={bankPayment}/>*/}
        <Calculations mortgage={mortgage}/>
        </section>
    )
}

export default App;
