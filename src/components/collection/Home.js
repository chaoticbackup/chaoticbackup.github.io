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
export default class SingleCreature extends React.Component {
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

    let numpages = Math.ceil(this.content.length / this.n);
    let elements = this.content.slice(this.n * (this.p-1), this.n * this.p); 

    // TODO advanced filters
    let searchName = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let name = new RegExp(this.input.value, 'i');
      let results = store.cards.creatures.chain().find({'gsx$name': {'$regex': name} }).where((obj) => {return (!obj.gsx$thumb == '');}).simplesort('gsx$name').data();   
      if (results.length > 0) this.content = results;
      else this.content = [{'text': 'No Results Found'}];
      this.p = 1;
    }
    const searchBar = (
      <form onSubmit={searchName}>
        <input type="text" ref={(input) => this.input = input} />
        <input type="submit" value="Search" />
      </form>
    );

    let next = () => {
      if (this.p < numpages) return(<button onClick={ () => {this.p++;} }>next</button>);
      else return(<button disabled>next</button>);
    }
    let prev = () => {
      if (this.p > 1) return(<button onClick={ () => {this.p--;} }>prev</button>);
      else return(<button disabled>prev</button>);
    }
    const navigation = (
      <div style={{textAlign: 'left'}}>
        <p>Showing page {this.p} of {numpages} {prev()} {next()}</p>
        <p>
          Entries per page:&nbsp;
          <input type="number" style={{width: '40px'}} value={this.n} onChange={(event)=>{this.n=event.target.value;}} />
        </p>
      </div>
    );

    const output = () => {
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
        </p>
        <br />
        {searchBar}
        <br />
        {navigation}
        <br />
        {output()}
      </div>
    );

  }

}

