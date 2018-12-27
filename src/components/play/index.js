import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../SpreadsheetData';
import {Loading} from '../Snippets';
import Board from './Board';
import Gui from './Gui';
import {Turn} from './rules/turn';

import '../../scss/play/play.scss';
import '../../scss/play/gui.scss';

@inject((stores, props, context) => props) @observer
export default class Play extends React.Component {
  @observable loaded = false;

  constructor(props) {
  	super(props);
    const turn = new Turn(this.receiveTurnChange.bind(this));
    this.makeTurnChange = turn.makeChange;
  }

  componentDidUpdate() {
    // todo remove / currently simulating
    this.makeBoardChange({event:"active", action: true});
    this.makeTurnChange({event: "phase", action: "movement"});
  }

  sendNetworkChange(change, destination) {
    // TODO implement network change
    console.log("network ->", destination, change);
  }

  // wrapper function
  receiveNetworkChange(change, destination) {
    this.recieveChange(change, destination);
  }

  // Parent function to handle any intercomponent or remote commands
  // send the command to that destination
  recieveChange(change, destination) {
    switch(destination) {
      case "board":
        this.makeBoardChange(change);
        break;
      case "gui":
        this.makeGuiChange(change);
        break;
      case "turn":
        this.makeTurnChange(change);
        break;
      default:
        throw "invalid destination";
    }
  }

  recieveGuiChange(change, destination) {
    if (destination) this.recieveChange(change, destination);
    this.sendNetworkChange(change, destination || "gui");
  }

  // When handling movement, flip the card's owner before sending network
  // Flip the board's numbers
  receiveBoardChange(change, destination) {
    if (destination) this.recieveChange(change, destination);
    this.sendNetworkChange(change, destination || "board");
  }

  receiveTurnChange(change, destination) {

  }

  render() {
  	if (this.loaded == false) {
  	  API.LoadDB([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => { this.loaded = true; });
      return (<Loading />);
  	}
    
    return (
      <div className="play">
        <Gui 
          submitChange={this.recieveGuiChange.bind(this)} 
          ref={n => {if (n) this.makeGuiChange = n.makeChange}}
        />
        <Board 
          submitChange={this.receiveBoardChange.bind(this)} 
          ref={n => {if (n) this.makeBoardChange = n.makeChange}}
        />
      </div>
    );
  }
}
