import Rule from './_rule';

export class Turn extends Rule {
	activeplayer = 0;

	constructor(receiveTurnChange, player1, player2) {
		super();
		this.submitChange = receiveTurnChange;
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

}

class Phase_Singleton extends Rule {
	phase = "none";

	// Singleton
	static getInstance() {
	  if (!this.instance) { this.instance = new Phase_Singleton(); }
	  return this.instance;
	}

	constructor() {
		super();
		this.phase = "game start";
	}

}
const Phase = Phase_Singleton.getInstance();
export {Phase};
