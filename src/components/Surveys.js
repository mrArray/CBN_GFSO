import React, { Component, useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import Menu from "./Menu";
import authService from "../services/auth.service";
import Button from 'react-bootstrap/Button'
import Logo from '../cbn.png'


export default class Surveys extends Component {

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

        const mytoken = authService.getCurrentUser();
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

    EditTemplate(Surveys) {

        //
        localStorage.setItem("SingleSurvey", JSON.stringify(Surveys));
        const mytoken = JSON.parse(localStorage.getItem('user'));
        const token = mytoken.token;
        const singleSurveyPk = Surveys.pk;
        console.log(Surveys.pk)

        // const body =
        // {
        // survey: SurveyList.pk,
        // }

        axios.get(`https://gfso.chinikiguard.com/survey/api/details/template/${singleSurveyPk}/`,
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
                // window.location = "/CompleteSurvey"

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

                <section className="content-wrapper" >
                    <br/>
                <div className="container-fluid">

                    {/* Default box */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Surveys</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">

                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%' }}>
                                            #
            </th>
                                        <th style={{ width: '20%' }}>
                                            Survey Name
            </th>
                                        <th style={{ width: '7%' }}>
                                        Created By
            </th>
                                 {/* <th style={{ width: '30%' }}>
                                 Quarter
                                            
            </th>                          */}
                                        <th>
                                             Survey Progress
            </th>
                                        <th style={{ width: '8%' }} className="text-center">
                                            Status
            </th>
                                        <th style={{ width: '20%' }}>
                                        </th>
                                    </tr>
                                </thead>
                                {this.state.Surveys.map(survey => (

                                <tbody>
                                    <tr>
                                        <td>
                                            #
            </td>
                                        <td>
                                            <a>
                                                {survey.title}
              </a>
                                            <br />
                                            <small>
                                                Created   {survey.created}

              </small>
                                        </td>
                                        <td>
                                        <a>
                                                {survey.created_by}
              </a>
                                            
                                        </td>

                                        {/* <td>
                                        <a>
                                                {survey.quarter}
              </a>
                                            
                                        </td> */}
                                        <td className="project_progress">
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={57} aria-valuemin={0} aria-valuemax={100} style={{ width: '57%' }}>
                                                </div>
                                            </div>
                                            <small>
                                                57% Complete
              </small>
                                        </td>
                                        
                                        <td className="project-state">
                                            <span className="badge badge-success">open</span>
                                        </td>
                                        <td className="project-actions text-right">
                                            <a className="btn btn-primary btn-sm" href="#">
                                                <i className="fas fa-folder">
                                                </i>
                View
              </a>&nbsp;&nbsp;
                                            <a className="btn btn-info btn-sm" href="#">
                                                <i className="fas fa-pencil-alt">
                                                </i>
                Edit
              </a>&nbsp;&nbsp;
                                            <a className="btn btn-danger btn-sm" href="#">
                                                <i className="fas fa-trash">
                                                </i>
                Delete
              </a>
                                        </td>
                                        
                                    </tr>


                                  
                                   
                                </tbody>
                          ))}

                            </table>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                    </div>

                </section>


                <Footer />
                
            </div>
        );
    }
}