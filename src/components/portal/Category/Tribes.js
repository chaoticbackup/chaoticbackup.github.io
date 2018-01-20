import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Tribes extends React.Component {

  // /{Tribe}
  // gives a brief summary and the option of "mugic" or "tribe"
  // to display the respective subcategories
  // -> /{Tribe}/Mugic || /{Tribe}/Creatures
  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }

    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    let tribe = path[2];

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

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

    return (
      <div>
        <h1>{tribe}</h1>
        <br />
        <Interactive as={Link} {...s.link} to={"/portal/"+tribe+"/Creatures"}>Creatures</Interactive><br />
        <Interactive as={Link} {...s.link} to={"/portal/"+tribe+"/Mugic"}>Mugic</Interactive>
      </div>
    );
  }
}
