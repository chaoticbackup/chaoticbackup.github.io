import React from 'react';
import Interactive from 'react-interactive';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Ability, Initiative} from '../../Snippets';

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
          <Initiative initiative={card.gsx$initiative} /><br />
        </div>
        <div className="right">
          <Ability ability={card.gsx$ability} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary}} /><br />
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
      </div>
    )
    else return (
      <div className="card location">
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
