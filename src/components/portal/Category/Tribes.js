import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import loki from 'lokijs';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import Creature from '../Single/Creature';
import Mugic from '../Single/Mugic';

@inject((stores, props, context) => props) @observer
export default class Tribes extends React.Component {
  @observable loaded = false;

  constructor() {
    super();
    this.filter = new loki("filter.db");
  }

  // /{Tribe}
  // gives a brief summary and the option of "mugic" or "tribe"
  // to display the respective subcategories
  // -> /{Tribe}/Mugic || /{Tribe}/Creatures
  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    let tribe = path[2];

    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!API.tribes.includes(tribe)) {
      return(
        <div>
          <Interactive as={Link} {...s.link}
            to="/portal/Danian"
          >Danian</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/OverWorld"
          >OverWorld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/UnderWorld"
          >UnderWorld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Mipedian"
          >Mipedian</Interactive>
        </div>
      );
    }

    if (this.loaded == false) {
      API.buildCollection([{'cards': 'creatures'}, {'portal': 'creatures'}, {'cards': 'mugic'}, {'portal': 'mugic'}])
      .then(() => {
        this.loaded = true;
      });
      return (<span>Loading...</span>);
    }

    let filter = this.filter.addCollection('filter');
    var pview = filter.addDynamicView('filter');
    pview.applySimpleSort('gsx$name');

    let temp;

    temp = API.portal.creatures.find({'gsx$tribe': tribe});
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);

    temp = API.portal.mugic.find({'gsx$tribe': tribe});
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);

    let results = pview.data();
    this.filter.removeCollection('filter');

    const output = results.map((card, i) => {
      let card_data, url;

      if (card.gsx$type == "Mugic") {
        card_data = API.cards.mugic.findOne({'gsx$name': card.gsx$name});
        url = "/portal/" + tribe + "/Mugic/" + encodeURIComponent(card.gsx$name);
      }

      if (card.gsx$type == "Creatures") {
        card_data = API.cards.creatures.findOne({'gsx$name': card.gsx$name});
        url = "/portal/" + tribe + "/Creatures/" + encodeURIComponent(card.gsx$name);
      }

      return (<div key={i}>
        <Interactive as={Link} {...s.link} to={url}>
          <span>{card.gsx$name}</span><br />
          <img className="thumb" src={API.base_image + card_data.gsx$thumb} />
        </Interactive>
      </div>);
    });

    return (<div className="entry creatures">
      <div className="left">
        <div className="title">{path[2]}<hr /></div>
        {output}
      </div>
      <div className="right">
        <Route path={`${this.props.match.url}/Creatures/:card`} component={Creature} />
        <Route path={`${this.props.match.url}/Mugic/:card`} component={Mugic} />
      </div>
    </div>);
  }
}
