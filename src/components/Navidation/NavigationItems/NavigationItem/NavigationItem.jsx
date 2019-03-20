import React from 'react'
import classes from './NavigationItem.css';

function NavigationItem  ({ active, link, children }){
  
  return (
    <li className={classes.NavigationItem}>
      <a href={link} className={active ? classes.active : ''}>{children}</a>
    </li>
  )
}

export default NavigationItem
