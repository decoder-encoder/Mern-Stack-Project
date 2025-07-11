const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');

const router = require('express').Router();
router.get('/',fetchExpenses);
// add Expenses
router.post('/',addExpenses);
// delete Expenses
router.delete('/:expenseId',deleteExpenses);


module.exports =router;