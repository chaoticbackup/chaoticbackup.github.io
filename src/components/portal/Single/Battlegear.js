import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {PageNotFound} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleBattlegear extends React.Component {

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

    if (!store.cards.built.includes("battlegear_cards")) {
      store.cards.setupBattlegear("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("battlegear_portal")) {
      store.portal.setupBattlegear("portal");
      return (<span>Loading...</span>);
    }

    const battlegear = store.portal.battlegear.findOne({'gsx$name': name});
    if (!battlegear) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const card_data = store.cards.battlegear.findOne({'gsx$name': name});

    return (
      <div className={"battlegear"}>
        <h1>{battlegear.gsx$name}</h1>
        <img className="splash" src={store.base_image + card_data.gsx$splash}></img>
        <hr />
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
