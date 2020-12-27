import React, { Component } from 'react';

import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Card";

import "./Article.css";

class Article extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { heading, description, date, image } = this.props;

    return (
      <ui5-card class="newsCard" heading={heading} status={date}>
        <img slot="avatar" src={image} />
        <ui5-label wrap class="content">
          {description}
        </ui5-label>
      </ui5-card>
    )
  }
}

export default Article;