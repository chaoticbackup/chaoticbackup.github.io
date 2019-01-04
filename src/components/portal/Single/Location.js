import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import Single from './_base';
import {PageNotFound, Rarity, Unique, Name, Ability, Initiative} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleLocation extends React.Component {

  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    let name = decodeURIComponent(path[3]);

    const location = API.portal.locations.findOne({'gsx$name': name});
    if (!location) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const card_data = API.cards.locations.findOne({'gsx$name': name});

    return (<Single
      image={card_data.gsx$splash}
      text={<div>
        <div className="title">{location.gsx$name}</div>
        <hr />
        <div>
          <strong>Local Features:</strong><br />
          {location.gsx$localfeatures}
        </div>
        <hr />
        <div>
          <strong>Background:</strong><br />
          {location.gsx$background}
        </div>
        <hr />
        <div>
          <strong>Card Flavor:</strong><br />
          {card_data.gsx$flavortext}
        </div>
        <hr />
        <div>
          <strong>Details:</strong><br />
          {location.gsx$details}
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
          <strong>Location Initiative: </strong>
          <Initiative initiative={card_data.gsx$initiative} />
        </div>
        <hr />
        <div>
          <strong>Ability:</strong><br />
          <Ability ability={card_data.gsx$ability} />
        </div>
      </div>}
    />);
  }
}
