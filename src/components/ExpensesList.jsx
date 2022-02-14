import React from 'react'
import Expense from './Expense'

const ExpensesList = ({ 
  expenses, 
  setUpdateExpenses, 
  deleteExpense,
  filter,
  filteredResult
  }) => {
  return (
    <div className='listado-gastos contenedor'>
        {filter ?
          (
            <>
              <h2>{filteredResult.length ? 'Expenses' : 'There is not expenses in that category yet'}</h2>
              {filteredResult.map( expense => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setUpdateExpenses={setUpdateExpenses}
                  deleteExpense={deleteExpense}
                />
              ))}
            </>
        ) : (
            <>
            <h2>{expenses.length ? 'Expenses' : 'There is not expenses yet'}</h2>
            {expenses.map( expense => (
              <Expense
                key={expense.id}
                expense={expense}
                setUpdateExpenses={setUpdateExpenses}
                deleteExpense={deleteExpense}
              />
            ))}
            </>
            )
        }
    </div>
  )
}

export default ExpensesList