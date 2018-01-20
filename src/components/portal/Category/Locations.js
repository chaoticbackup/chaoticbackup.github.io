import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Locations extends React.Component {

  render() {
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

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

    const locations = store.portal.locations.data;

    const output = locations.map((location, i) => {
      const card_data = store.cards.locations.findOne({'gsx$name': location.gsx$name});
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/Locations/'+location.gsx$name}
          >
            <span>{location.gsx$name}</span><br />
            <img className="thumb" src={store.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    return (<div className="entry locations">
      <div className="left">
        <div className="title">Locations<hr /></div>
        {output}
      </div>
      <div className="right">
        {this.props.children}
      </div>
    </div>);
  }
}
