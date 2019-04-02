import React from 'react'
import classes from './DrawerToggle.css'

function DrawerToggle({ toggleMenu }){
  return (
    <div onClick={toggleMenu} className={classes.DrawerToggle}>
      <div />
      <div />
      <div />
    </div>
  )
}

export default DrawerToggle
