import 'react-form-builder2/dist/app.css';
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
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
import Textarea from "react-validation/build/textarea"
import Select from "react-validation/build/select"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Demobar from "./demobar";
import * as variables from './variables';



export default class CategoryView extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeQuarter = this.onChangeQuarter.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeOrigin = this.onChangeOrigin.bind(this);
        this.onChangeSurveyType = this.onChangeSurveyType.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeDueDate = this.onChangeDueDate.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);


        this.state = {
            title: "",
            quarter: "",
            status: "",
            origin: "",
            year: "",
            survey_type: "",
            start_date: "",
            due_date: "",
            loading: false,
            message: "",

        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeQuarter(e) {
        this.setState({
            quarter: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }
    onChangeStartDate(e) {
        this.setState({
            start_date: e.target.value
        });
    }
    onChangeDueDate(e) {
        this.setState({
            due_date: e.target.value
        });
    }
    onChangeSurveyType(e) {
        this.setState({
            survey_type: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangeOrigin(e) {
        this.setState({
            origin: e.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
            loading: true,
            meloading: true

        });

        const mytoken = JSON.parse(localStorage.getItem('user'));
        const token = mytoken.token;

        const responses = JSON.parse(localStorage.getItem('SingleResponse'));
        const response_data = responses.data;
        const get_form = response_data.get_form;
        // console.log(response_data);
        const value = this.state.title;


        // for(const form of get_form) {
        //   console.log(form.name)
        // }

        const body =
        {
            survey_response_pk: response_data.pk,
            form:

                [
                    {
                        get_form,
                        value: value
                    }

                ]


        }

        console.log(body);

        axios.post("https://gfso.chinikiguard.com/survey/api/add/response/entry/", body,
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
                    localStorage.setItem("SuccessSurvey", JSON.stringify(res.data));
                }

                this.setState({
                    message: res.data.detail,
                    successful: true,
                    loading: false,
                    meloading: false
                });

                console.log(res);
                console.log(res.data.detail);
                // window.location = "/dashboard"
            },

                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data.detail &&
                            error.response.data.detail) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                        loading: false,
                        meloading: false
                    });
                })
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

        const singleCategory = JSON.parse(localStorage.getItem('Category_to_AddField'));


        return (
            <div>
                <Header />
                <Menu />
                <section className="content-wrapper" >
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-6">

                                {/* general form elements disabled */}
                                <div className="card card">
                                    <div className="card-header">
                                        <h3 className="card-title">{singleCategory.name}</h3>
                                    </div>
                                    {/* /.card-header */}

                                    <div className="card-body">
                                        <br />

                                        <form>
                                            <div className="row">
                                                {singleCategory.fields.map(fields => (

                                                    <div className="col-4">
                                                        <input type="text" className="form-control is-valid" placeholder={fields.name} disabled id="inputSuccess" />                                                <br />
                                                    </div>
                                                ))}

                                            </div>
                                            {/* input states */}
                                        </form>
                                        <br />

                                        <ReactFormBuilder />

                                    </div>

                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}

                            </div>
                            {/*/.col (left) */}


                            {/* right column */}
                            <div className="col-md-6">

                            <br />

<Demobar variables={variables} />





                            </div>
                            {/*/.col (right) */}
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        );
    }
}