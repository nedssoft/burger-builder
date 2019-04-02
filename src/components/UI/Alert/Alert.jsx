import React from 'react'
import styles from './Alert.css'

const Alert = ( { type, children, closeAlert, show }) => {
  const typeClass = type ? styles[type] : styles.Success
  const selectedClasses = [styles.Alert, typeClass]
  return  show && (
    <div className={selectedClasses.join(' ')} onClick={closeAlert}>
      <strong>{ children }</strong>
      <span className={styles.CloseBtn} onClick={closeAlert}>&times;</span> 
    </div>
  )
}

export default Alert
