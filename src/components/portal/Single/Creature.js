import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import {PageNotFound} from '../../Snippets';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Element, Mugic, Discipline, Ability, Tribe} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleCreature extends React.Component {

  // ** Process the tribe ** //
  // /portal/Creatures/{Tribe}/{Name}
  // /portal/{Tribe}/Creatures/{Name}
  // The first / gets counted
  render() {
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 5 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    //Handle both url layouts
    let tribe = (() => {
      if (path[2] === "Creatures") return path[3];
      if (path[3] === "Creatures") return path[2];
    })();

    let name = decodeURIComponent(path[4]);

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!store.tribes.includes(tribe)) {
      return (<span>Invalid Tribe: {tribe}</span>);
    }

    if (!store.cards.built.includes("creatures_cards")) {
      store.cards.setupCreatures("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("creatures_portal")) {
      store.portal.setupCreatures("portal");
      return (<span>Loading...</span>);
    }

    const creature = store.portal.creatures.findOne({'gsx$name': name});
    if (!creature) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const card_data = store.cards.creatures.findOne({'gsx$name': name});

    const locations = creature.gsx$location.split(/[,]+\s*/).map((item, i) => {
      return <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Locations/"+item}><span>{item}</span></Interactive></p>;
    });

    const battlegear = creature.gsx$battlegear.split(/[,]+\s*/).map((item, i) => {
      return <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Battlegear/"+item}><span>{item}</span></Interactive></p>;
    });

    let mugic = [];
    for (let i = 0; i < card_data.gsx$mugicability; i++) {
      mugic.push(<Mugic key={i} tribe={tribe} />);
    }

    return (
      <div>
        <img className="splash" src={store.base_image + card_data.gsx$splash}></img>
        <br />
        <div className="title">{creature.gsx$name}</div>
        <hr />
        <div>
          <strong>Appearance:</strong><br />
          {creature.gsx$appearance}
        </div>
        <hr />
        <div>
          <strong>Background:</strong><br />
          {creature.gsx$background}
        </div>
        <hr />
        <div>
          <strong>Details:</strong><br />
          {creature.gsx$details}
        </div>
        <hr />
        <div>
          <strong>Favorite Battlegear(s):</strong><br />
          {battlegear}
        </div>
        <hr />
        <div>
          <strong>Favorite Location(s):</strong><br />
          {locations}
        </div>
        <hr />
        <div>
          <strong>Height (ft):</strong><br />
          {creature.gsx$height}
        </div>
        <hr />
        <div>
          <strong>Special Abilities:</strong><br />
          {creature.gsx$specialabilities}
        </div>
        <hr />
        <div>
          <strong>Weight (lb):</strong><br />
          {creature.gsx$weight}
        </div>
        <hr />
        <div>
          <strong>Card ID: </strong>
          {card_data.gsx$id}
        </div>
        <hr />
        <div>
          <strong>Set: </strong>
          {card_data.gsx$set}
        </div>
        <hr />
        <div>
          <strong>Rarity: </strong>
          {card_data.gsx$rarity}
        </div>
        <hr />
        <div>
          <strong>Tribe: </strong>
          <Tribe tribe={tribe} />
        </div>
        <hr />
        <div>
          <strong>Ability:</strong><br />
          <Ability ability={card_data.gsx$ability} tribe={card_data.gsx$tribe} />
        </div>
        <hr />
        <div>
          <strong>Courage: </strong>
          {card_data.gsx$courage}
          <Discipline discipline="courage" />
        </div>
        <hr />
        <div>
          <strong>Power: </strong>
          {card_data.gsx$power}
          <Discipline discipline="power" />
        </div>
        <hr />
        <div>
          <strong>Speed: </strong>
          {card_data.gsx$speed}
          <Discipline discipline="speed" />
        </div>
        <hr />
        <div>
          <strong>Wisdom: </strong>
          {card_data.gsx$wisdom}
          <Discipline discipline="wisdom" />
        </div>
        <hr />
        <div>
          <strong>Energy: </strong>
          {card_data.gsx$energy}
        </div>
        <hr />
        <div>
          <strong>Elements: </strong>
          <div>
            <Element element="fire" value={card_data.gsx$elements.toLowerCase().indexOf("fire") >=0} />&nbsp;
            <Element element="air" value={card_data.gsx$elements.toLowerCase().indexOf("air") >=0} />&nbsp;
            <Element element="earth" value={card_data.gsx$elements.toLowerCase().indexOf("earth") >=0} />&nbsp;
            <Element element="water" value={card_data.gsx$elements.toLowerCase().indexOf("water") >=0} />
          </div>
        </div>
        <hr />
        <div>
          <strong>Flavortext:</strong><br />
          {card_data.gsx$flavortext}
        </div>
        <hr />
        <div>
          <strong>Mugic Ability: </strong>
          {mugic}
        </div>
      </div>
    );
  }
}
