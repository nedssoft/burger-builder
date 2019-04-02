
import React, { Component} from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component{

  state = {
    showSideDrawer: false,
  }

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false});
  }
  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }
   render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;

    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          toggleMenu={this.toggleSideDrawerHandler}
        />
        <SideDrawer 
          closed={this.closeSideDrawerHandler} 
          open={showSideDrawer} 
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>
          { children }
        </main>
      </Aux>
    );
   }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null || localStorage.getItem('token'),
  }
}
export default connect(mapStateToProps)(Layout);