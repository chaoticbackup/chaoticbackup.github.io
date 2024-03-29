import { observable } from "mobx";
import { observer, inject } from 'mobx-react';
import React from 'react';
import Collapsible from 'react-collapsible';

import search_api from './search';
import { Loading } from '../../Snippets';
import API from '../../SpreadsheetData';

@inject((stores, props, context) => props) @observer
export default class SearchCollection extends React.Component {
  @observable loaded = false;
  @observable loading = false;
  @observable input;
  @observable collapsed;
  list = ["sets", "types", "rarity", "tribes", "elements", "mull", "gender", "exclusive"];

  constructor(props) {
    super(props);

    this.formRef = props.formRef;

    // Binding for keeping scope with dom functions
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);

    this.props.handleContent([{ 'text': 'Loading...' }]);

    this.cleanInput();
    this.parseQuery();

    this.fetchCollapsed();
  }

  fetchCollapsed = () => {
    let collapsed = localStorage.getItem("collapsed");

    if (collapsed) collapsed = JSON.parse(collapsed);
    else collapsed = {
      energy: true,
      bpmc: true,
      types: true,
      rarity: false,
      sets: false,
      exclusive: false
    };

    this.collapsed = collapsed;
  }

  handleTriggerClick = (type) => {
    const stored_collapse = this.collapsed;
    stored_collapse[type] = !this.collapsed[type];
    localStorage.setItem("collapsed", JSON.stringify(stored_collapse));
  }

  cleanInput = () => {
    const input = {
      name: "",
      text: "",
      subtypes: "",
      flavor: true,
      sets: {},
      types: { attack: false, battlegear: false, creature: false, location: false, mugic: false },
      rarity: { common: false, uncommon: false, rare: false, 'super rare': false, 'ultra rare': false, promo: false },
      tribes: { danian: false, 'm\'arrillian': false, mipedian: false, overworld: false, underworld: false, generic: false },
      elements: { fire: false, air: false, earth: false, water: false, none: false, and: false },
      disciplines: { courage: '', power: '', wisdom: '', speed: '', max: false },
      energy: { min: '', max: '' },
      mcbp: { min: '', max: '' },
      mull: { unique: false, loyal: false, legendary: false, mixed: false },
      exclusive: { starter: false, printed: false, online: false },
      gender: { ambiguous: false, female: false, male: false }
    };
    for (const key in API.sets) input.sets[key.toLowerCase()] = false;

    this.input = input;
  }

  parseQuery = () => {
    const queryString = this.props.location.search.toLowerCase();

    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
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

    if (query.hasOwnProperty('name')) this.input.name = query.name;
    if (query.hasOwnProperty('text')) this.input.text = query.text;
    if (query.hasOwnProperty('subtypes')) this.input.subtypes = query.subtypes;
    if (query.hasOwnProperty('courage')) this.input.disciplines.courage = query.courage;
    if (query.hasOwnProperty('power')) this.input.disciplines.power = query.power;
    if (query.hasOwnProperty('wisdom')) this.input.disciplines.wisdom = query.wisdom;
    if (query.hasOwnProperty('speed')) this.input.disciplines.speed = query.speed;
    if (query.hasOwnProperty('disc_max')) this.input.disciplines.max = !!query.disc_max;
    if (query.hasOwnProperty('energy')) {
      const q = query.energy.split(',');
      if (q[0] >= 0) this.input.energy.min = q[0];
      if (q[1] >= 0) this.input.energy.max = q[1];
    }
    if (query.hasOwnProperty('mcbp')) {
      const q = query.mcbp.split(',');
      if (q[0] >= 0) this.input.mcbp.min = q[0];
      if (q[1] >= 0) this.input.mcbp.max = q[1];
    }

  }

  async updateQuery() {
    let queryString = "";

    const update = (query) => {
      let temp = "";
      Object.keys(this.input[query]).forEach((item) => {
        if (this.input[query][item] == true) temp += item + ",";
      });
      if (temp.length > 0) return query + "=" + temp.replace(/\,$/, '&');
      else return "";
    };

    this.list.forEach(item => queryString += update(item));

    if (this.input.name) queryString += "name=" + encodeURIComponent(this.input.name) + "&";
    if (this.input.text) queryString += "text=" + encodeURIComponent(this.input.text) + "&";
    if (this.input.subtypes) queryString += "subtypes=" + encodeURIComponent(this.input.subtypes) + "&";
    if (this.input.disciplines.courage > 0) queryString += "courage=" + this.input.disciplines.courage + "&";
    if (this.input.disciplines.power > 0) queryString += "power=" + this.input.disciplines.power + "&";
    if (this.input.disciplines.wisdom > 0) queryString += "wisdom=" + this.input.disciplines.wisdom + "&";
    if (this.input.disciplines.speed > 0) queryString += "speed=" + this.input.disciplines.speed + "&";
    if (this.input.disciplines.max) queryString += "disc_max=true&";
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
    this.props.navigate('/collection/?'+(queryString));
  }

  reset = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.cleanInput();
  }

  handleExclusiveChange = (event) => {
  }

  handleChange = (event, obj) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    if (!obj) this.input[name] = value;
    else this.input[obj][name] = value;
  }

  search = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      this.updateQuery();
    }

    const results = search_api(this.input);

    if (results.length > 0) this.props.handleContent(results);
    else this.props.handleContent([{ 'text': 'No Results Found' }]);
  }

  render() {
    if (this.loaded == false) {
      if (this.loading == false) {
        this.loading = true;
        API.LoadDB([{ 'cards': 'attacks' }, { 'cards': 'battlegear' }, { 'cards': 'creatures' }, { 'cards': 'locations' }, { 'cards': 'mugic' }])
        .then(() => {
          this.loaded = true;
          this.loading = false;
          this.search();
        })
        .catch(() => {});
      }
      return (<Loading />);
    }

    const gen = (d, display, text) => {
      const tmp = [];
      Object.keys(this.input[d]).forEach((item, i) => {
        tmp.push(<label style={{ display: display }} key={i}><input type="checkbox" name={item} checked={this.input[d][item]} onChange={e => this.handleChange(e, d)} />{text(item)}</label>
        );
      });
      return tmp;
    };

    const sets = gen("sets", "block", (item) => {
      return API.sets[item.toUpperCase()];
    });

    const types = gen("types", "block", (item) => {
      return item.charAt(0).toUpperCase()+item.slice(1);
    });

    const rarity = gen("rarity", "block", (item) => {
      return item.split(" ").map(st => {return st.charAt(0).toUpperCase()+st.slice(1)}).join(" ");
    });

    // const gender = gen("gender", "block", (item) => {
    //   return item.charAt(0).toUpperCase()+item.slice(1);
    // });

    const tribes = gen("tribes", "inline", (item) => {
      return (<span><img className="icon16" src={"/public/img/icons/tribes/"+item+".png"} /></span>);
    });

    const elements = gen("elements", "inline", (item) => {
      return (<span><img className="icon20" src={"/public/img/icons/elements/"+item+".png"} />&nbsp;</span>);
    }).slice(0, -2);

    const disciplines = [];
    Object.keys(this.input.disciplines).forEach((item, i) => {
      if (i == 4) return;
      disciplines.push(<label key={i} className="disciplines"><input type="text" name={item} value={this.input.disciplines[item]} onChange={e => this.handleChange(e, "disciplines")} />
        <img className="icon20" style={{ verticalAlign: 'middle', padding: "0px 2px" }} src={"/public/img/icons/disciplines/"+item+".png"} />
      </label>);
    });

    return (
      <div className="SearchForm">
        <form onSubmit={this.search}>
          <div className="centeredButtons">
            <input id="search" type="submit" value="Search" ref={this.formRef} />
            <input id="search" type="button" value="Reset" onClick={this.reset} />
          </div>
          <div className="text-entry">
            <input type="text" name="name" placeholder="Card Name" value={this.input.name} onChange={this.handleChange} />
          </div>
          <div className="text-entry">
            <input type="text" name="text" placeholder="Card Text" value={this.input.text} onChange={this.handleChange} />
          </div>
          <div className="text-entry">
            <input type="text" name="subtypes" placeholder="Subtypes | Initiative" value={this.input.subtypes} onChange={this.handleChange} />
          </div>
          <div className="centeredCheckBox">
            <label className="mull"><input type="checkbox" name="flavor" value={!this.input.flavor} onChange={(e) => {this.input.flavor = !e.target.checked}} />Ignore Flavortext & Artist</label>
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
            <input type="button" value={this.input.elements.none ? "not" : "or"} className="and" disabled={!this.input.elements.and} onClick={(e)=>{this.input.elements.and=false}} />
            <input type="button" value={this.input.elements.none ? "only" : "and"} className="and" disabled={this.input.elements.and} onClick={(e)=>{this.input.elements.and=true}} />
          </div>
          <hr />
          <div className="disciplines">
            {disciplines}
            <label>Max
              <input 
                type="checkbox" name="max" 
                style={{ display: "inline", margin: "0px" }} 
                checked={this.input.disciplines.max} 
                onChange={e => this.handleChange(e, "disciplines")} 
              />
            </label>
          </div>
          <hr />
          <CollapsibleWrapper
            type="energy"
            title="Energy" 
            collapsed={this.collapsed} 
            onClick={this.handleTriggerClick} 
          >
            <div className="minMax">
              <label className="mcbp">Min <input type="text" name="min" value={this.input.energy.min} onChange={e => this.handleChange(e, "energy")} /></label>
              <label className="mcbp">Max <input type="text" name="max" value={this.input.energy.max} onChange={e => this.handleChange(e, "energy")}  /></label>
            </div>
          </CollapsibleWrapper>
          <CollapsibleWrapper 
            type="bpmc"
            title="Build Points&#10;Mugic Counters/Cost" 
            collapsed={this.collapsed} 
            onClick={this.handleTriggerClick} 
          >
            <div className="minMax">
              <label className="mcbp">Min <input type="text" name="min" value={this.input.mcbp.min} onChange={e => this.handleChange(e, "mcbp")} /></label>
              <label className="mcbp">Max <input type="text" name="max" value={this.input.mcbp.max} onChange={e => this.handleChange(e, "mcbp")} /></label>
            </div>
          </CollapsibleWrapper>
          <CollapsibleWrapper
            type="types"
            title="Card Type" 
            collapsed={this.collapsed} 
            onClick={this.handleTriggerClick} 
          >
            <div className="centeredCheckBox">
              {types}
            </div>
          </CollapsibleWrapper>
          <CollapsibleWrapper
            type="rarity"
            title="Rarity" 
            collapsed={this.collapsed}
            onClick={this.handleTriggerClick}   
          >
            <div className="centeredCheckBox">
              {rarity}
            </div>
          </CollapsibleWrapper>
          <CollapsibleWrapper 
            type="sets"
            title="Sets" 
            collapsed={this.collapsed}
            onClick={this.handleTriggerClick} 
          >
            <div className="centeredCheckBox">
              {sets}
            </div>
          </CollapsibleWrapper>
          <CollapsibleWrapper
            type="exclusive"
            title="Exclusive"
            collapsed={this.collapsed}
            onClick={this.handleTriggerClick}
          >
            <div className="centeredCheckBox centeredSpacing" style={{ width: "80%" }}>
              <label className="mull"><input type="checkbox" name="starter" checked={this.input.exclusive.starter} onChange={e => this.handleChange(e, "exclusive")} />Starter</label>
              <label className="mull"><input type="checkbox" name="printed" checked={this.input.exclusive.printed} onChange={e => this.handleChange(e, "exclusive")} />Printed</label>
              <label className="mull"><input type="checkbox" name="online" checked={this.input.exclusive.online} onChange={e => this.handleChange(e, "exclusive")} />Online</label>
            </div>
          </CollapsibleWrapper>
          {/*<Collapsible trigger="Gender (fan content)">{gender}</Collapsible>*/}
          <hr />
          <div className="centeredButtons">
            <input id="search" type="submit" value="Search" />
            <input id="search" type="button" value="Reset" onClick={this.reset} />
          </div>
        </form>
      </div>
    );
  }
}

class CollapsibleWrapper extends React.Component {
  open = false;
  trigger = "";

  constructor(props) {
    super(props);
    const { collapsed, type } = props;
    this.open = collapsed[type];
    this.trigger = props.title;
  }

  render() {
    const { type, children, onClick } = this.props;

    return (
      <Collapsible
        trigger={this.trigger}
        open={this.open}
        onOpen={() => onClick(type)}
        onClose={() => onClick(type)}
      >
        {children}
      </Collapsible>
    );
  }

}
