import React from 'react'
import classes from './Button.css'

const Button = (props) => {
 const { clicked, children, btnType, disabled} = props;
  return (
    <button 
      onClick={clicked}
      disabled={disabled}
      className={[classes.Button, classes[btnType]].join(' ')}
    >
      { children }
    </button>
      
  )
}

export default Button
