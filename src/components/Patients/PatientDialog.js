import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/ComboBox";
import "@ui5/webcomponents/dist/ComboBoxItem";
import "@ui5/webcomponents/dist/Select";

import "./PatientDialog.css";
import { ACCOUNT_SERVICE_API } from "../../app-config";

const BLOOD = ['0', 'A', 'B', 'AB'];
const GENDER = ['Male', 'Female'];
const CENTERS = [
  "РАЙОНЕН Ц-Р ПО ТРАНСФУЗИОННА ХЕМАТОЛОГИЯ - Стара Загора",
  "Районен център по трансфузионна хематология (РЦТХ) - Плевен",
  "Кръвен център - Бургас",
  "РЦ по трансфузионна хематология - Пловдив",
  "Национален център по клинична и трансфузионна хематология - София",
  "Районен център по трансфузионна хематология - Варна"
];

class PatientDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastName: '',
      bloodGroup: '',
      bloodCenter: '',
      city: ''
    };

    this.dialogRef = React.createRef();
    this.createButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();

    this.nameInputRef = React.createRef();
    this.lastNameInputRef = React.createRef();
    this.bloodInputRef = React.createRef();
    this.bloodInputCbRef = React.createRef();
    this.centerInputRef = React.createRef();
    this.centerInputCbRef = React.createRef();
    this.cityInputRef = React.createRef();

    this.create = this.create.bind(this);
    this.close = this.close.bind(this);
    this.setInitialState = this.setInitialState.bind(this);

    this.onNameChange = this.onNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onBloodChange = this.onBloodChange.bind(this);
    this.onCenterChange = this.onCenterChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);

    this.beforeOpen = this.beforeOpen.bind(this);
  }

  setInitialState() {
    this.setState({
      name: '',
      lastName: '',
      bloodGroup: '',
      bloodCenter: '',
      city: ''
    });
  }

  componentDidMount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.addEventListener("click", this.create);
      this.cancelButtonRef.current.addEventListener("click", this.close);

      this.nameInputRef.current.addEventListener("input", this.onNameChange);
      this.lastNameInputRef.current.addEventListener("input", this.onLastNameChange);
      this.cityInputRef.current.addEventListener("input", this.onAddressChange);
    }
  }

  componentWillUnmount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.removeEventListener("click", this.create);
      this.cancelButtonRef.current.removeEventListener("click", this.close);

      this.nameInputRef.current.removeEventListener("input", this.onNameChange);
      this.lastNameInputRef.current.removeEventListener("input", this.onLastNameChange);
      this.cityInputRef.current.removeEventListener("input", this.onAddressChange);
      
    }
    if (this.props.edit) {
      this.bloodInputRef.current.removeEventListener("change", this.onBloodChange);
      this.centerInputRef.current.removeEventListener("change", this.onCenterChange);
    } else {
      this.bloodInputCbRef.current.removeEventListener("change", this.onBloodChange);
      this.centerInputCbRef.current.removeEventListener("change", this.onCenterChange);
    }
  }

  beforeOpen() {
    if (this.props.edit) {
      this.bloodInputRef.current.addEventListener("change", this.onBloodChange);
      this.centerInputRef.current.addEventListener("change", this.onCenterChange);
    } else {
      this.bloodInputCbRef.current.addEventListener("change", this.onBloodChange);
      this.centerInputCbRef.current.addEventListener("change", this.onCenterChange);
    }
  }

  open(patient) {
    this.beforeOpen();

    patient ? this.setState({ ...patient }) : this.setInitialState();

    this.dialogRef.current.open();
  }

  close() {
    this.dialogRef.current.close();
  }

  create() {
    if (this.props.edit) {
      const url = ACCOUNT_SERVICE_API + `/acceptors/${this.state.id}`;
      fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
              "name": this.state.name,
              "lastName": this.state.lastName,
              "bloodCenter": this.state.bloodCenter,
              "bloodGroup": this.state.bloodGroup,
              "city": this.state.city
          })
        }).then(() => {
          console.log("Acceptor was edited successfully!");
          this.props.doRefresh();
        }, (err) => {
          console.error(err);
          console.log("Failed to edit acceptor.");
        });
    } else {
      const url = ACCOUNT_SERVICE_API + `/acceptors`;
      fetch(url, {
          method: 'POST',
          body: JSON.stringify({
              "name": this.state.name,
              "lastName": this.state.lastName,
              "bloodCenter": this.state.bloodCenter,
              "bloodGroup": this.state.bloodGroup,
              "city": this.state.city
          })
        }).then(() => {
          console.log("Acceptor was added successfully!");
          this.props.doRefresh();
        }, (err) => {
          console.error(err);
          console.log("Failed to add acceptor.");
        });
    }
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

  onBloodChange(event) {
    this.setState({ bloodGroup: event.target.value || event.target.selectedOption.innerText });
  }

  onCenterChange(event) {
    this.setState({ bloodCenter: event.target.value || event.target.selectedOption.innerText });
  }

  render() {
    const { edit } = this.props;
    const { name, lastName, city, bloodGroup, bloodCenter } = this.state;

    return (
      <ui5-dialog header-text={edit ? "Edit Patient" : "Add Patient"} ref={this.dialogRef}>
        <div className="dialog-container">
          <ui5-title level="H4">Personal Information</ui5-title>
          <ui5-input ref={this.nameInputRef} type="Text" value={name} placeholder="Name" />
          <ui5-input ref={this.lastNameInputRef} type="Text" value={lastName} placeholder="Last Name" />
          <ui5-input ref={this.cityInputRef} type="Text" value={city} placeholder="City" />
          <div className="inline-container">
            {edit ? <ui5-select ref={this.bloodInputRef} placeholder="Blood Group" required>
              {BLOOD.map(entry => <ui5-option selected={entry === bloodGroup ? true : undefined}>{entry}</ui5-option>)}
            </ui5-select> :
              <ui5-combobox ref={this.bloodInputCbRef} placeholder="Blood Group" required value={bloodGroup}>
                {BLOOD.map(entry => <ui5-cb-item text={entry}></ui5-cb-item>)}
              </ui5-combobox>
            }
          </div>
          <ui5-title level="H4">Blood Center</ui5-title>
          {edit ? <ui5-select ref={this.centerInputRef} placeholder="Blood Center" required>
            {CENTERS.map(entry => <ui5-option selected={entry === bloodCenter ? true : undefined}>{entry}</ui5-option>)}
          </ui5-select> :
            <ui5-combobox ref={this.centerInputCbRef} placeholder="Choose Blood Center" required value={bloodCenter}>
              {CENTERS.map(entry => <ui5-cb-item text={entry}></ui5-cb-item>)}
            </ui5-combobox>
          }
        </div>
        <div slot="footer" className="footer">
          <ui5-button design="Emphasized" ref={this.createButtonRef}>{edit ? "Save" : "Add"}</ui5-button>
          <ui5-button design="Transparent" ref={this.cancelButtonRef}>Cancel</ui5-button>
        </div>
      </ui5-dialog>
    );
  }
}

export default PatientDialog;