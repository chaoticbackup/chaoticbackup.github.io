import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import Single from './_base';
import {PageNotFound, Initiative} from '../../Snippets';

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
      card={card_data}
      col0={<React.Fragment>
        <div>
          <strong>Initiative: </strong>
          <Initiative initiative={card_data.gsx$initiative} notitle="true"/>
        </div>
      </React.Fragment>}
      col2={<React.Fragment>
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
          <strong>Details:</strong><br />
          {location.gsx$details}
        </div>
      </React.Fragment>}
    />);
  }
}
