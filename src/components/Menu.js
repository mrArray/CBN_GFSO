import React, { Component } from 'react'
import { Link, Switch } from 'react-router-dom';
import Logo from '../cbn.png'


class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {

            currentUser: undefined
        };
    }


    componentDidMount() {

        //user  stored user information (including JWT) from AuthService class
        // const user = AuthService.getCurrentUser();

        // if (user) {
        //     this.setState({
        //         currentUser: user,

        //     });
        // }
    }




    render() {
        const { currentUser } = this.state;


        return (

            <Switch>

                {/* {currentUser && ( */}

                <aside className="main-sidebar sidebar-light-success elevation-4">

                    {/* Brand Logo */}
                    <Link to="/dashboard" className="brand-link">
                        <center> <img src={Logo} height="150px" /></center><br />
                        <center> <span className="brand-text font-weight-light text-yellow"><h3><b>GFSO</b></h3></span></center>
                    </Link>

                    <div className="sidebar">

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library */}
                                <li className="nav-item has-treeview menu-open">

                                    <Link to="/dashboard" className="nav-link active">
                                        <i className="nav-icon fas fa-home" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>

                                    <ul class="nav nav-treeview">
                                            <li class="nav-item has-treeview">
                                                <Link to="/Surveys" className="nav-link">
                                                    <i class="nav-icon fas fa-list text-green"></i>
                                                    <p>
                                                         All Surveys

</p>
                                                </Link>
                                            </li>
                                        </ul>

                                        {/* <ul class="nav nav-treeview">
                                            <li class="nav-item has-treeview">
                                                <Link to="/AddSurvey" className="nav-link">
                                                    <i class="nav-icon fas fa-plus text-green"></i>
                                                    <p>
                                                        Build Survey
</p>
                                                </Link>
                                            </li>
                                        </ul> */}
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item has-treeview">
                                                <Link to="/ViewSurvey" className="nav-link">
                                                    <i class="nav-icon fas fa-table text-green"></i>
                                                    <p>
                                                         Survey Templates

</p>
                                                </Link>
                                            </li>
                                        </ul>
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item has-treeview">
                                                <Link to="/AvailableSurvey" className="nav-link">
                                                    <i class="nav-icon fas fa-bullhorn text-green"></i>
                                                    <p>
                                                        Take Survey 

</p>
                                                </Link>
                                            </li>
                                        </ul>
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item has-treeview">
                                                <Link to="/ViewSurvey" className="nav-link">
                                                    <i class="nav-icon fas fa-user text-green"></i>
                                                    <p>
                                                        My Profile

</p>
                                                </Link>
                                            </li>
                                        </ul>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}



                </aside>

                {/* )} */}
            </Switch>

        )
    }
}

export default Menu;