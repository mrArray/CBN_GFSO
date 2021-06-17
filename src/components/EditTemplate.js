import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Redirect, Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import axios from 'axios'
import Textarea from "react-validation/build/textarea"
import Select from "react-validation/build/select"
import Spinner from 'react-bootstrap/Spinner'
import { Button } from "react-bootstrap";





const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class EditTemplate extends Component {

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
    componentWillMount() {

    }

    AdoptSurvey() {

        const mytoken = JSON.parse(localStorage.getItem('user'));
        const token = mytoken.token;

        const ExtractTemplate = JSON.parse(localStorage.getItem('Templatedetails'));
        const ExtractTemplatePk = ExtractTemplate.pk;

        //loop through the json
        const formList = [];
        for (let i = 0; i < ExtractTemplate.form.length; i++) {
            formList.push(ExtractTemplate.form[i]);
        }

        

        // newly create json
        const body =
        {
            survey_template_pk: ExtractTemplatePk,
            title: this.state.title,
            quarter: this.state.quarter,
            year: this.state.year,
            survey_type: this.state.survey_type,
            status: this.state.status,
            origin: this.state.origin,
            start_date: this.state.start_date,
            due_date: this.state.due_date,
            form: formList
        }

        console.log(body);

        axios.post("https://gfso.chinikiguard.com/survey/api/adopt/survey/", body,
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
                    localStorage.setItem("AdoptedSurvey", JSON.stringify(res.data));
                }

                this.setState({
                    message: res.data.detail,
                    successful: true,
                    loading: false,
                    meloading: false
                });

                console.log(res);
                console.log(res.data.detail);
                window.location = "/Surveys"
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

    AddField(Filter_with_name) {
        // Existing template from localStorage
        const ExtractTemplate = JSON.parse(localStorage.getItem('Templatedetails'));
        const FormArray = ExtractTemplate.form;
        console.log("FormArray", FormArray);
        console.log("Filter_with_name", Filter_with_name);
        //select Target category
        localStorage.setItem("Category_to_AddField", JSON.stringify(Filter_with_name));
        localStorage.setItem("MyCategoryName", JSON.stringify(Filter_with_name.name));
        console.log("Target_Category", Filter_with_name);
        window.location = "/CategoryView"

    }
    componentDidUpdate() {
        const WorkingCategory = this.state.category
        localStorage.setItem("WorkingCategory", JSON.stringify(WorkingCategory));
        console.log('Test:', WorkingCategory);
    }

    render() {

        if (!localStorage.getItem('user')) {
            return (<Redirect to={'/'} />)
        }

        const SingleTemplate = JSON.parse(localStorage.getItem('Templatedetails'));
        const SingleTemplateCategories = SingleTemplate.form;

        const { loading } = this.state;


        return (
            <div>
                <Header />
            <div className="content-wrapper" style={{ minHeight: 1602 }}>
                    <Menu /><br />
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                {/* left column */}

                                <div className="col-md-12">

                                    {/* right column/ hannun dama */}

                                    {/* /.card */}
                                    {SingleTemplateCategories.map(Templatefields => (
                                        <div className="card card-">
                                            <div className="card-header">
                                                <h3 className="card-title">{Templatefields.name}</h3>
                                            </div>
                                            <div className="card-body">
                                                <h6 className="">{Templatefields.type}</h6>

                                                <div className="row">
                                                    {Templatefields.fields.map(fields => (

                                                        <div className="col-4">
                                                            <input type="text" className="form-control is-valid" placeholder={fields.name} disabled id="inputSuccess" />                                                <br />
                                                        </div>
                                                    ))}
                                                </div>
                                                <button

                                                    className="btn btn-primary btn-lg"
                                                    onClick={this.AddField.bind(this, Templatefields)}
                                                    value={`${Templatefields.name}`}

                                                >
                                                    Add Field&nbsp;&nbsp;
                                                  <i className="fas fa-plus" />

                                                      </button>
                                                {/* <button
                                                        // to="/formBuilder"
                                                        onClick={this.AddField.bind(this)}
                                                        className="btn btn-primary btn-lg"
                                                        value={Templatefields.name}

                                                    >

                                                        Add field &nbsp;&nbsp;
                                                                   <i className="fas fa-plus" />

                                                 </button> */}
                                            </div>

                                            {/* /.card-body */}
                                        </div>
                                    ))}
                                    {/* /.card */}
                                    <div className="card card-">
                                        <div className="card-header">
                                            <h3 className="card-title">Action</h3>
                                        </div>
                                        <div className="card-body">
                                            <Form onSubmit={this.AdoptSurvey} ref={c => { this.form = c; }} className="form" id="">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label> Title</label>
                                                            <Input type="text" className="form-control " placeholder
                                                                value={this.state.title}
                                                                onChange={this.onChangeTitle}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label> Quarter</label>

                                                            <Input type="text" className="form-control " placeholder
                                                                value={this.state.quarter}
                                                                onChange={this.onChangeQuarter}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">

                                                            {/* text input */}
                                                            <label> Year</label>

                                                            <Input type="text" className="form-control " placeholder
                                                                value={this.state.year}
                                                                onChange={this.onChangeYear}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label> Survey Type</label>
                                                            <select type="text" className="form-control " placeholder
                                                                value={this.state.survey_type}
                                                                onChange={this.onChangeSurveyType}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="SG">SG</option>
                                                                <option value="LG">LG</option>
                                                                <option value="OTHER">OTHER</option>



                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* text input */}
                                                        <div className="form-group">
                                                            <label> Status</label>

                                                            <select type="text" className="form-control " placeholder
                                                                value={this.state.status}
                                                                onChange={this.onChangeStatus}
                                                            >

                                                                <option value="">Select</option>
                                                                <option value="open">Open</option>
                                                                <option value="close">close</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label> Origin</label>

                                                            <select type="text" className="form-control " placeholder
                                                                value={this.state.origin}
                                                                onChange={this.onChangeOrigin}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="internal">Internal</option>
                                                                <option value="external">External</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* text input */}
                                                        <div className="form-group">

                                                            <label> Start date</label>

                                                            <Input type="date" format="YYYY-MM-DD" className="form-control " placeholder
                                                                value={this.state.start_date}
                                                                onChange={this.onChangeStartDate}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label> due date</label>

                                                            <Input type="date" format="YYYY-MM-DD" className="form-control " placeholder
                                                                value={this.state.due_date}
                                                                onChange={this.onChangeDueDate}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-4">

                                                </div>

                                                <center>
                                                    {this.state.message && (

                                                        <div className="pb-5" >
                                                            <div
                                                                className={
                                                                    this.state.successful
                                                                        ? "alert alert-custom alert-outline-success fade show mb-5"
                                                                        : "alert alert-custom alert-outline-danger fade show mb-5"
                                                                }
                                                                role="alert"
                                                            >
                                                                {this.state.message}
                                                            </div>
                                                        </div>
                                                    )}</center>
                                                <div className="row">


                                                   

                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              <Button
                                                        onClick={this.AdoptSurvey.bind(this)}
                                                        className="btn btn-success btn-lg float-right"
                                                    >

                                                        Adopt Template &nbsp;&nbsp;
                                                                   <i className="fas fa-check" />

                                                    </Button>
                                                </div>
                                                <CheckButton
                                                    style={{ display: "none" }}
                                                    ref={c => {
                                                        this.checkBtn = c;
                                                    }}
                                                />
                                            </Form>

                                        </div>


                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>

                            {/*/.col (right) */}
                            {/* /.row */}
                        </div>{/* /.container-fluid */}
                    </section>

                </div>

                <Footer />

            </div>



        );
    }
}



