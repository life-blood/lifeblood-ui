import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/ComboBox";
import "@ui5/webcomponents/dist/ComboBoxItem";
import "@ui5/webcomponents/dist/Select";

import "./DonorDialog.css";
import { ACCOUNT_SERVICE_API } from "../../app-config";

const BLOOD = ['0', 'A', 'B', 'AB'];
const GENDER = ['Male', 'Female'];


class DonorDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastName: '',
      phone: '',
      age: '',
      email: '',
      gender: '',
      bloodGroup: '',
      city: '',
    };

    this.dialogRef = React.createRef();
    this.createButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();

    this.nameInputRef = React.createRef();
    this.lastNameInputRef - React.createRef();
    this.telephoneInputRef = React.createRef();
    this.emailInputRef = React.createRef();
    this.ageInputRef = React.createRef();
    this.genderInputRef = React.createRef();
    this.cityInputRef = React.createRef();
    this.genderInputCbRef = React.createRef();
    this.bloodInputRef = React.createRef();
    this.bloodInputCbRef = React.createRef();

    this.create = this.create.bind(this);
    this.close = this.close.bind(this);
    this.setInitialState = this.setInitialState.bind(this);

    this.onNameChange = this.onNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onTelephoneChange = this.onTelephoneChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onBloodChange = this.onBloodChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.beforeOpen = this.beforeOpen.bind(this);
  }

  setInitialState() {
    this.setState({
      id : '',
      name: '',
      lastName: '',
      phone: '',
      age: '',
      gender: '',
      bloodGroup: '',
      email: '',
      city: ''
    });
  }

  componentDidMount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.addEventListener("click", this.create);
      this.cancelButtonRef.current.addEventListener("click", this.close);

      this.nameInputRef.current.addEventListener("input", this.onNameChange);
      // this.lastNameInputRef.current.addEventListener("input", this.onLastNameChange);
      this.telephoneInputRef.current.addEventListener("input", this.onTelephoneChange);
      this.emailInputRef.current.addEventListener("input", this.onEmailChange);
      this.cityInputRef.current.addEventListener("input", this.onAddressChange);
      this.bloodInputRef.current.addEventListener("change", this.onBloodChange);
      this.genderInputRef.current.addEventListener("change", this.onGenderChange);
      this.ageInputRef.current.addEventListener("change", this.onAgeChange);

    }
  }

  componentWillUnmount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.removeEventListener("click", this.create);
      this.cancelButtonRef.current.removeEventListener("click", this.close);

      this.nameInputRef.current.removeEventListener("input", this.onNameChange);
      // this.lastNameInputRef.current.removeEventListener("input", this.onLastNameChange);
      this.emailInputRef.current.removeEventListener("input", this.onEmailChange);
      this.cityInputRef.current.removeEventListener("input", this.onAddressChange);

      this.telephoneInputRef.current.removeEventListener("input", this.onTelephoneChange);
      this.ageInputRef.current.removeEventListener("input", this.onAgeChange);
    }
    if (this.props.edit) {
      this.genderInputRef.current.removeEventListener("change", this.onGenderChange);
      this.bloodInputRef.current.removeEventListener("change", this.onBloodChange);
    } else {
      this.genderInputCbRef.current.removeEventListener("change", this.onGenderChange);
      this.bloodInputCbRef.current.removeEventListener("change", this.onBloodChange);
    }
  }

  beforeOpen() {
    if (this.props.edit) {
      this.genderInputRef.current.addEventListener("change", this.onGenderChange);
      this.bloodInputRef.current.addEventListener("change", this.onBloodChange);
    } else {
      this.genderInputCbRef.current.addEventListener("change", this.onGenderChange);
      this.bloodInputCbRef.current.addEventListener("change", this.onBloodChange);
    }
  }

  open(donor) {
    this.beforeOpen();

    donor ? this.setState({ ...donor }) : this.setInitialState();

    this.dialogRef.current.open();
  }

  close() {
    this.dialogRef.current.close();
  }

  create() {
    const url = ACCOUNT_SERVICE_API + `/donors/${this.state.id}`;
    fetch(url, {
        method: 'PUT',
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
        console.log("Donor was edited successfully!");
        this.props.doRefresh();
      }, (err) => {
        console.error(err);
        console.log("Failed to edit donor.");
      });
    this.close();
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  onAddressChange(event) {
    this.setState({ city: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onTelephoneChange(event) {
    this.setState({ phone: event.target.value });
  }

  onAgeChange(event) {
    this.setState({ age: event.target.value });
  }

  onGenderChange(event) {
    this.setState({ gender: event.target.value || event.target.selectedOption.innerText });
  }

  onBloodChange(event) {
    this.setState({ bloodGroup: event.target.value || event.target.selectedOption.innerText });
  }


  render() {
    const { edit } = this.props;
    const { name, lastName, phone, city, email, gender, age, bloodGroup } = this.state;

    return (
      <ui5-dialog header-text={edit ? "Edit Donor" : "Add Donor"} ref={this.dialogRef}>
        <div className="dialog-container">
          <ui5-title level="H4">Personal Information</ui5-title>
          <ui5-input ref={this.nameInputRef} type="Text" value={name} placeholder="Name" />
          <ui5-input ref={this.lastNameInputRef} type="Text" value={lastName} placeholder="Last Name" />
          <ui5-input ref={this.telephoneInputRef} type="Tel" value={phone} placeholder="Telephone" />
          <ui5-input ref={this.emailInputRef} type="Text" value={email} placeholder="Email" />
          <ui5-input ref={this.cityInputRef} type="Text" value={city} placeholder="City" />
          <div className="inline-container">
            <ui5-input ref={this.ageInputRef} type="Number" value={age} placeholder="Age" />
            {edit ? <ui5-select ref={this.genderInputRef} placeholder="Gender" required>
              {GENDER.map(entry => <ui5-option selected={entry === gender ? true : undefined}>{entry}</ui5-option>)}
            </ui5-select> :
              <ui5-combobox ref={this.genderInputCbRef} placeholder="Gender" required value={gender}>
                {GENDER.map(entry => <ui5-cb-item text={entry}></ui5-cb-item>)}
              </ui5-combobox>
            }
            {edit ? <ui5-select ref={this.bloodInputRef} placeholder="Blood Group" required>
              {BLOOD.map(entry => <ui5-option selected={entry === bloodGroup ? true : undefined}>{entry}</ui5-option>)}
            </ui5-select> :
              <ui5-combobox ref={this.bloodInputCbRef} placeholder="Blood Group" required value={bloodGroup}>
                {BLOOD.map(entry => <ui5-cb-item text={entry}></ui5-cb-item>)}
              </ui5-combobox>
            }
          </div>
        </div>
        <div slot="footer" className="footer">
          <ui5-button design="Emphasized" ref={this.createButtonRef}>{edit ? "Save" : "Add"}</ui5-button>
          <ui5-button design="Transparent" ref={this.cancelButtonRef}>Cancel</ui5-button>
        </div>
      </ui5-dialog>
    );
  }
}

export default DonorDialog;