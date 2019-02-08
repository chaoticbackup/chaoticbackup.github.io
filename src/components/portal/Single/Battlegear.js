import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {PageNotFound} from '../../Snippets';
import Single from './_base';

@inject((stores, props, context) => props) @observer
export default class SingleBattlegear extends React.Component {

  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    let name = decodeURIComponent(path[3]);

    const battlegear = API.portal.battlegear.findOne({'gsx$name': name});
    const card_data = API.cards.battlegear.findOne({'gsx$name': name});

    if (battlegear) {
      return (<Single 
        card={card_data}
        col2={<React.Fragment>
          <div>
            <strong>Attributes:</strong><br />
            {battlegear.gsx$attributes}
          </div>
          <hr />
          <div>
            <strong>Background:</strong><br />
            {battlegear.gsx$background}
          </div>
          <hr />
          <div>
            <strong>Details:</strong><br />
            {battlegear.gsx$details}
          </div>
        </React.Fragment>}
      />);
    }
    else {
      if (card_data.gsx$splash) {
        return (<Single card={card_data}/>);
      }
      else {
        return(<PageNotFound location={this.props.location}/>);
      }
    }
  }
}
