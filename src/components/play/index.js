import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../SpreadsheetData';
import {Loading} from '../Snippets';
import Board from './Board.js'
import '../../scss/play/play.scss';
import '../../scss/play/gui.scss';

@inject((stores, props, context) => props) @observer
export default class Play extends React.Component {
  @observable loaded = false;

  constructor(props) {
  	super(props);
  }

  handleChange() {
    // When handling movement, flip the card's owner before sending network
    // Flip the board's numbers
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
          <div className="location"><img src="https://drive.google.com/uc?id=0B6oyUfwoM3u1SHJ5ejJPTk85THM" /></div>
          <div className="hand">
            <div className="attacks">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="mugic">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="discard">
            <div className="general">
              <span className="card_name">General Discard</span>
              <img></img>
            </div>
            <div className="attack">
              <span className="card_name">Attack Discard</span>
              <img></img>
            </div>
          </div>
          <div className="right-gui">
            <div className="burst">
              <span>No cards on burst</span>
            </div>
            <div className="turn-actions">
              <div className="endturn"><button onClick={this.endTurn.bind(this)}>Pass</button></div>
            </div>
            <div className="chat">
              <span>Chatting with Opponent</span>
            </div>
          </div>
        </div>
        <Board 
          submitChange={this.handleChange.bind(this)} 
          ref={n => {if (n) this.makeChange = n.makeChange}}
        />
      </div>
    );
  }
}
