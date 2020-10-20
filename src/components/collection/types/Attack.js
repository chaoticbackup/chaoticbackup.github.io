import React from 'react';
import API from '../../SpreadsheetData';
import { observer, inject } from 'mobx-react';
import { Rarity, Unique, Name, Element, Ability, AttackIcon } from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
    const { card } = this.props;

    if (this.props.ext == false) return (
      <div className="card attack">
        <img className="thumb" src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(API.cardImage(card))} />
        <div className="left">
          <Name name={card.gsx$name} /><br />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} /><br />
          <span><AttackIcon bp={card.gsx$bp} /> Attack - {card.gsx$bp}</span><br />
          <div>
            <span className="bp bigger" >{card.gsx$base}</span> |&nbsp;
            <Element element="fire" value={card.gsx$fire} />{card.gsx$fire}&nbsp;
            <Element element="air" value={card.gsx$air} />{card.gsx$air}&nbsp;
            <Element element="earth" value={card.gsx$earth} />{card.gsx$earth}&nbsp;
            <Element element="water" value={card.gsx$water} />{card.gsx$water}
          </div>
        </div>
        <br />
        <div className="right" >
          <Ability ability={card.gsx$ability} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
      </div>
    );
    else return (
      <div className="card attack">
        <div className="fullcard"><img src={API.cardImage(card)} /></div>
        <div className="right">
          <Name name={card.gsx$name} /><br />
          <Ability ability={card.gsx$ability} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          {card.gsx$flavortext && <>
            <span className="flavortext">{card.gsx$flavortext}</span><br />
          </>}
          <span>Art By: {card.gsx$artist}</span>
        </div>
      </div>
    );
  }
}

