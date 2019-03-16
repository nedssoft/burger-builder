import React from 'react'
import classes from './DrawerToggle.css'

const DrawerToggle = ( props ) => {
  const { toggleMenu } = props;
  return (
    <div onClick={toggleMenu} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default DrawerToggle
