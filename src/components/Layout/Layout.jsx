
import React, { Component} from 'react'
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navidation/Toolbar/Toolbar'
import SideDrawer from '../Navidation/SideDrawer/SideDrawer'

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
        <Toolbar toggleMenu={this.toggleSideDrawerHandler}  />
        <SideDrawer closed={this.closeSideDrawerHandler} open={showSideDrawer} />
        <main className={classes.Content}>
          { children }
        </main>
      </Aux>
    );
   }
}

export default Layout;