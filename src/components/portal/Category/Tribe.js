import loki from 'lokijs';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router-dom';

import { Loading } from '../../Snippets';
import API from '../../SpreadsheetData';
import Creature from '../Single/Creature';
import Mugic from '../Single/Mugic';
import { sortCardName, thumb_link } from './common';

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
    if (this.loaded == false) {
      API.LoadDB([{ 'cards': 'creatures' }, { 'portal': 'creatures' }, { 'cards': 'mugic' }, { 'portal': 'mugic' }])
      .then(() => {
        this.loaded = true;
      })
      .catch(() => {});
      return (<Loading />);
    }

    const path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    const tribe = path[2];

    const filter = this.filter.addCollection('filter');
    var pview = filter.addDynamicView('filter');

    let temp;
    temp = API.portal.creatures.find({ 'gsx$tribe': tribe });
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);

    temp = API.portal.mugic.find({ 'gsx$tribe': tribe });
    temp.forEach((v) => { delete v.$loki });
    filter.insert(temp);

    const results = pview.data();
    this.filter.removeCollection('filter');

    const bottom_nav = results
    .sort(sortCardName)
    .map((card, i) => {
      let url;
      if (card.gsx$type == "Mugic") {
        url = "/portal/" + tribe + "/Mugic/" + encodeURIComponent(card.gsx$name);
      }
      else if (card.gsx$type == "Creatures") {
        url = "/portal/" + tribe + "/Creatures/" + encodeURIComponent(card.gsx$name);
      }
      return thumb_link(card, i, url);
    });

    const base_path = (path.length > 4) ? false : true;

    if (base_path) {
      return (<div className="entry tribe base_path">
        <div className="cat_title">{path[2]}</div>
        <div className="entry_nav">{bottom_nav}</div>
      </div>);
    }

    return (<div className="entry tribe">
      <div className="entry_content">
        <Route path={`${this.props.match.url}/Creatures/:card`} component={Creature} />
        <Route path={`${this.props.match.url}/Mugic/:card`} component={Mugic} />
      </div>
      <div className="cat_title">{path[2]}</div>
      <div className="entry_nav">{bottom_nav}</div>
    </div>);
  }
}
