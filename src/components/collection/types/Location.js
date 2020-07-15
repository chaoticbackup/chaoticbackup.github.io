import { inject, observer } from 'mobx-react';
import React from 'react';

import { Ability, Initiative, LocationIcon, Name, Rarity, Unique } from '../../Snippets';
import API from '../../SpreadsheetData';

@inject((stores, props, context) => props) @observer
export default class Location extends React.Component {

  render() {
    let card = this.props.card;

    if (this.props.ext == false) return (
      <div className="card location">
        <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(card.gsx$image)} />
        <div className="left">
          <Name name={card.gsx$name} /><br />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} /><br />
          <span><LocationIcon /> Location{card.gsx$types.length > 0 ? " - " + card.gsx$types : null}</span><br />
          <Initiative initiative={card.gsx$initiative} />
        </div>
        <div className="right">
          <Ability ability={card.gsx$ability} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary}} />
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
      </div>
    )
    else return (
      <div className="card location">
        <img className="fullcard" src={API.base_image + (card.gsx$image || API.card_back)} />
        <div className="right">
          <Name name={card.gsx$name} /><br />
          <Initiative initiative={card.gsx$initiative} />
          <Ability ability={card.gsx$ability} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary}} />
          {card.gsx$flavortext && <React.Fragment>
            <span className="flavortext">{card.gsx$flavortext}</span><br />
          </React.Fragment>}
          <span>Art By: {card.gsx$artist}</span>
        </div>
      </div>
    );
  }
}
