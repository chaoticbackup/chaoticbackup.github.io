import React from 'react';
import Base from './_base';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import Phase from './rules/phase';

@observer
export default class Turn extends Base {
	activeplayer = 0;

	constructor(props) {
		super(props);
	}

	// {'event': 'action'}
	makeChange = (change) => {
		if (!change) return;
		console.log('turn ->', change);
		// TODO
		let action = change.action;
		switch (change.event) {

		// change the game's phase
		case "phase": {
			// action: "string"
			Phase.phase = action;
			break;
		}
		default:
			break;
		}
	}

	render() {
		// class doesn't have gui
		return(<div />);
	}

}
