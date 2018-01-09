import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Creatures extends React.Component {

  // ** Process the tribe ** //
  // /portal/Creatures/
  // /portal/{Tribe}/Creatures/
  // The first / gets counted
  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    let tribe = (() => {
      if (path.length !== 4) return "None";
      if (path[2] === "Creatures") return path[3];
      if (path[3] === "Creatures") return path[2];
    })();

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    // If there isn't a supported tribe,
    // Displays list of tribes
    if (!store.tribes.includes(tribe)) {
      return(
        <div>
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/Danian"
          >Danian</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/OverWorld"
          >OverWorld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/UnderWorld"
          >UnderWorld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/Mipedian"
          >Mipedian</Interactive>
        </div>
      );
    }

    if (!store.cards.built.includes("creatures_cards")) {
      store.cards.setupCreatures("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("creatures_portal")) {
      store.portal.setupCreatures("portal");
      return (<span>Loading...</span>);
    }

    const creatures = store.portal.creatures.find({'gsx$tribe': tribe});
    const output = creatures.map((creature, i) => {
      const card_data = store.cards.creatures.findOne({'gsx$name': creature.gsx$name});
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/'+tribe+'/Creatures/'+creature.gsx$name}
          >
            <span>{creature.gsx$name}</span><br />
            <img className="thumb" src={store.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    return (<div>{output}</div>);
  }

}
