import React from 'react';
import {observable, observe} from "mobx";
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import loki from 'lokijs';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import {Loading} from '../Snippets';
import s from '../../styles/style';
import './packs.scss';

@inject((stores, props, context) => props) @observer
export default class PackSimulator extends React.Component {
  @observable loaded = false
  @observable cards = []
  @observable set = ""
  @observable packs = 1

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    for(let i = 0; i < 9; i++) {
      this.cards.push(<div key={i} className="card" style={{backgroundImage: `url("${API.base_image+API.card_back}")`}}></div>);
    }
  }

  render() {
    if (this.loaded == false) {
      API.LoadDB([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => {
        this.setupDB();
        this.loaded = true;
      });
      return (<Loading />);
    }

    let setsInput = [];
    let i = 1;
    for (const set in API.sets) {
      setsInput.push(<option key={i++} value={set}>{API.sets[set]}</option>);
      if (i>9) break;
    }

    return (<div className="packsim">
      <Interactive as={Link} {...s.link}
       to={`/EnterTheCode/`}>Enter The Code</Interactive>
      <br /><br />
      <form onSubmit={this.handleSubmit}>
        <label>Packs:
          <input name="packs" type="number"
            value={this.packs}
            min="1" max="24"
            style={{width: "32px", padding: '0px'}}
            onChange={(e) => {if(e.target.value>24) e.target.value=24; this.handleChange(e)}} />
        </label>
        <select name="set" value={this.set} onChange={this.handleChange}>
          <option defaultValue="selected" hidden style={{fontStyle: 'italic'}}>Select a Set</option>
          {setsInput}
        </select>
        <br /><br />
        <input disabled={!this.set} type="submit" value="Open Packs" />
      </form>
      <br /><br />
      <div className="pack">{this.cards}</div>
    </div>);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this[name] = value;
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    let cards = []; // Returned list of card divs
    let card_names = []; // Prevent duplicates in pack
    let key = 0; // React key iterator uniqueness

    let pview = this.filter.addDynamicView('set');

    const randomRare = () => {
      let randomNumber = Math.floor(Math.random() * 24) + 1;
      if (randomNumber == 24) return "Ultra Rare";
      else if (randomNumber % 3 == 0) return "Super Rare";
      else return "Rare";
    };

    const gendisp = (avg) => {
      let min = parseInt(avg) - 10;
      if (min < 0) min = 0;
      return (Math.floor(Math.random() * 5)) * 5 + min;
    }
    const geneng = (avg) => {
      let min = parseInt(avg) - 5;
      if (min < 0) min = 0;
      return (Math.floor(Math.random() * 3)) * 5 + min;
    }

    const gencard = (results, i) => {
      let id = Math.floor(Math.random() * results.length);
      let card = results[id];

      if (!card) {
        cards.push(<div key={i} className="card" style={{backgroundImage: `url("${API.base_image+API.card_back}")`}}></div>);
        return;
      }

      if (card_names.indexOf(card.gsx$name) > -1) {
        return gencard(results, i);
      }
      card_names.push(card.gsx$name);

      if (card.gsx$type != "Creatures") {
        cards.push(<div key={key++} className="card" style={{backgroundImage: `url("${API.base_image + (card.gsx$image||API.card_back)}")`}}></div>);
      }
      else {
        const courage = gendisp(card.gsx$courage);
        const power = gendisp(card.gsx$power);
        const wisdom = gendisp(card.gsx$wisdom);
        const speed = gendisp(card.gsx$speed);
        const energy = geneng(card.gsx$energy);
        cards.push(<div key={key++} className="card" style={{backgroundImage: `url("${API.base_image + (card.gsx$image||API.card_back)}")`}}>
          <div className="stats">
            <span key="courage">{courage}</span>
            <span key="power">{power}</span>
            <span key="wisdom">{wisdom}</span>
            <span key="speed">{speed}</span>
            <span key="energy">{energy}</span>
          </div>
        </div>);
      }

    }

    const genrarity = (rarity, num) => {
      pview.applyFind({'gsx$set': this.set})
        .applyFind({'gsx$rarity': rarity});
      let results = pview.data();
      for (let i=0; i<num; i++) gencard(results, i);
      pview.removeFilters();
    }

    // AU sets have 6 common and 3 rare+
    // DOP to FUN had 4 common, 3 uncommon, 2 rare+
    let newSets = ["AU", "FAS"];

    for (let i = 0; i < this.packs; i++) {
      // Before AU sets
      if (newSets.indexOf(this.set) == -1) {
        genrarity('Common', 4);
        genrarity('Uncommon', 3);
        genrarity('Rare', 1);
        genrarity(randomRare(), 1);
      }
      // AU sets and after
      else {
        genrarity('Common', 6);
        genrarity('Rare', 2);
        genrarity(randomRare(), 1);
      }

      card_names = [];
    }

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
