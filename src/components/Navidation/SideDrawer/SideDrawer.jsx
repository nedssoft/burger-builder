import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

const SideDrawer = ( props ) => {
  const { open, closed } = props;
  const attchedClasses = open ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close];
  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div className={attchedClasses.join(' ')}>
        <Logo height="11%" />
        <nav className={classes.Nav}>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}

export default SideDrawer
