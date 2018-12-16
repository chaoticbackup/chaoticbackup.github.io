import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../SpreadsheetData';
import {Loading} from '../Snippets';
import Board from './Board.js'
import '../../scss/play.scss';

@inject((stores, props, context) => props) @observer
export default class Play extends React.Component {
  @observable loaded = false;

  constructor(props) {
  	super(props);
  }

  handleChange() {
    // When handling movement, flip the card's owner before sending network
  }

  componentDidUpdate() {
    // this.makeChange();
    this.makeChange({event:"active", action: true});
  }

  // TODO own GUI class
  endTurn() {
    this.makeChange({event: "active", action: true});
  }

  render() {
  	if (this.loaded == false) {
  	  API.LoadDB([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => { this.loaded = true; });
      return (<Loading />);
  	}
    
    return (
      <div className="play">
        <div className="gui">
          <div className="endturn"><button onClick={this.endTurn.bind(this)}>End Turn</button></div>
        </div>
        <Board 
          submitChange={this.handleChange.bind(this)} 
          ref={n => {if (n) this.makeChange = n.makeChange}}
        />
      </div>
    );
  }
}
