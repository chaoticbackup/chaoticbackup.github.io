import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../../PageNotFound';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import UnderConstruction from '../../UnderConstruction';
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
      store.portal === null) {
      return (<span>Loading...</span>);
    }

    // If there isn't a supported tribe,
    // Displays list of tribes
    if (!store.urls.Creatures.hasOwnProperty(tribe)) {
      return(
        <div>
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/Danian"
          >Danian</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/Overworld"
          >Overworld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/Underworld"
          >Underworld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Creatures/Mipedian"
          >Mipedian</Interactive>
        </div>
      );
    }

    if (!store.portal.built.includes("creatures_"+tribe)) {
      store.portal.setupCreatures(tribe);
      return (<span>Loading...</span>);
    }

    const creatures = store.portal.creatures.find({'gsx$tribe': tribe});
    const output = creatures.map((creature, i) => {
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/Creatures/'+tribe+'/'+creature.gsx$name}
          ><span>{creature.gsx$name}</span></Interactive>
        </div>
      );
    });

    return (<div>{output}</div>);
  }

}
