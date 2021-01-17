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
import "./Donors.css";
import DeleteDialog from './DeleteDialog';
import DonorDialog from './DonorDialog';
import { ACCOUNT_SERVICE_API } from "../../app-config";

class Donors extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      donors: []
    }

    this.searchRef = React.createRef();
    this.donorsDialogRef = React.createRef();
    this.deleteDialogRef = React.createRef();

    this.search = this.search.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.filteredDonors = this.filteredDonors.bind(this);
    this.openDonorsDialog = this.openDonorsDialog.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getDonors = this.getDonors.bind(this);
  }

  componentDidMount() {
    if (this.searchRef.current) {
      this.searchRef.current.addEventListener("input", this.search);
    }

    this.getDonors();
  }

  componentWillUnmount() {
    if (this.searchRef.current) {
      this.searchRef.current.removeEventListener("input", this.search);
    }

    const editButtons = document.getElementsByClassName('editButton') || [];
    Array.from(editButtons).forEach((button) => button.removeEventListener("click", this.onDelete));

    const deleteButtons = document.getElementsByClassName('deleteButton') || [];
    Array.from(deleteButtons).forEach((button) => button.removeEventListener("click", this.onDelete));
  }

  onEdit(event) {
    const donorId = event.target.getAttribute('data-id');
    const donor = this.state.donors.filter(donor => donor.id === donorId)[0];

    this.openDonorsDialog(donor);
  }

  onDelete(event) {
    const donorId = event.target.getAttribute('data-id');
    this.deleteDialogRef.current.open(donorId);
  }

  openDonorsDialog(donor) {
    this.donorsDialogRef.current.open(donor);
  }

  search(event) {
    this.setState({ search: event.target.value });
  }

  filteredDonors(donors) {
    return donors.filter(donor => this.isSearched(this.state.search, donor));
  }

  isSearched(search, item) {
    if (!search) {
      return true
    }
    for (const [key, value] of Object.entries(item)) {
      if (key.toString()==="bloodGroup" && value.toString().toLowerCase()===search.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  getDonors() {
    const url = ACCOUNT_SERVICE_API + '/donors';

    fetch(url, {
        method: 'GET',
      }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState(() => ({
              loading: false,
              donors: data,
            }));
            const editButtons = document.getElementsByClassName('editButton') || [];
            Array.from(editButtons).forEach((button) => button.addEventListener("click", this.onEdit));

            const deleteButtons = document.getElementsByClassName('deleteButton') || [];
            Array.from(deleteButtons).forEach((button) => button.addEventListener("click", this.onDelete));
        });
  }

  render() {
    const { search, donors } = this.state;

    let filteredDonors = this.filteredDonors(donors);

    return (
      <div className="main">
        <div className="inline-container spaceBetween">
          <ui5-title class="header" level="h2">Donors</ui5-title>
        </div>
        <ui5-input ref={this.searchRef} id="searchInput" value={search} placeholder="Search by Blood Group">
          <ui5-icon slot="icon" name="search"></ui5-icon>
        </ui5-input>
        <ui5-table show-no-data no-data-text="No donors found.">
          <ui5-table-column slot="columns">
            Name
          </ui5-table-column>
          <ui5-table-column slot="columns">
            Last Name
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Age" demand-popin>
            Age
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Gender" demand-popin>
            Gender
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Blood Type" demand-popin>
            Blood Type
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Actions" demand-popin>
            Telephone
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Actions" demand-popin>
            City
          </ui5-table-column>
          <ui5-table-column slot="columns" min-width="600" popin-text="Actions" demand-popin>
            Email
          </ui5-table-column>
          <ui5-table-column slot="columns">
            Actions
          </ui5-table-column>
          {filteredDonors.map(donor =>
            <ui5-table-row key={donor.id}>
              <ui5-table-cell>{donor.name}</ui5-table-cell>
              <ui5-table-cell>{donor.lastName}</ui5-table-cell>
              <ui5-table-cell>{donor.age}</ui5-table-cell>
              <ui5-table-cell>{donor.gender}</ui5-table-cell>
              <ui5-table-cell>{donor.bloodGroup}</ui5-table-cell>
              <ui5-table-cell>{donor.phone}</ui5-table-cell>
              <ui5-table-cell>{donor.city}</ui5-table-cell>
              <ui5-table-cell>{donor.email}</ui5-table-cell>
              <ui5-table-cell>
                <ui5-button data-id={donor.id} class="editButton" design="Transparent" icon="edit"></ui5-button>
                <ui5-button data-id={donor.id} class="deleteButton" design="Transparent" icon="delete"></ui5-button>
              </ui5-table-cell>
            </ui5-table-row>
          )}
        </ui5-table>
        <DonorDialog edit ref={this.donorsDialogRef} doRefresh={this.getDonors} />
        <DeleteDialog ref={this.deleteDialogRef} doRefresh={this.getDonors}></DeleteDialog>
      </div>
    )
  }
}

export default Donors;