import React, { Component } from 'react';

import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/TableRow";

import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/search";

import "../Home/Home.css";
import "./Donate.css";
import DonateDialog from './DonateDialog';

class Donate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      donations: [{
        id: "1",
        date: "23.02.2020",
        amount: "140 mil.",
        location: "РАЙОНЕН Ц-Р ПО ТРАНСФУЗИОННА ХЕМАТОЛОГИЯ - Стара Загора",
        status: "Completed"
      },
      {
        id: "2",
        date: "12.08.2020",
        amount: "310 mil.",
        location: "РАЙОНЕН Ц-Р ПО ТРАНСФУЗИОННА ХЕМАТОЛОГИЯ - Стара Загора",
        status: "Completed"
      },
      {
        id: "3",
        date: "23.12.2020",
        amount: "",
        location: "РАЙОНЕН Ц-Р ПО ТРАНСФУЗИОННА ХЕМАТОЛОГИЯ - Стара Загора",
        status: "In Progress"
      }
      ]
    }

    this.searchRef = React.createRef();
    this.donateDialogRef = React.createRef();
    this.donateButtonRef = React.createRef();

    this.search = this.search.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.filterDonations = this.filterDonations.bind(this);
    this.openDonateDialog = this.openDonateDialog.bind(this);
  }

  componentDidMount() {
    if (this.searchRef.current) {
      this.searchRef.current.addEventListener("input", this.search);
    }
    if (this.donateButtonRef.current) {
      this.donateButtonRef.current.addEventListener("click", this.openDonateDialog);
    }
  }

  componentWillUnmount() {
    if (this.searchRef.current) {
      this.searchRef.current.removeEventListener("input", this.search);
    }
    if (this.donateButtonRef.current) {
      this.donateButtonRef.current.removeEventListener("click", this.openDonateDialog);
    }
  }

  openDonateDialog() {
    this.donateDialogRef.current.open();
  }

  search(event) {
    this.setState({ search: event.target.value });
  }

  filterDonations(donations) {
    return donations.filter(donation => this.isSearched(this.state.search, donation));
  }

  isSearched(search, item) {
    for (const [key, value] of Object.entries(item)) {
      if (value.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { search, donations } = this.state;

    let filteredDonations = this.filterDonations(donations);

    return (
      <div className="main">
        <div className="inline-container spaceBetween">
          <ui5-title class="header" level="h2">My Donations</ui5-title>
          <ui5-button ref={this.donateButtonRef} class="header" icon="add" design="Emphasized" >Donate</ui5-button>
        </div>
        <ui5-input ref={this.searchRef} id="searchInput" value={search} placeholder="Search">
          <ui5-icon slot="icon" name="search"></ui5-icon>
        </ui5-input>
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
            <ui5-table-row key={donation.id}>
              <ui5-table-cell>{donation.date}</ui5-table-cell>
              <ui5-table-cell>{donation.location}</ui5-table-cell>
              <ui5-table-cell>{donation.amount}</ui5-table-cell>
              <ui5-table-cell>{donation.status}</ui5-table-cell>
            </ui5-table-row>
          )}
        </ui5-table>
        <DonateDialog ref={this.donateDialogRef} />
      </div>
    )
  }
}

export default Donate;