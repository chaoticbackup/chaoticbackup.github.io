import { observer, inject } from 'mobx-react';
import React from 'react';

import { FlavorText, Rarity, Unique, Name, Ability, BattlegearIcon } from '../../Snippets';
import API from '../../SpreadsheetData';
import { Thumbnail } from './helpers';

@inject((stores, props, context) => props) @observer
export default class Battlegear extends React.Component {

  render() {
    const { card } = this.props;

    if (this.props.ext == false) return (
      <div className="card battlegear">
        <Thumbnail {...this.props} />
        <div className="left">
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} />
          <span><BattlegearIcon /> Battlegear{card.gsx$types.length > 0 ? " - " + card.gsx$types : null}</span>
        </div>
        <div className="right" >
          <Ability ability={card.gsx$ability} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <FlavorText flavortext={card.gsx$flavortext} />
        </div>
      </div>
    );
    else return (
      <div className="card battlegear">
        <div className="fullcard"><img src={API.cardImage(card)} width="250px" height="350px" /></div>
        <div className="right" >
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} id={card.gsx$id} />
          <Ability ability={card.gsx$ability} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <FlavorText flavortext={card.gsx$flavortext} />
          <div>Art By: {card.gsx$artist}</div>
        </div>
      </div>
    );
  }

}
