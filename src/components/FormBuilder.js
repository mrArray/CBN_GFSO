import React from 'react';
import 'react-form-builder2/dist/app.css';
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
import DemoBar from './demobar';
import * as variables from './variables';
import { get, post } from './requests';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import AuthService from "../services/auth.service";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";



const getUrl = (cid) => `https://gfso.chinikiguard.com/survey/api/add/survey/fields/?cid=${cid}`;

export class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formId: '1' };
    this.formId = this.state.formId;
    this.handleChange = this.handleChange.bind(this);
  }

  formId;

  handleChange(event) {
    this.formId = event.target.value;
    const url = getUrl(this.formId);
    console.log('handleChange', url);
    ElementStore.dispatch('load', { loadUrl: url });
    this.setState({ formId: this.formId });
  }

  onLoad = () => {
    const url = getUrl(this.formId);
    console.log('onLoad', url);
    return get(url);
  };

  onPost = (data) => {
    const saveUrl = getUrl(this.formId);
    console.log('onPost', saveUrl, data);
    post(saveUrl, data);
  };

  render() {
    if (localStorage.getItem('user')) {

      return (<Redirect to={'/login'} />)
    }

  
    return (

      <div>
        <Header />

        <div className="content-wrapper">

          <Menu />
          <br />

          <div className="container-fluid">

            <div className="card card- ">


              <DemoBar variables={variables} />
              <ReactFormBuilder
                onLoad={this.onLoad}
                onPost={this.onPost}
              />,

           </div>

          </div>


        </div>
        <Footer />

      </div>

    );
  }
}

export default FormBuilder;

