import React from 'react';
import {observable, reaction} from "mobx";
import {observer, inject} from 'mobx-react';
import Peer from 'peerjs';
import API from '../SpreadsheetData';
import {Loading} from '../Snippets';
import Board from './Board';
import Gui from './Gui';
import Lobby from './Lobby';
import Turn from './Turn';

import '../../scss/play/play.scss';
import '../../scss/play/gui.scss';

@inject((stores, props, context) => props) @observer
export default class Play extends React.Component {
  @observable loaded = false;
  @observable id = "";
  @observable player = -1;
  @observable format = 6;

  constructor(props) {
  	super(props);
    this.setupNetworking();

    // TODO, temperary
    // const reaction1 = reaction(
    //   () => this.player,
    //   (player, reaction) => {
    //     console.log(player);
    //     this.loadgame();
    //     reaction.dispose();
    //   },
    //   {delay: 500} // wait for component to load
    // );
  }

  setupNetworking() {
    let peer = new Peer();

    peer.on('open', (id) => {
     this.id = id;
    });

    peer.on('connection', (conn) => {
      if (this.conn) return;
      this.conn = conn;
      this.conn.on("open", () => {
        this.player = 2; // TODO properly assign player
        this.conn.on('data', this.receiveNetworkChange.bind(this));
      });
    });

    this.peer = peer;
  }

  sendNetworkChange(change, destination) {
    // If in single player mode, ignore network sends
    if (this.player < 1) return;
    // console.log("->", destination, change);
    this.conn.send({change: change, destination: destination});
  }

  // wrapper function
  receiveNetworkChange(packet) {
    console.log("<-", packet.destination, packet.change);
    this.recieveChange(packet.change, packet.destination);
  }

  // Parent function to handle any intercomponent or remote commands
  // send the command to that destination
  // When receiving a change that does not include a destination,
  // it is assumed that the component has handled its internal state
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
      case "lobby":
        this.makeLobbyChange(change);
        break;
      case "game":
        this.makeChange(change);
        break;
      default:
        throw "invalid destination";
    }
  }

  recieveGuiChange(change, destination) {
    if (destination) this.recieveChange(change, destination);
    this.sendNetworkChange(change, destination || "gui");
  }

  receiveBoardChange(change, destination) {
    if (destination) this.recieveChange(change, destination);
    let ch = JSON.parse(JSON.stringify(change)); // make "copy"
    // When handling movement, flip the board's numbers before sending network
    if (typeof(ch.action) === 'object') {
      if (ch.action.hasOwnProperty('space')) {
        ch.action.space = (this.format * 2 - ch.action.space) - 1;
      }
      else if (ch.action.hasOwnProperty('src')) {
        ch.action.src = (this.format * 2 - ch.action.src) - 1;
        ch.action.dest = (this.format * 2 - ch.action.dest) - 1; 
      }
    }
    this.sendNetworkChange(ch, destination || "board");
  }

  receiveTurnChange(change, destination) {
    if (destination) this.recieveChange(change, destination);
    this.sendNetworkChange(change, destination || "turn");
  }

  recieveLobbyChange(change, destination) {
    this.recieveChange(change, destination || "lobby");
  }

  // for switching between lobby and games
  makeChange(change) {
    if (!change) return;
    let action = change.action;
    switch (change.event) {
    case "single": {
      this.player = 0;
      break;
    }
    case "connect": {
      this.conn = this.peer.connect(change.action);
      this.conn.on("open", () => {
        this.player = 1;
        this.conn.on("data", this.receiveNetworkChange.bind(this));
      });
      break;
    }
    default:
      break;
    }
  }

  render() {
  	if (this.loaded == false) {
  	  API.LoadDB([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => { this.loaded = true; });
      return (<Loading />);
  	}
    
    if (this.player < 0)
    return (
      <div className="play">
        <Lobby
          submitChange={this.recieveLobbyChange.bind(this)} 
          ref={n => {if (n) this.makeLobbyChange = n.makeChange}}
          uid={this.id}
        />
      </div>
    );
    else 
    return (
      <div className="play">
        <Turn 
          submitChange={this.receiveTurnChange.bind(this)} 
          ref={n => {if (n) this.makeTurnChange = n.makeChange}}
        />
        <Gui 
          submitChange={this.recieveGuiChange.bind(this)} 
          ref={n => {if (n) this.makeGuiChange = n.makeChange}}
          player={this.player}
        />
        <Board 
          submitChange={this.receiveBoardChange.bind(this)} 
          ref={n => {if (n) this.makeBoardChange = n.makeChange}}
          player={this.player}
        />
      </div>
    );
  }
}
