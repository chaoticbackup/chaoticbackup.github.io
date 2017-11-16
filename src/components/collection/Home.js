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
          This page is under construction. <br />
          In the meantime, you can check out&nbsp;
          <a style={{textDecoration: "underline"}} href="http://www.tradecardsonline.com/im/editCollection/collection_type/1">Trade Cards Online</a>
          .
        </p><br />
        {this.searchForm()}<br />
        {this.navigation()}<br />
        {output()}
      </div>
    );
  }

  searchForm() {
    let tribes = {};

    // TODO advanced filters
    let search = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let baseResultset = API.cards.creatures.chain().where((obj) => {return (!obj.gsx$thumb == '');});

      // Search by name
      if (this.name.value) {
        baseResultset = baseResultset.find({'gsx$name': {'$regex': new RegExp(this.name.value, 'i')} });
      }

      // Search by tribe
      var tribesList = [];
      for (const tribe in tribes) {
        if (tribes[tribe].checked) {
          tribesList.push({'$regex': new RegExp(tribe, 'i')});
        }
      }
      if (tribesList.length > 0) {
        baseResultset = baseResultset.find({'gsx$tribe': {'$or': tribesList} });
      }

      // Sort data descending alphabetically
      let results = baseResultset.simplesort('gsx$name').data();
      if (results.length > 0) this.content = results;
      else this.content = [{'text': 'No Results Found'}];
      this.p = 1;
    }

    return (
      <form onSubmit={search}>
        <label>Card Name:<input type="text" ref={(input) => this.name = input} /></label><br />
        <input type="checkbox" ref={(input) => tribes.danian = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/danian.png"} />&nbsp;
        <input type="checkbox" ref={(input) => tribes.mipedian = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/mipedian.png"} />&nbsp;
        <input type="checkbox" ref={(input) => tribes.overworld = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/overworld.png"} />&nbsp;
        <input type="checkbox" ref={(input) => tribes.underworld = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/underworld.png"} />&nbsp;
        <input type="checkbox" ref={(input) => tribes["m'arrillian"] = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/m'arrillian.png"} />&nbsp;
        <input type="checkbox" ref={(input) => tribes.generic = input}/><img height="16" className="icon" src={"/src/img/icons/tribes/generic.png"} />
        <br /><input type="submit" value="Search" />
      </form>
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

