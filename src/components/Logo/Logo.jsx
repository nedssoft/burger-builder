import React from 'react'
import { Link } from 'react-router-dom'
import burgerLogo from '../../assets/images/127 burger-logo.png';
import classes from './Logo.css';

const Logo = ( props ) => {
  const { height } = props;
  return (
    
    <div className={classes.Logo} style={{height}}>
      <Link to="/">
        <img src={burgerLogo} alt="logo" />
      </Link> 
    </div>
    
  )
}

export default Logo
