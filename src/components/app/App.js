import React, { useState } from 'react';
import '../../styling/App1.scss';
import numberConverter from './numberConverter';
import RevealData from './DataRevealed';

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

const App = () => {
  const [mortgage, setMortgage] = useState(172000);
  const [interest, setInterest] = useState(3.75);
  const [bankPayment, setBankPayment] = useState(1500);

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
  const [principal, setPrincipal] = useState();
  const [interestRate, setInterestRate] = useState(interest);
  const [monthlyPayment, setMonthlyPayment] = useState(bankPayment);
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
    // if (
    //   (principalPaidArray.length < 1) |
    //   (newEndingPrincipalArray[newEndingPrincipalArray.length - 1] >
    //     bankPayment)
    // ) {

    // switch (newEndingPrincipalArray[newEndingPrincipalArray.length - 1]) {
    //   case undefined : console.log('set prinipcal'); break;
    //   case mortgage : console.log('first set'); break;
    //   case true : console.log('process request'); break;
    //   case 0 : console.log('process request but need to check if array is 0'); break;
    //
    // };
    let currentPrincipal =
        parseInt(newEndingPrincipalArray[newEndingPrincipalArray.length - 1]);

    const processPayment =()=>{
        let paymentInterestPaid = numberConverter(
            currentPrincipal * ((interestRate * 0.01) / 12),
        );
        let principalPaid = numberConverter(
            monthlyPayment - paymentInterestPaid,
        );
        let balance = numberConverter(currentPrincipal - principalPaid);
        setPrincipalPaidArray([...principalPaidArray, principalPaid]);
        setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
        setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);
        let monthDateIndex =
            monthDate.length - Math.floor(monthDate.length / 12) * 12;
        setMonthDate([...monthDate, monthArray[monthDateIndex]]);
    }

    const processLastPayment = ()=>{
      console.log(`last payment ${currentPrincipal}`);
      let paymentInterestPaid = numberConverter(
          currentPrincipal * ((interestRate * 0.01) / 12),
      );
      let principalPaid = numberConverter(
          currentPrincipal
      );
      let balance = numberConverter(currentPrincipal - principalPaid);
      setPrincipalPaidArray([...principalPaidArray, principalPaid]);
      setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
      setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);
      let monthDateIndex =
          monthDate.length - Math.floor(monthDate.length / 12) * 12;
      setMonthDate([...monthDate, monthArray[monthDateIndex]]);
    }

   switch (true){
     case newEndingPrincipalArray.length < 1 : setNewEndingPrincipalArray([principal]); break;
     // case currentPrincipal > monthlyPayment & newEndingPrincipalArray.length >= 1 : console.log('process'); break;
     case (currentPrincipal > monthlyPayment && newEndingPrincipalArray.length >= 1) : processPayment(); break;
     case currentPrincipal < monthlyPayment : processLastPayment(); break;
     case (newEndingPrincipalArray[newEndingPrincipalArray.length -1] <=0) : break;
   }

      if (extraNewEndingPrincipalArray.length < 1) {
        setExtraNewEndingPrincipalArray([principal]);
      }


      // if (currentPrincipal > monthlyPayment & newEndingPrincipalArray.length >= 1) {
      //   console.log('hola');
      //   let paymentInterestPaid = numberConverter(
      //     currentPrincipal * ((interestRate * 0.01) / 12),
      //   );
      //   let principalPaid = numberConverter(
      //     monthlyPayment - paymentInterestPaid,
      //   );
      //   let balance = numberConverter(currentPrincipal - principalPaid);
      //
      //   setPrincipalPaidArray([...principalPaidArray, principalPaid]);
      //   setInterestPaidArray([...interestPaidArray, paymentInterestPaid]);
      //   setNewEndingPrincipalArray([...newEndingPrincipalArray, balance]);
      //
      //   let monthDateIndex =
      //     monthDate.length - Math.floor(monthDate.length / 12) * 12;
      //   setMonthDate([...monthDate, monthArray[monthDateIndex]]);
      // }



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
    // }
  };

  const handleResetMortgageAmount = (e) => {
    setMortgage(e);
    setPrincipal(e);
  };

  const handleResetInterestRate = (e) => {
    setInterest(e);
    setInterestRate(e);
  };

  const handleResetMonthlyPayment = (e) => {
    setMonthlyPayment(e);
    setBankPayment(e);
  };

  return (
    <section className="App">
      <div id="inputSection">
        <form>
          <label className="inputSection">
            Mortage:
            <input
              type="number"
              name="Mortgage"
              value={mortgage}
              onChange={(e) => handleResetMortgageAmount(e.currentTarget.value)}
            ></input>
          </label>
          <label className="inputSection">
            Interest Rate:
            <input
              type="number"
              name="Interest"
              value={interest}
              onChange={(e) => handleResetInterestRate(e.currentTarget.value)}
            ></input>
          </label>
          <label className="inputSection">
            Monthly Payment:
            <input
              type="number"
              name="MonthlyPayment"
              value={monthlyPayment}
              onChange={(e) => handleResetMonthlyPayment(e.currentTarget.value)}
            ></input>
          </label>
        </form>
      </div>
        <RevealData interestPaidArray={interestPaidArray}/>
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
        {/*<div className="tableCell">*/}
        {/*  Extra Monthly Payment*/}
        {/*  {newEndingPrincipalArray.map((value, index)=>(*/}
        {/*      <div className="cellDetails" key={index}>*/}
        {/*        {extraPayment}*/}
        {/*      </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
        <div className="tableCell bottomCell">
          Interest Paid
          <div className="cellDetails">-</div>
          {interestPaidArray.map((value, index) => (
            <div className="cellDetails" key={index}>
              {value}
            </div>
          ))}
        </div>
        <div className="tableCell">
          Principal Paid
          <div className="cellDetails">-</div>
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
      <button onClick={() => window.location.reload()}>Reset Numbers</button>


    </section>
  );
};

export default App;
