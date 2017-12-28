import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import PageNotFound from '../../PageNotFound';
import UnderConstruction from '../../UnderConstruction';

@inject((stores, props, context) => props) @observer
export default class Attacks extends React.Component {

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }

    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

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

    const attacks = store.portal.attacks.data;

    const output = attacks.map((attack, i) => {
      const card_data = store.cards.attacks.findOne({'gsx$name': attack.gsx$name});
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/Attacks/'+attack.gsx$name}
          >
            <span>{attack.gsx$name}</span><br />
            <img className="thumb" src={store.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    return (<div>{output}</div>);
  }
}
