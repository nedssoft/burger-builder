import React from 'react'

import styles from './Input.css'


const Input = (props) => {
  const { 
    elementType, 
    elementConfig, 
    value, 
    label, 
    changed,
    valid,
    shouldValidate,
    touched
  } = props;
  const { id } = elementConfig
  let inputElement = null
  const inputClasses = [styles.InputElement]

  if (!valid && shouldValidate && touched) {
    inputClasses.push(styles.Invalid)
  }
  if (valid) {
    inputClasses.push(styles.Valid)
  }
  switch (elementType) {
    case 'input':
      inputElement = (
        <input 
          {...elementConfig}
          className={inputClasses.join(' ')}
          onChange={changed}
          value={value}
          id={id}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea 
          {...elementConfig} 
          className={inputClasses.join(' ')} 
          onChange={changed}
          value={value}
          id={id}
        />
      )
      break;
      case 'select':
      inputElement = (
        <select 
          className={inputClasses.join(' ')} 
          onChange={changed}
          value={value}
          id={elementConfig.id}
          label={elementConfig.label}
        >
          {elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))} 
        </select>
      )
      break;
    default:
      inputElement = (
        <input 
          {...elementConfig} 
          className={inputClasses.join(' ')} 
          onChange={changed}
          value={value}
        />
      )
}
  return (
    <div className={styles.Input}>
      <label htmlFor={id} className={styles.Label}> {label}</label>
      { inputElement }
    </div>
  )
}

export default Input
