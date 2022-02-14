import { useState, useEffect } from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label htmlFor="filter">Filter by category</label>
                <select 
                id="filter"
                name='filter'
                value={filter}
                onChange={e => setFilter(e.target.value)}
                >
                    <option value="">-- All Categories</option>
                    <option value="saving">Savings</option>
                    <option value="feeding">Feeding</option>
                    <option value="health">Health</option>
                    <option value="household">Household</option>
                    <option value="leisure">Leisure</option>
                    <option value="suscriptions">Suscriptions</option>
                    <option value="other">Other Expenses</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filter