import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import loki from 'lokijs';
import Collapsible from 'react-collapsible';
import API from '../SpreadsheetData';

@inject((stores, props, context) => props) @observer
export default class SearchCollection extends React.Component {
  @observable loaded = false;
  @observable input;

  constructor(props) {
    super(props);
    this.filter = new loki("filter.db");

    // Binding for keeping scope with dom functions
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);

    this.props.handleContent([{'text': 'Loading...'}]);
    this.cleanInput();
    this.parseQuery();
  }

  cleanInput() {
    let input = {
      name: "",
      text: "",
      subtype: "",
      sets: {},
      types: {attack: false, battlegear: false, creature: false, location: false, mugic: false},
      rarity: {common: false, uncommon: false, rare: false, 'super rare': false, 'ultra rare': false, promo: false},
      tribes: {danian: false, generic: false, 'm\'arrillian': false, 'mipedian': false, overworld: false, underworld: false, frozen: false},
      elements: {fire: false, air: false, earth: false, water: false},
      disciplines: {courage: false, power: false, wisdom: false, speed: false},
      energy: {min: 0, max: 0},
      mcbp: {min: 0, max: 0},
      mull: {unique: false, loyal: false, legendary: false, mixed: false},
      gender: {ambiguous: false, female: false, male: false}
    };
    for (const key in API.sets) input.sets[key.toLowerCase()] = false;

    this.input = input;
  }

  parseQuery() {
    const queryString = this.props.location.search.toLowerCase();

    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    let update = (d) => {
      if (query[d]) {
        query[d].split(',').map(item => {
          this.input[d][item] = true;
        });
      }
    }

    update("sets");
    update("types");
    update("rarity");
    update("gender");
    update("mull");
  }

  async updateQuery() {
    console.log(this.input); //TODO

    let queryString = "";
    // encodeURIComponent

    let update = (query) => {
      let temp = "";
      Object.keys(this.input[query]).forEach((item) => {
        if (this.input[query][item] == true) temp += item + ",";
      });
      if (temp.length > 0) return query + "=" + temp.replace(/\,$/, '&');
      else return "";
    }

    queryString += update("sets");
    queryString += update("types");
    queryString += update("rarity");
    queryString += update("gender");
    queryString += update("mull");
    
    // Strip trailing &
    queryString = queryString.replace(/\&$/, '');

    this.props.history.push('/collection/?'+(queryString));
  }

  render() {
    if (this.loaded == false) {
      if (API.urls !== null &&
        API.portal !== null &&
        API.cards !== null
      ) {
        API.buildCollection([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
        .then(() => {
          this.loaded = true;
          this.search();
        });
      }
      return (<span>Loading...</span>);
    }

    let gen = (d, display) => {
      let tmp = [];
      Object.keys(this.input[d]).forEach((item, i) => {
        tmp.push(<label style={{display: 'block'}} key={i}><input type="checkbox" name={item} checked={this.input[d][item]} onChange={e => this.handleChange(e, d)} />{display(item)}</label>
        );
      });
      return tmp;
    }

    let sets = gen("sets", (item) => {
      return API.sets[item.toUpperCase()];
    });

    let types = gen("types", (item) => {
      return item.charAt(0).toUpperCase()+item.slice(1);
    });

    let rarity = gen("rarity", (item) => {
      return item.split(" ").map(st => {return st.charAt(0).toUpperCase()+st.slice(1)}).join(" ");
    });

    let gender = gen("gender", (item) => {
      return item.charAt(0).toUpperCase()+item.slice(1);
    });

    let tribes = [];

    let elements = [];

    let disciplines = [];

    let mull = (<div>
      <label><input type="checkbox" name="unique" checked={this.input.mull.unique} onChange={e => this.handleChange(e, "mull")} />Unique</label>&nbsp;
      <label><input type="checkbox" name="loyal" checked={this.input.mull.loyal} onChange={e => this.handleChange(e, "mull")} />Loyal</label>&nbsp;
      <label><input type="checkbox" name="legendary" checked={this.input.mull.legendary} onChange={e => this.handleChange(e, "mull")} />Legendary</label>
      <br />
      <label><input type="checkbox" name="mixed" checked={this.input.mull.mixed} onChange={e => this.handleChange(e, "mull")} />Non-Loyal</label>
    </div>);
    

    return (
      <div className="SearchForm">
        <form onSubmit={this.search}>
          {/*<br />
          <label>Name <input type="text" ref={(input) => this.stones.name = input} /></label>
          <br />
          <label>Text &nbsp;&nbsp;&nbsp;<input type="text" ref={(input) => this.stones.text = input} /></label>
          <br />
          <div>
            <label>Subtypes | Initiative<br />
              <input type="text" ref={(input) => this.stones.subtypes = input} />
            </label><br />
            <label><input type="checkbox" ref={(input) => this.stones.past = input}/>Past</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.stones.mirage = input}/>Mirage</label>
          </div>*/}
          <br />
          {tribes}
          <br />
          {elements}
          <br />
          {disciplines}
          <br />
          {/*<div>
            <span>Energy</span><br />
            <label>Min: <input type="text" style={{width: '30px'}} ref={(input) => this.energy.min = input} /></label>&nbsp;
            <label>Max: <input type="text" style={{width: '30px'}} ref={(input) => this.energy.max = input} /></label>
          </div>
          <br />
          <div>
            <span>Mugic Counters/Cost
            <br />Build Points</span><br />
            <label>Min: <input type="text" style={{width: '30px'}} ref={(input) => this.mc.min = input} /></label>&nbsp;
            <label>Max: <input type="text" style={{width: '30px'}} ref={(input) => this.mc.max = input} /></label>
          </div>*/}
          {mull}<br />
          <Collapsible trigger="Types">{types}</Collapsible>
          <Collapsible trigger="Rarity">{rarity}</Collapsible>
          <Collapsible trigger="Sets">{sets}</Collapsible>
          <Collapsible trigger="Gender (fan content)">{gender}</Collapsible>
          <br />
          <input type="submit" value="Search" />&nbsp;&nbsp;
          <input type="button" value="Reset" onClick={this.reset} />
        </form>
      </div>
    );
  }

  handleChange = (event, obj) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.input[obj][name] = value;
  }

  reset = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.history.push('/collection/');
    this.cleanInput();
  }

  search = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      this.updateQuery();
    }

    // Sort data descending alphabetically
    let filter = this.filter.addCollection('filter');
    var pview = filter.addDynamicView('filter');
    pview.applySimpleSort('gsx$name');

    // begin data filtering
    let attackResults = API.cards.attacks.chain();
    let battlegearResults = API.cards.battlegear.chain();
    let creatureResults = API.cards.creatures.chain();
    let locationResults = API.cards.locations.chain();
    let mugicResults = API.cards.mugic.chain();

    if (this.input.mull.unique) {
      attackResults = attackResults.find({'gsx$unique': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$unique': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$unique': {'$gt': 0}});
      locationResults = locationResults.find({'gsx$unique': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$unique': {'$gt': 0}});
    }

    if (this.input.mull.loyal) {
      attackResults = attackResults.limit(0);
      battlegearResults = battlegearResults.find({'gsx$loyal': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$loyal': {'$gt': 0}});
      mugicResults = mugicResults.limit(0);
      locationResults = locationResults.limit(0);
    }

    if (this.input.mull.mixed) {
      attackResults = attackResults.limit(0);
      creatureResults = creatureResults.find({'gsx$loyal': {'$lte': 0}});
      battlegearResults = battlegearResults.find({'gsx$loyal': {'$lte': 0}});
      mugicResults = mugicResults.limit(0);
      locationResults = locationResults.limit(0);
    }

    if (this.input.mull.legendary) {
      attackResults = attackResults.find({'gsx$legendary': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$legendary': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$legendary': {'$gt': 0}});
      locationResults = locationResults.find({'gsx$legendary': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$legendary': {'$gt': 0}});
    }

    let setsList = [];
    for (const key in this.input.sets) {
      if (this.input.sets[key])
        setsList.push({'$eq': key.toUpperCase()});
    }
    if (setsList.length > 0) {
      attackResults = attackResults.find({'gsx$set': {'$or': setsList} });
      battlegearResults = battlegearResults.find({'gsx$set': {'$or': setsList} });
      creatureResults = creatureResults.find({'gsx$set': {'$or': setsList} });
      locationResults  = locationResults.find({'gsx$set': {'$or': setsList} });
      mugicResults = mugicResults.find({'gsx$set': {'$or': setsList} });
    }

    let rarityList = [];
    for (const key in this.input.rarity) {
      if (this.input.rarity[key])
        rarityList.push({'$eq': key.split(" ").map(st => {return st.charAt(0).toUpperCase()+st.slice(1)}).join(" ")});
    }
    if (rarityList.length > 0) {
      attackResults = attackResults.find({'gsx$rarity': {'$or': rarityList} });
      battlegearResults = battlegearResults.find({'gsx$rarity': {'$or': rarityList} });
      creatureResults = creatureResults.find({'gsx$rarity': {'$or': rarityList} });
      locationResults = locationResults.find({'gsx$rarity': {'$or': rarityList} });
      mugicResults = mugicResults.find({'gsx$rarity': {'$or': rarityList} });
    }

    let genderList = [];
    for (const key in this.input.gender) {
      if (this.input.gender[key]) {
        genderList.push({'$regex': new RegExp(key, 'i')})
      }
    }
    if (genderList.length > 0) {
      attackResults = attackResults.limit(0);
      battlegearResults = battlegearResults.limit(0);
      creatureResults = creatureResults.find({'gsx$gender': {'$or': genderList} });
      locationResults = locationResults.limit(0);
      mugicResults = mugicResults.limit(0);
    }

    // Merge data
    let types = !(this.input.types.attack | this.input.types.battlegear | this.input.types.creature | this.input.types.location | this.input.types.mugic);

    if (types || this.input.types.attack) {
      let temp = attackResults.data();
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (types || this.input.types.battlegear) {
      let temp = battlegearResults.data();
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (types || this.input.types.creature) {
      let temp = creatureResults.data()
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (types || this.input.types.location) {
      let temp = locationResults.data()
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (types || this.input.types.mugic) {
      let temp = mugicResults.data()
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }

    let results = pview.data();
    this.filter.removeCollection('filter');

    if (results.length > 0) this.props.handleContent(results);
    else this.props.handleContent([{'text': 'No Results Found'}]);
  }

}
