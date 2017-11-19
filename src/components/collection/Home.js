import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../PageNotFound';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import Creature from './Creature';
import UnderConstruction from '../UnderConstruction';


@inject((stores, props, context) => props) @observer
export default class CollectionHome extends React.Component {
  @observable n = 10;
  @observable p = 1;
  @observable content = [];
  swamp = "or";

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }

    const store = API;
    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    // Load all the data
    if (!store.cards.built.includes("creatures_Cards")) {
      store.cards.setupCreatures("Cards");
      return (<span>Loading...</span>);
    }

    if (!store.cards.built.includes("mugic_Cards")) {
      store.cards.setupMugic("Cards");
      return (<span>Loading...</span>);
    }

    if (this.content.length == 0) {
      // Only use cards with thumb nails for now
      // TODO add other types
      this.content = store.cards.creatures.chain().where((obj) => {return (!obj.gsx$thumb == '');}).simplesort('gsx$name').data();
    }

    const output = () => {
      let elements = this.content.slice(this.n * (this.p-1), this.n * this.p);

      if (elements.length == 1 && elements[0].text) {
        return (
          <div style={{textAlign: 'left'}}>{elements[0].text}</div>
        );
      }
      return elements.map((element, i) => {
        if (element.gsx$type == "Creature") return (<Creature creature={element} key={i} />);
        else return (<div>Empty</div>);
      });
    }

    return (
      <div>
        <p>
          This page is under construction. In the meantime, you can check out&nbsp;
          <a style={{textDecoration: "underline"}} href="http://www.tradecardsonline.com/im/editCollection/collection_type/1">Trade Cards Online</a>
          .
        </p>
        <hr />
        {this.searchForm()}
        <hr />
        {this.navigation()}<br />
        {output()}
      </div>
    );
  }

  searchForm() {
    let stones = {};
    let tribes = {};
    let elements = {};
    let rarity = {};
    let sets = {};
    let gender = {};

    // TODO advanced filters
    let search = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let baseResultset = API.cards.creatures.chain();

      // ignores cards without thumbnails
      if (!stones.allCards.checked){
        baseResultset = baseResultset.where((obj) => {return (!obj.gsx$thumb == '');});
      }

      // Search by name
      if (stones.name.value) {
        baseResultset = baseResultset.find({'$or': [
          {'gsx$name': {'$regex': new RegExp(stones.name.value, 'i')}},
          {'gsx$tags': {'$regex': new RegExp(stones.name.value, 'i')}}
        ]});
      }

      // Search by tribe
      let tribesList = [];
      for (const tribe in tribes) {
        if (tribes[tribe].checked) {
          tribesList.push({'$regex': new RegExp(tribe, 'i')});
        }
      }
      if (tribesList.length > 0) {
        baseResultset = baseResultset.find({'gsx$tribe': {'$or': tribesList} });
      }

      // no elements
      if (stones.noElements.checked) {
        baseResultset = baseResultset.where((obj) => {return (obj.gsx$elements == '');});
      }
      // Search by elements
      else {
        let elementsList = [];
        for (const element in elements) {
          if (elements[element].checked) {
            elementsList.push({'$regex': new RegExp(element, 'i')});
          }
        }
        if (elementsList.length > 0) {
          if (this.swamp == "or") {
            baseResultset = baseResultset.find({'gsx$elements': {'$or': elementsList} });
          }
          if (this.swamp == "and") {
           baseResultset = baseResultset.find({'gsx$elements': {'$and': elementsList} });
          }
        }
      }

      let rarityList = [];
      for (const key in rarity) {
        if (rarity[key].checked) {
          rarityList.push({'$eq': key});
        }
      }
      if (rarityList.length > 0) {
        baseResultset = baseResultset.find({'gsx$rarity': {'$or': rarityList} });
      }

      let setsList = [];
      for (const key in sets) {
        if (sets[key].checked) {
          setsList.push({'$eq': key});
        }
      }
      if (setsList.length > 0) {
        baseResultset = baseResultset.find({'gsx$set': {'$or': setsList} });
      }

      let genderList = [];
      for (const key in gender) {
        if (gender[key].checked) {
          genderList.push({'$regex': new RegExp(key, 'i')})
        }
      }
      if (genderList.length > 0) {
        baseResultset = baseResultset.find({'gsx$gender': {'$or': genderList} });
      }

      let subtypesList = stones.subtypes.value.split(/[ ,]+/).filter(Boolean).map((item) => {
        return ({'$regex': new RegExp(item, 'i')});
      });
      console.log(subtypesList);
      if (subtypesList.length > 0) {
        baseResultset = baseResultset.find({'gsx$types': {'$or': subtypesList} });
      }

      // Sort data descending alphabetically
      let results = baseResultset.simplesort('gsx$name').data();
      if (results.length > 0) this.content = results;
      else this.content = [{'text': 'No Results Found'}];
      this.p = 1;
    }

    let setsInput = [];
    for (const key in API.sets) {
      setsInput.push(<label key={key}><input type="checkbox" ref={(input) => sets[key] = input} />{API.sets[key]}</label>);
    }

    return (
      <div>
        <form onSubmit={search}>
          <label>Card Name:<input type="text" ref={(input) => stones.name = input} /></label>
          <br /><br />
          <label>Subtypes:<input type="text" ref={(input) => stones.subtypes = input} /></label>
          <br /><br />
          <div>
            <input type="checkbox" ref={(input) => tribes.danian = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/danian.png"} />&nbsp;
            <input type="checkbox" ref={(input) => tribes.mipedian = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/mipedian.png"} />&nbsp;
            <input type="checkbox" ref={(input) => tribes.overworld = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/overworld.png"} />&nbsp;
            <input type="checkbox" ref={(input) => tribes.underworld = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/underworld.png"} />&nbsp;
            <input type="checkbox" ref={(input) => tribes["m'arrillian"] = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/m'arrillian.png"} />&nbsp;
            <input type="checkbox" ref={(input) => tribes.generic = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/generic.png"} />
          </div>
          <br />
          <div>
            <input type="button" value={this.swamp} onClick={(e)=>{this.swamp = (this.swamp == "or" ? "and" : "or"); e.target.value = this.swamp;}}/>
            <input type="checkbox" ref={(input) => elements.fire = input}/><img height="16" className="icon" src={"/src/img/icons/elements/fire.png"} />&nbsp;
            <input type="checkbox" ref={(input) => elements.air = input}/><img height="16" className="icon" src={"/src/img/icons/elements/air.png"} />&nbsp;
            <input type="checkbox" ref={(input) => elements.earth = input}/><img height="16" className="icon" src={"/src/img/icons/elements/earth.png"} />&nbsp;
            <input type="checkbox" ref={(input) => elements.water = input}/><img height="16" className="icon" src={"/src/img/icons/elements/water.png"} />&nbsp;
            <input type="checkbox" ref={(input) => stones.noElements = input}/><span>No Elements</span>
          </div>
          <br />
          <div>
            <label><input type="checkbox" ref={(input) => rarity["Common"] = input}/>Common</label>&nbsp;
            <label><input type="checkbox" ref={(input) => rarity["Uncommon"] = input}/>Uncommon</label>&nbsp;
            <label><input type="checkbox" ref={(input) => rarity["Rare"] = input}/>Rare</label>&nbsp;
            <label><input type="checkbox" ref={(input) => rarity["Super Rare"] = input}/>Super Rare</label>&nbsp;
            <label><input type="checkbox" ref={(input) => rarity["Ultra Rare"] = input}/>Ultra Rare</label>&nbsp;
            <label><input type="checkbox" ref={(input) => rarity["Promo"] = input}/>Promo</label>
          </div>
          <br />
          <div>{setsInput}</div>
          <br />
          <div>
            <label><input type="checkbox" ref={(input) => gender.Ambiguous = input}/>Ambiguous</label>&nbsp;
            <label><input type="checkbox" ref={(input) => gender.Female = input}/>Female</label>&nbsp;
            <label><input type="checkbox" ref={(input) => gender.Male = input}/>Male</label>
          </div>
          <br />
          <p>
            Since not all data has been entered not all cards are listed,<br />
            to see incomplete cards, click&nbsp;
            <label>"Show all cards":<input type="checkbox" ref={(input) => stones.allCards = input}/></label>
          </p>
          <br />
          <input type="submit" value="Search" />&nbsp;&nbsp;<input type="button" disabled value="Reset" />
        </form>
      </div>
    );
  }


  navigation() {
    let numpages = Math.ceil(this.content.length / this.n);

    let next = () => {
      if (this.p < numpages) return(<button onClick={ () => {this.p++;} }>next</button>);
      else return(<button disabled>next</button>);
    }

    let prev = () => {
      if (this.p > 1) return(<button onClick={ () => {this.p--;} }>prev</button>);
      else return(<button disabled>prev</button>);
    }

    return (
      <div style={{textAlign: 'left'}}>
        <p>Showing page {this.p} of {numpages} {prev()} {next()}</p>
        <p>
          Entries per page:&nbsp;
          <input type="number" style={{width: '40px'}} value={this.n} onChange={(event)=>{this.n=event.target.value;}} />
        </p>
      </div>
    );
  };

}

