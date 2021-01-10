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
      hospitals: []
    };

    this.dialogRef = React.createRef();
    this.comboboxRef = React.createRef();
    this.createButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();

    this.create = this.create.bind(this);
    this.close = this.close.bind(this);
    this.onComboboxChange = this.onComboboxChange.bind(this);
  }

  componentDidMount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.addEventListener("click", this.create);
      this.cancelButtonRef.current.addEventListener("click", this.close);
    }

    this.comboboxRef.current.addEventListener('change', this.onComboboxChange);
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
      const url = BLOOD_BANK_API + '/donations/';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "userID": localStorage.getItem("userID") || "",
          "bloodcenter": hospital,
          "status": "In Progress"
        })
      }).then(() => {
        console.log("Your donation request sent successfully! Please refresh to see the latest status")
      }, (err) => {
        console.error(err);
        console.log("Failed to create donation request.");
      });
    }
    this.close();
  }

  render() {
    return (
      <ui5-dialog header-text="Donation Request" ref={this.dialogRef}>
        <div className="dialog-container">
          <ui5-messagestrip type="Information" no-close-button>When you send the request, the blood center will contact you for appointment.</ui5-messagestrip>
          <ui5-title level="H4">Where would you like to donate?</ui5-title>
          <ui5-combobox ref={this.comboboxRef} placeholder="Choose Blood Center" required>
            <ui5-cb-item text="РАЙОНЕН Ц-Р ПО ТРАНСФУЗИОННА ХЕМАТОЛОГИЯ - Стара Загора"></ui5-cb-item>
            <ui5-cb-item text="Районен център по трансфузионна хематология (РЦТХ) - Плевен"></ui5-cb-item>
            <ui5-cb-item text="Кръвен център - Бургас"></ui5-cb-item>
            <ui5-cb-item text="РЦ по трансфузионна хематология - Пловдив"></ui5-cb-item>
            <ui5-cb-item text="Национален център по клинична и трансфузионна хематология - София"></ui5-cb-item>
            <ui5-cb-item text="Районен център по трансфузионна хематология - Варна"></ui5-cb-item>
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