import React from 'react'
import burgerLogo from '../../assets/images/127 burger-logo.png';
import classes from './Logo.css';

const Logo = ( props ) => {
  const { height } = props;
  return (
    <div className={classes.Logo} style={{height}}>
      <img src={burgerLogo} alt="logo" />
    </div>
  )
}

export default Logo
