import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import Attack from '../Single/Attack';

@inject((stores, props, context) => props) @observer
export default class Attacks extends React.Component {
  @observable loaded = false;

  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!API.cards.built.includes("attacks_cards")) {
      API.cards.setupAttacks("cards");
      return (<span>Loading...</span>);
    }

    if (!API.portal.built.includes("attacks_portal")) {
      API.portal.setupAttacks("portal");
      return (<span>Loading...</span>);
    }

    if (this.loaded == false) {
      API.buildCollection([{'cards': 'attacks'}, {'portal': 'attacks'}])
      .then(() => {
        this.loaded = true;
      });
      return (<span>Loading...</span>);
    }

    const output = API.portal.attacks.data.map((attack, i) => {
      const card_data = API.cards.attacks.findOne({'gsx$name': attack.gsx$name});
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/Attacks/'+attack.gsx$name}
          >
            <span>{attack.gsx$name}</span><br />
            <img className="thumb" src={API.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    return (<div className="entry attacks">
      <div className="left">
        <div className="title">Attacks<hr /></div>
        {output}
      </div>
      <div className="right">
        <Route path={`${this.props.match.url}/:card`} component={Attack} />
      </div>
    </div>);
  }
}
