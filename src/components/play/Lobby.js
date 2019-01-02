import React from 'react';
import Base from './_base';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';


@observer
export default class Board extends Base {
	@observable o_id = "";
	
	constructor(props) {
		super(props);
	}

	single() {
		this.props.submitChange({event: "single", action: "load"}, "game");
	}

	connect(e) {
		if (this.o_id == this.props.uid) {
			return; // TODO
		}
		this.props.submitChange({event: "connect", action: this.o_id}, "game");
	}

	render() {
		return(
			<div className="lobby">
				<span>You're id is {this.props.uid}</span>
				<br /><br />
				<form>
					<input type="text" name="opponent's id" value={this.o_id} onChange={(e) => this.o_id = e.target.value} />
					<input type="button" value="Connect" onClick={this.connect.bind(this)} />
				</form>
				<br /><br />
				<button onClick={this.single.bind(this)}>Single Player</button>
			</div>
		);
	}

}
