import React from 'react';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Element, Ability} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
  	let card = this.props.card;

    if (this.props.ext == false) return (
  	  <div className="card attack">
	      <img className="thumb" src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(card.gsx$image)} />
	      <div className="left">
	        <Name name={card.gsx$name} /><br />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} /><br />
          <span>Build Points: {card.gsx$bp}</span><br />
          <div>
            <span className="bigger">{card.gsx$base}</span> |&nbsp;
            <Element element="fire" value={card.gsx$fire} />{card.gsx$fire}&nbsp;
            <Element element="air" value={card.gsx$air} />{card.gsx$air}&nbsp;
            <Element element="earth" value={card.gsx$earth} />{card.gsx$earth}&nbsp;
            <Element element="water" value={card.gsx$water} />{card.gsx$water}
          </div>
	      </div>
        <br />
        <div className="right" >
          <Ability ability={card.gsx$ability} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary}} /><br />
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
  	  </div>
  	)
    else return (
      <div className="card attack">
        <img className="fullcard" src={API.base_image + (card.gsx$image || API.card_back)} />
        <div className="right">
          <Name name={card.gsx$name} /><br />
          <Ability ability={card.gsx$ability} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary}} /><br />
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
      </div>
    );
  }
}

