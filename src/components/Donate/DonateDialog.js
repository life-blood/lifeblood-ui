import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/MessageStrip";

import "./DonateDialog.css";
import { BLOOD_BANK_API } from './../../app-config'

class DonateDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedHospital: '',
      hospitals: this.props.hospitalNames,
    };

    this.dialogRef = React.createRef();
    this.comboboxRef = React.createRef();
    this.createButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();

    this.onCreateSuccess = props.onCreateSucess;
    this.create = this.create.bind(this);
    this.close = this.close.bind(this);
    this.onComboboxChange = this.onComboboxChange.bind(this);
  }

  componentDidMount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.addEventListener("click", this.create);
      this.cancelButtonRef.current.addEventListener("click", this.close);
    }

    if (this.comboboxRef.current) {
      this.comboboxRef.current.addEventListener('change', this.onComboboxChange);
    }
  }

  componentWillUnmount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.removeEventListener("click", this.create);
      this.cancelButtonRef.current.removeEventListener("click", this.close);
    }

    if (this.comboboxRef.current) {
      this.comboboxRef.current.removeEventListener('change', this.onComboboxChange);
    }
  }

  open() {
    this.dialogRef.current.open();
  }

  onComboboxChange() {
    const selectedValue = this.comboboxRef.current.value;
    if (selectedValue) {
      this.setState({
        selectedHospital: selectedValue
      });
    }
  }

  close() {
    this.dialogRef.current.close();
  }

  create() {
    const hospital = this.state.selectedHospital;

    if (hospital) {
      const today = new Date(),
      date = today.getDate() +  '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
      const url = BLOOD_BANK_API + '/donations';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "userID": localStorage.getItem("userID") || "",
          "bloodcenter": hospital,
          "date": date,
          "bloodType": window.localStorage.getItem("bloodGroup") || "A",
          "amount": "-",
          "status": "In Progress"
        })
      }).then(() => {
        console.log("Your donation request sent successfully!");
        this.onCreateSuccess();
      }, (err) => {
        console.error(err);
        console.log("Failed to create donation request.");
      });
    }
    this.close();
  }

  render() {
    const { hospitals } = this.state;

    return (
      <ui5-dialog header-text="Donation Request" ref={this.dialogRef}>
        <div className="dialog-container">
          <ui5-messagestrip type="Information" no-close-button>When you send the request, the blood center will contact you for appointment.</ui5-messagestrip>
          <ui5-title level="H4">Where would you like to donate?</ui5-title>
          <ui5-combobox ref={this.comboboxRef} placeholder="Choose Blood Center" required>
            {hospitals.map(hospitalName => (
                <ui5-cb-item text={hospitalName}></ui5-cb-item>
            ))}
          </ui5-combobox>
        </div>
        <div slot="footer" className="footer">
          <ui5-button design="Emphasized" ref={this.createButtonRef}>Send</ui5-button>
          <ui5-button design="Transparent" ref={this.cancelButtonRef}>Cancel</ui5-button>
        </div>
      </ui5-dialog>
    );
  }
}

export default DonateDialog;