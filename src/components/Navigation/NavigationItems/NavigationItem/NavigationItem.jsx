import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.css';

function NavigationItem  ({exact, link, children }){
  
  return (
    <li className={classes.NavigationItem}>
      <NavLink 
        to={link}
        activeClassName={classes.active}
        exact={exact}
      >
        {children}

      </NavLink>
    </li>
  )
}

export default NavigationItem
