import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {PageNotFound} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleLocation extends React.Component {

  render() {
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    let name = decodeURIComponent(path[3]);

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!store.cards.built.includes("locations_cards")) {
      store.cards.setupLocations("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("locations_portal")) {
      store.portal.setupLocations("portal");
      return (<span>Loading...</span>);
    }

    const location = store.portal.locations.findOne({'gsx$name': name});
    if (!location) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const card_data = store.cards.locations.findOne({'gsx$name': name});

    return (
      <div>
        <img className="splash" src={store.base_image + card_data.gsx$splash}></img>
        <br />
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
          {card_data.gsx$initiative}
        </div>
      </div>
    );
  }
}
