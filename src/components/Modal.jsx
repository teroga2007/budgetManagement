import { useState, useEffect } from 'react';
import CloseModal from '../img/cerrar.svg'
import Alert from './Alert';

const Modal = ({
        setModal, 
        animateModal, 
        setAnimateModal, 
        setExpenses, 
        expenses,
        updateExpenses,
        setUpdateExpenses
     }) => {

    //Genera un id para el objeto de paciente
    const generateId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const [expense, setExpense] = useState({
        description: '',
        amount: 0,
        category: '',
        id: generateId(),
        date: Date.now()
    })

    const [alert, setAlert] = useState('')

    useEffect(() => {
        if( Object.keys(updateExpenses).length > 0 ){
            setExpense({
                description: updateExpenses.description,
                amount: updateExpenses.amount,
                category: updateExpenses.category,
                id: updateExpenses.id,
                date: updateExpenses.date
            })
        }
    }, [updateExpenses])

    const handleChange = e => {
        const value = e.target.value
        setExpense({
            ...expense,
            id: generateId(),
            date: Date.now(),
            [e.target.name]: value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        if(expense.description === '' || expense.amount <= 0 || expense.category === ''){
            setAlert('All fields are required')
            setTimeout(() => {
                setAlert('')
            }, 6000)
        }else{
            if(updateExpenses.id){
                //Update
                const updatedInfo = expenses.map( expenseState => expenseState.id === updateExpenses.id ? expense : expenseState)
                setExpenses(updatedInfo)
                setUpdateExpenses({})
                setTimeout(() => {
                    setModal(false)
                }, 300)
            }else{
                //Create
                setExpenses([...expenses, expense])
                setExpense({
                description: '',
                amount: 0,
                category: '',
                id: '',
                date: ''
                })
                hideModal()
            }
        }
    }

    const hideModal = e => {
        setModal(false)
        setUpdateExpenses({})
        setTimeout(() => {
            setAnimateModal(false)
        }, 500);
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CloseModal} alt="closeModal" onClick={hideModal} />
        </div>
        <form onSubmit={e => handleSubmit(e)} className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}>
            <legend>{updateExpenses.id ? 'Update Spent' : 'New Spent'}</legend>
            {alert &&
            <Alert type={'error'}>{alert}</Alert>
            }
            <div className='campo'>
                <label htmlFor="description">Description</label>
                <input
                id='description'
                type="text"
                placeholder='Add a spent description'
                name='description'
                value={expense.description}
                onChange={handleChange}
                />
            </div>
            <div className='campo'>
                <label htmlFor="amount">Amount</label>
                <input
                id='amount'
                type="number"
                name='amount'
                placeholder='Add the amount you spent'
                onChange={handleChange}
                />
            </div>
            <div className='campo'>
                <label htmlFor="category">Category</label>
                <select 
                id="category"
                name='category'
                value={expense.category}
                onChange={handleChange}
                >
                    <option value="">-- Select</option>
                    <option value="saving">Savings</option>
                    <option value="feeding">Feeding</option>
                    <option value="health">Health</option>
                    <option value="household">Household</option>
                    <option value="leisure">Leisure</option>
                    <option value="suscriptions">Suscriptions</option>
                    <option value="other">Other Expenses</option>
                </select>
            </div>
            <input 
            type="submit"
            value={updateExpenses.id ? 'Save Changes' : 'Add'}
            />
        </form>
    </div>
  )
}

export default Modal