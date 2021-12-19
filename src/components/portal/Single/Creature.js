import React from 'react';
import { Interactive } from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import { observer, inject } from 'mobx-react';
import Single from './_base';
import { PageNotFound, ElementIcon, MugicIcon, DisciplineIcon, TribeIcon } from '../../Snippets';

function Artist(props) {
  const artists = [];
  props.artist.split(/(?=, )/).forEach((artist, i) => {
    artists.push(<Link key={i} to={`/portal/Search/?${artist.replace(", ", "")}`}>{artist}</Link>);
  });
  return (<div className="ability">{artists}</div>);
}

@inject((stores, props, context) => props) @observer
export default class SingleCreature extends React.Component {

  // ** Process the tribe ** //
  // /portal/Creatures/{Tribe}/{Name}
  // /portal/{Tribe}/Creatures/{Name}
  // The first / gets counted
  render() {

    const path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    const name = (() => {
      if (path.length >= 5) return decodeURIComponent(path[4]);
      if (path.length == 4) return decodeURIComponent(path[3]);
    })();

    const creature = API.portal.creatures.findOne({ 'gsx$name': name });
    const card_data = API.cards.creatures.findOne({ 'gsx$name': name });

    if (creature) {
      const tribe = creature.gsx$tribe;

      const mugic = [];
      for (let i = 0; i < parseInt(card_data.gsx$mugicability || 0); i++) {
        mugic.push(<MugicIcon key={i} tribe={tribe} />);
      }

      const col2 = [];
      if (creature.gsx$attributes) {
        col2.push(["Appearance", creature.gsx$attributes]);
      }
      if (creature.gsx$background) {
        col2.push(["Background", creature.gsx$background]);
      }
      if (creature.gsx$details) {
        col2.push(["Details", creature.gsx$details]);
      }
      if (creature.gsx$battlegear) {
        col2.push(["Favorite Battlegear(s)", creature.gsx$battlegear.split(/[;]+\s*/).map((item, i) =>
          <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Battlegear/"+item}><span>{item}</span></Interactive></p>
        )]);
      }
      if (creature.gsx$location) {
        col2.push(["Favorite Location(s)", creature.gsx$location.split(/[;]+\s*/).map((item, i) =>
          <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Locations/"+item}><span>{item}</span></Interactive></p>
        )]);
      }
      if (creature.gsx$height) {
        col2.push(["Height (ft)", creature.gsx$height]);
      }
      if (creature.gsx$specialabilities) {
        col2.push(["Special Abilities", creature.gsx$specialabilities]);
      }
      if (creature.gsx$weight) {
        col2.push(["Weight (lb)", creature.gsx$weight]);
      }

      return (<Single
        card={card_data}
        col0={<>
          <div>
            <strong>Tribe: </strong>
            <TribeIcon tribe={tribe} />&nbsp;
            {tribe}
          </div>
          <hr />
          <div>
            <strong>Disciplines: </strong>
            {card_data.gsx$courage}<DisciplineIcon discipline="courage" />&nbsp;
            {card_data.gsx$power}<DisciplineIcon discipline="power" />&nbsp;
            {card_data.gsx$wisdom}<DisciplineIcon discipline="wisdom" />&nbsp;
            {card_data.gsx$speed}<DisciplineIcon discipline="speed" />
          </div>
          <hr />
          <div>
            <strong>Energy: </strong>
            {card_data.gsx$energy}
          </div>
          <hr />
          <div>
            <strong>Elements: </strong>
            <ElementIcon element="fire" value={card_data.gsx$elements.toLowerCase().indexOf("fire") >=0} />&nbsp;
            <ElementIcon element="air" value={card_data.gsx$elements.toLowerCase().indexOf("air") >=0} />&nbsp;
            <ElementIcon element="earth" value={card_data.gsx$elements.toLowerCase().indexOf("earth") >=0} />&nbsp;
            <ElementIcon element="water" value={card_data.gsx$elements.toLowerCase().indexOf("water") >=0} />
          </div>
          <hr />
          <div>
            <strong>Mugic Ability: </strong>
            {mugic}
          </div>
        </>}
        col2={
          col2.map((val, i) => {
            return (<React.Fragment key={i} >
              <div>
                <strong>{val[0]}:</strong><br />
                {val[1]}
              </div>
              {i !== col2.length - 1 && <hr />}
            </React.Fragment>);
          }) 
        }
      />);
    }
    else if (card_data) {
      if (API.hasFullart(card_data)) {
        const tribe = card_data.gsx$tribe;

        const mugic = [];
        for (let i = 0; i < parseInt(card_data.gsx$mugicability || 0); i++) {
          mugic.push(<MugicIcon key={i} tribe={tribe} />);
        }

        return (<Single
          card={card_data}
          col0={<>
            <div>
              <strong>Tribe: </strong>
              <TribeIcon tribe={tribe} />&nbsp;
              {tribe}
            </div>
            <hr />
            <div>
              <strong>Disciplines: </strong>
              {card_data.gsx$courage}
              <DisciplineIcon discipline="courage" />&nbsp;
              {card_data.gsx$power}
              <DisciplineIcon discipline="power" />&nbsp;
              {card_data.gsx$speed}
              <DisciplineIcon discipline="speed" />&nbsp;
              {card_data.gsx$wisdom}
              <DisciplineIcon discipline="wisdom" />
            </div>
            <hr />
            <div>
              <strong>Energy: </strong>
              {card_data.gsx$energy}
            </div>
            <hr />
            <div>
              <strong>Elements: </strong>
              <ElementIcon element="fire" value={card_data.gsx$elements.toLowerCase().indexOf("fire") >=0} />&nbsp;
              <ElementIcon element="air" value={card_data.gsx$elements.toLowerCase().indexOf("air") >=0} />&nbsp;
              <ElementIcon element="earth" value={card_data.gsx$elements.toLowerCase().indexOf("earth") >=0} />&nbsp;
              <ElementIcon element="water" value={card_data.gsx$elements.toLowerCase().indexOf("water") >=0} />
            </div>
            <hr />
            <div>
              <strong>Mugic Ability: </strong>
              {mugic}
            </div>
          </>}
        />);
      }
    }
    
    return (<PageNotFound location={this.props.location}/>);
  }
}
