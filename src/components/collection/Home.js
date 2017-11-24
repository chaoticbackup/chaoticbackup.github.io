import React from 'react';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import Creature from './Creature';
import Attack from './Attack';
import SearchForm from './Search';

@inject((stores, props, context) => props) @observer
export default class CollectionHome extends React.Component {
  @observable n = 10;
  @observable p = 1;
  @observable content = [];

  handleContent(content) {
    this.content = content;
    this.p = 1;
  }

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
    if (!store.cards.built.includes("attacks_Cards")) {
      store.cards.setupAttacks("Cards");
      return (<span>Loading...</span>);
    }

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
        if (element.gsx$type == "Attack") return (<Attack attack={element} key={i} />);
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
        <SearchForm handleContent={this.handleContent.bind(this)} />
        <hr />
        {this.navigation()}<br />
        {output()}
        {this.navigation()}<br />
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
          Entries per page:&nbsp;{this.n}&nbsp;
          {/*<input type="text" style={{width: '40px'}} value={this.n}
            onChange={(event) => {let x = event.target.value; if (!isNaN(x)) this.n=x;}
          />*/}
          <input type="button" value="10" onClick={(e) => this.n=e.target.value} />&nbsp;
          <input type="button" value="20" onClick={(e) => this.n=e.target.value} />&nbsp;
          <input type="button" value="50" onClick={(e) => this.n=e.target.value} />
        </p>
      </div>
    );
  };

}

