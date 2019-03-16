import React from 'react';
import classes from './Backdrop.css';

const Backdrop = (props) => {
  const { show, clicked } = props;
  return (
    show ? <div className={classes.Backdrop} onClick={clicked}></div> : null
  )
}

export default Backdrop
