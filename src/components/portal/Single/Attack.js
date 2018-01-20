import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {PageNotFound} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleAttack extends React.Component {

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

    if (!store.cards.built.includes("attacks_cards")) {
      store.cards.setupAttacks("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("attacks_portal")) {
      store.portal.setupAttacks("portal");
      return (<span>Loading...</span>);
    }

    const attack = store.portal.attacks.findOne({'gsx$name': name});
    if (!attack) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const card_data = store.cards.attacks.findOne({'gsx$name': name});

    return (
      <div>
        <img className="splash" src={store.base_image + card_data.gsx$splash}></img>
        <br />
        <div className="title">{attack.gsx$name}</div>
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
      </div>
    );
  }
}
