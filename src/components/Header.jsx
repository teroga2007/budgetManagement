import BudgetControl from "./BudgetControl";
import FormBudget from "./FormBudget";

const Header = ({ 
  budget, 
  setBudget, 
  isValid, 
  setIsValid, 
  expenses,
  setExpenses }) => {
  return (
    <header>
      <h1>Budget Control</h1>

      {isValid ? (
        <BudgetControl
        budget={budget}
        expenses={expenses}
        setExpenses={setExpenses}
        setBudget={setBudget}
        setIsValid={setIsValid}
        />
      ) : (
        <FormBudget
          budget={budget}
          setBudget={setBudget}
          setIsValid={setIsValid}
        />
      )}
    </header>
  );
};

export default Header;
