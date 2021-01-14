import React, { Component } from 'react';

import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Card";

import "./Home.css";
import Article from './Article';

import heartImg from '../../images/home/heart.gif';
import donorsImg from '../../images/home/donors.gif';
import centersImg from '../../images/home/centers.gif';

import article1Img from '../../images/home/articles/article-1.png';
import article2Img from '../../images/home/articles/article-2.jpg';
import article3Img from '../../images/home/articles/article-3.jpg';
import article4Img from '../../images/home/articles/article-4.jpg';
import article5Img from '../../images/home/articles/article-5.jpg';
import article6Img from '../../images/home/articles/article-6.jpg';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }

  componentDidMount() {
    const user = localStorage.getItem('userID');
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <div className="main">
          <ui5-title class="header" level="H3">Welcome, {user}!</ui5-title>
          <div className="cards flex">
            <ui5-card heading="9 210" subheading="Saved Lifes">
              <img src={heartImg} slot="avatar" />
            </ui5-card>
            <ui5-card heading="16 498" subheading="Donors">
              <img src={donorsImg} slot="avatar" />
            </ui5-card>
            <ui5-card heading="6" subheading="Blood Centers">
              <img src={centersImg} slot="avatar" />
            </ui5-card>
          </div>
          <ui5-title class="header" level="H3">News</ui5-title>
          <div className="flex">
            <Article
              heading="Latest medical advice"
              image={article1Img}
              description="We’re asking blood donors to keep donating as normal unless you have been in contact with, or are currently infected by, the virus. Please read the latest advice before attending."
              date="21 December 2020" />
            <Article
              heading="Mum urges blood donors to give blood over Christmas"
              image={article2Img}
              description="The mum of a little boy who will need a lifesaving blood transfusion just days before Christmas is backing an NHS call for donors to make and keep an appointment to give blood over the festive period."
              date="18 December 2020" />
            <Article
              heading="Men make more virus antibodies than women, making them better plasma donors"
              image={article3Img}
              description="New analysis found men produce higher levels of virus plasma antibodies than women."
              date="24 November 2020" />
            <Article
              heading="Men who’ve had virus symptoms urged to donate plasma due to shortage of male donors"
              image={article4Img}
              description="NHS Blood and Transplant urgently needs men who’ve had virus or the symptoms to volunteer to donate blood plasma."
              date="08 November 2020" />
            <Article
              heading="People with sickle cell are encouraging more black people to donate"
              image={article5Img}
              description="To mark Sickle Cell Awareness Month sickle cell patients across London have filmed emotional messages to encourage people of black heritage become regular blood donors."
              date="02 November 2020" />
            <Article
              heading="Major convalescent plasma programme announced"
              image={article6Img}
              description="NHS Blood and Transplant is now leading a major new programme, on behalf of the Government, to collect convalescent plasma."
              date="17 September 2020" />
          </div>
        </div>
      </>
    )
  }
}

export default Home;