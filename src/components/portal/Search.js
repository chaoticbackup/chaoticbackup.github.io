import React from 'react';
import Interactive from 'react-interactive';
import {Link} from 'react-router-dom';
import API from '../SpreadsheetData';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import loki from 'lokijs';
import s from '../../styles/app.style';
import {SearchButton} from '../Snippets';

@inject((stores, props, context) => props) @observer
export default class SearchPortal extends React.Component {
  @observable input;
  @observable query;

  constructor(props) {
    super(props);
    // this.search = this.search.bind(this);
    this.query = this.input = decodeURIComponent(this.props.location.search.substr(1));
  }

  render() {
  return (<div className="search">
    <form onSubmit={this.search}>
      <input type="text" value={this.query} onChange={(e) => this.query = e.target.value} />
      <button type="submit"><SearchButton /></button>
    </form>
    <DBSearch string={this.input}/>
  </div>);
  }

  search = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.history.push('/portal/Search/?'+encodeURIComponent(this.query));
    this.input = this.query;
  }
}

@inject((stores, props, context) => props) @observer
class DBSearch extends React.Component {
  @observable loaded = false;

  constructor() {
    super();
    this.filter = new loki("filter.db");
  }

  render() {
    if (this.loaded == false) {
      API.LoadDB([{'portal': 'attacks'}, {'portal': 'battlegear'}, {'portal': 'creatures'}, {'portal': 'locations'}, {'portal': 'mugic'}])
      .then(() => {
        this.loaded = true;
      });
      return (<span>Loading...</span>);
    }

    let string = this.props.string;

    // No search
    if (string == "") {
      return (<div style={{minHeight: '50px'}}></div>);
    }

    let filter = this.filter.addCollection('filter');
    var pview = filter.addDynamicView('filter');
    pview.applySimpleSort('gsx$name');

    let attackResults = API.portal.attacks.chain();
    let battlegearResults = API.portal.battlegear.chain();
    let creatureResults = API.portal.creatures.chain();
    let locationResults = API.portal.locations.chain();
    let mugicResults = API.portal.mugic.chain();

    // Attributes   Background  Details
    attackResults = attackResults.find({'$or': [
      {'gsx$attributes': {'$regex': new RegExp(string, 'i')}},
      {'gsx$background': {'$regex': new RegExp(string, 'i')}},
      {'gsx$details': {'$regex': new RegExp(string, 'i')}}
    ]});

    // Attributes   Background  Details
    battlegearResults = battlegearResults.find({'$or': [
      {'gsx$attributes': {'$regex': new RegExp(string, 'i')}},
      {'gsx$background': {'$regex': new RegExp(string, 'i')}},
      {'gsx$details': {'$regex': new RegExp(string, 'i')}}
    ]});
    // Appearance   Background  Special Abilities   Details
    creatureResults = creatureResults.find({'$or': [
      {'gsx$appearance': {'$regex': new RegExp(string, 'i')}},
      {'gsx$background': {'$regex': new RegExp(string, 'i')}},
      {'gsx$specialabilities': {'$regex': new RegExp(string, 'i')}},
      {'gsx$details': {'$regex': new RegExp(string, 'i')}}
    ]});
    // Local Features   Background  Details
    locationResults = locationResults.find({'$or': [
      {'gsx$localfeatures': {'$regex': new RegExp(string, 'i')}},
      {'gsx$background': {'$regex': new RegExp(string, 'i')}},
      {'gsx$details': {'$regex': new RegExp(string, 'i')}}
    ]});
    // Background   Details
    mugicResults = mugicResults.find({'$or': [
      {'gsx$background': {'$regex': new RegExp(string, 'i')}},
      {'gsx$details': {'$regex': new RegExp(string, 'i')}}
    ]});

    let temp;

    temp = attackResults.data();
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);

    temp = battlegearResults.data();
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);

    temp = creatureResults.data();
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);

    temp = locationResults.data();
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);

    temp = mugicResults.data();
    temp.forEach(function(v){ delete v.$loki });
    filter.insert(temp);

    let results = pview.data();
    this.filter.removeCollection('filter');

    let makeLink = (card, i) => {
      let link = "/portal";

      switch (card.gsx$type) {
      case "Attacks":
        link += '/Attacks/' + card.gsx$name;
        break;
      case "Battlegear":
        link += '/Battlegear/' + card.gsx$name;
        break;
      case "Creatures":
        link += '/Creatures/' + card.gsx$name;
        break;
      case "Locations":
        link += '/Locations/' + card.gsx$name;
        break;
      case "Mugic":
        link += '/Mugic/' + card.gsx$name;
        break;
      }

      return (<div key={i}><Interactive as={Link} {...s.link} to={link}>
        {card.gsx$name}
      </Interactive><br /></div>);
    };

    let content = results.map(makeLink);

    // This prioritizes names in the results
    attackResults = API.portal.attacks.find({'gsx$name': {'$regex': new RegExp(string, 'i')}});
    battlegearResults = API.portal.battlegear.find({'gsx$name': {'$regex': new RegExp(string, 'i')}});
    creatureResults = API.portal.creatures.find({'gsx$name': {'$regex': new RegExp(string, 'i')}});
    locationResults = API.portal.locations.find({'gsx$name': {'$regex': new RegExp(string, 'i')}});
    mugicResults = API.portal.mugic.find({'gsx$name': {'$regex': new RegExp(string, 'i')}});

    let names = [].concat(attackResults, battlegearResults, creatureResults, locationResults, mugicResults).map(makeLink);

    if (results.length == 0) {
      content = (<div>No Results Found</div>);
    }

    return (<div className="results">
      <br />
      {names}
      <hr />
      <div>Results containing {string}:</div>
      {content}
    </div>);
  }
}
