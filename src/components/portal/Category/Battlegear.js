import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Battlegear extends React.Component {

    render() {
      const store = API;

      let path = this.props.location.pathname.split("/");
      if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

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

      const battlegear = store.portal.battlegear.data;

      const output = battlegear.map((single_battlegear, i) => {
        const card_data = store.cards.battlegear.findOne({'gsx$name': single_battlegear.gsx$name});
        return (
          <div key={i}>
            <Interactive as={Link} {...s.link}
              to={'/portal/Battlegear/'+single_battlegear.gsx$name}
            >
              <span>{single_battlegear.gsx$name}</span><br />
              <img className="thumb" src={store.base_image + card_data.gsx$thumb}></img>
            </Interactive>
          </div>
        );
      });

      return (<div className="entry battlegear">
        <div className="left">
          <div className="title">Battlegear<hr /></div>
          {output}
        </div>
        <div className="right">
          {this.props.children}
        </div>
      </div>);
    }
}
