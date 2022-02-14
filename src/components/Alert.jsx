import React from 'react'

const Alert = ({children, type}) => {
  return (
    <div className={`alerta ${type}`}>
        {children}
    </div>
  )
}

export default Alert