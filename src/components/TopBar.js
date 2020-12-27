import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Avatar";
import "@ui5/webcomponents-fiori/dist/ShellBar";

import logo from '../images/logo.svg';
import avatar from '../images/avatar.png';

class TopBar extends Component {

  constructor(props) {
    super(props);

    this.shellBarRef = React.createRef();
    this.topBarRef = React.createRef();
    this.profilePopover = React.createRef();
    this.logoutButtonRef = React.createRef();

    this.selectTab = this.selectTab.bind(this);
    this.setSelectedTab = this.setSelectedTab.bind(this);
    this.profileClick = this.profileClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.topBarRef.current) {
      this.topBarRef.current.addEventListener("tab-select", this.selectTab);
      this.setSelectedTab();
    }
    if (this.shellBarRef.current) {
      this.shellBarRef.current.addEventListener("profile-click", this.profileClick);
    }
    if (this.logoutButtonRef.current) {
      this.logoutButtonRef.current.addEventListener("click", this.logout);
    }
  }

  componentWillUnmount() {
    if (this.topBarRef.current) {
      this.topBarRef.current.removeEventListener("tab-select", this.selectTab);
    }
    if (this.shellBarRef.current) {
      this.shellBarRef.current.removeEventListener("profile-click", this.profileClick);
    }
    if (this.logoutButtonRef.current) {
      this.logoutButtonRef.current.removeEventListener("click", this.logout);
    }
  }

  profileClick(event) {
    this.profilePopover.current.openBy(event.detail.targetRef);
  }

  selectTab(event) {
    const path = event.detail.tab.getAttribute('data-id');

    this.props.history.push(path);
    this.props.location.pathname = path;
  }

  setSelectedTab() {
    const ele = [...this.topBarRef.current.children]
      .filter(node => node.getAttribute('data-id') === this.props.location.pathname)[0] || {};

    ele.selected = true;
  }

  logout() {
    this.props.history.push('/');
    this.props.logout();
  }

  render() {
    return (
      <>
        <ui5-shellbar ref={this.shellBarRef}
          primary-title="LifeBlood">
          <ui5-avatar slot="profile" image={avatar}></ui5-avatar>
          <img slot="logo" src={logo} />
        </ui5-shellbar>
        <ui5-popover ref={this.profilePopover} placement-type="Bottom">
          <ui5-li ref={this.logoutButtonRef}>Log Out</ui5-li>
        </ui5-popover>
        <ui5-tabcontainer ref={this.topBarRef} fixed collapsed>
          <ui5-tab selected text="Home" data-id="/home">
          </ui5-tab>
          <ui5-tab text="Donate" data-id="/donate">
          </ui5-tab>
          <ui5-tab text="Patients" data-id="/patients">
          </ui5-tab>
          <ui5-tab text="Map" data-id="/map">
          </ui5-tab>
        </ui5-tabcontainer>
      </>
    )
  }
}

export default withRouter(TopBar);