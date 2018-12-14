import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../SpreadsheetData';
import {Loading} from '../Snippets';
import '../../scss/play.scss';

@inject((stores, props, context) => props) @observer
export default class Play extends React.Component {
  @observable loaded = false;

  constructor(props) {
  	super(props);
  }

  handleChange() {

  }

  render() {
  	if (this.loaded == false) {
  	  API.LoadDB([{'cards': 'attacks'}, {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => { this.loaded = true; });
      return (<Loading />);
  	}
    
    return (<Board handleChange={this.handleChange.bind(this)} />);
  }
}

@inject((stores, props, context) => props) @observer
class Board extends React.Component {
  @observable spaces = [];
  @observable phase = "reveal_location";
  @observable source = -1;

  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);

    this.spaces = Array(12).fill({
      'creatures': [this.empty_card()],
      'battlegear': [this.empty_card()],
      'mirage': [this.empty_card()]
    });

    this.loadcards();
    // TODO
    this.phase = "move_creature";
  }

  empty_card() {
    return {
      'card': null,
      'selected': false,
      'selectable': true
    }
  }

  // TODO
  loadcards() {
    this.spaces[5].creatures[0].card = API.cards.creatures.findOne({'gsx$name': {'$regex': new RegExp("Maxxor", 'i')}});
    this.spaces[5].battlegear[0].card = API.cards.battlegear.findOne({'gsx$name': {'$regex': new RegExp("Maxxor's Torch", 'i')}});
  }

  // TODO
  checkrange() {
    return 1;
  }

  // TODO
  selectCard(e) {
    let id = e.target.id.substr(1);
    let type = (() => {
      switch (e.target.id.charAt(0)) {
        case 'b': return 'battlegear';
        case 'c': return 'creatures';
        default: return "";
      }
    })();

    const resetSelection = () => {
      this.spaces.forEach((space, i) => {
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

    // Reset selection
    if (this.spaces[id][type][0].selectable == false) {
      return resetSelection();
    }

    console.log(this.spaces[id][type][0]);

    if (this.phase == "move_creature" && type == "creatures") {
      // TODO combat
      if (this.source >= 0 && this.source != id) {
        this.spaces[id].creatures = (this.spaces[this.source].creatures);
        this.spaces[id].battlegear = (this.spaces[this.source].battlegear);
        this.spaces[this.source].creatures = [this.empty_card()];
        this.spaces[this.source].battlegear = [this.empty_card()];
        return resetSelection();
      }

      if (this.spaces[id].creatures[0].card == null) {
        return;
      }
      
      // else select a card
      this.source = id;

      this.spaces.forEach((space, i) => {
        space.battlegear.forEach((card) => {
          card.selectable = false;
        });
        if (i !== id) {
          // TODO check swift / check ocuppied
          space.creatures.forEach((card) => {
            card.selectable = true;
          });
        }
      });

      this.spaces[id].creatures[0].selected = true;
      this.spaces[id].creatures[0].selectable = false;
    }
  }

  render() {
    return(
      <div className="play">
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
    if (this.props.cards[0].card) {
      return (
        <img id={this.props.id} onClick={this.props.selectCard.bind(this)} 
          className={(this.props.cards[0].selected ? "selected" : "") + " " 
            + (this.props.cards[0].selectable ? "selectable" : "")}
          src={API.base_image + this.props.cards[0].card.gsx$image} 
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
