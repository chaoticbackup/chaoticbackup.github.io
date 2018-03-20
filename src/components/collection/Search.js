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
    this.props.handleContent([{'text': 'Loading...'}]);
    const queryString = this.props.location.search.toLowerCase();

    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    console.log(query); // TODO

    if (query.sets) {
      query.sets.split(',').map(item => {
        this.input.sets[item] = true;
      });
    }

    if (query.types) {
      query.types.split(',').map(item => {
        this.input.types[item] = true;
      });
    }

    console.log(this.input);
  }

  updateQuery() {
    console.log(this.input);
    let queryString = "";
    let temp;

    // Sets
    temp = "";
    Object.keys(this.input.sets).forEach((item) => {
      if (this.input.sets[item] == true)
        temp += item + ",";
    });
    if (temp.length > 0) {
      queryString += "sets=" + temp.replace(/\,$/, '&');
    }

    // Types
    temp = "";
    Object.keys(this.input.types).forEach((item) => {
      if (this.input.types[item] == true)
        temp += item + ",";
    });
    if (temp.length > 0) {
      queryString += "types=" + temp.replace(/\,$/, '&');
    }

    // encodeURIComponent
    
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

    let sets = [];
    Object.keys(this.input.sets).forEach((item, i) => {
      sets.push(<label style={{display: 'block'}} key={i}><input type="checkbox" name={item} checked={this.input.sets[item]} onChange={e => this.handleChange(e, "sets")} />{API.sets[item.toUpperCase()]}</label>
      );
    });

    let types = [];
    Object.keys(this.input.types).forEach((item, i) => {
      types.push(<label style={{display: 'block'}} key={i}><input type="checkbox" name={item} checked={this.input.types[item]} onChange={e => this.handleChange(e, "types")} />{item.charAt(0).toUpperCase()+item.slice(1)}</label>)
    });

    let rarity = [];

    let gender = [];

    return (
      <div className="SearchForm">
        <form onSubmit={this.search}>
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
