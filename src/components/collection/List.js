import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import Attack from './types/Attack';
import Battlegear from './types/Battlegear';
import Creature from './types/Creature';
import Location from './types/Location';
import Mugic from './types/Mugic';

@inject((stores, props, context) => props) @observer
export default class CardList extends React.Component {

  setImage(img) {
    if (this.props.ext == false)
      this.props.setImage(img);
  }

  render() {
    let cards = this.props.cards;

    if (cards.length == 1 && cards[0].text) {
      return (
      <div style={{textAlign: 'left'}}>{cards[0].text}</div>
      );
    }
    return cards.map((card, i) => {
      switch (card.gsx$type) {
      case "Attacks":
        return (<Attack card={card} key={i} ext={this.props.ext} setImage={this.setImage.bind(this)}/>);
      case "Battlegear":
        return (<Battlegear card={card} key={i} ext={this.props.ext} setImage={this.setImage.bind(this)}/>);
      case "Creatures":
        return (<Creature card={card} key={i} ext={this.props.ext} setImage={this.setImage.bind(this)}/>);
      case "Locations":
        return (<Location card={card} key={i} ext={this.props.ext} setImage={this.setImage.bind(this)}/>);
      case "Mugic":
        return (<Mugic card={card} key={i} ext={this.props.ext} setImage={this.setImage.bind(this)}/>);
      default:
        return (<div key={i}>Invalid Card Type</div>);
      }
    });
  }
}
