import { observer, inject } from 'mobx-react';
import React from 'react';

import { FlavorText, Rarity, Unique, Name, ElementIcon, MugicIcon, DisciplineIcon, Ability, TribeIcon } from '../../Snippets';
import API from '../../SpreadsheetData';
import { Thumbnail } from './helpers';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
    const { card, stats, hideStats } = this.props;

    const mugic = [];
    for (let i = 0; i < card.gsx$mugicability; i++) {
      mugic.push(<MugicIcon key={i} tribe={card.gsx$tribe} />);
    }

    const TribeLine = () => {
      let types = card.gsx$types;

      // Moves "Past" in front of tribe due to db entry order
      let past = false;
      if (types.toLowerCase().includes("past")) {
        past = true;
        types = types.replace(/past /i, '');
      }
      const line = " " + (past ? "Past " : "") + types;

      return <span><TribeIcon tribe={card.gsx$tribe} />{line}</span>;
    };

    const stat_range = (stat, name) => {
      if (name && name == "Aa'une the Oligarch, Avatar") return Number(stat);
      if (stats == "min") return Number(stat) - 10;
      if (stats == "max") return Number(stat) + 10;
      return Number(stat);
    };

    const energy_range = (energy, name) => {
      if (name && name == "Aa'une the Oligarch, Avatar") return Number(energy);
      if (stats == "min") return Number(energy) - 5;
      if (stats == "max") return Number(energy) + 5;
      return Number(energy);
    };

    if (this.props.ext == false) return (
      <div className="card creature">
        <Thumbnail {...this.props} />
        <div className="left">
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} />
          <TribeLine /><br />
          <div>
            <ElementIcon element="fire" value={card.gsx$elements.toLowerCase().indexOf("fire") >=0} />&nbsp;
            <ElementIcon element="air" value={card.gsx$elements.toLowerCase().indexOf("air") >=0} />&nbsp;
            <ElementIcon element="earth" value={card.gsx$elements.toLowerCase().indexOf("earth") >=0} />&nbsp;
            <ElementIcon element="water" value={card.gsx$elements.toLowerCase().indexOf("water") >=0} />
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
              <div className="chieftain">(Minions use Brainwashed text. Minions may only play Generic Mugic.)</div>
          }
          <FlavorText flavortext={card.gsx$flavortext} />
        </div>
        <br />
        <div className="stats">
          <div className="energy">
            {stat_range(card.gsx$courage, card.gsx$name)}<DisciplineIcon discipline="courage" />
          </div>
          <div className="energy">
            {stat_range(card.gsx$power, card.gsx$name)}<DisciplineIcon discipline="power" />
          </div>
          <div className="energy">
            {stat_range(card.gsx$wisdom, card.gsx$name)}<DisciplineIcon discipline="wisdom" />
          </div>
          <div className="energy">
            {stat_range(card.gsx$speed, card.gsx$name)}<DisciplineIcon discipline="speed" />
          </div>
          <div className="energy" style={{ fontWeight: 'bold' }}>{energy_range(card.gsx$energy, card.gsx$name)}
          </div>
        </div>
      </div>
    );
    else return (
      <div className="card creature">
        <div className="fullcard">
          {/* style={{ backgroundImage: `url("${API.cardImage(card)}")` }} */}
          <img src={API.cardImage(card)} width="250px" height="350px" />
          {!hideStats && (
            <div className="image-cover" >
              <div>
                <span key="courage" {...(stat_range(card.gsx$courage, card.gsx$name) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$courage, card.gsx$name)}</span>
                <span key="power" {...(stat_range(card.gsx$power, card.gsx$name) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$power, card.gsx$name)}</span>
                <span key="wisdom" {...(stat_range(card.gsx$wisdom, card.gsx$name) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$wisdom, card.gsx$name)}</span>
                <span key="speed" {...(stat_range(card.gsx$speed, card.gsx$name) >= 100 ? { className: "long" } : null)}>{stat_range(card.gsx$speed, card.gsx$name)}</span>
                <span key="energy" {...(energy_range(card.gsx$energy, card.gsx$name) >= 100 ? { className: "long" } : null)}>{energy_range(card.gsx$energy, card.gsx$name)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="right" >
          <Name name={card.gsx$name} />
          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} id={card.gsx$id} />
          <span>{stat_range(card.gsx$courage, card.gsx$name)}&nbsp;<DisciplineIcon discipline="courage" /></span>&nbsp;
          <span>{stat_range(card.gsx$power, card.gsx$name)}&nbsp;<DisciplineIcon discipline="power" /></span>&nbsp;
          <span>{stat_range(card.gsx$wisdom, card.gsx$name)}&nbsp;<DisciplineIcon discipline="wisdom" /></span>&nbsp;
          <span>{stat_range(card.gsx$speed, card.gsx$name)}&nbsp;<DisciplineIcon discipline="speed" /></span>&nbsp;
          <span style={{ fontWeight: 'bold' }}>{energy_range(card.gsx$energy, card.gsx$name)}</span>
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
              <div className="chieftain">(Minions use Brainwashed text. Minions may only play Generic Mugic.)</div>
          }
          <FlavorText flavortext={card.gsx$flavortext} />
          <div>Art By: {card.gsx$artist}</div>
        </div>
      </div>
    );
  }
}


