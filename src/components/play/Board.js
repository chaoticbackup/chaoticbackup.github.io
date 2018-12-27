import React from 'react';
import Base from './_base';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../SpreadsheetData';
import Movement from './rules/movement';
import {Phase} from './rules/turn';
import '../../scss/play/battleboard.scss';

@observer
export default class Board extends Base {
	@observable spaces = [];
	@observable activeplayer = true;

	constructor(props) {
		super(props);
		this.selectCard = this.selectCard.bind(this);

		this.movement = new Movement();

		this.spaces = Array(12).fill({
			'creatures': [this.empty_card("creatures")],
			'battlegear': [this.empty_card("battlegear")],
			'mirage': [this.empty_card("mirage")]
		});

		this.loadcards();
	}

	// TODO
	loadcards() {
		this.spaces[4].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Maxxor", 'i')}});
		this.spaces[4].battlegear[0].data = API.cards.battlegear.findOne({'gsx$name': {'$regex': new RegExp("Maxxor's Torch", 'i')}});
		this.spaces[1].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Staluk", 'i')}});
		this.spaces[1].battlegear[0].data = API.cards.battlegear.findOne({'gsx$name': {'$regex': new RegExp("Vlaric Shard", 'i')}});
		this.spaces[0].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Vidav", 'i')}});
		this.spaces[2].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Dractyl", 'i')}});
		for (let i = 0; i < 6; i++) {
			this.spaces[i].creatures[0].controlled = true;
			this.spaces[i].battlegear[0].controlled = true;
		}
		this.spaces[7].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Chaor", 'i')}});
		this.spaces[7].battlegear[0].data = API.cards.battlegear.findOne({'gsx$name': {'$regex': new RegExp("Whepcrack", 'i')}});
	}

	empty_card(type) {
		let card = {
			'data': null,
			'selected': false,
			'selectable': true,
			'controlled': false
		}
		if (type == "creatures") {
			card.moveable = true;
		}
		return card;
	}

	// {'event': 'action'}
	makeChange = (change) => {
		// seriously calling without a change?
		if (!change) return;
		console.log("board ->", change); // TODO remove

		let action = change.action;
		switch (change.event) {

		// change the active player
		case "active": {
			this.activeplayer = action;
			this.resetCardSelection();
			// when its players turn
			// make creatures moveable 
			if (action) {
				this.spaces.forEach((space) => {
					space.creatures.forEach((card) => {
						card.moveable = true;
					});
				});  
			}
			// when its opposing players turn,
			// make creatures unmoveable
			else {
				this.spaces.forEach((space) => {
					space.creatures.forEach((card) => {
						card.moveable = false;
					});
				});  
			}
			break;
		}

		// add a card to a space
		case "add": {
			// action: {space, type, card}
			this.spaces[action.space][action.type].push(action.card);
			break;
		}

		// remove a specific card at a space
		case "remove": {
			// action: {space, type, index}
			if (index == 0) {
				this.space[action.space][action.type][0] = this.empty_card(action.type);
			}
			else if (index > 0) {
				this.space[action.space][action.type].splice(index, 1);
			}
			break;
		}

		case "removeall": {
			// action: {space, type}
			this.space[action.space][action.type] = [this.empty_card(action.type)];
			break;
		}

		// this is a short hand for moving a creature and its battlegear
		// as part of the movement operation
		case "movement": {
			// action: {src, dest}
			let src = action.src;
			let dest = action.dest;
			this.spaces[dest].creatures = (this.spaces[src].creatures);
			this.spaces[dest].battlegear = (this.spaces[src].battlegear);
			this.spaces[src].creatures = [this.empty_card("creatures")];
			this.spaces[src].battlegear = [this.empty_card("battlegear")];
			break;
		}
		default:
			break;
		}
	}

	resetCardSelection() {
		this.spaces.forEach((space) => {
			space.battlegear.forEach((card) => {
				card.selectable = true;
				card.selected = false;
			});
			space.creatures.forEach((card) => {
				card.selectable = true;
				card.selected = false;
			});
		});  
		this.movement.source = (-1);
	}

	// TODO
	canAttack(id) {
		return false;
	}

	selectCard(e) {
		let id = parseInt(e.target.id.substr(1));
		let type = (() => {
			switch (e.target.id.charAt(0)) {
				case 'b': return 'battlegear';
				case 'c': return 'creatures';
				default: return "";
			}
		})();

		// When clicking a non-valid target, reset selection
		if (this.spaces[id][type][0].selectable == false) {
			return this.resetCardSelection();
		}

		if (Phase.phase == "movement" && type == "creatures") {
			// TODO combat
			// TODO if self selection, check activated ability
			if (this.movement.source == id) {
				return this.resetCardSelection();
			}
			// moving into a space
			if (this.movement.source > 0) {
				this.submitChange({event: "movement", action: {src: this.movement.source, dest: id}});
				// Only one move per turn
				this.spaces[id].creatures[0].moveable = false;
				return this.resetCardSelection();
			}

			// don't select a blank space
			if (this.spaces[id].creatures[0].data == null) return;
			
			// can't select opposing creatures
			if (this.spaces[id].creatures[0].controlled == false) return;

			// select a card
			let src_card = this.spaces[id].creatures[0];
			this.movement.source = id;

			let {valid, attackable} = this.movement.moves(this.spaces, id);

			// set selectable options
			this.spaces.forEach((space, i) => {
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
			this.spaces[id].creatures[0].selected = true;
			this.spaces[id].creatures[0].selectable = false;
		}
	}

	render() {
		return(
			<div className="battleboard"><div className="field">
				<div className="r1">
					<div className="space">
						<Space id={"c0"} cards={this.spaces[0].creatures} selectCard={this.selectCard} />
						<Space id={"b0"} cards={this.spaces[0].battlegear} selectCard={this.selectCard} />
					</div>
				</div>
				<div className="r2">
					<div className="space">
						<Space id={"c1"} cards={this.spaces[1].creatures} selectCard={this.selectCard} />
						<Space id={"b1"} cards={this.spaces[1].battlegear} selectCard={this.selectCard} />
					</div>
					<div className="space">
						<Space id={"c2"} cards={this.spaces[2].creatures} selectCard={this.selectCard} />
						<Space id={"b2"} cards={this.spaces[2].battlegear} selectCard={this.selectCard} />
					</div>
				</div>
				<div className="r3">
					<div className="space">
						<Space id={"c3"} cards={this.spaces[3].creatures} selectCard={this.selectCard} />
						<Space id={"b3"} cards={this.spaces[3].battlegear} selectCard={this.selectCard} />
					</div>
					<div className="space">
						<Space id={"c4"} cards={this.spaces[4].creatures} selectCard={this.selectCard} />
						<Space id={"b4"} cards={this.spaces[4].battlegear} selectCard={this.selectCard} />
					</div>
					<div className="space">
						<Space id={"c5"} cards={this.spaces[5].creatures} selectCard={this.selectCard} />
						<Space id={"b5"} cards={this.spaces[5].battlegear} selectCard={this.selectCard} />
					</div>
				</div>
				<div className="r4">
					<div className="space">
						<Space id={"c6"} cards={this.spaces[6].creatures} selectCard={this.selectCard} />
						<Space id={"b6"} cards={this.spaces[6].battlegear} selectCard={this.selectCard} />
					</div>
					<div className="space">
						<Space id={"c7"} cards={this.spaces[7].creatures} selectCard={this.selectCard} />
						<Space id={"b7"} cards={this.spaces[7].battlegear} selectCard={this.selectCard} />
					</div>
					<div className="space">
						<Space id={"c8"} cards={this.spaces[8].creatures} selectCard={this.selectCard} />
						<Space id={"b8"} cards={this.spaces[8].battlegear} selectCard={this.selectCard} />
					</div>
				</div>
				<div className="r5">
					<div className="space">
						<Space id={"c9"} cards={this.spaces[9].creatures} selectCard={this.selectCard} />
						<Space id={"b9"} cards={this.spaces[9].battlegear} selectCard={this.selectCard} />
					</div>
					<div className="space">
						<Space id={"c10"} cards={this.spaces[10].creatures} selectCard={this.selectCard} />
						<Space id={"b10"} cards={this.spaces[10].battlegear} selectCard={this.selectCard} />
					</div>
				</div>
				<div className="r6">
					<div className="space">
						<Space id={"c11"} cards={this.spaces[11].creatures} selectCard={this.selectCard} />
						<Space id={"b11"} cards={this.spaces[11].battlegear} selectCard={this.selectCard} />
					</div>
				</div>
			</div></div>
		);
	}
}


@inject((stores, props, context) => props) @observer
class Space extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.cards[0].data) {
			return (
				<img id={this.props.id} onClick={this.props.selectCard.bind(this)} 
					className={(this.props.cards[0].selected ? "selected" : "") + " " 
						+ (this.props.cards[0].selectable ? "selectable" : "") + " "
						+ (this.props.cards[0].controlled ? "controlled" : "opposing")}
					src={API.base_image + this.props.cards[0].data.gsx$image} 
				/>
			);
		}
		else {
			return (
				<img id={this.props.id} onClick={this.props.selectCard.bind(this)}
					className={(this.props.cards[0].selectable ? "selectable" : "")}
				/>
			);
		}
	}
}
