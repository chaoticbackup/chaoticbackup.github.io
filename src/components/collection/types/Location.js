import { inject, observer } from 'mobx-react';
import React from 'react';

import { Ability, FlavorText, Initiative, LocationIcon, Name, Rarity, Unique } from '../../Snippets';
import API from '../../SpreadsheetData';
import { Thumbnail } from './helpers';

@inject((stores, props, context) => props) @observer
export default class Location extends React.Component {

  render() {
    const { card } = this.props;

    if (this.props.ext == false) return (
      <div className="card location">
        <Thumbnail {...this.props} />
        <div className="left">
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} />
          <span><LocationIcon /> Location{card.gsx$types.length > 0 ? " - " + card.gsx$types : null}</span><br />
          <Initiative initiative={card.gsx$initiative} />
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
        <div className="fullcard"><img src={API.cardImage(card)} height="250px" width="350px"/></div>
        <div className="right">
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} id={card.gsx$id} />
          <Initiative initiative={card.gsx$initiative} />
          <Ability ability={card.gsx$ability} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <FlavorText flavortext={card.gsx$flavortext} />
          <div>Art By: {card.gsx$artist}</div>
        </div>
      </div>
    );
  }
}
