import React from 'react';
import {observable, observe} from "mobx";
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import loki from 'lokijs';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/style';

@inject((stores, props, context) => props) @observer
export default class PackSimulator extends React.Component {
  @observable loaded = false
  @observable cards = []
  @observable set = ""

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    for(let i = 0; i < 9; i++) {
      this.cards.push(<div key={i} className="card" style={{backgroundImage: `url("${API.base_image+API.card_back}")`}}></div>);
    }
  }

  render() {
    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (this.loaded == false) {
      API.buildCollection([{'cards': 'attacks'}, , {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => {
        this.setupDB();
        this.loaded = true;
      });
      return (<span>Loading...</span>);
    }

    let setsInput = [];
    for (const key in API.sets) {
      setsInput.push(<option key={key} value={key}>{API.sets[key]}</option>);
    }

    return (<div>
      <link rel="stylesheet" href="/src/css/packs.css" />
      <Interactive as={Link} {...s.link}
       to={`/EnterTheCode/`}>Enter The Code</Interactive>
      <br /><br />
      <form onSubmit={this.handleSubmit}>
        <select value={this.set} onChange={this.handleChange}>
          <option defaultValue="selected" hidden style={{fontStyle: 'italic'}}>Select a Set</option>
          {setsInput}
        </select>
        <br /><br />
        <input disabled={!this.set} type="submit" value="Open Pack" />
      </form>
      <br /><br />
      <div className="pack">{this.cards}</div>
    </div>);
  }

  handleChange(event) {
    this.set = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    let cards = [];

    const rarity = (() => {
      var randomNumber = Math.floor(Math.random() * 24) + 1;
      if (randomNumber == 24) return "Ultra Rare";
      else if (randomNumber % 3 == 0) return "Super Rare";
      else return "Rare";
    })();

    let key = 0;
    const card = (results) => {
      var id = Math.floor(Math.random() * results.length);
      let card = results[id];

      return (<div key={key++} className="card" style={{backgroundImage: `url("${API.base_image+(card.gsx$image||API.card_back)}")`}}></div>)
    }

    let pview = this.filter.addDynamicView('set');

    let i, results;

    // 4 Common
    pview.applyFind({'gsx$set': this.set})
      .applyFind({'gsx$rarity': 'Common'});
    results = pview.data();
    for (i=0;i<4;i++) {
      cards.push(card(results));
    }
    pview.removeFilters();

    // 3 Uncommon
    pview.applyFind({'gsx$set': this.set})
      .applyFind({'gsx$rarity': 'Uncommon'});
    results = pview.data();
    for (i=0;i<3;i++) {
      cards.push(card(results));
    }
    pview.removeFilters();

    // 1 Rare
    pview.applyFind({'gsx$set': this.set})
      .applyFind({'gsx$rarity': 'Rare'});
    results = pview.data();
    cards.push(card(results));
    pview.removeFilters();

    // 1 Rare, Super, Ultra
    pview.applyFind({'gsx$set': this.set})
      .applyFind({'gsx$rarity': rarity});
    results = pview.data();
    cards.push(card(results));

    this.filter.removeDynamicView('set');

    this.cards = cards;
  }

  setupDB() {
    let filter = (new loki("filter.db")).addCollection('filter');

    // Sort data descending alphabetically
    var pview = filter.addDynamicView('alphabetical');
    pview.applySimpleSort('gsx$name');

    let temp;

    temp = API.cards.attacks.find();
    temp.forEach((v) => delete v.$loki);
    filter.insert(temp);

    temp = API.cards.battlegear.find();
    temp.forEach((v) => delete v.$loki);
    filter.insert(temp);

    temp = API.cards.creatures.find();
    temp.forEach((v) => delete v.$loki);
    filter.insert(temp);

    temp = API.cards.locations.find();
    temp.forEach((v) => delete v.$loki);
    filter.insert(temp);

    temp = API.cards.mugic.find();
    temp.forEach((v) => delete v.$loki);
    filter.insert(temp);

    this.filter = filter;
  }

}
