import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/TableRow";

import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/search";

import "../Home/Home.css";
import "./Donations.css";
import { BLOOD_BANK_API } from '../../app-config'

const STATUS = [
  "In Progress",
  "Completed"
]

class Donations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      donations: []
    }

    this.searchRef = React.createRef();
    this.loadingRef = React.createRef();

    this.search = this.search.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.filterDonations = this.filterDonations.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    this.fetchData().then(() => {
      const selectStatus = document.getElementsByClassName('selectStatus') || [];
      Array.from(selectStatus).forEach((select) => select.addEventListener("change", this.onSelectChange));
    });

    if (this.searchRef.current) {
      this.searchRef.current.addEventListener("input", this.search);
    }
  }

  componentWillUnmount() {
    if (this.searchRef.current) {
      this.searchRef.current.removeEventListener("input", this.search);
    }

    const selectStatus = document.getElementsByClassName('selectStatus') || [];
    Array.from(selectStatus).forEach((select) => select.removeEventListener("change", this.onSelectChange));

  }

  onSelectChange() {
    console.log("PUT request");
  }

  search(event) {
    this.setState({ search: event.target.value });
  }

  filterDonations(donations) {
    return donations.filter(donation => this.isSearched(this.state.search, donation));
  }

  isSearched(search, item) {
    for (const [key, value] of Object.entries(item)) {
      if (value.toString().toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  async fetchData() {
    this.loadingRef.current.active = true;

    const url = BLOOD_BANK_API + '/donations/';
    return fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(() => ({
          loading: false,
          donations: data,
        }));

        this.loadingRef.current.active = false;
      }).catch((err) => {
        console.error(err);
      });
  }



  render() {
    const { search, donations, loading } = this.state;

    let filteredDonations = this.filterDonations(donations);

    return (
      <div className="main">
        <div className="inline-container spaceBetween">
          <ui5-title class="header" level="h2">Donations</ui5-title>
        </div>
        <ui5-input ref={this.searchRef} id="searchInput" value={search} placeholder="Search">
          <ui5-icon slot="icon" name="search"></ui5-icon>
        </ui5-input>
        <ui5-busyindicator ref={this.loadingRef} size="Medium">
          <ui5-table show-no-data no-data-text="No donatations found.">
            <ui5-table-column slot="columns">
              Date
            </ui5-table-column>
            <ui5-table-column slot="columns" min-width="700" popin-text="Blood Center" demand-popin>
              Blood Center
            </ui5-table-column>
            <ui5-table-column slot="columns" min-width="600" popin-text="Amount" demand-popin>
              Amount
            </ui5-table-column>
            <ui5-table-column slot="columns">
              Status
            </ui5-table-column>
            {filteredDonations.map(donation =>
              <ui5-table-row key={donation.donationID}>
                <ui5-table-cell>{donation.date}</ui5-table-cell>
                <ui5-table-cell>{donation.bloodcenter}</ui5-table-cell>
                <ui5-table-cell>{donation.amount}</ui5-table-cell>
                <ui5-table-cell>
                  <ui5-select class="selectStatus">
                    {STATUS.map(entry =>
                      <ui5-option selected={entry === donation.status ? true : undefined}>{entry}</ui5-option>
                    )}
                  </ui5-select>
                </ui5-table-cell>
              </ui5-table-row>
            )}
          </ui5-table>
        </ui5-busyindicator>
      </div>
    )
  }
}

export default Donations;