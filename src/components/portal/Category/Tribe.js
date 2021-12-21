import loki from 'lokijs';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { Loading } from '../../Snippets';
import API from '../../SpreadsheetData';
import Creature from '../Single/Creature';
import Mugic from '../Single/Mugic';
import { sortCardName, thumb_link } from './common';

@inject((stores, props, context) => props) @observer
export default class Tribes extends React.Component {
  @observable loaded = false;
  @observable loading = false;

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
      if (this.loading == false) {
        this.loading = true;
        API.LoadDB([{ 'cards': 'creatures' }, { 'portal': 'creatures' }, { 'cards': 'mugic' }, { 'portal': 'mugic' }])
        .then(() => {
          this.loaded = true;
          this.loading = false;
        })
        .catch(() => {});
      }
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
        <div className="cat_title">{tribe}</div>
        <div className="entry_nav">{bottom_nav}</div>
      </div>);
    }

    return (<div className="entry tribe">
      <div className="entry_content">
        <Routes>
          <Route path={`Creatures/:card`} element={<Creature {...this.props} />} />
          <Route path={`Mugic/:card`} element={<Mugic {...this.props} />} />
        </Routes>
      </div>
      <div className="cat_title"><Link to={`/portal/${tribe}`}>{tribe}</Link></div>
      <div className="entry_nav">{bottom_nav}</div>
    </div>);
  }
}
