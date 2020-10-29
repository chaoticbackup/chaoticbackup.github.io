import React from 'react';
import API from '../../SpreadsheetData';
import { observer, inject } from 'mobx-react';
import { Rarity, Unique, Name, Element, Mugic, Discipline, Ability, Tribe } from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
    const { card, stats } = this.props;

    const mugic = [];
    for (let i = 0; i < card.gsx$mugicability; i++) {
      mugic.push(<Mugic key={i} tribe={card.gsx$tribe} />);
    }

    const TribeLine = () => {
      const tribe = card.gsx$tribe;
      let types = card.gsx$types;
      let past = false;
      if (types.toLowerCase().includes("past")) {
        past = true;
        types = types.replace(/past /i, '');
      }

      // <past> <tribe> <types>
      const line = " " + (past ? "Past " : "") + (tribe == "Generic" ? "" : tribe + " ") + types;

      return <span><Tribe tribe={tribe} />{line}</span>;
    };

    const stat_range = (stat) => {
      if (stats == "min") return Number(stat) - 10;
      if (stats == "max") return Number(stat) + 10;
      return Number(stat);
    };

    const energy_range = (energy) => {
      if (stats == "min") return Number(energy) - 5;
      if (stats == "max") return Number(energy) + 5;
      return Number(energy);
    };

    if (this.props.ext == false) return (
      <div className="card creature">
        <img className="thumb" style={{ float: 'left' }} src={API.base_image + (card.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(API.cardImage(card))} />
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
            {stat_range(card.gsx$courage)}<Discipline discipline="courage" />
          </div>
          <div className="energy">
            {stat_range(card.gsx$power)}<Discipline discipline="power" />
          </div>
          <div className="energy">
            {stat_range(card.gsx$wisdom)}<Discipline discipline="wisdom" />
          </div>
          <div className="energy">
            {stat_range(card.gsx$speed)}<Discipline discipline="speed" />
          </div>
          <div className="energy" style={{ fontWeight: 'bold' }}>{energy_range(card.gsx$energy)}
          </div>
        </div>
      </div>
    );
    else return (
      <div className="card creature">
        <div className="fullcard">
          {/* style={{ backgroundImage: `url("${API.cardImage(card)}")` }} */}
          <img src={API.cardImage(card)} />
          <div className="image-cover" >
            <div>
              <span key="courage" {...(stat_range(card.gsx$courage) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$courage)}</span>
              <span key="power" {...(stat_range(card.gsx$power) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$power)}</span>
              <span key="wisdom" {...(stat_range(card.gsx$wisdom) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$wisdom)}</span>
              <span key="speed" {...(stat_range(card.gsx$speed) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$speed)}</span>
              <span key="energy" {...(stat_range(card.gsx$energy) >= 100 ? { className: "long" } : null)}>{energy_range(card.gsx$energy)}</span>
            </div>
          </div>
        </div>
        <div className="right" >
          <Name name={card.gsx$name} /><br />
          <span>{stat_range(card.gsx$courage)}&nbsp;<Discipline discipline="courage" /></span>&nbsp;
          <span>{stat_range(card.gsx$power)}&nbsp;<Discipline discipline="power" /></span>&nbsp;
          <span>{stat_range(card.gsx$wisdom)}&nbsp;<Discipline discipline="wisdom" /></span>&nbsp;
          <span>{stat_range(card.gsx$speed)}&nbsp;<Discipline discipline="speed" /></span>&nbsp;
          <span style={{ fontWeight: 'bold' }}>{energy_range(card.gsx$energy)}</span>
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
          {card.gsx$flavortext && <>
            <span className="flavortext">{card.gsx$flavortext}</span><br />
          </>}
          <span>Art By: {card.gsx$artist}</span>
        </div>
      </div>
    );
  }
}


