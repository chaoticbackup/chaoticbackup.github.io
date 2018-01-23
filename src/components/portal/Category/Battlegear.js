import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import SingleBattlegear from '../Single/Battlegear';

@inject((stores, props, context) => props) @observer
export default class Battlegear extends React.Component {

    render() {


      let path = this.props.location.pathname.split("/");
      if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

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

      const battlegear = API.portal.battlegear.data;

      const output = battlegear.map((single_battlegear, i) => {
        const card_data = API.cards.battlegear.findOne({'gsx$name': single_battlegear.gsx$name});
        return (
          <div key={i}>
            <Interactive as={Link} {...s.link}
              to={'/portal/Battlegear/'+single_battlegear.gsx$name}
            >
              <span>{single_battlegear.gsx$name}</span><br />
              <img className="thumb" src={API.base_image + card_data.gsx$thumb}></img>
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
          <Route path={`${this.props.match.url}/:card`} component={SingleBattlegear} />
        </div>
      </div>);
    }
}
