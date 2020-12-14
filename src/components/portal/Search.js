import React from 'react';
import API from '../SpreadsheetData';
import { observable } from "mobx";
import { observer, inject } from 'mobx-react';
import loki from 'lokijs';
import { SearchButton } from '../Snippets';
import { sortCardName, text_link, thumb_link } from './Category/common.tsx';

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
        <input type="text" value={this.query} autoFocus onChange={(e) => this.query = e.target.value} />
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
      API.LoadDB([
        { 'portal': 'attacks' }, { 'portal': 'battlegear' }, { 'portal': 'creatures' }, { 'portal': 'locations' }, { 'portal': 'mugic' },
        { 'cards': 'attacks' }, { 'cards': 'battlegear' }, { 'cards': 'creatures' }, { 'cards': 'locations' }, { 'cards': 'mugic' }
      ]).then(() => {
        this.loaded = true;
      })
      .catch(() => {});
      return (<span>Loading...</span>);
    }

    const { string } = this.props;

    // No search
    if (string == "") {
      return (<div style={{ minHeight: '50px' }}></div>);
    }

    const filter = this.filter.addCollection('filter');
    var pview = filter.addDynamicView('filter');
    pview.applySimpleSort('gsx$name');

    let attackResults = API.portal.attacks.chain();
    let battlegearResults = API.portal.battlegear.chain();
    let creatureResults = API.portal.creatures.chain();
    let locationResults = API.portal.locations.chain();
    let mugicResults = API.portal.mugic.chain();

    // Attributes   Background  Details
    attackResults = attackResults.find({ '$or': [
      { 'gsx$attributes': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$background': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$details': { '$regex': new RegExp(string, 'i') }}
    ]});

    // Attributes   Background  Details
    battlegearResults = battlegearResults.find({ '$or': [
      { 'gsx$attributes': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$background': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$details': { '$regex': new RegExp(string, 'i') }}
    ]});
    // Appearance   Background  Special Abilities   Details
    creatureResults = creatureResults.find({ '$or': [
      { 'gsx$appearance': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$background': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$specialabilities': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$details': { '$regex': new RegExp(string, 'i') }}
    ]});
    // Local Features   Background  Details
    locationResults = locationResults.find({ '$or': [
      { 'gsx$localfeatures': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$background': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$details': { '$regex': new RegExp(string, 'i') }}
    ]});
    // Background   Details
    mugicResults = mugicResults.find({ '$or': [
      { 'gsx$background': { '$regex': new RegExp(string, 'i') }},
      { 'gsx$details': { '$regex': new RegExp(string, 'i') }}
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

    let content = pview.data().map((val, i) => text_link(val, i));
    this.filter.removeCollection('filter');

    let header;

    // This prioritizes names in the results
    const names = [].concat(
      API.portal.attacks.find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }}),
      API.portal.battlegear.find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }}),
      API.portal.creatures.find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }}),
      API.portal.locations.find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }}),
      API.portal.mugic.find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }}),
      API.cards.attacks.chain()
        .find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }})
        .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
      API.cards.battlegear.chain()
        .find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }})
        .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
      API.cards.creatures.chain()
        .find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }})
        .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
      API.cards.locations.chain()
        .find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }})
        .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
      API.cards.mugic.chain()
        .find({ 'gsx$name': { '$regex': new RegExp(string, 'i') }})
        .where((obj) => {return (obj.gsx$splash != ('') )}).data()
    )
    .sort(sortCardName)
    // dedupe fullart results
    .filter((val, i, arr) => (i == 0 || val.gsx$name != arr[i - 1].gsx$name))
    .map((val, i) => thumb_link(val, i));

    // Check Artists
    if (content.length == 0) {
      const artists = [].concat(
        API.cards.attacks.chain()
          .find({ 'gsx$artist': { '$regex': new RegExp(string, 'i') }})
          .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
        API.cards.battlegear.chain()
          .find({ 'gsx$artist': { '$regex': new RegExp(string, 'i') }})
          .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
        API.cards.creatures.chain()
          .find({ 'gsx$artist': { '$regex': new RegExp(string, 'i') }})
          .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
        API.cards.locations.chain()
          .find({ 'gsx$artist': { '$regex': new RegExp(string, 'i') }})
          .where((obj) => {return (obj.gsx$splash != ('') )}).data(),
        API.cards.mugic.chain()
          .find({ 'gsx$artist': { '$regex': new RegExp(string, 'i') }})
          .where((obj) => {return (obj.gsx$splash != ('') )}).data()
      )
      .sort((a, b) => (a.gsx$name > b.gsx$name) ? 1 : -1)
      .map((val, i) => text_link(val, i));

      if (artists.length > 0) {
        header = `Art contributed by ${string}:`;
        content = artists;
      }
      else {
        header = 'No Results Found';
      }
    }
    else {
      header = `Results containing ${string}:`;
    }

    return (<div className="results">
      <hr />
      {names.length > 0 && <>
        <div className="entry_nav">{names}</div>
        <hr />
      </>}
      <div>{header}</div>
      {content}
    </div>);
  }
}
