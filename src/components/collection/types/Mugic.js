import React from 'react';
import API from '../../SpreadsheetData';
import { observer, inject } from 'mobx-react';
import { Rarity, Unique, Name, Mugic, Ability, Tribe } from '../../Snippets';
import MugicPlay from '../../mugicplayer/playbutton.tsx';
import { withRouter } from 'react-router';

@inject((stores, props, context) => props) @observer
class Attack extends React.Component {

  render() {
    const { card, history } = this.props;

    const mugicCounters = [];
    if (card.gsx$cost == 0) {
      mugicCounters.push(<Mugic tribe={card.gsx$tribe} key={0} amount={"0"}/>);
    }
    else if (card.gsx$cost.toLowerCase() == 'x') {
      mugicCounters.push(<Mugic tribe={card.gsx$tribe} key={0} amount={"x"}/>);
    }
    else {
      if (card.gsx$cost > 5) {
        mugicCounters.push(<Mugic tribe={card.gsx$tribe} key={0} amount={card.gsx$cost} />);
      }
      else {
        for (let i = 0; i < card.gsx$cost; i++) {
          mugicCounters.push(<Mugic tribe={card.gsx$tribe} key={i} />);
        }
      }
    }
    
    if (this.props.ext == false) return (
      <div className="card mugic">
        <img className="thumb" style={{ float: 'left' }} src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(API.cardImage(card))} />
        <div className="left">
          <Name name={card.gsx$name} /><br />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} /> <br />
          <Tribe size="icon16" tribe={card.gsx$tribe} /> Mugic - {card.gsx$tribe}<br />
          <span>{mugicCounters}</span><MugicPlay notes={card.gsx$shownotes?.length > 0 ? card.gsx$shownotes : card.gsx$notes}/><br />
        </div>
        <br />
        <div className="right" >
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }} />
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
      </div>
    );
    else return (
      <div className="card mugic">
        <div className="fullcard"><img src={API.cardImage(card)} /></div>
        <div className="right" >
          <Name name={card.gsx$name} /><br />
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
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

export default withRouter(Attack);
