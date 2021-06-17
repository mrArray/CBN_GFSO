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


export default class ViewSurvey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            warningLoad: false,
            myloading: true,
            message: "",
            SurveyList: [],
        };
    }
    componentDidMount() {

        const mytoken = authService.getCurrentUser();
        const token = mytoken.token;
        axios.get("https://gfso.chinikiguard.com/survey/api/list/template/",
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
                    localStorage.setItem("AllSurveyTemplate", JSON.stringify(res.data));
                }
                // (res);
                // (res.data);
                this.setState({
                    SurveyList: res.data,
                    myloading: false,
                    warningLoad: true,
                });
            })
    }

    EditTemplate(SurveyList) {

        //
        localStorage.setItem("SingleTemplate", JSON.stringify(SurveyList));


        const mytoken = JSON.parse(localStorage.getItem('user'));
        const token = mytoken.token;
        const Temple_pk = SurveyList.pk;
        console.log(SurveyList.pk)

        // const body =
        // {
        // survey: SurveyList.pk,
        // }

        axios.get(`https://gfso.chinikiguard.com/survey/api/details/template/${Temple_pk}/`,
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
              localStorage.setItem("Templatedetails", JSON.stringify(res.data));
            }
            console.log(res.data)
            window.location = "/EditTemplate"
    
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
                                    {this.state.SurveyList.map(surveys => (

                                        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                                            <div className="card bg-light d-flex flex-fill">
                                                <div className="card-header text-muted border-bottom-0">
                                                    {surveys.title}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     
                                                </div>
                                                <div className="card-body pt-0">
                                                    <div className="row">
                                                        <div className="col-7">
                                                            <h2 className="lead"><b>{surveys.title}</b></h2>
                                                            <p className="text-muted text-sm"><b>Created by: </b> {surveys.created_by} </p>
                                                            <p className="text-muted text-sm"><b>Date: </b> {surveys.created} </p>

                                                            {/* <ul className="ml-4 mb-0 fa-ul text-muted"> */}
                                                                {/* <div>{surveys.category_name}</div> */}
                                                                {/* <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> <b>Origin :</b> {surveys.origin}</li>
                                                                <li className="small"><span className="fa-li"><i className="fas fa-lg fa-flag" /></span> <b>Status :</b> {surveys.status}</li>
                                                            </ul> */}
                                                        </div>
                                                        <div className="col-5 text-center">
                                                            <img src={Logo}  width="70px" height="50px" alt="user-avatar" className="img-circle img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    {/* <div className="text-left">
                                                        <li className="fas fa-sm fa-clock  text-green"> Start date : {surveys.start_date}</li><br />
                                                        <li className="fas fa-sm fa-clock  text-red"> Finish date : {surveys.due_date}</li>
                                                    </div> */}
                                                    <div className="text-right">
                                                        {/* <a href="#" className="btn btn-sm bg-teal">
                                                    <i className="fas fa-comments" />
                                                </a> */}

                                                        {/* {this.state.warningLoad ? (
                                                            <> */}
                                                                <button 
                                                                //  to="/EditTemplate"
                                                                 onClick={this.EditTemplate.bind(this, surveys)}
                                                                 className="btn btn-info"
                                                                 disabled={this.state.loading}

                                                                 >
                                                                    {/* <Spinner
                                                                        as="span"
                                                                        animation="grow"
                                                                        size="sm"
                                                                        role="status"
                                                                        aria-hidden="true"
                                                                    /> */}

                                                                  Edit Template &nbsp;&nbsp;
                                                                   {/* <i className="fas fa-check" /> */}

                                                                </button>
                                                            {/* </>
                                                        ) : (
                                                            <h2 className="lead"><b></b></h2>

                                                        )} */}

                                                    </div>
                                                </div>
                                            </div>
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