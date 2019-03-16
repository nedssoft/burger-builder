import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from "../Backdrop/Backdrop";

class Modal  extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { show } = this.props;
  //   return nextProps.show !== show;
  // }
  render() {
    const { children, show, closeModal } = this.props;
    return (
      <Aux>
        <Backdrop show={show} clicked={closeModal} />
        <div 
          className={classes.Modal}
          style={{
          transform: show? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
        >
          { children }
        </div>
      </Aux>
    )
  }
}  

export default Modal;