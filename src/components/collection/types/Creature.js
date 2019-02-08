import React from 'react';
import Interactive from 'react-interactive';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Element, Mugic, Discipline, Ability, Tribe} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
  	let card = this.props.card;

    let mugic = [];
    for (let i = 0; i < card.gsx$mugicability; i++) {
      mugic.push(<Mugic key={i} tribe={card.gsx$tribe} />);
    }

  	if (this.props.ext == false) return (
  	  <div className="card creature">
  	    <img className="thumb" style={{float: 'left'}} src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(card.gsx$image)} />
  	    <div className="left">
          <Name name={card.gsx$name} /><br />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} /><br />
          <span><Tribe tribe={card.gsx$tribe} /> {card.gsx$tribe} {card.gsx$types}</span><br />
	        <div>
            <Element element="fire" value={card.gsx$elements.toLowerCase().indexOf("fire") >=0} />&nbsp;
            <Element element="air" value={card.gsx$elements.toLowerCase().indexOf("air") >=0} />&nbsp;
            <Element element="earth" value={card.gsx$elements.toLowerCase().indexOf("earth") >=0} />&nbsp;
            <Element element="water" value={card.gsx$elements.toLowerCase().indexOf("water") >=0} />
          </div>
          <span>{mugic}</span>
	      </div>
        <br />
        <div className="right" >
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
          <Ability type="brainwashed" tribe={card.gsx$tribe} ability={card.gsx$brainwashed} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary, tribe: card.gsx$tribe}} />
          {/*chieftain*/
            card.gsx$types.includes("Chieftain") &&
            <span className="chieftain">(Minions use Brainwashed text. Minions may only play Generic Mugic.)<br /></span>
          }
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
        <br />
	      <div className="stats">
	     	  <span>{card.gsx$courage}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/courage.png"}></img></span><br />
	     	  <span>{card.gsx$power}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/power.png"}></img></span><br />
	     	  <span>{card.gsx$wisdom}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/wisdom.png"}></img></span><br />
	     	  <span>{card.gsx$speed}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/speed.png"}></img></span><br />
          <span style={{fontWeight: 'bold'}}>{card.gsx$energy}</span>
        </div>
  	  </div>
  	)
    else return (
      <div className="card creature">
        <img className="fullcard" src={API.base_image + (card.gsx$image || API.card_back)} />
        <div className="right" >
          <Name name={card.gsx$name} /><br />
          <span>{card.gsx$courage}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/courage.png"}></img></span>&nbsp;
          <span>{card.gsx$power}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/power.png"}></img></span>&nbsp;
          <span>{card.gsx$wisdom}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/wisdom.png"}></img></span>&nbsp;
          <span>{card.gsx$speed}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/speed.png"}></img></span>&nbsp;
          <span style={{fontWeight: 'bold'}}>{card.gsx$energy}</span>
          <br />
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
          <Ability type="brainwashed" tribe={card.gsx$tribe} ability={card.gsx$brainwashed} />
          <Unique data={{unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary, tribe: card.gsx$tribe}} />
          {/*chieftain*/
            card.gsx$types.includes("Chieftain") &&
            <span className="chieftain">(Minions use Brainwashed text. Minions may only play Generic Mugic.)<br /></span>
          }
          {card.gsx$flavortext && <React.Fragment>
            <span className="flavortext">{card.gsx$flavortext}</span><br />
          </React.Fragment>}
          <span>Art By: {card.gsx$artist}</span>
        </div>
      </div>
    );
  }
}


