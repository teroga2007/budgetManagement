import {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';

const BudgetControl = ({ budget, expenses, setExpenses, setBudget, setIsValid }) => {

    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percent, setPercent] = useState(0)
    
    useEffect(() => {
       const totalSpent = expenses.reduce( (total, expense) => Number(expense.amount) + total, 0)
       const totalAvailable = budget - totalSpent

       //Calc the percent spent
        const newPercent = (( (budget - totalAvailable ) / budget ) * 100).toFixed(2)
        setTimeout(() => {
            setPercent(newPercent)
        }, 1500);

       setSpent(totalSpent)
       setAvailable(totalAvailable)
    }, [expenses])
    

    const formatBudget = num => {
        return num.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleReset = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                setBudget(0)
                setExpenses([])
                setIsValid(false)
            }
          })
    }

  return (
    <div className='contenedor-presupuesto contener sombra dos-columnas'>
        <div className='contenedor-grafico'>
            <CircularProgressbar
            styles={buildStyles({
                pathColor: percent > 100 ? '#DC2626' : '#38bdf8',
                trailColor: '#3f888f30',
                textColor: percent > 100 ? '#DC2626' : '#3F888F'
            })}
            value={percent}
            text={`${percent}% spent`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleReset}>
                RESET
            </button>
            <p>
                <span>Budget: {''}</span>
                {formatBudget(budget)}
            </p>
            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Available: {''}</span>
                {formatBudget(available)}
            </p>
            <p>
                <span>Spent: {''}</span>
                {formatBudget(Number(spent))}
            </p>
        </div>
    </div>
  )
}

export default BudgetControl