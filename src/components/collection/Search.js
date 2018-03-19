import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import loki from 'lokijs';
import Collapsible from 'react-collapsible';
import API from '../SpreadsheetData';

@inject((stores, props, context) => props) @observer
export default class SearchCollection extends React.Component {
  @observable loaded = false;
  @observable input = {};

  constructor(props) {
    super(props);
    this.filter = new loki("filter.db");

    // Binding for keeping scope
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);

    this.parseQuery();
  }

  componentDidMount() {
    // this.search();
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

    console.log(query);

    if (query.sets) {
      query.sets.split(',').map(item => {
        this.input[item.toUpperCase()] = true;
      });
    }

  }

  updateQuery() {
    let query = {sets:[]};

    Object.keys(this.input).forEach((key) => {
      if (key in API.sets) query.sets.push(key);
    });

    let queryString = "";

    // Sets
    if (query.sets.length > 0) {
      queryString += "sets=";
      query.sets.forEach(item => {
        queryString += item.toLowerCase();
      });
      queryString += "&";
    }

    // encodeURIComponent
    
    // Strip trailing &
    queryString = queryString.replace(/\&$/, '');

    this.props.history.push('/collection/?'+(queryString));
  }

  reset(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.history.push('/collection/');
    Object.keys(this.input).forEach((key) => {
      (typeof(this.input[key]) === 'boolean' ? this.input[key] = false : this.input[key] = '');
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.input[name] = value;

    console.log(this.input);
  }

  render() {
    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (this.loaded == false) {
      API.buildCollection([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => {
        this.loaded = true;
        this.search();
      });
      return (<span>Loading...</span>);
    }

    let setsInput = [];
    for (const key in API.sets) {
      setsInput.push(<label style={{display: 'block'}} key={key}><input name={key} checked={this.input[key]} type="checkbox" onChange={this.handleChange} />{API.sets[key]}</label>);
    }

    return (
      <div className="SearchForm">
        <form onSubmit={this.search}>
          <Collapsible trigger="Sets">{setsInput}</Collapsible>
          <br />
          <input type="submit" value="Search" />&nbsp;&nbsp;
          <input type="button" value="Reset" onClick={this.reset} />
        </form>
      </div>
    );
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

    // Merge data
    // let types = !(this.type.Attack.checked | this.type.Battlegear.checked | this.type.Creature.checked | this.type.Location.checked | this.type.Mugic.checked);

    // if (types || this.type.Attack.checked) {
    //   let temp = attackResults.data();
    //   temp.forEach(function(v){ delete v.$loki });
    //   filter.insert(temp);
    // }
    // if (types || this.type.Battlegear.checked) {
    //   let temp = battlegearResults.data();
    //   temp.forEach(function(v){ delete v.$loki });
    //   filter.insert(temp);
    // }
    // if (types || this.type.Creature.checked) {
    //   let temp = creatureResults.data()
    //   temp.forEach(function(v){ delete v.$loki });
    //   filter.insert(temp);
    // }
    // if (types || this.type.Location.checked) {
    //   let temp = locationResults.data()
    //   temp.forEach(function(v){ delete v.$loki });
    //   filter.insert(temp);
    // }
    // if (types || this.type.Mugic.checked) {
    //   let temp = mugicResults.data()
    //   temp.forEach(function(v){ delete v.$loki });
    //   filter.insert(temp);
    // }

    let results = pview.data();
    this.filter.removeCollection('filter');

    if (results.length > 0) this.props.handleContent(results);
    else this.props.handleContent([{'text': 'No Results Found'}]);
  }

}
