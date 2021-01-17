import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";

import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Link";
import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/ComboBox";
import "@ui5/webcomponents/dist/ComboBoxItem";

import "./Login.css";
import { ACCOUNT_SERVICE_API } from "../../app-config"

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      register: false,
      redirectToReferrer: false,
      name: '',
      lastName: '',
      phone: '',
      gender: '',
      age: '',
      city:'',
      bloodGroup: '',
      email: ''
    };

    this.createAccountLinkRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.phoneRef = React.createRef();
    this.emailRef = React.createRef();
    this.genderRef = React.createRef();
    this.ageRef = React.createRef();
    this.bloodGroupRef = React.createRef();
    this.cityRef = React.createRef();


    this.submitButtonRef = React.createRef();
    this.userEmailRef = React.createRef();

    this.onCreateAccountClick = this.onCreateAccountClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onTelephoneChange = this.onTelephoneChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onAdressChange = this.onAdressChange.bind(this);
    this.onBloodGroupChange = this.onBloodGroupChange.bind(this);
    this.submit = this.submit.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    const user = this.userEmailRef.current.value;
    localStorage.setItem('userID', user);
    this.props.auth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  }

  componentDidMount() {
    if (this.createAccountLinkRef.current) {
        this.createAccountLinkRef.current.addEventListener("click", this.onCreateAccountClick);
    }
    if (this.submitButtonRef.current) {
      this.submitButtonRef.current.addEventListener("click", this.submit);
    }
   
  }

  componentWillUnmount() {
    if (this.createAccountLinkRef.current) {
      this.createAccountLinkRef.current.removeEventListener("click", this.onCreateAccountClick);
    }
    if (this.submitButtonRef.current) {
      this.submitButtonRef.current.removeEventListener("click", this.submit);
    }
    if (this.firstNameRef.current) {
        this.firstNameRef.current.removeEventListener("input", this.onNameChange);
        this.lastNameRef.current.removeEventListener("input", this.onLastNameChange);
        this.emailRef.current.removeEventListener("input", this.onEmailChange);
        this.phoneRef.current.removeEventListener("input", this.onTelephoneChange);
        this.bloodGroupRef.current.removeEventListener("change", this.onBloodGroupChange);
        this.cityRef.current.removeEventListener("input", this.onAdressChange);
        this.ageRef.current.removeEventListener("input", this.onAgeChange);
        this.genderRef.current.removeEventListener("change", this.onGenderChange);
    }
    
  }

 onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  onTelephoneChange(event) {
    this.setState({ phone: event.target.value });
  }

  onAdressChange(event) {
    this.setState({ city: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onAgeChange(event) {
    this.setState({ age: event.target.value.toString() });
  }

  onGenderChange(event) {
    this.setState({ gender: event.target.value || event.target.selectedOption.innerText });
  }

  onBloodGroupChange(event) {
    this.setState({ bloodGroup: event.target.value || event.target.selectedOption.innerText });
  }

  onCreateAccountClick() {
    this.setState({ register: true });
    setTimeout(() => {
        this.firstNameRef.current.addEventListener("input", this.onNameChange);
        this.lastNameRef.current.addEventListener("input", this.onLastNameChange);
        this.emailRef.current.addEventListener("input", this.onEmailChange);
        this.phoneRef.current.addEventListener("input", this.onTelephoneChange);
        this.bloodGroupRef.current.addEventListener("change", this.onBloodGroupChange);
        this.cityRef.current.addEventListener("input", this.onAdressChange);
        this.ageRef.current.addEventListener("input", this.onAgeChange);
        this.genderRef.current.addEventListener("change", this.onGenderChange);
    })
    
  }

  submit() {
    this.state.register ? this.register() : this.login();
  }

  register() {
    window.localStorage.setItem("bloodGroup", this.state.bloodGroup);
    const url = ACCOUNT_SERVICE_API + '/donors';

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            "name": this.state.name,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "phone": this.state.phone,
            "age": this.state.age,
            "gender": this.state.gender,
            "bloodGroup": this.state.bloodGroup,
            "city": this.state.city
        })
      }).then(() => {
        console.log("New donor was added successfully!");
        window.alert("You have been successfully registered to LifeBlood.\nPlease, login.")
      }, (err) => {
        console.error(err);
        console.log("Failed to add new donor.");
      });
    this.setState({ register: false });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { register, redirectToReferrer, name, lastName, phone, email, gender, age, bloodGroup, city } = this.state;

    if (redirectToReferrer === true) {
      this.props.cb();
      return <Redirect to={from} />
    }
    return (
      <main>
        <div className="container">
          <header>
            <h1>LifeBlood</h1>
            <h4>{register ? "Become a Donor" : "Login"}</h4>
          </header>
          {register ?
            <>
              <ui5-panel header-text="Personal Information">
                <ui5-input ref={this.firstNameRef} type="Text" placeholder="First Name" value={name} />
                <ui5-input ref={this.lastNameRef} type="Text" placeholder="Last Name" value={lastName} />
                <ui5-input ref={this.phoneRef} type="Tel" placeholder="Telephone" value={phone} />
                <div className="inline-container">
                  <ui5-input ref={this.ageRef} type="Number" placeholder="Age" value={age} />
                  <ui5-combobox ref={this.genderRef} placeholder="Gender" value={gender} required>
                    <ui5-cb-item text="Female"></ui5-cb-item>
                    <ui5-cb-item text="Male"></ui5-cb-item>
                  </ui5-combobox>
                  <ui5-combobox ref={this.bloodGroupRef} placeholder="Blood" value={bloodGroup} required>
                    <ui5-cb-item text="0"></ui5-cb-item>
                    <ui5-cb-item text="A"></ui5-cb-item>
                    <ui5-cb-item text="B"></ui5-cb-item>
                    <ui5-cb-item text="AB"></ui5-cb-item>
                  </ui5-combobox>
                </div>
                <ui5-input ref={this.cityRef} type="Text" placeholder="Adress/City" value={city}/>
              </ui5-panel>
              <ui5-panel header-text="Account Information">
                <ui5-input ref={this.emailRef} type="Email" placeholder="Email" value={email} />
                <ui5-input type="Password" placeholder="Password" />
                <ui5-input type="Password" placeholder="Confirm Password" />
              </ui5-panel>
            </> :
            <>
              <ui5-input ref={this.userEmailRef} type="Email" placeholder="Email" />
              <ui5-input type="Password" placeholder="Password" />
            </>
          }
          <div className="submit-container">
            <ui5-button ref={this.submitButtonRef} design="Emphasized" value="Submit" id="submit">
              {register ? "Register" : "Login"}
            </ui5-button>
            <ui5-link ref={this.createAccountLinkRef}>{!register && "Become a Donor"}</ui5-link>
          </div>
        </div>
      </main>
    )
  }
}

export default withRouter(Login);