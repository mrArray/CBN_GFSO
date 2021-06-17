import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea"
import Select from "react-validation/build/select"
import { isEmail } from "validator";
import { Link, Switch, Redirect } from 'react-router-dom'
import AuthService from "../services/auth.service";
import Spinner from 'react-bootstrap/Spinner'
import Header from "./Header";
import Footer from "./Footer";
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

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class CreateNewUser extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLG = this.onChangeLG.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);



    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      address: "",
      lga: "",
      state: "",
      dob: "",
      email: "",
      phone_number: "",
      successful: false,
      message: "",
      loading:false

    };
  }


  componentDidMount() {
    if (localStorage.getItem('user')) {

      return (<Redirect to={'/dashboard'} />)
    }
    const script = document.createElement("script");

    script.src = "/plugins/daterangepicker/daterangepicker.js";
    script.async = true;

    document.body.appendChild(script);
  }



  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  onChangeLG(e) {
    this.setState({
      lga: e.target.value
    });
  }
  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeDob(e) {
    this.setState({
      dob: e.target.value
    });
  }
  onChangePhoneNumber(e) {
    this.setState({
      phone_number: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
      loading:true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.createNewUser(
        this.state.username,
        this.state.password,
        this.state.first_name,
        this.state.last_name,
        this.state.address,
        this.state.lga,
        this.state.state,
        this.state.dob,
        this.state.email,
        this.state.phone_number,

      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
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
            message: resMessage
          });
        }
      );
    }
  }
  render() {

    const { loading } = this.state;


    return (

      <div className="hold-transition register-page" >

        <div className="col-md-7" >
          <div className="login-logo">
            <img src={Logo} height="100px" />
            <br />
            <a href=""><b>CBN</b> GFSO</a>
          </div>
          <div className="card card-" >
            <div className="card-header">
              <center>
                <div>Register a new membership</div>
              </center>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <Form onSubmit={this.handleRegister} ref={c => { this.form = c; }} className="form" id="">
                <div className="row">
                  <div className="col-sm-6">
                    {/* text input */}
                    <div className="form-group">
                      <label>First Name</label>
                      <Input type="text" id="firstname" className="form-control" placeholder="first name" value={this.state.first_name}
                        onChange={this.onChangeFirstName}
                        validations={[required]} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <Input type="text" id="lastname" className="form-control" placeholder="last name" value={this.state.last_name}
                        onChange={this.onChangeLastName}
                        validations={[required]} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    {/* textarea */}
                    <div className="form-group">
                      <label>Email</label>
                      <Input type="email" id="email" className="form-control" placeholder="Email" value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required]} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <Input type="tel" id="phonenumber" className="form-control" placeholder="Phone number" value={this.state.phone_number}
                        onChange={this.onChangePhoneNumber}
                        validations={[required]} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    {/* text input */}
                    <div className="form-group">
                      <label>Address</label>
                      <Textarea type="text" id="address" className="form-control"
                        placeholder="Address" value={this.state.address}
                        onChange={this.onChangeAddress} validations={[required]} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                  <div className="form-group">

                      <label>date of birth</label>

                      <Input type="date" format="YYYY-MM-DD" className="form-control " placeholder
                        value={this.state.dob}
                        onChange={this.onChangeDob}

                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>State</label>
                      <Select value={this.state.state}
                        onChange={this.onChangeState}
                        validations={[required]} type="text" id="state" className="form-control">
                        <option value>Select</option>
                        <option value="ABUJA">ABUJA FCT</option>
                        <option value="ABIA">ABIA</option>
                        <option value="ADAMAWA">ADAMAWA</option>
                        <option value="AKWA IBOM">AKWA IBOM</option>
                        <option value="ANAMBRA">ANAMBRA</option>
                        <option value="BAUCHI">BAUCHI</option>
                        <option value="BAYELSA">BAYELSA</option>
                        <option value="BENUE">BENUE</option>
                        <option value="BORNO">BORNO</option>
                        <option value="CROSS RIVER">CROSS RIVER</option>
                        <option value="DELTA">DELTA</option>
                        <option value="EBONYI">EBONYI</option>
                        <option value="EDO">EDO</option>
                        <option value="EKITI">EKITI</option>
                        <option value="ENUGU">ENUGU</option>
                        <option value="GOMBE">GOMBE</option>
                        <option value="IMO">IMO</option>
                        <option value="JIGAWA">JIGAWA</option>
                        <option value="KADUNA">KADUNA</option>
                        <option value="KANO">KANO</option>
                        <option value="KATSINA">KATSINA</option>
                        <option value="KEBBI">KEBBI</option>
                        <option value="KOGI">KOGI</option>
                        <option value="KWARA">KWARA</option>
                        <option value="LAGOS">LAGOS</option>
                        <option value="NASSARAWA">NASSARAWA</option>
                        <option value="NIGER">NIGER</option>
                        <option value="OGUN">OGUN</option>
                        <option value="ONDO">ONDO</option>
                        <option value="OSUN">OSUN</option>
                        <option value="OYO">OYO</option>
                        <option value="PLATEAU">PLATEAU</option>
                        <option value="RIVERS">RIVERS</option>
                        <option value="SOKOTO">SOKOTO</option>
                        <option value="TARABA">TARABA</option>
                        <option value="YOBE">YOBE</option>
                        <option value="ZAMFARA">ZAMFARA</option>
                      </Select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Lga</label>
                      <Input type="text" className="form-control" placeholder="LGA" 
                       value={this.state.lga}
                       onChange={this.onChangeLG}
                       validations={[required]} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Username</label>
                      <Input type="text" name="username" className="form-control" placeholder="Username" 
                      value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required]} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Password</label>
                      <Input type="password" name="password" className="form-control" placeholder="password" value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]} />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-lg float-right"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Register</span>
                  </button>
                </div>
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
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
        </div>
      </div>



    );
  }
}