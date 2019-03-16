import React from 'react'
import classes from './Button.css'

const Button = (props) => {
 const { clicked, children, btnType } = props;
  return (
    <button 
      type='button'
      onClick={clicked}
      className={[classes.Button, classes[btnType]].join(' ')}
    >
      { children }
    </button>
      
  )
}

export default Button
