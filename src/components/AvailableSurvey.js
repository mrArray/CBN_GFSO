import axios from 'axios'
import React, { Component, useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'
import Spinner from 'react-bootstrap/Spinner'
import Menu from "./Menu";
import AuthService from "../services/auth.service";
import Button from 'react-bootstrap/Button'
import Logo from '../cbn.png'




const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class AvailableSurvey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            warningLoad: false,
            myloading: true,
            message: "",
            Surveys: [],
        };
    }
    componentDidMount() {

        const mytoken = AuthService.getCurrentUser();
        const token = mytoken.token;
        axios.get("https://gfso.chinikiguard.com/survey/api/list/survey/",
            {
                headers:
                {
                    'Authorization': `Token ${token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS',
                    'Access-Control-Allow-Credentials': true
                },
            })
            .then(res => {
                if (res.data) {
                    localStorage.setItem("AllSurveys", JSON.stringify(res.data));
                }
                // (res);
                // (res.data);
                this.setState({
                    Surveys: res.data,
                    myloading: false,
                    warningLoad: true,
                });
            })

    }

    Fill_Survey(Surveys) {
       
        localStorage.setItem("SingleSurvey", JSON.stringify(Surveys));
        const singleSurveyPk = Surveys.pk;
        console.log(Surveys.pk)
        const mytoken = JSON.parse(localStorage.getItem('user'));
        const token = mytoken.token;

        axios.get(`https://gfso.chinikiguard.com/survey/api/details/${singleSurveyPk}/`,
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS',
                    'Access-Control-Allow-Credentials': true
                },

            })
            .then(res => {
                if (res.data) {
                    localStorage.setItem("Surveydetails", JSON.stringify(res.data));
                }
                console.log(res.data)
                window.location = "/CompleteSurvey"

            })
    }
    render() {

        if (!localStorage.getItem('user')) {
            return (<Redirect to={'/'} />)
        }



        return (
            <div>
                <Header />
                <Menu />
                <section className="content-wrapper">
                    {/* Default box */}
                    <div className="card card-solid">
                        <div className="card-body pb-0">
                            {this.state.myloading ? (
                                <>
                                    <center><Spinner animation="border" variant="primary" /></center>
                                </>
                            ) : (
                                <div className="row">
                                    {this.state.Surveys.map(surveys => (

                                        <div className="col-md-4">
                                            {/* Widget: user widget style 1 */}
                                            <div className="card card-widget widget-user">
                                                {/* Add the bg color to the header using any of the bg-* classes */}
                                                <div className="widget-user-header " style={{ borderRadius: '0.25em', textAlign: 'center', color: 'green', border: '1px solid green', padding: '0.5em' }}>
                                                    {this.state.warningLoad ? (
                                                        <>

                                                            <div className="widget-user float-left">
                                                            <i className="fas fa-bullhorn" />

                                                                <center>

                                                                    <Spinner
                                                                        as="span"
                                                                        animation="grow"
                                                                        size="lg"
                                                                        role="status"
                                                                        aria-hidden="true"
                                                                        variant="warning"
                                                                    />
                                                                </center>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <h2 className="lead"><b></b></h2>

                                                    )}

                                                    <Link
                                                        //  to="/EditTemplate"
                                                        onClick={this.Fill_Survey.bind(this, surveys)}
                                                        className="btn btn float-right"
                                                        disabled={this.state.loading}
                                                        style={{ borderRadius: '0.25em', textAlign: 'center', color: 'blue', border: '1px solid blue', padding: '0.5em' }}

                                                    >
                                                        Fill Survey &nbsp;&nbsp;
                                                                   {/* <i className="fas fa-check" /> */}

                                                    </Link>
                                                    <br />
                                                    <h3 className="widget-user-title" >{surveys.title}</h3>
                                                    <h5 className="widget-user-image">{surveys.survey_type}</h5>
                                                </div>

                                                <div className="card-footer">
                                                    <div className="row">
                                                        <div className="col-sm-4 border-right">
                                                            <div className="description-block">
                                                                <h5 className="description-header">{surveys.status}</h5>
                                                                <span className="description-text">Status</span>
                                                            </div>
                                                            {/* /.description-block */}
                                                        </div>
                                                        {/* /.col */}
                                                        <div className="col-sm-4 border-right">
                                                            <div className="description-block">
                                                                <h5 className="description-header">{surveys.start_date}</h5>
                                                                <span className="description-text">Start Date</span>
                                                            </div>
                                                            {/* /.description-block */}
                                                        </div>
                                                        {/* /.col */}
                                                        <div className="col-sm-4">
                                                            <div className="description-block">
                                                                <h5 className="description-header">{surveys.due_date}</h5>
                                                                <span className="description-text">Due Date</span>
                                                            </div>
                                                            {/* /.description-block */}
                                                        </div>
                                                        {/* /.col */}
                                                    </div>
                                                    {/* /.row */}
                                                </div>
                                            </div>
                                            {/* /.widget-user */}
                                        </div>


                                    ))}
                                </div>
                            )}
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer">
                            <nav aria-label="Contacts Page Navigation">
                                <ul className="pagination justify-content-center m-0">
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                                    <li className="page-item"><a className="page-link" href="#">6</a></li>
                                    <li className="page-item"><a className="page-link" href="#">7</a></li>
                                    <li className="page-item"><a className="page-link" href="#">8</a></li>
                                </ul>
                            </nav>
                        </div>
                        {/* /.card-footer */}
                    </div>
                    {/* /.card */}
                </section>
                <Footer />
            </div>

        );
    }
}


