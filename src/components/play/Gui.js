import React from 'react';
import Base from './_base';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

@observer
export default class Gui extends Base {

	constructor(props) {
		super(props);
	}

	makeChange = (change) => {
		// TODO
	}

	endTurn() {
	  this.props.submitChange({event: "active", action: true}, "board");
	}

	render() {
		return (
			<div className="gui">
			  <div className="card-preview">
			    <div className="location"><img src="https://drive.google.com/uc?id=0B6oyUfwoM3u1SHJ5ejJPTk85THM" /></div>
			  </div>
			  <div className="hand">
			    <span className="card_name">Hand</span>
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
			  <div className="decks">
			    <div className="general">
			      <span className="card_name">General Discard</span>
			      <img></img>
			    </div>
			    <div className="attack">
			      <span className="card_name">Attack Discard</span>
			      <img></img>
			    </div>
			    <div className="draw">
			      <span className="card_name">Attack Deck</span>
			      <img></img>
			    </div>
			  </div>
			  <div className="left-gui">
			    <div className="burst">
			      <span>No cards on burst</span>
			    </div>
			    <div className="turn-actions">
			      <div className="endturn"><button onClick={this.endTurn.bind(this)}>Pass</button></div>
			    </div>
			  </div>
			  <div className="right-gui">
			    <div className="chat">
			      <span>Chatting with Opponent</span>
			    </div>
			  </div>
			</div>
		);	
	}
}
