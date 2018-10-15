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
  list = ["sets", "types", "rarity", "tribes", "elements", "mull", "gender"];

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

  cleanInput = () => {
    let input = {
      name: "",
      text: "",
      subtypes: "",
      past: false,
      mirage: false,
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
      return (<span><img className="icon16" src={"/src/img/icons/tribes/"+item+".png"} />&nbsp;</span>);
    });

    let elements = gen("elements", "inline", (item) => {
      return (<span><img className="icon16" src={"/src/img/icons/elements/"+item+".png"} />&nbsp;</span>);
    }).slice(0, -2);

    let disciplines = [];
    Object.keys(this.input.disciplines).forEach((item, i) => {
      disciplines.push(<label key={i} className="disciplines"><input type="text" name={item} value={this.input.disciplines[item]} onChange={e => this.handleChange(e, "disciplines")} />
        <img className="icon20" style={{verticalAlign: 'bottom'}} src={"/src/img/icons/disciplines/"+item+".png"} />&nbsp;
      </label>);
    });

    return (
      <div className="SearchForm">
        <form onSubmit={this.search}>
          <br />
          <label>Name&nbsp;<input type="text" name="name" value={this.input.name} onChange={this.handleChange} /></label>
          <br />
          <label>Text&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="text" value={this.input.text} onChange={this.handleChange} /></label>
          <br />
          <label>Subtypes | Initiative<br />
            <input type="text" name="subtypes" value={this.input.subtypes} onChange={this.handleChange} />
          </label><br />
          <label><input type="checkbox" name="past" checked={this.input.past} onChange={this.handleChange} />Past</label>&nbsp;
          <label><input type="checkbox" name="mirage" checked={this.input.mirage} onChange={this.handleChange} />Mirage</label>
          <br /><br />
          <span>Tribes</span>
          <br />
          {tribes}
          <br /> <br />
          <span>Elements</span>
          <br />
          {elements}&nbsp;
          <input type="button" value="or" className="and" disabled={!this.input.elements.and} onClick={(e)=>{this.input.elements.and=false;}} />
          <input type="button" value="and" className="and" disabled={this.input.elements.and} onClick={(e)=>{this.input.elements.and=true;}} />
          <br />
          <label><input type="checkbox" name="none" checked={this.input.elements.none} onChange={e => this.handleChange(e, "elements")} />None</label>
          <br /> <br />
          <span>Disciplines</span>
          <br />
          {disciplines}
          <br /> <br />
          <span>Energy</span>
          <br />
          <label className="mcbp">Min:&nbsp;<input type="text" name="min" value={this.input.energy.min} onChange={e => this.handleChange(e, "energy")} /></label>&nbsp;
          <label className="mcbp">Max:&nbsp;<input type="text" name="max" value={this.input.energy.max} onChange={e => this.handleChange(e, "energy")}  /></label>
          <br /><br />
          <span>Mugic Counters/Cost
          <br />Build Points</span>
          <br />
          <label className="mcbp">Min:&nbsp;<input type="text" name="min" value={this.input.mcbp.min} onChange={e => this.handleChange(e, "mcbp")} /></label>&nbsp;
          <label className="mcbp">Max:&nbsp;<input type="text" name="max" value={this.input.mcbp.max} onChange={e => this.handleChange(e, "mcbp")} /></label>
          <br /><br />
          <label className="mull"><input type="checkbox" name="unique" checked={this.input.mull.unique} onChange={e => this.handleChange(e, "mull")} />Unique</label>&nbsp;
          <label className="mull"><input type="checkbox" name="loyal" checked={this.input.mull.loyal} onChange={e => this.handleChange(e, "mull")} />Loyal</label>&nbsp;
          <label className="mull"><input type="checkbox" name="legendary" checked={this.input.mull.legendary} onChange={e => this.handleChange(e, "mull")} />Legendary</label>
          <br />
          <label className="mull"><input type="checkbox" name="mixed" checked={this.input.mull.mixed} onChange={e => this.handleChange(e, "mull")} />Non-Loyal</label>
          <br /><br />
          <Collapsible trigger="Types">{types}</Collapsible>
          <Collapsible trigger="Rarity">{rarity}</Collapsible>
          <Collapsible trigger="Sets">{sets}</Collapsible>
          {/*<Collapsible trigger="Gender (fan content)">{gender}</Collapsible>*/}
          <br />
          <input type="submit" value="Search" />&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="button" value="Reset" onClick={this.reset} />
        </form>
      </div>
    );
  }

  handleChange = (event, obj) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (!obj) this.input[name] = value;
    else this.input[obj][name] = value;
  }

  reset = (event) => {
    event.preventDefault();
    event.stopPropagation();
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

    // Search by name
    if (this.input.name.length > 0) {
      // clean name
      let inputname = this.input.name.replace(/\\/g, '').replace(/\(|\)/g, (match) => {return ("\\"+match)});
      console.log(inputname);
      attackResults = attackResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
      ]});
      battlegearResults = battlegearResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
      ]});
      creatureResults = creatureResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
      ]});
      locationResults = locationResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}}
      ]});
      mugicResults = mugicResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(inputname, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(inputname, 'i')}},
      ]});
    }

    // Text
    if (this.input.text.length > 0) {
      let textList = this.input.text.split(",").filter(Boolean).map((item) => {
        return ({'$regex': new RegExp(item.trim(), 'i')});
      });
      attackResults = attackResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}},
        {'gsx$artist': {"$or": textList}}
      ]});
      battlegearResults = battlegearResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}},
        {'gsx$artist': {"$or": textList}}
      ]});
      creatureResults = creatureResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}},
        {'gsx$brainwashed': {"$or": textList}}
      ]});
      locationResults = locationResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}}
      ]});
      mugicResults = mugicResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}}
      ]});
    }

    // Past
    if (this.input.past) {
      attackResults = attackResults.find({'gsx$past': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$past': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$types': {'$regex': new RegExp("past", 'i')}});
      locationResults = locationResults.find({'gsx$past': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$past': {'$gt': 0}});
    }

    // Mirage
    if (this.input.mirage) {
      locationResults = locationResults.find({'gsx$mirage': {'$gt': 0}});
      attackResults = attackResults.limit(0);
      battlegearResults = battlegearResults.limit(0);
      creatureResults = creatureResults.limit(0);
      mugicResults = mugicResults.limit(0);
    }

    // Subtypes / Initiative
    if (this.input.subtypes.length > 0) {
      let subtypesList = this.input.subtypes.split(",").filter(Boolean).map((item) => {
        return ({'$regex': new RegExp(item.trim(), 'i')});
      });

      creatureResults = creatureResults.find({'gsx$types': {'$or': subtypesList} });
      locationResults = locationResults.find({'gsx$initiative': {'$or': subtypesList}});
      attackResults = attackResults.limit(0);
      battlegearResults = battlegearResults.limit(0);
      mugicResults = mugicResults.limit(0);
    }

    // Search by tribe
    let tribesList = [];
    for (const tribe in this.input.tribes) {
      if (this.input.tribes[tribe])
        tribesList.push({'$regex': new RegExp(tribe, 'i')});
    }
    if (tribesList.length > 0) {
      creatureResults = creatureResults.find({'gsx$tribe': {'$or': tribesList} });
      mugicResults = mugicResults.find({'gsx$tribe': {'$or': tribesList} });
      attackResults = attackResults.limit(0);
      battlegearResults = battlegearResults.limit(0);
      locationResults = locationResults.limit(0);
    }

    // Search by elements
    if (this.input.elements.none) {
      attackResults = attackResults.where(
        (obj) => {return (obj.gsx$fire == ('') );}
      ).where(
        (obj) => {return (obj.gsx$air == ('') );}
      ).where(
        (obj) => {return (obj.gsx$earth == ('') );}
      ).where(
        (obj) => {return (obj.gsx$water == ('') );}
      );
      battlegearResults = battlegearResults.limit(0);
      creatureResults = creatureResults.where(obj => (obj.gsx$elements == ''));
      locationResults = locationResults.limit(0);
      mugicResults = mugicResults.limit(0);
    }
    else {
      let elementsList = [];
      let elementsList2 = [];
      for (const element in this.input.elements) {
        if (element === "none" || element === "and") continue;
        if (this.input.elements[element]) {
          elementsList.push({'$regex': new RegExp(element, 'i')});
          elementsList2.push({['gsx$'+element]: {'$gte': 0}})
        }
      }
      if (elementsList.length > 0) {
        if (this.input.elements.and) {
         creatureResults = creatureResults.find({'gsx$elements': {'$and': elementsList} });
         attackResults = attackResults.find({'$and': elementsList2});
        }
        else {
          creatureResults = creatureResults.find({'gsx$elements': {'$or': elementsList} });
          attackResults = attackResults.find({'$or': elementsList2});
        }
        battlegearResults = battlegearResults.limit(0);
        locationResults = locationResults.limit(0);
        mugicResults = mugicResults.limit(0);
      }
    }

    // Stats
    if (this.input.disciplines.courage > 0)
      creatureResults = creatureResults.find({'gsx$courage': {'$gte': this.input.disciplines.courage}});

    if (this.input.disciplines.power > 0)
      creatureResults = creatureResults.find({'gsx$power': {'$gte': this.input.disciplines.power}});

    if (this.input.disciplines.wisdom > 0)
      creatureResults = creatureResults.find({'gsx$wisdom': {'$gte': this.input.disciplines.wisdom}});

    if (this.input.disciplines.speed > 0)
      creatureResults = creatureResults.find({'gsx$speed': {'$gte': this.input.disciplines.speed}});

    if (this.input.energy.min > 0)
      creatureResults = creatureResults.find({'gsx$energy': {'$gte': this.input.energy.min}});

    if (this.input.energy.max > 0 && this.input.energy.max >= this.input.energy.min)
      creatureResults = creatureResults.find({'gsx$energy': {'$lte': this.input.energy.max}});

    // (if any stats, filter out non-Creatures)
    if (this.input.energy.min > 0 || this.input.energy.max > 0 || this.input.disciplines.courage > 0 || this.input.disciplines.power > 0 || this.input.disciplines.wisdom > 0 || this.input.disciplines.speed > 0) {
      attackResults = attackResults.limit(0);
      battlegearResults = battlegearResults.limit(0);
      locationResults = locationResults.limit(0);
      mugicResults = mugicResults.limit(0);
    }

    // Mugic Counters/Cost | Build Points
    if (this.input.mcbp.min !== "" && this.input.mcbp.min >= 0) {
      attackResults = attackResults.find({'gsx$bp': {'$gte': this.input.mcbp.min}});
      creatureResults = creatureResults.find({'gsx$mugicability': {'$gte': this.input.mcbp.min}});
      mugicResults = mugicResults.find({'gsx$cost': {'$gte': this.input.mcbp.min}});
    }
    if (this.input.mcbp.max !== "" && this.input.mcbp.max >= 0 && this.input.mcbp.max >= this.input.mcbp.min) {
      attackResults = attackResults.find({'gsx$bp': {'$lte': this.input.mcbp.max}});
      creatureResults = creatureResults.find({'gsx$mugicability': {'$lte': this.input.mcbp.max}});
      mugicResults = mugicResults.find({'gsx$cost': {'$lte': this.input.mcbp.max}});
    }

    // filter out Battlegear and Locations if mcbp
    if (this.input.mcbp.max > 0 || this.input.mcbp.min > 0) {
      battlegearResults = battlegearResults.limit(0);
      locationResults = locationResults.limit(0);
    }

    // Unique
    if (this.input.mull.unique) {
      attackResults = attackResults.find({'gsx$unique': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$unique': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$unique': {'$gt': 0}});
      locationResults = locationResults.find({'gsx$unique': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$unique': {'$gt': 0}});
    }

    // Loyal
    if (this.input.mull.loyal) {
      attackResults = attackResults.limit(0);
      battlegearResults = battlegearResults.find({'gsx$loyal': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$loyal': {'$gt': 0}});
      mugicResults = mugicResults.limit(0);
      locationResults = locationResults.limit(0);
    }

    // Legendary
    if (this.input.mull.legendary) {
      attackResults = attackResults.find({'gsx$legendary': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$legendary': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$legendary': {'$gt': 0}});
      locationResults = locationResults.find({'gsx$legendary': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$legendary': {'$gt': 0}});
    }

    // Non Loyal
    if (this.input.mull.mixed) {
      attackResults = attackResults.limit(0);
      creatureResults = creatureResults.find({'gsx$loyal': {'$lte': 0}});
      battlegearResults = battlegearResults.find({'gsx$loyal': {'$lte': 0}});
      mugicResults = mugicResults.limit(0);
      locationResults = locationResults.limit(0);
    }

    // Sets
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

    // Rarity
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

    // Gender
    // let genderList = [];
    // for (const key in this.input.gender) {
    //   if (this.input.gender[key])
    //     genderList.push({'$regex': new RegExp(key, 'i')})
    // }
    // if (genderList.length > 0) {
    //   attackResults = attackResults.limit(0);
    //   battlegearResults = battlegearResults.limit(0);
    //   creatureResults = creatureResults.find({'gsx$gender': {'$or': genderList} });
    //   locationResults = locationResults.limit(0);
    //   mugicResults = mugicResults.limit(0);
    // }

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
