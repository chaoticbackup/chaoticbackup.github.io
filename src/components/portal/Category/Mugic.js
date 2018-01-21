import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import SingleMugic from '../Single/Mugic';

@inject((stores, props, context) => props) @observer
export default class Mugic extends React.Component {

  // ** Process the tribe ** //
  // /portal/Mugic/
  // /portal/{Tribe}/Mugic/
  // The first / gets counted
  render() {
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    let tribe = null;
    if (path.length >= 4) {
      if (path[2] === "Mugic") tribe = path[3];
      else if (path[3] === "Mugic") tribe = path[2];

      // If there isn't a supported tribe,
      // Displays list of tribes
      if (!store.tribes.includes(tribe)) {
        return(
          <div>
            <Interactive as={Link} {...s.link}
              to="/portal/Mugic/Generic"
              >Generic</Interactive>
            <br />
            <Interactive as={Link} {...s.link}
              to="/portal/Mugic/Danian"
            >Danian</Interactive>
            <br />
            <Interactive as={Link} {...s.link}
              to="/portal/Mugic/Mipedian"
            >Mipedian</Interactive>
            <br />
            <Interactive as={Link} {...s.link}
              to="/portal/Mugic/OverWorld"
            >OverWorld</Interactive>
            <br />
            <Interactive as={Link} {...s.link}
              to="/portal/Mugic/UnderWorld"
            >UnderWorld</Interactive>
          </div>
        );
      }
    }

    if (!store.cards.built.includes("mugic_cards")) {
      store.cards.setupMugic("cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("mugic_portal")) {
      store.portal.setupMugic("portal");
      return (<span>Loading...</span>);
    }

    const mugic = (() => {
      if (path.length >= 4 && path[3] === "Mugic") {
        return store.portal.mugic.find({'gsx$tribe': tribe});
      }
      else {
        return store.portal.mugic.chain().simplesort('gsx$name').data();
      }
    })();

    const output = mugic.map((single_mugic, i) => {
      const card_data = store.cards.mugic.findOne({'gsx$name': single_mugic.gsx$name});

      let url = (() => {
        if (path[2] === "Mugic")
          return "/portal/Mugic/"+single_mugic.gsx$tribe+"/"+encodeURIComponent(single_mugic.gsx$name);
        else if (path[3] === "Mugic")
          return "/portal/"+single_mugic.gsx$tribe+"/Mugic/"+encodeURIComponent(single_mugic.gsx$name);
      })();

      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={url}
          >
            <span>{single_mugic.gsx$name}</span><br />
            <img className="thumb" src={store.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    const tribes = ["Danian", "Mipedian", "OverWorld", "UnderWorld"].map((tribe, i) => (
      <Route key={i} path={`${this.props.match.url}/${tribe}/:card`} component={SingleMugic} />
    ));

    return (<div className="entry mugic">
      <div className="left">
        <div className="title">{path[2]}<hr /></div>
        {output}
      </div>
      <div className="right">
        {tribes}
      </div>
    </div>);
  }
}
