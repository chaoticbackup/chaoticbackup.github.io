import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import Creature from '../Single/Creature';

@inject((stores, props, context) => props) @observer
export default class Creatures extends React.Component {

  // ** Process the tribe ** //
  // /portal/Creatures/
  // /portal/{Tribe}/Creatures/
  // The first / gets counted
  render() {
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    let tribe = null;
    if (path.length >= 4) {
      if (path[2] === "Creatures") tribe = path[3];
      else if (path[3] === "Creatures") tribe = path[2];

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
    }

    if (!store.cards.built.includes("creatures_cards")) {
      store.cards.setupCreatures("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("creatures_portal")) {
      store.portal.setupCreatures("portal");
      return (<span>Loading...</span>);
    }

    const creatures = (() => {
      if (path.length >= 4 && path[3] === "Creatures") {
        return store.portal.creatures.find({'gsx$tribe': tribe});
      }
      else {
        return store.portal.creatures.chain().simplesort('gsx$name').data();
      }
    })();

    const output = creatures.map((creature, i) => {
      const card_data = store.cards.creatures.findOne({'gsx$name': creature.gsx$name});

      let url = (() => {
        if (path[2] === "Creatures")
          return "/portal/Creatures/"+creature.gsx$tribe+"/"+creature.gsx$name;
        else if (path[3] === "Creatures")
          return "/portal/"+creature.gsx$tribe+"/Creatures/"+creature.gsx$name;
      })();

      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={url}
          >
            <span>{creature.gsx$name}</span><br />
            <img className="thumb" src={store.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    return (<div className="entry creatures">
      <div className="left">
        <div className="title">{path[2]}<hr /></div>
        {output}
      </div>
      <div className="right">
        <Route path={`${this.props.match.url}/:card`} component={Creature} />
      </div>
    </div>);
  }
}
