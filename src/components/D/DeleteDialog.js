import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Dialog";

class DeleteDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      patientId: null
    };

    this.dialogRef = React.createRef();
    this.deleteButtonRef = React.createRef();
    this.cancelButtonRef = React.createRef();

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    if (this.dialogRef.current) {
      this.deleteButtonRef.current.addEventListener("click", this.onDelete);
      this.cancelButtonRef.current.addEventListener("click", this.onCancel);
    }
  }

  componentWillUnmount() {
    if (this.dialogRef.current) {
      this.deleteButtonRef.current.removeEventListener("click", this.onDelete);
      this.cancelButtonRef.current.removeEventListener("click", this.onCancel);
    }
  }

  open(patientId) {
    this.setState({ patientId });
    this.dialogRef.current.open();
  }

  close() {
    this.dialogRef.current.close();
  }

  onDelete() {
    // DELETE
    console.log("patient ID: " + this.state.patientId);

    this.props.doRefresh();
    this.close();
  }

  onCancel() {
    this.close();
  }

  render() {
    return (
      <ui5-dialog header-text="Delete Patient" ref={this.dialogRef}>
        <div className="dialog-container">
          <ui5-title level="H5">Are you sure that you want to delete this patient?</ui5-title>
        </div>
        <div slot="footer" className="footer">
          <ui5-button design="Emphasized" ref={this.deleteButtonRef}>Delete</ui5-button>
          <ui5-button design="Transparent" ref={this.cancelButtonRef}>Cancel</ui5-button>
        </div>
      </ui5-dialog>
    );
  }
}

export default DeleteDialog;