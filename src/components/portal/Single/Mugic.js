import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import Single from './_base';
import {PageNotFound, Rarity, Unique, Name, Element, Mugic, Discipline, Ability, Tribe} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleMugic extends React.Component {

  // ** Process the tribe ** //
  // /portal/Mugic/{Tribe}/{Name}
  // /portal/{Tribe}/Mugic/{Name}
  // The first / gets counted
  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    const name = (() => {
      if (path.length >= 5) return decodeURIComponent(path[4]);
      if (path.length == 4) return decodeURIComponent(path[3]);
    })();

    const mugic = API.portal.mugic.findOne({'gsx$name': name});

    if (!mugic) {
      return(<PageNotFound location={this.props.location}/>);
    }

    const tribe = mugic.gsx$tribe;

    const card_data = API.cards.mugic.findOne({'gsx$name': name});

    let cost = [];
    if (card_data.gsx$cost == 0) {
      cost.push(<span key={0}>0</span>);
    }
    else if (card_data.gsx$cost.toLowerCase() == 'x') {
      cost.push(<span key={0}>X</span>);
    }
    else {
      for (let i = 0; i < card_data.gsx$cost; i++) {
        cost.push(<Mugic tribe={card_data.gsx$tribe} key={i} />);
      }
    }

    return (<Single 
      card={card_data}
      col0={<React.Fragment>
        <div>
          <strong>Tribe: </strong>
          <Tribe tribe={tribe} />
        </div>
        <hr />
        <div>
          <strong>Cost: </strong>
          {cost}
        </div>
      </React.Fragment>}
      col2={<React.Fragment>
        <div>
          <strong>Background:</strong><br />
          {mugic.gsx$background}
        </div>
        <hr />
        <div>
          <strong>Details:</strong><br />
          {mugic.gsx$details}
        </div>
      </React.Fragment>}
    />);
  }
}
