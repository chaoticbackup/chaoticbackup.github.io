import Rule from './_rule';

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
export default Phase_Singleton.getInstance();
