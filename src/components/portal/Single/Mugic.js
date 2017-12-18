import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../../PageNotFound';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import UnderConstruction from '../../UnderConstruction';

@inject((stores, props, context) => props) @observer
export default class SingleMugic extends React.Component {

  // ** Process the tribe ** //
  // /portal/Mugic/{Tribe}/{Name}
  // /portal/{Tribe}/Mugic/{Name}
  // The first / gets counted
  render() {
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 5 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    //Handle both url layouts
    let tribe = (() => {
      if (path[2] === "Mugic") return path[3];
      if (path[3] === "Mugic") return path[2];
    })();

    let name = decodeURIComponent(path[4]);

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!store.tribes.includes(tribe)) {
      return (<span>Invalid Tribe: {tribe}</span>);
    }

    if (!store.cards.built.includes("mugic_cards")) {
      store.cards.setupMugic("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("mugic_portal")) {
      store.portal.setupMugic("portal");
      return (<span>Loading...</span>);
    }

    const mugic = store.portal.mugic.findOne({'gsx$name': name});
    const card_data = store.cards.mugic.findOne({'gsx$name': name});
    if (!mugic) {
      return(<PageNotFound location={this.props.location}/>);
    }

    let cost = [];
    for (let i = 0; i < card_data.gsx$cost; i++) {
      cost.push(<img key={i} className="icon" src={"/src/img/icons/mugic/"+tribe.toLowerCase()+".png"} alt="mugic counter"/>);
    }

    // TODO mugic splash art
    return (
      <div className={tribe.toLowerCase()}>
        <h1>{mugic.gsx$name}</h1>
        <img className="splash" src={store.base_image + card_data.gsx$splash}></img>
        <hr />
        <div>
          <strong>Background:</strong><br />
          {mugic.gsx$background}
        </div>
        <hr />
        <div>
          <strong>Details:</strong><br />
          {mugic.gsx$details}
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
          <strong>Tribe: </strong>
          <img className="icon" style={{width: "20px"}} src={"/src/img/icons/tribes/"+tribe.toLowerCase()+".png"}></img>{tribe}
        </div>
        <hr />
        <div>
          <strong>Cost: </strong>
          {cost}
        </div>
        <hr />
        <div>
          <strong>Ability:</strong><br />
          {card_data.gsx$ability}
        </div>
        <hr />
        <div>
          <strong>Flavortext:</strong><br />
          {card_data.gsx$flavortext}
        </div>
      </div>
    );
  }
}
