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

  render() {
    let cards = this.props.cards;

    if (cards.length == 1 && cards[0].text) {
      return (
      <div style={{textAlign: 'left'}}>{cards[0].text}</div>
      );
    }
    return cards.map((card, i) => {
      switch (card.gsx$type) {
      case "Attack":
        return (<Attack attack={card} key={i} setImage={this.props.setImage.bind(this)}/>);
      case "Battlegear":
        return (<Battlegear battlegear={card} key={i} setImage={this.props.setImage.bind(this)}/>);
      case "Creature":
        return (<Creature creature={card} key={i} setImage={this.props.setImage.bind(this)}/>);
      case "Location":
        return (<Location location={card} key={i} setImage={this.props.setImage.bind(this)}/>);
      case "Mugic":
        return (<Mugic mugic={card} key={i} setImage={this.props.setImage.bind(this)}/>);
      default:
        return (<div key={i}>Invalid Type</div>);
      }
    });
  }
}
