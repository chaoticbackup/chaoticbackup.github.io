import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import Location from '../Single/Location';

@inject((stores, props, context) => props) @observer
export default class Locations extends React.Component {

  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!API.cards.built.includes("locations_cards")) {
      API.cards.setupLocations("cards");
      return (<span>Loading...</span>);
    }

    if (!API.portal.built.includes("locations_portal")) {
      API.portal.setupLocations("portal");
      return (<span>Loading...</span>);
    }

    const locations = API.portal.locations.data;

    const output = locations.map((location, i) => {
      const card_data = API.cards.locations.findOne({'gsx$name': location.gsx$name});
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/Locations/'+location.gsx$name}
          >
            <span>{location.gsx$name}</span><br />
            <img className="thumb" src={API.base_image + card_data.gsx$thumb}></img>
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
        <Route path={`${this.props.match.url}/:card`} component={Location} />
      </div>
    </div>);
  }
}
