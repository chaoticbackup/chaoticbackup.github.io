import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import PageNotFound from '../../PageNotFound';
import UnderConstruction from '../../UnderConstruction';

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

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    let tribe = path[2];

    return (
      <div>
        <div><i>Tribe Summary Here</i></div><br />
        <Interactive as="a" {...s.link} href={"/portal/"+tribe+"/Creatures"}>Creatures</Interactive><br />
        <Interactive as="a" {...s.link} href={"/portal/"+tribe+"/Mugic"}>Mugic</Interactive>
      </div>
    );
  }
}
