import { useState } from "react";
import Alert from "./Alert";

const FormBudget = ({ budget, setBudget, setIsValid }) => {

  const [alert, setAlert] = useState('')

  const handleBudget = e => {
    e.preventDefault()
    if(!budget || budget < 0){
      setAlert("Format is not valid")
      return
    }
      setAlert('')
      setIsValid(true)
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleBudget} className="formulario">
        <div className="campo">
          <label htmlFor="budget">Define budget</label>
          <input
            id="budget"
            type="number"
            className="nuevo-presupuesto"
            placeholder="Add your initial budget"
            onChange={ e => setBudget(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Add" />
        {alert && 
        <Alert type="error">
          {alert}
        </Alert>}
      </form>
    </div>
  );
};

export default FormBudget;
