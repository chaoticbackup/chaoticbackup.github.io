import { inject, observer } from 'mobx-react';
import React from 'react';

import { Ability, FlavorText, InitiativeIcon, LocationIcon, Name, RarityIcon, Unique } from '../../Snippets';
import API from '../../SpreadsheetData';

@inject((stores, props, context) => props) @observer
export default class Location extends React.Component {

  render() {
    const { card } = this.props;

    if (this.props.ext == false) return (
      <div className="card location">
        <img className="thumb" style={{ float: 'left', width: '100px', height: '98px' }} src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(API.cardImage(card))} />
        <div className="left">
          <Name name={card.gsx$name} />
          <RarityIcon set={card.gsx$set} rarity={card.gsx$rarity} /><br />
          <span><LocationIcon /> Location{card.gsx$types.length > 0 ? " - " + card.gsx$types : null}</span><br />
          <InitiativeIcon initiative={card.gsx$initiative} />
        </div>
        <div className="right">
          <Ability ability={card.gsx$ability} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <FlavorText flavortext={card.gsx$flavortext} />
        </div>
      </div>
    );
    else return (
      <div className="card location">
        <div className="fullcard"><img src={API.cardImage(card)} /></div>
        <div className="right">
          <Name name={card.gsx$name} />
          <InitiativeIcon initiative={card.gsx$initiative} />
          <Ability ability={card.gsx$ability} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <FlavorText flavortext={card.gsx$flavortext} />
          <div>Art By: {card.gsx$artist}</div>
        </div>
      </div>
    );
  }
}
