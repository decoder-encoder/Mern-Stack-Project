import React, { useEffect, useState } from 'react'
import { handleError } from '../utils';
function ExpenseTrackerForm( {addExpenses}) {
    const [expenseInfo,setExpenseInfo] = useState({text:'',amount:''});
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    }
    const handleExpenses=(e)=>{
        e.preventDefault();
        console.log(expenseInfo);
        const{text,amount}=expenseInfo;
        if(!text|| !amount){
            handleError('All fields are required');
            return;
        }
        setTimeout(()=>{
            setExpenseInfo({text:'',amount:''})
        },1000)
        addExpenses(expenseInfo)
    }
  return (
    <div className='container'>
                <h1 className='expenseform'>Expense Tracker</h1>
                <form onSubmit={handleExpenses}>
                    <div>
                        <label htmlFor='email'>Expense Description</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='text'
                            placeholder='Enter your Expense Description...'
                            value={expenseInfo.text}
                        />
                    </div>
                    <div>
                        <label htmlFor='amount'>Amount</label>
                        <input
                            onChange={handleChange}
                            type='number'
                            name='amount'
                            placeholder='Enter your Amount,Expense(-ve) Income (+ve)...'
                            value={expenseInfo.amount}
                        />
                    </div>
                    <button type='submit'>Add Expense</button>
                    
                </form>
               
            </div>
  )
}

export default ExpenseTrackerForm
