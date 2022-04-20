import { observer, inject } from 'mobx-react';
import React from 'react';

import MugicPlay from '../../mugicplayer/playbutton.tsx';
import { FlavorText, Rarity, Unique, Name, MugicIcon as MugicCounter, Ability, TribeIcon } from '../../Snippets';
import API from '../../SpreadsheetData';
import { Thumbnail } from './helpers';

@inject((stores, props, context) => props) @observer
export default class Mugic extends React.Component {

  render() {
    const { card } = this.props;

    const mugicCounters = [];
    if (card.gsx$cost == 0) {
      mugicCounters.push(<MugicCounter tribe={card.gsx$tribe} key={0} amount={"0"}/>);
    }
    else if (card.gsx$cost.toLowerCase() == 'x') {
      mugicCounters.push(<MugicCounter tribe={card.gsx$tribe} key={0} amount={"x"}/>);
    }
    else {
      if (card.gsx$cost > 5) {
        mugicCounters.push(<MugicCounter tribe={card.gsx$tribe} key={0} amount={card.gsx$cost} />);
      }
      else {
        for (let i = 0; i < card.gsx$cost; i++) {
          mugicCounters.push(<MugicCounter tribe={card.gsx$tribe} key={i} />);
        }
      }
    }
  
    if (this.props.ext == false) return (
      <div className="card mugic">
        <Thumbnail {...this.props} />
        <div className="left">
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} />
          <TribeIcon size="icon16" tribe={card.gsx$tribe} /> Mugic - {card.gsx$tribe}<br />
          <span>{mugicCounters}</span><MugicPlay notes={card.gsx$shownotes?.length > 0 ? card.gsx$shownotes : card.gsx$notes}/><br />
        </div>
        <br />
        <div className="right" >
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <FlavorText flavortext={card.gsx$flavortext} />
        </div>
      </div>
    );
    else return (
      <div className="card mugic">
        <div className="fullcard"><img src={API.cardImage(card)} width="250px" height="350px" /></div>
        <div className="right" >
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} id={card.gsx$id} />
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <FlavorText flavortext={card.gsx$flavortext} />
          <div>Art By: {card.gsx$artist}</div>
          <div>Notes: {card.gsx$notes}</div>
          <MugicPlay notes={card.gsx$shownotes?.length > 0 ? card.gsx$shownotes : card.gsx$notes}/>
        </div>
      </div>
    );
  }

}
