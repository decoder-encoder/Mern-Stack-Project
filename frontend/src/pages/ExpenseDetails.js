import React from 'react'

const ExpenseDetails = ({ incomeAmt, expenseAmt }) => {
  const balance = incomeAmt - expenseAmt;

  return (
  
      <div className="left-section">
        <h2 className="balance-text">Your Balance</h2>
        <div className="balance-amount">₹{balance}</div>

        <div className="summary-container">
          <div className="summary-box income-box">
            <h3>Income </h3>
            <p className="amount income"> ₹{incomeAmt}</p>
          </div>
          <div className="summary-box expense-box">
            <h3>Expense</h3>
            <p className="amount expense">₹{expenseAmt}</p>
          </div>
        </div>
      </div>
    
    // <div className="expense-details">
    //   <h2 className="balance-text">Your Balance</h2>
    //   <div className="balance-amount">₹{balance}</div>

    //   <div className="summary-container">
    //     <div className="summary-box income-box">
    //       <h3>Income</h3>
    //       <p className="amount income">+ ₹{incomeAmt}</p>
    //     </div>
    //     <div className="summary-box expense-box">
    //       <h3>Expense</h3>
    //       <p className="amount expense">- ₹{expenseAmt}</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ExpenseDetails
