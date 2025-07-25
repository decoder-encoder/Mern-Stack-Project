import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';
import{useRef} from 'react'
function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const hasShownFetchToast = useRef(false);


    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    useEffect(() => {
        const amounts = expenses.map((item) => item.amount);
        console.log(amounts);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
        console.log('income:', income)
        const exp = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
        console.log('exp:', exp);
        setIncomeAmt(income);
        setExpenseAmt(exp);
        if (exp > income) {
            toast.warning('Warning: Expenses exceed Income!', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    }, [expenses]);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/');
        }, 1000)
    }

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
            // handleSuccess(result.message);
            if (!hasShownFetchToast.current) {
            handleSuccess(result.message);
            hasShownFetchToast.current = true;
        }
             
        }
        catch (err) {
            handleError(err);
        }
    }
    const addExpenses = async (data) => {
        try {
            const newAmount = Number(data.amount);

            // Simulate new total amounts before saving
            const updatedExpenses = [...expenses, { amount: newAmount }];
            const amounts = updatedExpenses.map((item) => item.amount);

            const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
            const exp = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1;

            if (exp > income) {
                toast.warning('Cannot add this expense: it exceeds your total income!', {
                    position: 'top-center',
                    autoClose: 3000,
                });
                return; // Block API call
            }
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchExpenses()
    }, [])
    const handleDeleteExpense = async (expenseId) => {
        try {
            const url = `${APIUrl}/expenses/${expenseId}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',

            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='pagebody'>
            <div className='section'>
                <h1 className='welcome-text'>Welcome {loggedInUser}</h1>
                
                <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
            <div className="dashboard-container">
               <div className='summary-card'> <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} /></div>
                <ExpenseTrackerForm addExpenses={addExpenses} />
                <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense} />
            </div>
            {/* <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
            <ExpenseTrackerForm addExpenses={addExpenses} /> */}
            {/* <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense} /> */}
            <ToastContainer />
        </div>
    )
}

export default Home