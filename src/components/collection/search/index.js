import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import Collapsible from 'react-collapsible';
import API from '../../SpreadsheetData';
import {Loading} from '../../Snippets';
import search_api from './search';

@inject((stores, props, context) => props) @observer
export default class SearchCollection extends React.Component {
  @observable loaded = false;
  @observable input;
  list = ["sets", "types", "rarity", "tribes", "elements", "mull", "gender"];

  constructor(props) {
    super(props);

    // Binding for keeping scope with dom functions
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);

    this.props.handleContent([{'text': 'Loading...'}]);
    this.cleanInput();
    this.parseQuery();
  }

  cleanInput = () => {
    let input = {
      name: "",
      text: "",
      subtypes: "",
      past: false,
      mirage: false,
      minion: false,
      flavor: true,
      sets: {},
      types: {attack: false, battlegear: false, creature: false, location: false, mugic: false},
      rarity: {common: false, uncommon: false, rare: false, 'super rare': false, 'ultra rare': false, promo: false},
      tribes: {danian: false, 'm\'arrillian': false, 'mipedian': false, overworld: false, underworld: false, generic: false},
      elements: {fire: false, air: false, earth: false, water: false, none: false, and: false},
      disciplines: {courage: '', power: '', wisdom: '', speed: ''},
      energy: {min: '', max: ''},
      mcbp: {min: '', max: ''},
      mull: {unique: false, loyal: false, legendary: false, mixed: false},
      gender: {ambiguous: false, female: false, male: false}
    };
    for (const key in API.sets) input.sets[key.toLowerCase()] = false;

    this.input = input;
  }

  parseQuery = () => {
    const queryString = this.props.location.search.toLowerCase();

    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    // query -> input
    this.list.forEach((d) => {
      if (query[d]) {
        query[d].split(',').map(item => {
          this.input[d][item] = true;
        });
      }
    });

    if (query.hasOwnProperty('past')) this.input.past = true;
    if (query.hasOwnProperty('mirage')) this.input.mirage = true;
    if (query.hasOwnProperty('minion')) this.input.minion = true;
    if (query.hasOwnProperty('name')) this.input.name = query.name;
    if (query.hasOwnProperty('text')) this.input.text = query.text;
    if (query.hasOwnProperty('subtypes')) this.input.subtypes = query.subtypes;
    if (query.hasOwnProperty('courage')) this.input.disciplines.courage = query.courage;
    if (query.hasOwnProperty('power')) this.input.disciplines.power = query.power;
    if (query.hasOwnProperty('wisdom')) this.input.disciplines.wisdom = query.wisdom;
    if (query.hasOwnProperty('speed')) this.input.disciplines.speed = query.speed;
    if (query.hasOwnProperty('energy')) {
      let q = query.energy.split(',');
      if (q[0] >= 0) this.input.energy.min = q[0];
      if (q[1] >= 0) this.input.energy.max = q[1];
    }
    if (query.hasOwnProperty('mcbp')) {
      let q = query.mcbp.split(',');
      if (q[0] >= 0) this.input.mcbp.min = q[0];
      if (q[1] >= 0) this.input.mcbp.max = q[1];
    }

  }

  async updateQuery() {
    let queryString = "";

    let update = (query) => {
      let temp = "";
      Object.keys(this.input[query]).forEach((item) => {
        if (this.input[query][item] == true) temp += item + ",";
      });
      if (temp.length > 0) return query + "=" + temp.replace(/\,$/, '&');
      else return "";
    }

    this.list.forEach(item => queryString += update(item));

    if (this.input.past) queryString += "past&";
    if (this.input.mirage) queryString += "mirage&";
    if (this.input.minion) queryString += "minion&";
    if (this.input.name) queryString += "name=" + encodeURIComponent(this.input.name) + "&";
    if (this.input.text) queryString += "text=" + encodeURIComponent(this.input.text) + "&";
    if (this.input.subtypes) queryString += "subtypes=" + encodeURIComponent(this.input.subtypes) + "&";
    if (this.input.disciplines.courage > 0) queryString += "courage=" + this.input.disciplines.courage + "&";
    if (this.input.disciplines.power > 0) queryString += "power=" + this.input.disciplines.power + "&";
    if (this.input.disciplines.wisdom > 0) queryString += "wisdom=" + this.input.disciplines.wisdom + "&";
    if (this.input.disciplines.speed > 0) queryString += "speed=" + this.input.disciplines.speed + "&";
    if (this.input.energy.min != "" || this.input.energy.max != "") {
      queryString += "energy=";
      if (this.input.energy.min != "" && this.input.energy.min >= 0) queryString += this.input.energy.min;
      queryString += ",";
      if (this.input.energy.max != "" && this.input.energy.max >= 0) queryString += this.input.energy.max;
      queryString += "&";
    }
    if (this.input.mcbp.min != "" || this.input.mcbp.max != "") {
      queryString += "mcbp=";
      if (this.input.mcbp.min != "" && this.input.mcbp.min >= 0) queryString += this.input.mcbp.min;
      queryString += ",";
      if (this.input.mcbp.max != "" && this.input.mcbp.max >= 0) queryString += this.input.mcbp.max;
      queryString += "&";
    }

    // Strip trailing &
    queryString = queryString.replace(/\&$/, '');

    // Push to URL
    this.props.history.push('/collection/?'+(queryString));
  }

  reset = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.cleanInput();
  }

  handleChange = (event, obj) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (!obj) this.input[name] = value;
    else this.input[obj][name] = value;
  }

  search = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      this.updateQuery();
    }

    let results = search_api(this.input);

    if (results.length > 0) this.props.handleContent(results);
    else this.props.handleContent([{'text': 'No Results Found'}]);
  }

  render() {
      if (this.loaded == false) {
        API.LoadDB([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
        .then(() => {
          this.loaded = true;
          this.search();
        });
        return (<Loading />);
      }

    let gen = (d, display, text) => {
      let tmp = [];
      Object.keys(this.input[d]).forEach((item, i) => {
        tmp.push(<label style={{display: display}} key={i}><input type="checkbox" name={item} checked={this.input[d][item]} onChange={e => this.handleChange(e, d)} />{text(item)}</label>
        );
      });
      return tmp;
    }

    let sets = gen("sets", "block", (item) => {
      return API.sets[item.toUpperCase()];
    });

    let types = gen("types", "block", (item) => {
      return item.charAt(0).toUpperCase()+item.slice(1);
    });

    let rarity = gen("rarity", "block", (item) => {
      return item.split(" ").map(st => {return st.charAt(0).toUpperCase()+st.slice(1)}).join(" ");
    });

    // let gender = gen("gender", "block", (item) => {
    //   return item.charAt(0).toUpperCase()+item.slice(1);
    // });

    let tribes = gen("tribes", "inline", (item) => {
      return (<span><img className="icon16" src={"/src/img/icons/tribes/"+item+".png"} /></span>);
    });

    let elements = gen("elements", "inline", (item) => {
      return (<span><img className="icon20" src={"/src/img/icons/elements/"+item+".png"} />&nbsp;</span>);
    }).slice(0, -2);

    let disciplines = [];
    Object.keys(this.input.disciplines).forEach((item, i) => {
      disciplines.push(<label key={i} className="disciplines"><input type="text" name={item} value={this.input.disciplines[item]} onChange={e => this.handleChange(e, "disciplines")} />
        &nbsp;<img className="icon20" style={{verticalAlign: 'bottom'}} src={"/src/img/icons/disciplines/"+item+".png"} />&nbsp;
      </label>);
    });

    return (
      <div className="SearchForm">
        <form onSubmit={this.search}>
          <label className="searchName">Search</label>
          <br />
          <div className="text-entry">
            <input type="text" name="name" placeholder="Card Name" value={this.input.name} onChange={this.handleChange} />
          </div>
          <div className="text-entry">
            <input type="text" name="text" placeholder="Card Text" value={this.input.text} onChange={this.handleChange} />
          </div>
          <div className="centeredCheckBox">
            <label className="mull"><input type="checkbox" name="flavor" value={!this.input.flavor} onChange={(e) => {this.input.flavor = !e.target.checked}} />Ignore Flavortext</label>
          </div>
          <div className="text-entry">
            <input type="text" name="subtypes" placeholder="Subtypes | Initiative" value={this.input.subtypes} onChange={this.handleChange} />
          </div>
          <div className="centeredCheckBox centeredSpacing">
            <label className="mull"><input type="checkbox" name="past" checked={this.input.past} onChange={this.handleChange} />Past</label>
            <label className="mull"><input type="checkbox" name="mirage" checked={this.input.mirage} onChange={this.handleChange} />Mirage</label>
            <label className="mull"><input type="checkbox" name="minion" checked={this.input.minion} onChange={this.handleChange} />Minion</label>
          </div>
          <br />
          <div className="centeredCheckBox centeredSpacing">
            <label className="mull"><input type="checkbox" name="unique" checked={this.input.mull.unique} onChange={e => this.handleChange(e, "mull")} />Unique</label>
            <label className="mull"><input type="checkbox" name="loyal" checked={this.input.mull.loyal} onChange={e => this.handleChange(e, "mull")} />Loyal</label>
            <label className="mull"><input type="checkbox" name="legendary" checked={this.input.mull.legendary} onChange={e => this.handleChange(e, "mull")} />Legendary</label>
          </div>
          <div className="centeredCheckBox">
              <label className="mull"><input type="checkbox" name="mixed" checked={this.input.mull.mixed} onChange={e => this.handleChange(e, "mull")} />Non-Loyal</label>
          </div>
          <hr />
          <div className="tribes">
            {tribes}
          </div>
          <hr />
          <div className="tribes">
            {elements}
            <label className="none"><input type="checkbox" name="none" checked={this.input.elements.none} onChange={e => this.handleChange(e, "elements")} /><span>None</span></label>
          </div>
          <div className="centeredButtons">
            <input type="button" value={this.input.elements.none ? "none" : "or"} className="and" disabled={!this.input.elements.and} onClick={(e)=>{this.input.elements.and=false;}} />
            <input type="button" value={this.input.elements.none ? "only" : "and"} className="and" disabled={this.input.elements.and} onClick={(e)=>{this.input.elements.and=true;}} />
          </div>
          <hr />
          <div className="disciplines">
            {disciplines}
          </div>
          <Collapsible open={true} trigger="Energy">
            <div className="minMax">
              <label className="mcbp">Min <input type="text" name="min" value={this.input.energy.min} onChange={e => this.handleChange(e, "energy")} /></label>
              <label className="mcbp">Max <input type="text" name="max" value={this.input.energy.max} onChange={e => this.handleChange(e, "energy")}  /></label>
            </div>
          </Collapsible>
          <Collapsible open={true} trigger="Build Points&#10;Mugic Counters/Cost">
            <div className="minMax">
              <label className="mcbp">Min <input type="text" name="min" value={this.input.mcbp.min} onChange={e => this.handleChange(e, "mcbp")} /></label>
              <label className="mcbp">Max <input type="text" name="max" value={this.input.mcbp.max} onChange={e => this.handleChange(e, "mcbp")} /></label>
            </div>
          </Collapsible>
          <Collapsible open={true} trigger="Types">
            <div className="centeredCheckBox">
              {types}
            </div>
          </Collapsible>
          <Collapsible trigger="Rarity">
            <div className="centeredCheckBox">
              {rarity}
            </div>
          </Collapsible>
          <Collapsible trigger="Sets">
            <div className="setBox">
              <div className="centeredCheckBox" id="sets">
                {sets}
              </div>
            </div>
          </Collapsible>
          {/*<Collapsible trigger="Gender (fan content)">{gender}</Collapsible>*/}
          <div className="centeredButtons">
            <input id="search" type="submit" value="Search" />
            <input id="search" type="button" value="Reset" onClick={this.reset} />
          </div>
        </form>
      </div>
    );
  }

}
