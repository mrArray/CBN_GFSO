import React from 'react';
import { ReactFormGenerator, ElementStore } from 'react-form-builder2';
import axios from "axios";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect, Link } from 'react-router-dom';
import CategoryView from "./CategoryView"



export default class Demobar extends React.Component {
  constructor(props) {

    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeQuarter = this.onChangeQuarter.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeOrigin = this.onChangeOrigin.bind(this);
    this.onChangeSurveyType = this.onChangeSurveyType.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);

    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
      category: "",
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

    const update = this._onChange.bind(this);
    ElementStore.subscribe(state => update(state.data));
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
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

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  _onSubmit = (data) => {

    //login user token
    const mytoken = JSON.parse(localStorage.getItem('user'));
    const token = mytoken.token;

    // Existing template from localStorage
    const ExtractTemplate = JSON.parse(localStorage.getItem('Templatedetails'));
    const ExtractTemplatePk = ExtractTemplate.pk;

    //his  fields from template
    const twist_result = [];
    for (let i = 0; i < ExtractTemplate.form.length; i++) {
      twist_result.push(ExtractTemplate.form[i]);
    }

    localStorage.setItem("result", JSON.stringify(twist_result));


    // my custom fields from formbuilder
    const fieldsList = [];
    for (let i = 0; i < data.length; i++) {
      fieldsList.push(data[i]);
    }

    // newly fields added to selected category from user
    const MyCategoryName = JSON.parse(localStorage.getItem('MyCategoryName'));
    const result = twist_result.find(({ name }) => name === MyCategoryName);

    const myFields = result.fields;
    const fields = myFields.concat(fieldsList);
    console.log("fields:", fields);
    console.log("result:", result);
    // modified Array objects from template
    const modifiedObj = twist_result.filter(item => item.name != MyCategoryName);
    console.log("modifiedObj:", modifiedObj);



    const fieldsObj = modifiedObj.concat(result);
    console.log("fieldsObj:", fieldsObj);
    const last_element = fieldsObj[fieldsObj.length - 1];
    console.log("last_element:", last_element);
    const final = last_element.fields;
    const name = last_element.name;
    const economic_code = last_element.economic_code;
    const heading = last_element.heading;
    const type = last_element.type;
    const finalup = final.concat(data);
    console.log("final:", finalup);
    console.log("name:", name);


    const my_category = {
      name,
      economic_code,
      heading,
      type,
      fields:
        finalup
    }
    console.log("my_category:", my_category);

    const form = modifiedObj.concat(my_category)
    console.log("twist_result:", twist_result);



    // const formList =
    // {

    //    twist_result

    // }
    console.log("form", form);

    // final result to  be send to the endpoint
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
      form

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
        window.location = "/ViewSurvey"
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

    if (!localStorage.getItem('user')) {

      return (<Redirect to={'/login'} />)
    }

  }

  // componentDidUpdate() {
  //   const SaveCategory = this.state.category
  //   localStorage.setItem("MyCategoryName", JSON.stringify(SaveCategory));
  //   console.log('Test:', SaveCategory);


  // }
  render() {

    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

    let shortModalClass = 'modal short-modal';
    if (this.state.shortPreviewVisible) {
      shortModalClass += ' show d-block';
    }

    let roModalClass = 'modal ro-modal';
    if (this.state.roPreviewVisible) {
      roModalClass += ' show d-block';
    }
    const SingleTemplate = JSON.parse(localStorage.getItem('Templatedetails'));

    return (

      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        {/* <h4 className="float-left">Preview</h4> */}

        <section className="content-header">

          <div className="container-fluid">
            {/* general form elements disabled */}

            <div className="card card">
              <div className="card-header">
                <h3 className="card-title">Survey Details</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">

                <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }} className="form" id="">
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

                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>

              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}

            <br />
            <button className="btn btn-primary btn-lg float-right" style={{ marginRight: '10px' }} onClick={this.showPreview.bind(this)}>Preview & Save </button>


            <br />

            {this.state.previewVisible &&
              <div className={modalClass}>
                <div className="modal-dialog">
                  <div className="modal-content">
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
                    <div>
                      <ReactFormGenerator
                        download_path=""
                        back_action="/"
                        back_name="Back"
                        answer_data={{}}
                        action_name="Save"
                        form_action="https://gfso.chinikiguard.com/survey/api/add/survey/fields/"
                        form_method="POST"
                        onSubmit={this._onSubmit}
                        variables={this.props.variables}
                        data={this.state.data} />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            }

            {this.state.roPreviewVisible &&
              <div className={roModalClass}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <ReactFormGenerator
                      download_path=""
                      back_action="/"
                      back_name="Back"
                      answer_data={{}}
                      action_name="Save"
                      form_action="/"
                      form_method="POST"
                      read_only={true}
                      variables={this.props.variables}
                      hide_actions={true} data={this.state.data} />

                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            }

            {this.state.shortPreviewVisible &&
              <div className={shortModalClass}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <ReactFormGenerator
                      download_path=""
                      back_action=""
                      answer_data={{}}
                      form_action="/"
                      form_method="POST"
                      data={this.state.data}
                      display_short={true}
                      variables={this.props.variables}
                      hide_actions={false} />

                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            }

          </div>

        </section>


      </div>







    );
  }
}
