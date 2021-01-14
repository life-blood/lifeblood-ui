import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/ComboBox";
import "@ui5/webcomponents/dist/ComboBoxItem";
import "@ui5/webcomponents/dist/Select";

import "./PatientDialog.css";

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
      telephone: '',
      age: '',
      gender: '',
      blood: '',
      center: ''
    };

    this.dialogRef = React.createRef();
    this.createButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();

    this.nameInputRef = React.createRef();
    this.telephoneInputRef = React.createRef();
    this.ageInputRef = React.createRef();
    this.genderInputRef = React.createRef();
    this.genderInputCbRef = React.createRef();
    this.bloodInputRef = React.createRef();
    this.bloodInputCbRef = React.createRef();
    this.centerInputRef = React.createRef();
    this.centerInputCbRef = React.createRef();

    this.create = this.create.bind(this);
    this.close = this.close.bind(this);
    this.setInitialState = this.setInitialState.bind(this);

    this.onNameChange = this.onNameChange.bind(this);
    this.onTelephoneChange = this.onTelephoneChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onBloodChange = this.onBloodChange.bind(this);
    this.onCenterChange = this.onCenterChange.bind(this);
    this.beforeOpen = this.beforeOpen.bind(this);
  }

  setInitialState() {
    this.setState({
      name: '',
      telephone: '',
      age: '',
      gender: '',
      blood: '',
      center: ''
    });
  }

  componentDidMount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.addEventListener("click", this.create);
      this.cancelButtonRef.current.addEventListener("click", this.close);

      this.nameInputRef.current.addEventListener("input", this.onNameChange);
      this.telephoneInputRef.current.addEventListener("input", this.onTelephoneChange);
      this.ageInputRef.current.addEventListener("input", this.onAgeChange);
    }
  }

  componentWillUnmount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.removeEventListener("click", this.create);
      this.cancelButtonRef.current.removeEventListener("click", this.close);

      this.nameInputRef.current.removeEventListener("input", this.onNameChange);
      this.telephoneInputRef.current.removeEventListener("input", this.onTelephoneChange);
      this.ageInputRef.current.removeEventListener("input", this.onAgeChange);
    }
    if (this.props.edit) {
      this.genderInputRef.current.removeEventListener("change", this.onGenderChange);
      this.bloodInputRef.current.removeEventListener("change", this.onBloodChange);
      this.centerInputRef.current.removeEventListener("change", this.onCenterChange);
    } else {
      this.genderInputCbRef.current.removeEventListener("change", this.onGenderChange);
      this.bloodInputCbRef.current.removeEventListener("change", this.onBloodChange);
      this.centerInputCbRef.current.removeEventListener("change", this.onCenterChange);
    }
  }

  beforeOpen() {
    if (this.props.edit) {
      this.genderInputRef.current.addEventListener("change", this.onGenderChange);
      this.bloodInputRef.current.addEventListener("change", this.onBloodChange);
      this.centerInputRef.current.addEventListener("change", this.onCenterChange);
    } else {
      this.genderInputCbRef.current.addEventListener("change", this.onGenderChange);
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
    this.close();
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onTelephoneChange(event) {
    this.setState({ telephone: event.target.value });
  }

  onAgeChange(event) {
    this.setState({ age: event.target.value });
  }

  onGenderChange(event) {
    this.setState({ gender: event.target.value || event.target.selectedOption.innerText });
  }

  onBloodChange(event) {
    this.setState({ blood: event.target.value || event.target.selectedOption.innerText });
  }

  onCenterChange(event) {
    this.setState({ center: event.target.value || event.target.selectedOption.innerText });
  }

  render() {
    const { edit } = this.props;
    const { name, telephone, gender, age, blood, center } = this.state;

    return (
      <ui5-dialog header-text={edit ? "Edit Patient" : "Add Patient"} ref={this.dialogRef}>
        <div className="dialog-container">
          <ui5-title level="H4">Personal Information</ui5-title>
          <ui5-input ref={this.nameInputRef} type="Text" value={name} placeholder="Full Name" />
          <ui5-input ref={this.telephoneInputRef} type="Tel" value={telephone} placeholder="Telephone" />
          <div className="inline-container">
            <ui5-input ref={this.ageInputRef} type="Number" value={age} placeholder="Age" />
            {edit ? <ui5-select ref={this.genderInputRef} placeholder="Gender" required>
              {GENDER.map(entry => <ui5-option selected={entry === gender ? true : undefined}>{entry}</ui5-option>)}
            </ui5-select> :
              <ui5-combobox ref={this.genderInputCbRef} placeholder="Gender" required value={gender}>
                {GENDER.map(entry => <ui5-cb-item text={entry}></ui5-cb-item>)}
              </ui5-combobox>
            }
            {edit ? <ui5-select ref={this.bloodInputRef} placeholder="Blood" required>
              {BLOOD.map(entry => <ui5-option selected={entry === blood ? true : undefined}>{entry}</ui5-option>)}
            </ui5-select> :
              <ui5-combobox ref={this.bloodInputCbRef} placeholder="Blood" required value={blood}>
                {BLOOD.map(entry => <ui5-cb-item text={entry}></ui5-cb-item>)}
              </ui5-combobox>
            }
          </div>
          <ui5-title level="H4">Blood Center</ui5-title>
          {edit ? <ui5-select ref={this.centerInputRef} placeholder="Blood" required>
            {CENTERS.map(entry => <ui5-option selected={entry === center ? true : undefined}>{entry}</ui5-option>)}
          </ui5-select> :
            <ui5-combobox ref={this.centerInputCbRef} placeholder="Choose Blood Center" required value={center}>
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