import React from 'react';
import API from '../../SpreadsheetData';
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Mugic, Ability} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
    let card = this.props.card;

    let mugicCounters = [];
    if (card.gsx$cost == 0) {
      mugicCounters.push(<span key={0}>0</span>);
    }
    else if (card.gsx$cost.toLowerCase() == 'x') {
      mugicCounters.push(<span key={0}>X</span>);
    }
    else {
      for (let i = 0; i < card.gsx$cost; i++) {
        mugicCounters.push(<Mugic tribe={card.gsx$tribe} key={i} />);
      }
    }

    if (this.props.ext == false) return (
      <div className="card mugic">
        <img className="thumb" style={{float: 'left'}} src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(card.gsx$image)} />
        <div className="left">
          <Name name={card.gsx$name} /><br />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} /> <br />
          <img height="20" className="icon16" src={"/src/img/icons/tribes/"+(card.gsx$tribe.toLowerCase()||"generic")+".png"} /> {card.gsx$tribe}<br />
          <span>{mugicCounters}</span><br />
        </div>
        <br />
        <div className="right" >
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary}} />
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
      </div>
    )
    else return (
      <div className="card mugic">
        <img className="fullcard" src={API.base_image + (card.gsx$image || API.card_back)} />
        <div className="right" >
          <Name name={card.gsx$name} /><br />
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
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
