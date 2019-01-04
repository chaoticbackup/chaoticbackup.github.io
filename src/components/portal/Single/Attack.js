import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {PageNotFound} from '../../Snippets';
import Single from './_base';

@inject((stores, props, context) => props) @observer
export default class SingleAttack extends React.Component {

  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    let name = decodeURIComponent(path[3]);

    const attack = API.portal.attacks.findOne({'gsx$name': name});
    if (!attack) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const card_data = API.cards.attacks.findOne({'gsx$name': name});

    return (<Single 
        image={card_data.gsx$splash}
        name={card_data.gsx$name}
        text={<div>
          <hr />
          <div>
            <strong>Attributes:</strong><br />
            {attack.gsx$attributes}
          </div>
          <hr />
          <div>
            <strong>Background:</strong><br />
            {attack.gsx$background}
          </div>
          <hr />
          <div>
            <strong>Details:</strong><br />
            {attack.gsx$details}
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
        </div>}
      />
    );
  }
}
