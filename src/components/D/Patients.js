import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/TableRow";

import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/search";
import "@ui5/webcomponents-icons/dist/edit";
import "@ui5/webcomponents-icons/dist/delete";

import "../Home/Home.css";
import "./Patients.css";
import PatientDialog from './PatientDialog';
import DeleteDialog from './DeleteDialog';

class Patients extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      editMode: false,
      patients: [
        {
          id: "1",
          name: "Ivan Ivanov",
          age: 21,
          gender: "Male",
          telephone: "+359881234567",
          blood: "AB",
          center: "Национален център по клинична и трансфузионна хематология - София"
        },
        {
          id: "2",
          name: "Ivana Ivanova",
          age: 21,
          gender: "Female",
          telephone: "+359881234563",
          blood: "B",
          center: "Национален център по клинична и трансфузионна хематология - София"
        }
      ]
    }

    this.searchRef = React.createRef();
    this.newPatientDialogRef = React.createRef();
    this.newPatientButtonRef = React.createRef();
    this.deleteDialogRef = React.createRef();

    this.search = this.search.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.filteredPatients = this.filteredPatients.bind(this);
    this.openPatientDialog = this.openPatientDialog.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    if (this.searchRef.current) {
      this.searchRef.current.addEventListener("input", this.search);
    }
    if (this.newPatientButtonRef.current) {
      this.newPatientButtonRef.current.addEventListener("click", this.onCreate);
    }

    const editButtons = document.getElementsByClassName('editButton') || [];
    Array.from(editButtons).forEach((button) => button.addEventListener("click", this.onEdit));

    const deleteButtons = document.getElementsByClassName('deleteButton') || [];
    Array.from(deleteButtons).forEach((button) => button.addEventListener("click", this.onDelete));
  }

  componentWillUnmount() {
    if (this.searchRef.current) {
      this.searchRef.current.removeEventListener("input", this.search);
    }
    if (this.newPatientButtonRef.current) {
      this.newPatientButtonRef.current.removeEventListener("click", this.onCreate);
    }

    const editButtons = document.getElementsByClassName('editButton') || [];
    Array.from(editButtons).forEach((button) => button.removeEventListener("click", this.onDelete));

    const deleteButtons = document.getElementsByClassName('deleteButton') || [];
    Array.from(deleteButtons).forEach((button) => button.removeEventListener("click", this.onDelete));
  }

  onCreate() {
    this.setState({ editMode: false });
    this.openPatientDialog();
  }

  onEdit(event) {
    const patientId = event.target.getAttribute('data-id');
    const patient = this.state.patients.filter(patient => patient.id === patientId)[0];

    this.setState({ editMode: true });
    this.openPatientDialog(patient);
  }

  onDelete(event) {
    const patientId = event.target.getAttribute('data-id');
    this.deleteDialogRef.current.open(patientId);
  }

  openPatientDialog(patient) {
    this.newPatientDialogRef.current.open(patient);
  }

  search(event) {
    this.setState({ search: event.target.value });
  }

  filteredPatients(patients) {
    return patients.filter(patient => this.isSearched(this.state.search, patient));
  }

  isSearched(search, item) {
    for (const [key, value] of Object.entries(item)) {
      if (value.toString().toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  fetch() {
    //FETCH DATA
  }

  render() {
    const { search, patients } = this.state;

    let filteredPatients = this.filteredPatients(patients);

    return (
      <div className="main">
        <div className="inline-container spaceBetween">
          <ui5-title class="header" level="h2">Patients</ui5-title>
          <ui5-button ref={this.newPatientButtonRef} class="header" icon="add" design="Emphasized" >Add Patient</ui5-button>
        </div>
        <ui5-input ref={this.searchRef} id="searchInput" value={search} placeholder="Search">
          <ui5-icon slot="icon" name="search"></ui5-icon>
        </ui5-input>
        <ui5-table show-no-data no-data-text="No patients found.">
          <ui5-table-column slot="columns">
            Full Name
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Age" demand-popin>
            Age
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Sex" demand-popin>
            Sex
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Blood Type" demand-popin>
            Blood Type
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Blood Center" demand-popin>
            Blood Center
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Actions" demand-popin>
            Telephone
          </ui5-table-column>
          <ui5-table-column slot="columns">
            Actions
          </ui5-table-column>
          {filteredPatients.map(patient =>
            <ui5-table-row key={patient.id}>
              <ui5-table-cell>{patient.name}</ui5-table-cell>
              <ui5-table-cell>{patient.age}</ui5-table-cell>
              <ui5-table-cell>{patient.sex}</ui5-table-cell>
              <ui5-table-cell>{patient.blood}</ui5-table-cell>
              <ui5-table-cell>{patient.center}</ui5-table-cell>
              <ui5-table-cell>{patient.telephone}</ui5-table-cell>
              <ui5-table-cell>
                <ui5-button data-id={patient.id} class="editButton" design="Transparent" icon="edit"></ui5-button>
                <ui5-button data-id={patient.id} class="deleteButton" design="Transparent" icon="delete"></ui5-button>
              </ui5-table-cell>
            </ui5-table-row>
          )}
        </ui5-table>
        <PatientDialog edit={this.state.editMode} ref={this.newPatientDialogRef} />
        <DeleteDialog ref={this.deleteDialogRef} doRefresh={this.fetch}></DeleteDialog>
      </div>
    )
  }
}

export default Patients;