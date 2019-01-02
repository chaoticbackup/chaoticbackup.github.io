import Rule from './_rule';
import {observable} from "mobx";

// array of array of accesible spaces per swift
const adjacency_6 = {
	0: [1, 2],
	1: [0, 2, 3, 4],
	2: [0, 1, 4, 5],
	3: [1, 4, 6, 7],
	4: [1, 2, 3, 5, 6, 7, 8],
	5: [2, 4, 7, 8],
	6: [3, 4, 7, 9],
	7: [3, 4, 5, 6, 8, 9, 10],
	8: [4, 5, 7, 10],
	9: [6, 7, 10, 11],
	10: [7, 8, 9, 11],
	11: [9, 10]
}

export default class Movement extends Rule {
	@observable source = -1;

	constructor() {
		super();
	}

	// TODO
	canAttack(id) {
		return false;
	}

	moves(spaces, id) {
		// don't select a blank space
		if (spaces[id].creatures[0].data == null) return spaces;
		
		// can't select opposing creatures
		if (spaces[id].creatures[0].controlled == false) return spaces;

		// select a card
		let src_card = spaces[id].creatures[0];
		this.source = id;

		// Calculate range of spaces based on swift
		let swift = ((data) => {
			let s = (new RegExp(/swift ([0-9]+)/gi).exec(data.gsx$ability));
			// TODO brainwashed
			if (s) return parseInt(s[1]);
			return 0;
		})(spaces[id].creatures[0].data);

		let range = ((data) => {
			let r = (new RegExp(/^range/mi).exec(data.gsx$ability));
			// TODO brainwashed
			if (r) return true;
			return false;
		})(spaces[id].creatures[0].data);

		// Start with adjacent spaces
		let valid = adjacency_6[id];
		let invalid = [];
		let attackable = [];
		let last_inx = 0;

		// determine a list of valid spaces to move into
		// for each level of swift, increase moveable range
		for (let mv = 0; mv <= swift; mv++) {
			let lvl = valid;
			for (let i = last_inx; i < valid.length; i++) {
				// if (invalid.includes(valid[i])) continue;
				let des_card = spaces[valid[i]].creatures[0];
				// Ocupied spaces are invalid, but can be used to start combat
				if (des_card.data != null) {
					invalid.push(valid[i]);
					// Can't move into space of own creatures
					// Although it might be able to start combat
					if (!des_card.controlled) {
						attackable.push(i);
					}
				}
				if (swift == 0) continue;
				//  Can't move through without range
				if (des_card.data == null || range) {
					lvl = [].concat(lvl, adjacency_6[valid[i]])
						.filter(function(item, pos, self) {
							return self.indexOf(item) == pos;
						});
				}
			}
			if (mv + 1 > swift) break; // ignore last set
			last_inx = valid.length; // don't reiterate same spaces
			valid = lvl;
		}
		// remove invalid spaces
		valid = valid.filter(x => !invalid.includes(x));

		// set selectable options
		spaces.forEach((space, i) => {
			space.battlegear.forEach((card) => {
				card.selectable = false;
			});
			let des_card = space.creatures[0];
			des_card.selectable = ((src_id, dest_id) => {
				// If already moved, no valid movement
				if (!src_card.moveable) return false;
				// No self space movement
				else if (src_id == dest_id) return false;
				// If its a valid spot
				else if (valid.includes(dest_id)) return true;
				// TODO different effect for attackable?
				else if (attackable.includes(dest_id) && this.canAttack()) return true;
				// if all else its probably not moveable
				else return false;
			})(id, i);
		});

		// creature is now selected
		spaces[id].creatures[0].selected = true;
		spaces[id].creatures[0].selectable = false;

		return spaces;
	}
}
