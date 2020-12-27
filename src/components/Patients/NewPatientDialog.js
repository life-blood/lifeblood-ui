import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Dialog";

import "./NewPatientDialog.css";

class NewPatientDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.dialogRef = React.createRef();
    this.createButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();

    this.create = this.create.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.addEventListener("click", this.create);
      this.cancelButtonRef.current.addEventListener("click", this.close);
    }
  }

  componentWillUnmount() {
    if (this.dialogRef.current) {
      this.createButtonRef.current.removeEventListener("click", this.create);
      this.cancelButtonRef.current.removeEventListener("click", this.close);
    }
  }

  open() {
    this.dialogRef.current.open();
  }

  close() {
    this.dialogRef.current.close();
  }

  create() {
    this.close();
  }

  render() {
    return (
      <ui5-dialog header-text="Add Patient" ref={this.dialogRef}>
        <div className="dialog-container">
        <ui5-title level="H4">Personal Information</ui5-title>
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
          <ui5-title level="H4">Blood Center</ui5-title>
          <ui5-combobox placeholder="Choose Blood Center" required>
            <ui5-cb-item text="РАЙОНЕН Ц-Р ПО ТРАНСФУЗИОННА ХЕМАТОЛОГИЯ - Стара Загора"></ui5-cb-item>
            <ui5-cb-item text="Районен център по трансфузионна хематология (РЦТХ) - Плевен"></ui5-cb-item>
            <ui5-cb-item text="Кръвен център - Бургас"></ui5-cb-item>
            <ui5-cb-item text="РЦ по трансфузионна хематология - Пловдив"></ui5-cb-item>
            <ui5-cb-item text="Национален център по клинична и трансфузионна хематология - София"></ui5-cb-item>
            <ui5-cb-item text="Районен център по трансфузионна хематология - Варна"></ui5-cb-item>
          </ui5-combobox>
        </div>
        <div slot="footer" className="footer">
          <ui5-button design="Emphasized" ref={this.createButtonRef}>Add</ui5-button>
          <ui5-button design="Transparent" ref={this.cancelButtonRef}>Cancel</ui5-button>
        </div>
      </ui5-dialog>
    );
  }
}

export default NewPatientDialog;