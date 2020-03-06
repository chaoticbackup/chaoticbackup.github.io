import React from 'react';
import API from '../../SpreadsheetData';
import { observer, inject } from 'mobx-react';
import { Rarity, Unique, Name, Element, Mugic, Discipline, Ability, Tribe } from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
    let card = this.props.card;

    let mugic = [];
    for (let i = 0; i < card.gsx$mugicability; i++) {
      mugic.push(<Mugic key={i} tribe={card.gsx$tribe} />);
    }

    const TribeLine = () => {
      let tribe = card.gsx$tribe;
      let types = card.gsx$types;
      let past = false;
      if (types.toLowerCase().includes("past")) {
        past = true;
        types = types.replace(/past /i, '');
      }

      // <past> <tribe> <types>
      let line = " " + (past ? "Past " : "") + (tribe == "Generic" ? "" : tribe + " ") + types;

      return <span><Tribe tribe={tribe} />{line}</span>
    }

    if (this.props.ext == false) return (
      <div className="card creature">
        <img className="thumb" style={{ float: 'left' }} src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(card.gsx$image)} />
        <div className="left">
          <Name name={card.gsx$name} /><br />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} /><br />
          <TribeLine /><br />
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
          { card.gsx$brainwashed && (
            <>
              <div className="text_brainwashed">Brainwashed</div>
              <Ability type="brainwashed" tribe={card.gsx$tribe} ability={card.gsx$brainwashed} />
            </>
          )}
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary, tribe: card.gsx$tribe }} />
          {/*chieftain*/
            card.gsx$types.includes("Chieftain") &&
            <span className="chieftain">(Minions use Brainwashed text. Minions may only play Generic Mugic.)<br /></span>
          }
          <span className="flavortext">{card.gsx$flavortext}</span>
        </div>
        <br />
          <div className="stats">
              <div className="energy">
                  {card.gsx$courage}<Discipline discipline="courage" />
              </div>
              <div className="energy">
                  {card.gsx$power}<Discipline discipline="power" />
              </div>
              <div className="energy">
                  {card.gsx$wisdom}<Discipline discipline="wisdom" />
              </div>
              <div className="energy">
                  {card.gsx$speed}<Discipline discipline="speed" />
              </div>
              <div className="energy" style={{ fontWeight: 'bold' }}>{card.gsx$energy}
              </div>
          </div>
      </div>
    )
    else return (
      <div className="card creature">
        <img className="fullcard" src={API.base_image + (card.gsx$image || API.card_back)} />
        <div className="right" >
          <Name name={card.gsx$name} /><br />
          <span>{card.gsx$courage}&nbsp;<Discipline discipline="courage" /></span>&nbsp;
          <span>{card.gsx$power}&nbsp;<Discipline discipline="power" /></span>&nbsp;
          <span>{card.gsx$wisdom}&nbsp;<Discipline discipline="wisdom" /></span>&nbsp;
          <span>{card.gsx$speed}&nbsp;<Discipline discipline="speed" /></span>&nbsp;
          <span style={{ fontWeight: 'bold' }}>{card.gsx$energy}</span>
          <br />
          <Ability ability={card.gsx$ability} tribe={card.gsx$tribe} />
          { card.gsx$brainwashed && (
            <>
              <div className="text_brainwashed">Brainwashed</div>
              <Ability type="brainwashed" tribe={card.gsx$tribe} ability={card.gsx$brainwashed} />
            </>
          )}
          <Unique data={{ unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary, tribe: card.gsx$tribe }} />
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


