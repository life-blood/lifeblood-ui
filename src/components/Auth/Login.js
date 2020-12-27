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

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      register: false,
      redirectToReferrer: false
    };

    this.createAccountLinkRef = React.createRef();
    this.submitButtonRef = React.createRef();

    this.onCreateAccountClick = this.onCreateAccountClick.bind(this);
    this.submit = this.submit.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
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
  }

  onCreateAccountClick() {
    this.setState({ register: true });
  }

  submit() {
    this.state.register ? this.register() : this.login();
  }

  register() {
    this.setState({ register: false });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { register, redirectToReferrer } = this.state;

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
              <ui5-panel header-text="Personal">
                <ui5-input type="Text" placeholder="Full Name" />
                <ui5-input type="Tel" placeholder="Telephone" />
                <div className="inline-container">
                  <ui5-input type="Number" placeholder="Age" />
                  <ui5-combobox placeholder="Gender" required>
                    <ui5-cb-item text="Female"></ui5-cb-item>
                    <ui5-cb-item text="Male"></ui5-cb-item>
                  </ui5-combobox>
                  <ui5-combobox placeholder="Blood" required>
                    <ui5-cb-item text="0"></ui5-cb-item>
                    <ui5-cb-item text="A"></ui5-cb-item>
                    <ui5-cb-item text="B"></ui5-cb-item>
                    <ui5-cb-item text="AB"></ui5-cb-item>
                  </ui5-combobox>
                </div>
              </ui5-panel>
              <ui5-panel header-text="Account">
                <ui5-input type="Email" placeholder="Email" />
                <ui5-input type="Password" placeholder="Password" />
                <ui5-input type="Password" placeholder="Confirm Password" />
              </ui5-panel>
            </> :
            <>
              <ui5-input type="Email" placeholder="Email" />
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