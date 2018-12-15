import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../SpreadsheetData';

// array of array of accesible spaces per swift
const adjacency_6 = {
  1: [2, 3],
  2: [1, 3, 4, 5],
  3: [1, 2, 5, 6],
  4: [2, 5, 7, 8],
  5: [2, 3, 4, 6, 7, 8, 9],
  6: [3, 5, 8, 9],
  7: [4, 5, 8, 10],
  8: [4, 5, 6, 7, 9, 10, 11],
  9: [5, 6, 8, 11],
  10: [7, 8, 11, 12],
  11: [8, 9, 10, 12],
  12: [10, 11]
}

@observer
export default class Board extends React.Component {
  @observable spaces = [];
  @observable phase = "none";
  @observable source = -1;

  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);

    this.spaces = Array(12).fill({
      'creatures': [this.empty_card("creatures")],
      'battlegear': [this.empty_card("battlegear")],
      'mirage': [this.empty_card("mirage")]
    });

    // todo remove / currently simulating
    this.submitChange({event: "phase", action: "movement"});
    this.loadcards();
  }

  // This is a wraper function for preforming changes to game state
  // It preforms the change locally and propegates it higher
  // So that a network listener can reflect the change on the other client
  // Local changes only could use "make change"
  submitChange = (change) => {
  	this.props.submitChange(change);
  	this.makeChange(change);
  }

  // TODO if the board state is changed externally
  // {'event': 'action'}
  makeChange = (change) => {
  	// seriously calling without a change?
    if (!change) return;
    console.log(change.event, change.action);
    let action = change.action;

    // change the game's phase
    if (change.event == "phase") {
    	// action: "string"
      this.phase = action;
      console.log(this.phase);
    }

    // add a card to a space
    else if (change.event == "add") {
    	// action: {space, type, card}
    	this.spaces[action.space][action.type] = action.card;
    }

    // remove a specific card at a space
    else if (change.event == "remove") {
    	// action: {space, type}
    	this.space[action.space][action.type] = this.empty_card(action.type);
    }

    // this is a short hand for moving a creature and its battlegear
    else if (change.event == "movement") {
    	// action: {src, dest}
    	let src = action.src;
    	let dest = action.dest;
    	this.spaces[dest].creatures = (this.spaces[src].creatures);
    	this.spaces[dest].battlegear = (this.spaces[src].battlegear);
    	this.spaces[src].creatures = [this.empty_card("creatures")];
    	this.spaces[src].battlegear = [this.empty_card("battlegear")];
    }
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

  // TODO
  loadcards() {
    this.spaces[5].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Maxxor", 'i')}});
    this.spaces[5].battlegear[0].data = API.cards.battlegear.findOne({'gsx$name': {'$regex': new RegExp("Maxxor's Torch", 'i')}});
    this.spaces[2].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Staluk", 'i')}});
    this.spaces[2].battlegear[0].data = API.cards.battlegear.findOne({'gsx$name': {'$regex': new RegExp("Vlaric Shard", 'i')}});
    for (let i = 0; i < 6; i++) {
      this.spaces[i].creatures[0].controlled = true;
      this.spaces[i].battlegear[0].controlled = true;
    }
    this.spaces[8].creatures[0].data = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Chaor", 'i')}});
    this.spaces[8].battlegear[0].data = API.cards.battlegear.findOne({'gsx$name': {'$regex': new RegExp("Whepcrack", 'i')}});
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
    this.source = -1;
  }

  // TODO
  canAttack(id) {
    return false;
  }

  moveSelection(source, destination, movement) {
    if (source == destination) return false;

    let src_card = this.spaces[source].creatures[0];
    if (!src_card.moveable) return false; // If already moved, no valid movement

    let des_card = this.spaces[destination].creatures[0];

    let valid = adjacency_6[source];
    // for each level of swift, increase moveable range
    // TODO account for range
    for (let i = 0; i < movement; i++) {
      if (valid.includes(destination)) {
        // Check if space occupied
        if (des_card.data != null) {
          // Can't move into occupied space of own tribe
          if (des_card.controlled) return false;
          // Check if can start combat
          else return this.canAttack();
        }
        return true;
      } 
      valid.forEach((i) => {
        valid = [].concat(valid, adjacency_6[i]);
      });
    }

    return false; // if all else its probably not moveable
  }

  selectCard(e) {
    let id = e.target.id.substr(1);
    let type = (() => {
      switch (e.target.id.charAt(0)) {
        case 'b': return 'battlegear';
        case 'c': return 'creatures';
        default: return "";
      }
    })();

    // Reset selection
    if (this.spaces[id][type][0].selectable == false) {
      return this.resetCardSelection();
    }

    if (this.phase == "movement" && type == "creatures") {
      // TODO combat
      // TODO if self selection, check activated ability
      if (this.source == id) {
      	return this.resetCardSelection();
      }
      // moving into a space
      if (this.source > 0) {
      	this.submitChange({event: "movement", action: {src: this.source, dest: id}});
        this.spaces[id].moveable = false;
        return this.resetCardSelection();
      }

      // don't select a blank space
      if (this.spaces[id].creatures[0].data == null) return;
      
      // select a card
      this.source = id;

      let mv = ((data) => {
        let swift = (new RegExp(/swift ([0-9]+)/gi).exec(data.gsx$ability));
        if (swift) return parseInt(swift[1]) + 1;
        return 1;
      })(this.spaces[id].creatures[0].data);

      // set selectable options
      this.spaces.forEach((space, i) => {
        space.battlegear.forEach((card) => {
          card.selectable = false;
        });
        space.creatures.forEach((card) => {
          card.selectable = this.moveSelection(id, i, mv);
        });
      });

      // creature is now selected
      this.spaces[id].creatures[0].selected = true;
      this.spaces[id].creatures[0].selectable = false;
    }
  }

  render() {
    return(
      <div className="battleboard">
        <div className="r1">
          <div className="space">
            <Space id={"c1"} cards={this.spaces[1].creatures} selectCard={this.selectCard} />
            <Space id={"b1"} cards={this.spaces[1].battlegear} selectCard={this.selectCard} />
          </div>
        </div>
        <div className="r2">
          <div className="space">
            <Space id={"c2"} cards={this.spaces[2].creatures} selectCard={this.selectCard} />
            <Space id={"b2"} cards={this.spaces[2].battlegear} selectCard={this.selectCard} />
          </div>
          <div className="space">
            <Space id={"c3"} cards={this.spaces[3].creatures} selectCard={this.selectCard} />
            <Space id={"b3"} cards={this.spaces[3].battlegear} selectCard={this.selectCard} />
          </div>
        </div>
        <div className="r3">
          <div className="space">
            <Space id={"c4"} cards={this.spaces[4].creatures} selectCard={this.selectCard} />
            <Space id={"b4"} cards={this.spaces[4].battlegear} selectCard={this.selectCard} />
          </div>
          <div className="space">
            <Space id={"c5"} cards={this.spaces[5].creatures} selectCard={this.selectCard} />
            <Space id={"b5"} cards={this.spaces[5].battlegear} selectCard={this.selectCard} />
          </div>
          <div className="space">
            <Space id={"c6"} cards={this.spaces[6].creatures} selectCard={this.selectCard} />
            <Space id={"b6"} cards={this.spaces[6].battlegear} selectCard={this.selectCard} />
          </div>
        </div>
        <div className="r4">
          <div className="space">
            <Space id={"c7"} cards={this.spaces[7].creatures} selectCard={this.selectCard} />
            <Space id={"b7"} cards={this.spaces[7].battlegear} selectCard={this.selectCard} />
          </div>
          <div className="space">
            <Space id={"c8"} cards={this.spaces[8].creatures} selectCard={this.selectCard} />
            <Space id={"b8"} cards={this.spaces[8].battlegear} selectCard={this.selectCard} />
          </div>
          <div className="space">
            <Space id={"c9"} cards={this.spaces[9].creatures} selectCard={this.selectCard} />
            <Space id={"b9"} cards={this.spaces[9].battlegear} selectCard={this.selectCard} />
          </div>
        </div>
      </div>
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
