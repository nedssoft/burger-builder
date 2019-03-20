import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.css'

function CheckoutSummary({ ingredients,cancelCheckout, continueCheckout }) {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto'}}>
        <Burger ingredients={ingredients} />
      </div>
      <Button type="button" btnType="Danger" clicked={cancelCheckout}>CANCEL</Button>
      <Button type="button" btnType="Success" clicked={continueCheckout}>CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary
