import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../PageNotFound';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import Creature from './Creature';
import Attack from './Attack';
import loki from 'lokijs';

@inject((stores, props, context) => props) @observer
export default class SearchForm extends React.Component {
  @observable swamp = "or";

  constructor() {
    super();
    this.reset();
    this.filter = new loki("filter.db");
  }

  componentDidMount() {
    this.search();
  }

  reset = () => {
    this.type = "";
    this.stones = {};
    this.tribes = {};
    this.elements = {};
    this.rarity = {};
    this.sets = {};
    this.gender = {};
    this.mc = {};
    this.energy = {};
    this.bp = {};
    this.base = {};
  };

  render() {

    let setsInput = [];
    for (const key in API.sets) {
      setsInput.push(<label style={{display: 'block'}} key={key}><input type="checkbox" ref={(input) => this.sets[key] = input} />{API.sets[key]}</label>);
    }

    const card_type = (
      <label>
        Type:&nbsp;
        <select onChange={(e) => {this.type = e.target.value}} >
          <option value=""></option>
          <option value="Attack">Attack</option>
          <option value="Battlegear">Battlegear</option>
          <option value="Creature">Creature</option>
          <option value="Location">Location</option>
          <option value="Mugic">Mugic</option>
        </select>
      </label>
    );

    const card_rarity = (
      <div>
        <label><input type="checkbox" ref={(input) => this.rarity["Common"] = input}/>Common</label><br />
        <label><input type="checkbox" ref={(input) => this.rarity["Uncommon"] = input}/>Uncommon</label><br />
        <label><input type="checkbox" ref={(input) => this.rarity["Rare"] = input}/>Rare</label><br />
        <label><input type="checkbox" ref={(input) => this.rarity["Super Rare"] = input}/>Super Rare</label><br />
        <label><input type="checkbox" ref={(input) => this.rarity["Ultra Rare"] = input}/>Ultra Rare</label><br />
        <label><input type="checkbox" ref={(input) => this.rarity["Promo"] = input}/>Promo</label>
      </div>
    );

    const card_tribes = (
      <div>
        <input type="checkbox" ref={(input) => this.tribes.danian = input}/><img className="icon16" src={"/src/img/icons/tribes/danian.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.tribes.mipedian = input}/><img className="icon16" src={"/src/img/icons/tribes/mipedian.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.tribes.overworld = input}/><img className="icon16" src={"/src/img/icons/tribes/overworld.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.tribes.underworld = input}/><img className="icon16" src={"/src/img/icons/tribes/underworld.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.tribes["m'arrillian"] = input}/><img className="icon16" src={"/src/img/icons/tribes/m'arrillian.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.tribes.generic = input}/><img className="icon16" src={"/src/img/icons/tribes/generic.png"} />
      </div>
    );

    const card_elements = (
      <div>
        <input type="button" value="or" disabled={this.swamp=="or"} onClick={(e)=>this.swamp="or"}/>
        <input type="button" value="and" disabled={this.swamp=="and"} onClick={(e)=>this.swamp="and"} />
        <input type="checkbox" ref={(input) => this.elements.fire = input}/><img className="icon16" src={"/src/img/icons/elements/fire.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.elements.air = input}/><img className="icon16" src={"/src/img/icons/elements/air.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.elements.earth = input}/><img className="icon16" src={"/src/img/icons/elements/earth.png"} />&nbsp;
        <input type="checkbox" ref={(input) => this.elements.water = input}/><img className="icon16" src={"/src/img/icons/elements/water.png"} />
        <br />
        <input type="checkbox" ref={(input) => this.stones.noElements = input}/><span>No Elements</span>
      </div>
    );

    const card_disciplines = (
      <div className="disciplines">
        <input type="text" ref={(input) => this.stones.courage = input} /><img className="icon20" style={{verticalAlign: 'bottom'}} src={"/src/img/icons/disciplines/courage.png"} />&nbsp;
        <input type="text" ref={(input) => this.stones.power = input} /><img className="icon20" style={{verticalAlign: 'bottom'}} src={"/src/img/icons/disciplines/power.png"} />&nbsp;
        <input type="text" ref={(input) => this.stones.wisdom = input} /><img className="icon20" style={{verticalAlign: 'bottom'}} src={"/src/img/icons/disciplines/wisdom.png"} />&nbsp;
        <input type="text" ref={(input) => this.stones.speed = input} /><img className="icon20" style={{verticalAlign: 'bottom'}} src={"/src/img/icons/disciplines/speed.png"} />
      </div>
    );

    return (
      <div className="SearchForm">
        <form onSubmit={this.search}>
          <br />
          <label>Name: <input type="text" ref={(input) => this.stones.name = input} /></label>
          <br />
          <label>Text: <input type="text" ref={(input) => this.stones.text = input} /></label>
          <br />
          {card_type}
          <br />
          <label>Subtypes: <input type="text" ref={(input) => this.stones.subtypes = input} /></label>
          <br />
          <div>{setsInput}</div><br />
          {card_rarity}<br />
          {card_tribes}<br />
          {card_elements}<br />
          <div>
            <span>Mugic Counters/Cost</span>&nbsp;
            <label>Min: <input type="text" style={{width: '20px'}} ref={(input) => this.mc.min = input} /></label>&nbsp;
            <label>Max: <input type="text" style={{width: '20px'}} ref={(input) => this.mc.max = input} /></label>
          </div>
          <br />
          <div>
          <span>Energy</span>&nbsp;
            <label>Min: <input type="text" style={{width: '30px'}} ref={(input) => this.energy.min = input} /></label>&nbsp;
            <label>Max: <input type="text" style={{width: '30px'}} ref={(input) => this.energy.max = input} /></label>
          </div>
          <br />
          <div>
            <span>Build Points</span>&nbsp;
            <label>Min: <input type="text" style={{width: '20px'}} ref={(input) => this.bp.min = input} /></label>&nbsp;
            <label>Max: <input type="text" style={{width: '20px'}} ref={(input) => this.bp.max = input} /></label>
          </div>
          <br />
          <div>
            <span>Base Damage</span>&nbsp;
            <label>Min: <input type="text" style={{width: '20px'}} ref={(input) => this.base.min = input} /></label>&nbsp;
            <label>Max: <input type="text" style={{width: '20px'}} ref={(input) => this.base.max = input} /></label>
          </div>
          <br />
          {card_disciplines}
          <br />
          <label><input type="checkbox" ref={(input) => this.stones.unique = input}/>Unique</label>&nbsp;
          <label><input type="checkbox" ref={(input) => this.stones.loyal = input}/>Loyal</label>&nbsp;
          <label><input type="checkbox" ref={(input) => this.stones.legendary = input}/>Legendary</label>
          <br />
          <label><input type="checkbox" ref={(input) => this.stones.past = input}/>Past</label>&nbsp;
          <label><input type="checkbox" ref={(input) => this.stones.mirage = input}/>Mirage</label>
          <br />
          <label>Initiative: <input type="text" ref={(input) => this.stones.initiative = input} /></label>
          <br />
          <div>
            <label><input type="checkbox" ref={(input) => this.gender.Ambiguous = input}/>Ambiguous</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.gender.Female = input}/>Female</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.gender.Male = input}/>Male</label>
          </div>
          <br />
          <input type="submit" value="Search" />&nbsp;&nbsp;
          <input type="button" value="Reset" disabled onClick={this.reset} />
        </form>
      </div>
    );
  }

  // TODO advanced filters
  search = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
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
    if (this.stones.name.value) {
      attackResults = attackResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(this.stones.name.value, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(this.stones.name.value, 'i')}},
      ]});
      battlegearResults = battlegearResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(this.stones.name.value, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(this.stones.name.value, 'i')}},
      ]});
      creatureResults = creatureResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(this.stones.name.value, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(this.stones.name.value, 'i')}},
      ]});
      locationResults = locationResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(this.stones.name.value, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(this.stones.name.value, 'i')}}
      ]});
      mugicResults = mugicResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(this.stones.name.value, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(this.stones.name.value, 'i')}},
      ]});
    }

    if (this.stones.text.value) {
      let textList = this.stones.text.value.split(",").filter(Boolean).map((item) => {
        return ({'$regex': new RegExp(item.trim(), 'i')});
      });
      attackResults = attackResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}}
      ]});
      battlegearResults = battlegearResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}}
      ]});
      creatureResults = creatureResults.find({'$or': [
        {'gsx$tags': {"$or": textList}},
        {'gsx$ability': {"$or": textList}},
        {'gsx$flavortext': {"$or": textList}},
        {'gsx$brainwashedability': {"$or": textList}}
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

    // Search by tribe
    let tribesList = [];
    for (const tribe in this.tribes) {
      if (this.tribes[tribe].checked) {
        tribesList.push({'$regex': new RegExp(tribe, 'i')});
      }
    }
    if (tribesList.length > 0) {
      creatureResults = creatureResults.find({'gsx$tribe': {'$or': tribesList} });
      mugicResults = mugicResults.find({'gsx$tribe': {'$or': tribesList} });
    }

    // no elements
    if (this.stones.noElements.checked) {
      creatureResults = creatureResults.where((obj) => {return (obj.gsx$elements == '');});
      attackResults = attackResults.where(
        (obj) => {return (obj.gsx$fire == ('') );}
      ).where(
        (obj) => {return (obj.gsx$air == ('') );}
      ).where(
        (obj) => {return (obj.gsx$earth == ('') );}
      ).where(
        (obj) => {return (obj.gsx$water == ('') );}
      );
    }
    // Search by elements
    else {
      let elementsList = [];
      let elementsList2 = [];
      for (const element in this.elements) {
        if (this.elements[element].checked) {
          elementsList.push({'$regex': new RegExp(element, 'i')});
          elementsList2.push({['gsx$'+element]: {'$gte': 0}})
        }
      }
      if (elementsList.length > 0) {
        if (this.swamp == "or") {
          creatureResults = creatureResults.find({'gsx$elements': {'$or': elementsList} });
          attackResults = attackResults.find({'$or': elementsList2});
        }
        if (this.swamp == "and") {
         creatureResults = creatureResults.find({'gsx$elements': {'$and': elementsList} });
         attackResults = attackResults.find({'$and': elementsList2});
        }
      }
    }

    let rarityList = [];
    for (const key in this.rarity) {
      if (this.rarity[key].checked) {
        rarityList.push({'$eq': key});
      }
    }
    if (rarityList.length > 0) {
      attackResults = attackResults.find({'gsx$rarity': {'$or': rarityList} });
      battlegearResults = battlegearResults.find({'gsx$rarity': {'$or': rarityList} });
      creatureResults = creatureResults.find({'gsx$rarity': {'$or': rarityList} });
      locationResults = locationResults.find({'gsx$rarity': {'$or': rarityList} });
      mugicResults = mugicResults.find({'gsx$rarity': {'$or': rarityList} });
    }

    let setsList = [];
    for (const key in this.sets) {
      if (this.sets[key].checked) {
        setsList.push({'$eq': key});
      }
    }
    if (setsList.length > 0) {
      attackResults = attackResults.find({'gsx$set': {'$or': setsList} });
      battlegearResults = battlegearResults.find({'gsx$set': {'$or': setsList} });
      creatureResults = creatureResults.find({'gsx$set': {'$or': setsList} });
      locationResults  = locationResults .find({'gsx$set': {'$or': setsList} });
      mugicResults = mugicResults.find({'gsx$set': {'$or': setsList} });
    }

    let genderList = [];
    for (const key in this.gender) {
      if (this.gender[key].checked) {
        genderList.push({'$regex': new RegExp(key, 'i')})
      }
    }
    if (genderList.length > 0) {
      creatureResults = creatureResults.find({'gsx$gender': {'$or': genderList} });
    }

    let subtypesList = this.stones.subtypes.value.split(",").filter(Boolean).map((item) => {
      return ({'$regex': new RegExp(item.trim(), 'i')});
    });
    if (subtypesList.length > 0) {
      creatureResults = creatureResults.find({'gsx$types': {'$or': subtypesList} });
    }

    if (this.mc.min.value > 0) {
      creatureResults = creatureResults.find({'gsx$mugicability': {'$gte': this.mc.min.value}});
      mugicResults = mugicResults.find({'gsx$cost': {'$gte': this.mc.min.value}});
    }
    if (this.mc.max.value > 0 && this.mc.max.value >= this.mc.min.value) {
      creatureResults = creatureResults.find({'gsx$mugicability': {'$lte': this.mc.max.value}});
      mugicResults = mugicResults.find({'gsx$cost': {'$lte': this.mc.max.value}});
    }

    if (this.energy.min.value > 0) {
      creatureResults = creatureResults.find({'gsx$energy': {'$gte': this.energy.min.value}});
    }
    if (this.energy.max.value > 0 && this.energy.max.value >= this.energy.min.value) {
      creatureResults = creatureResults.find({'gsx$energy': {'$lte': this.energy.max.value}});
    }

    if (this.bp.min.value >= 0) {
      attackResults = attackResults.find({'gsx$bp': {'$gte': this.bp.min.value}});
    }
    if (this.bp.max.value && this.bp.max.value >= 0 && this.bp.max.value >= this.bp.min.value) {
      attackResults = attackResults.find({'gsx$bp': {'$lte': this.bp.max.value}});
    }

    if (this.base.min.value >= 0) {
      attackResults = attackResults.find({'gsx$base': {'$gte': this.base.min.value}});
    }
    if (this.base.max.value && this.base.max.value >= 0 && this.base.max.value >= this.base.min.value) {
      attackResults = attackResults.find({'gsx$base': {'$lte': this.base.max.value}});
    }

    if (this.stones.courage.value > 0) {
      creatureResults = creatureResults.find({'gsx$courage': {'$gte': this.stones.courage.value}});
    }
    if (this.stones.power.value > 0) {
      creatureResults = creatureResults.find({'gsx$power': {'$gte': this.stones.power.value}});
    }
    if (this.stones.wisdom.value > 0) {
      creatureResults = creatureResults.find({'gsx$wisdom': {'$gte': this.stones.wisdom.value}});
    }
    if (this.stones.speed.value > 0) {
      creatureResults = creatureResults.find({'gsx$speed': {'$gte': this.stones.speed.value}});
    }

    if (this.stones.unique.checked) {
      attackResults = attackResults.find({'gsx$unique': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$unique': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$unique': {'$gt': 0}});
      locationResults = locationResults.find({'gsx$unique': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$unique': {'$gt': 0}});
    }

    if (this.stones.loyal.checked) {
      attackResults = attackResults.find({'gsx$loyal': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$loyal': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$loyal': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$loyal': {'$gt': 0}});
    }

    if (this.stones.legendary.checked) {
      attackResults = attackResults.find({'gsx$legendary': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$legendary': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$legendary': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$legendary': {'$gt': 0}});
    }

    if (this.stones.past.checked) {
      attackResults = attackResults.find({'gsx$past': {'$gt': 0}});
      battlegearResults = battlegearResults.find({'gsx$past': {'$gt': 0}});
      creatureResults = creatureResults.find({'gsx$types': {'$regex': new RegExp("past", 'i')}});
      locationResults = locationResults.find({'gsx$past': {'$gt': 0}});
      mugicResults = mugicResults.find({'gsx$past': {'$gt': 0}});
    }

    if (this.stones.mirage.checked) {
      locationResults = locationResults.find({'gsx$mirage': {'$gt': 0}});
    }

    if (this.stones.initiative.value) {
      let textList = this.stones.initiative.value.split(",").filter(Boolean).map((item) => {
        return ({'$regex': new RegExp(item.trim(), 'i')});
      });
      locationResults = locationResults.find({'gsx$initiative': {'$or': textList}});
    }

    // Merge data
    if (!this.type || this.type=="Attack") {
      let temp = attackResults.data();
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (!this.type || this.type=="Battlegear") {
      let temp = battlegearResults.data();
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (!this.type || this.type=="Creature") {
      let temp = creatureResults.data()
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (!this.type || this.type=="Location") {
      let temp = locationResults.data()
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (!this.type || this.type=="Mugic") {
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
