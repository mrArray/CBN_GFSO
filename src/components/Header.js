import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import authService from '../services/auth.service';

class Header extends Component {


  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.logOut = this.logOut.bind(this);


    this.state = {

    };
  }
  state = {
    navigate: false
  };

  componentWillMount() {

    const UserDetails = authService.getCurrentUser();
    this.setState({
      user: UserDetails,
    });


  }
  

logOut() {
  authService.logout();
  this.setState({ navigate: true});
   window.location.reload("/login");
}

routeChange =()=> {
  this.setState({ navigate: true});
  window.location = "/dashboard"
};



  render() {

    const { navigate } = this.state;

    return (

      <Router>
        {/* {currentUser && ( */}

         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
    {/* <li className="nav-item d-none d-sm-inline-block">
      <a href="../../index3.html" className="nav-link">Home</a>
    </li> */}
    {/* <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link">Menu</a>
    </li> */}
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="#" role="button">
        <i className="fas fa-search" />
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
    {/* Messages Dropdown Menu */}

    {/* Notifications Dropdown Menu */}
    
    
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </a>
    </li>
    <li className="nav-item">
      <Link  className="nav-link"data-slide="true" data-widget="control-sidebar" onClick={this.logOut}  >
        <span>Sign Out</span> &nbsp;
        <i className="fas fa-user-alt" />
        </Link>
    </li>
  </ul>
</nav>

        {/* )} */}
      </Router>

    )
  }

}


export default Header;