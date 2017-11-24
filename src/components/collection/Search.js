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

  constructor() {
    super();
    this.reset();
    this.filter = new loki("filter.db");
  }

  reset = () => {
    this.type = "";
    this.swamp = "or";
    this.stones = {};
    this.tribes = {};
    this.elements = {};
    this.rarity = {};
    this.sets = {};
    this.gender = {};
    this.mc = {};
  };

  render() {

    let setsInput = [];
    for (const key in API.sets) {
      setsInput.push(<label key={key}><input type="checkbox" ref={(input) => this.sets[key] = input} />{API.sets[key]}</label>);
    }

    return (
      <div>
        <form onSubmit={this.search}>
          <label>Name: <input type="text" ref={(input) => this.stones.name = input} /></label>&nbsp;&nbsp;
          <label>Text: <input type="text" ref={(input) => this.stones.text = input} /></label>
          <br /><br />
          <label>
            Type:&nbsp;
            <select onChange={(e) => {this.type = e.target.value}} >
              <option value=""></option>
              <option value="Attack">Attack</option>
              <option value="Creature">Creature</option>
            </select>
          </label>&nbsp;&nbsp;
          <label>Subtypes: <input type="text" ref={(input) => this.stones.subtypes = input} /></label>
          <br /><br />
          <div>
            <input type="checkbox" ref={(input) => this.tribes.danian = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/danian.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.tribes.mipedian = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/mipedian.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.tribes.overworld = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/overworld.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.tribes.underworld = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/underworld.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.tribes["m'arrillian"] = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/m'arrillian.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.tribes.generic = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/generic.png"} />
          </div>
          <br />
          <div>
            <input type="button" value={this.swamp} onClick={(e)=>{this.swamp = (this.swamp == "or" ? "and" : "or"); e.target.value = this.swamp;}}/>
            <input type="checkbox" ref={(input) => this.elements.fire = input}/><img height="16" className="icon" src={"/src/img/icons/elements/fire.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.elements.air = input}/><img height="16" className="icon" src={"/src/img/icons/elements/air.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.elements.earth = input}/><img height="16" className="icon" src={"/src/img/icons/elements/earth.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.elements.water = input}/><img height="16" className="icon" src={"/src/img/icons/elements/water.png"} />&nbsp;
            <input type="checkbox" ref={(input) => this.stones.noElements = input}/><span>No Elements</span>
          </div>
          <br />
          <div>
            <label><input type="checkbox" ref={(input) => this.rarity["Common"] = input}/>Common</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.rarity["Uncommon"] = input}/>Uncommon</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.rarity["Rare"] = input}/>Rare</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.rarity["Super Rare"] = input}/>Super Rare</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.rarity["Ultra Rare"] = input}/>Ultra Rare</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.rarity["Promo"] = input}/>Promo</label>
          </div>
          <br />
          <div>{setsInput}</div>
          <br />
          <div>
            <label>Min Mugic Counters: <input type="text" style={{width: '20px'}} ref={(input) => this.mc.min = input} /></label>&nbsp;
            <label>Max Mugic Counters: <input type="text" style={{width: '20px'}} ref={(input) => this.mc.max = input} /></label>
          </div>
          <br />
          <div>
            <label><input type="checkbox" ref={(input) => this.stones.unique = input}/>Unique</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.stones.loyal = input}/>loyal</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.stones.legendary = input}/>Male</label>
          </div>
          <br />
          <div>
            <label><input type="checkbox" ref={(input) => this.gender.Ambiguous = input}/>Ambiguous</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.gender.Female = input}/>Female</label>&nbsp;
            <label><input type="checkbox" ref={(input) => this.gender.Male = input}/>Male</label>
          </div>
          <br />
          <p>
            Since not all data has been entered not all cards are listed,<br />
            to see incomplete cards, click&nbsp;
            <label>"Show all cards":<input type="checkbox" ref={(input) => this.stones.allCards = input}/></label>
          </p>
          <br />
          <input type="submit" value="Search" />&nbsp;&nbsp;
          <input type="button" value="Reset" disabled onClick={this.reset} />
        </form>
      </div>
    );
  }

  // TODO advanced filters
  search = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Sort data descending alphabetically
    let filter = this.filter.addCollection('filter');
    var pview = filter.addDynamicView('filter');
    pview.applySimpleSort('gsx$name');

    // begin data filtering
    // TODO add other types
    let creatureResults = API.cards.creatures.chain();
    let attackResults = API.cards.attacks.chain();

    // ignores cards without thumbnails
    // TODO eventually remove
    if (!this.stones.allCards.checked){
      creatureResults = creatureResults.where((obj) => {return (!obj.gsx$thumb == '');});
      attackResults = attackResults.where((obj) => {return (!obj.gsx$thumb == '');});
    }

    // Search by name
    if (this.stones.name.value) {
      creatureResults = creatureResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(this.stones.name.value, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(this.stones.name.value, 'i')}}
      ]});
      attackResults = attackResults.find({'$or': [
        {'gsx$name': {'$regex': new RegExp(this.stones.name.value, 'i')}},
        {'gsx$tags': {'$regex': new RegExp(this.stones.name.value, 'i')}},
      ]});
    }

    if (this.stones.text.value) {
      creatureResults = creatureResults.find({'$or': [
        {'gsx$tags': {'$regex': new RegExp(this.stones.text.value, 'i')}},
        {'gsx$ability': {'$regex': new RegExp(this.stones.text.value, 'i')}},
        {'gsx$flavortext': {'$regex': new RegExp(this.stones.text.value, 'i')}},
        {'gsx$brainwashedability': {'$regex': new RegExp(this.stones.text.value, 'i')}}
      ]});
      attackResults = attackResults.find({'$or': [
        {'gsx$tags': {'$regex': new RegExp(this.stones.text.value, 'i')}},
        {'gsx$ability': {'$regex': new RegExp(this.stones.text.value, 'i')}},
        {'gsx$flavortext': {'$regex': new RegExp(this.stones.text.value, 'i')}}
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
      for (const element in this.elements) {
        if (this.elements[element].checked) {
          elementsList.push({'$regex': new RegExp(element, 'i')});
        }
      }
      let elementsList2 = [{'gsx$fire': {'$gte': 0}}, {'gsx$air': {'$gte': 0}}, {'gsx$earth': {'$gte': 0}}, {'gsx$water': {'$gte': 0}}]
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
      creatureResults = creatureResults.find({'gsx$rarity': {'$or': rarityList} });
      attackResults = attackResults.find({'gsx$rarity': {'$or': rarityList} });
    }

    let setsList = [];
    for (const key in this.sets) {
      if (this.sets[key].checked) {
        setsList.push({'$eq': key});
      }
    }
    if (setsList.length > 0) {
      creatureResults = creatureResults.find({'gsx$set': {'$or': setsList} });
      attackResults = attackResults.find({'gsx$set': {'$or': setsList} });
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

    let subtypesList = this.stones.subtypes.value.split(/[ ,]+/).filter(Boolean).map((item) => {
      return ({'$regex': new RegExp(item, 'i')});
    });
    if (subtypesList.length > 0) {
      creatureResults = creatureResults.find({'gsx$types': {'$or': subtypesList} });
    }

    if (this.mc.min.value > 0) {
      creatureResults = creatureResults.find({'gsx$mugicability': {'$gte': this.mc.min.value}});
    }
    if (this.mc.max.value > 0 && this.mc.max.value >= this.mc.min.value) {
      creatureResults = creatureResults.find({'gsx$mugicability': {'$lte': this.mc.max.value}});
    }

    if (this.stones.unique.checked) {
      creatureResults = creatureResults.find({'gsx$unique': {'$gt': 0}});
      attackResults = attackResults.find({'gsx$unique': {'$gt': 0}});
    }

    if (this.stones.loyal.checked) {
      creatureResults = creatureResults.find({'gsx$loyal': {'$gt': 0}});
      attackResults = attackResults.find({'gsx$loyal': {'$gt': 0}});
    }

    if (this.stones.legendary.checked) {
      creatureResults = creatureResults.find({'gsx$legendary': {'$gt': 0}});
      attackResults = attackResults.find({'gsx$legendary': {'$gt': 0}});
    }

    // Merge data
    if (!this.type || this.type=="Creature") {
      let temp = creatureResults.data()
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }
    if (!this.type || this.type=="Attack") {
      let temp = attackResults.data();
      temp.forEach(function(v){ delete v.$loki });
      filter.insert(temp);
    }

    let results = pview.data();
    this.filter.removeCollection('filter');
    if (results.length > 0) this.props.handleContent(results);
    else this.props.handleContent([{'text': 'No Results Found'}]);
  }
}
