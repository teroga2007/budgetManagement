import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ExpensesList from "./components/ExpensesList";
import SpentNewIcon from "./img/nuevo-gasto.svg";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import Filter from "./components/Filter";

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget' ?? null))
  )
  const [isValid, setIsValid] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) 
    : []
  )
  const [filteredResult, setFilteredResult] = useState([])
  const [updateExpenses, setUpdateExpenses] = useState({})
  const [filter, setFilter] = useState('')

  //Filtro
  useEffect(() => {
    const filteredExpenses = expenses.filter( expense => expense.category === filter)
    setFilteredResult(filteredExpenses)
  }, [filter]);

  useEffect(() => {
    if (Object.keys(updateExpenses).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true);
      }, 300);
    }
  }, [updateExpenses]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? null)
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses]);

  //Guardar presupuesto en LS y enviar a página de datos si ya tiene uno válido guardado
  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? null
    localStorage.setItem('budget', budget ?? null)
    if(budgetLS>0){
      setIsValid(true)
    }
  }, []);

  const handleNewSpent = () => {
    setModal(true);
    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
    setUpdateExpenses({});
  };

  const deleteExpense = id => {
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
        const expensesBfDelete = expenses.filter( expense => expense.id !== id)
        setExpenses(expensesBfDelete)
      }
    })
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValid={isValid}
        setIsValid={setIsValid}
      />
      {isValid && (
        <>
          <main>
            <Filter
            filter={filter}
            setFilter={setFilter}
            />
            <ExpensesList
              expenses={expenses}
              setUpdateExpenses={setUpdateExpenses}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredResult={filteredResult}
            />
          </main>
            <div className="nuevo-gasto floater">
              <img
                src={SpentNewIcon}
                alt="icono-nuevo-gasto"
                onClick={handleNewSpent}
                title="add new expense"
              />
            </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          expenses={expenses}
          setExpenses={setExpenses}
          updateExpenses={updateExpenses}
          setUpdateExpenses={setUpdateExpenses}
        />
      )}
    </div>
  );
}

export default App;
