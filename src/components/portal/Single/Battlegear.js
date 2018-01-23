import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {PageNotFound} from '../../Snippets';
import {Rarity, Unique, Name, Element, Mugic, Discipline, Ability, Tribe} from '../../Snippets';

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

    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!API.cards.built.includes("battlegear_cards")) {
      API.cards.setupBattlegear("cards");
      return (<span>Loading...</span>);
    }

    if (!API.portal.built.includes("battlegear_portal")) {
      API.portal.setupBattlegear("portal");
      return (<span>Loading...</span>);
    }

    const battlegear = API.portal.battlegear.findOne({'gsx$name': name});
    if (!battlegear) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const card_data = API.cards.battlegear.findOne({'gsx$name': name});

    return (
      <div>
        <img className="splash" src={API.base_image + card_data.gsx$splash} />
        <div className="title">{battlegear.gsx$name}</div>
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
        <hr />
        <div>
          <strong>Ability:</strong><br />
          <Ability ability={card_data.gsx$ability} />
        </div>
      </div>
    );
  }
}
