import React, { useState } from 'react';
import numberConverter from './numberConverter';

///Dates
let todayDate = new Date();
let monthToday = todayDate.getMonth();
let yearToday = todayDate.getFullYear();

const titleInfo = [
  'Date',
  'Principal Paid',
  'Interest Paid',
  'Ending Principal',
];
const titleExtraInfo = ['Principal Paid', 'Interest Paid', 'Ending Principal'];

const Calculations = ({ mortgage }) => {
  let monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let yearArray = [2020];

  // // //User Input
  const [principal, setPrincipal] = useState(10000);
  const [interestRate, setInterestRate] = useState(3.125);
  const [monthlyPayment, setMonthlyPayment] = useState(847.5);
  const [extraPayment, setExtraPayment] = useState(100);

  //Extra payment
  const [extraPrincipalPaidArray, setExtraPrincipalPaidArray] = useState([]);
  const [extraInterestPaidArray, setExtraInterestPaidArray] = useState([]);
  const [
    extraNewEndingPrincipalArray,
    setExtraNewEndingPrincipalArray,
  ] = useState([]);

  //Update Input
  const [principalPaidArray, setPrincipalPaidArray] = useState([]);
  const [interestPaidArray, setInterestPaidArray] = useState([]);
  const [newEndingPrincipalArray, setNewEndingPrincipalArray] = useState([]);
  const [monthDate, setMonthDate] = useState([]);

  const generateCalculation = () => {
    console.log(principalPaidArray);
    if (extraNewEndingPrincipalArray.length < 1) {
      setExtraNewEndingPrincipalArray([principal]);
    }

    if (newEndingPrincipalArray.length < 1) {
      setNewEndingPrincipalArray([principal]);
    }
    // console.log({currentPrincipal});
    let currentPrincipal =
      newEndingPrincipalArray[newEndingPrincipalArray.length - 1];

    if (currentPrincipal > monthlyPayment) {
      let paymentInterestPaid = numberConverter(
        currentPrincipal * ((interestRate * 0.01) / 12),
      );
      let principalPaid = numberConverter(monthlyPayment - paymentInterestPaid);
      let balance = numberConverter(currentPrincipal - principalPaid);

      setPrincipalPaidArray([...principalPaidArray, principalPaid]);
      setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
      setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);

      let monthDateIndex =
        monthDate.length - Math.floor(monthDate.length / 12) * 12;
      setMonthDate([...monthDate, monthArray[monthDateIndex]]);
    }
    //extra payment calculations
    let extraCurrentPrincipal =
      extraNewEndingPrincipalArray[extraNewEndingPrincipalArray.length - 1];
    let extraMonthlyPaymentCal = monthlyPayment + extraPayment;
    if (extraCurrentPrincipal > monthlyPayment + extraPayment) {
      let extraPaymentInterestPaid = numberConverter(
        extraCurrentPrincipal * ((interestRate * 0.01) / 12),
      );
      let extraPrincipalPaid = numberConverter(
        extraMonthlyPaymentCal - extraPaymentInterestPaid,
      );
      let extraBalance = numberConverter(
        extraCurrentPrincipal - extraPrincipalPaid,
      );

      setExtraPrincipalPaidArray([
        ...extraPrincipalPaidArray,
        extraPrincipalPaid,
      ]);
      setExtraInterestPaidArray([
        ...extraInterestPaidArray,
        extraPaymentInterestPaid,
      ]);

      setExtraNewEndingPrincipalArray([
        ...extraNewEndingPrincipalArray,
        extraBalance,
      ]);
    }
  };

  const resetCalculation = () => {
    setPrincipal(0);
    setInterestRate(0);
    setMonthlyPayment(0);
    setExtraPayment(0);
    setExtraPrincipalPaidArray([]);
    setInterestPaidArray([]);
    setNewEndingPrincipalArray([]);
    setPrincipalPaidArray([]);
    setInterestPaidArray([]);
    setNewEndingPrincipalArray([]);
    setExtraInterestPaidArray([]);
    setExtraNewEndingPrincipalArray([]);
  };

  console.log(principalPaidArray);
  return (
    <div className="App">
      <div id="flexTable">
        <div className="tableCell">Date</div>
        <div className="tableCell">
          Principal
          {newEndingPrincipalArray.map((value, index) => (
            <div className="cellDetails" key={index}>
              {value}
            </div>
          ))}
        </div>
        <div className="tableCell">
          Monthly Payment
          {newEndingPrincipalArray.map((value, index) => (
            <div className="cellDetails" key={index}>
              {monthlyPayment}
            </div>
          ))}
        </div>
        <div className="tableCell">
          Extra Monthly Payment
          {newEndingPrincipalArray.map((value, index)=>(
              <div className="cellDetails" key={index}>
                {extraPayment}
              </div>
          ))}
        </div>
        <div className="tableCell bottomCell">
          Interest Paid
          <div className="cellDetails" >
          -
          </div>
             {interestPaidArray.map((value, index) => (
            <div className="cellDetails" key={index}>
              {value}
            </div>
          ))}
        </div>
        <div className="tableCell">
          Principal Paid
          <div className="cellDetails" >
            -
          </div>
          {principalPaidArray.map((value, index) => (
            <div className="cellDetails" key={index}>
              {value}
            </div>
          ))}
        </div>

        <div className="tableCell">
          Ending Principal
          {newEndingPrincipalArray.map((value, index) => (
            <div className="cellDetails" key={index}>
              {value}
            </div>
          ))}
        </div>
      </div>


      <button onClick={() => generateCalculation()}>Click Me</button>

      {/*<InputSection*/}
      {/*    principal={principal}*/}
      {/*    setPrincipal={setPrincipal}*/}
      {/*    interestRate={interestRate}*/}
      {/*    setInterestRate={setInterestRate}*/}
      {/*    monthlyPayment={monthlyPayment}*/}
      {/*    setMonthlyPayment={setMonthlyPayment}*/}
      {/*    extraPayment={extraPayment}*/}
      {/*    setExtraPayment={setExtraPayment}*/}
      {/*    monthArray={monthArray}*/}
      {/*/>*/}
      {/*<h2 className="header">You Can Do Anything You Put Your Mind To!</h2>*/}

      {/*<section className="evaluate">*/}

      {/*    <InterestPayments*/}
      {/*        interestPaid={interestPaidArray}*/}
      {/*        principal={principal}*/}
      {/*        principalPaid={principalPaidArray}*/}
      {/*    />*/}
      {/*    <Completion*/}
      {/*        interestPaidArray={interestPaidArray}*/}
      {/*        monthArray={monthArray}*/}
      {/*        principal={principal}*/}
      {/*    />*/}
      {/*</section>*/}

      {/*<section className="results">*/}
      {/*    <section id="AmortizationSchedule">*/}
      {/*        <button onClick={()=>generateCalculation()}>Calculate</button>*/}
      {/*        <button onClick={()=>resetCalculation()}>Reset</button>*/}
      {/*        <h2>Amortization schedule</h2>*/}
      {/*        <table>*/}
      {/*            <tr className="titleGroup">*/}
      {/*                {titleInfo.map((col, index)=>(*/}
      {/*                    <th className="title"*/}
      {/*                        key={index}*/}
      {/*                    >*/}
      {/*                        {col}*/}
      {/*                    </th>*/}
      {/*                ))}*/}

      {/*                {titleExtraInfo.map((col, index)=>(*/}
      {/*                    <th className={extraPayment>0 ? "title" : "hidden"}*/}
      {/*                        key={index}*/}
      {/*                    >*/}
      {/*                        {col}*/}
      {/*                    </th>*/}
      {/*                ))}*/}
      {/*            </tr>*/}
      {/*        </table>*/}

      {/*    <div id="amortizationResults">*/}
      {/*        <ResultArrayReturn specificClassName="month, resultsBoxes" arrayToMap={monthDate}/>*/}
      {/*        <ResultArrayReturn specificClassName="principalPaid, resultsBoxes" arrayToMap={principalPaidArray} symbol="$"/>*/}
      {/*        <ResultArrayReturn specificClassName="interestPaid, resultsBoxes" arrayToMap={interestPaidArray} symbol="$"/>*/}

      {/*        <div className="updatedPrincipal, resultsBoxes">*/}
      {/*            {newEndingPrincipalArray*/}
      {/*                .filter(x=>(x !==principal))*/}
      {/*                .map((col, index)=>(*/}
      {/*                    <div*/}
      {/*                        className="list"*/}
      {/*                        key={index}*/}
      {/*                    >*/}
      {/*                        ${col}*/}
      {/*                    </div>*/}
      {/*                ))}*/}
      {/*        </div>*/}

      {/*        <HypotheticalAnalysis*/}
      {/*            extraPayment={extraPayment}*/}
      {/*            extraPrincipalPaidArray={extraPrincipalPaidArray}*/}
      {/*            extraInterestPaidArray={extraInterestPaidArray}*/}
      {/*            monthArray={monthDate}*/}
      {/*            principal={principal}*/}
      {/*            extraNewEndingPrincipalArray={extraNewEndingPrincipalArray}*/}
      {/*        />*/}

      {/*    </div>*/}
      {/*</section>*/}

      {/*    </section>*/}
      {/*    <Footer />*/}
    </div>
  );
};

export default Calculations;
