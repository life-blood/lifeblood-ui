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
import NewRecepientDialog from './NewPatientDialog';

class Patients extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      patients: [
        {
          id: "1",
          name: "Ivan Ivanov",
          age: 21,
          sex: "Male",
          telephone: "+359881234567",
          blood: "AB",
          center: "Национален център по клинична и трансфузионна хематология - София"
        }
      ]
    }

    this.searchRef = React.createRef();
    this.newPatientDialogRef = React.createRef();
    this.newPatientButtonRef = React.createRef();

    this.search = this.search.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.filteredPatients = this.filteredPatients.bind(this);
    this.openNewPatientDialog = this.openNewPatientDialog.bind(this);
  }

  componentDidMount() {
    if (this.searchRef.current) {
      this.searchRef.current.addEventListener("input", this.search);
    }
    if (this.newPatientButtonRef.current) {
      this.newPatientButtonRef.current.addEventListener("click", this.openNewPatientDialog);
    }
  }

  componentWillUnmount() {
    if (this.searchRef.current) {
      this.searchRef.current.removeEventListener("input", this.search);
    }
    if (this.newPatientButtonRef.current) {
      this.newPatientButtonRef.current.removeEventListener("click", this.openNewPatientDialog);
    }
  }

  openNewPatientDialog() {
    this.newPatientDialogRef.current.open();
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
                <ui5-button design="Transparent" icon="delete"></ui5-button>  
              </ui5-table-cell>
            </ui5-table-row>
          )}
        </ui5-table>
        <NewRecepientDialog ref={this.newPatientDialogRef} />
      </div>
    )
  }
}

export default Patients;