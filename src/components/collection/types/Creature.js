import React from 'react';
import Interactive from 'react-interactive';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Element, Mugic, Discipline, Ability, Tribe} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
  	let creature = this.props.creature;

    let mugic = [];
    for (let i = 0; i < creature.gsx$mugicability; i++) {
      mugic.push(<Mugic key={i} tribe={creature.gsx$tribe} />);
    }

  	return(
  	  <div className="card">
  	    <img className="thumb" style={{float: 'left'}} src={API.base_image + (creature.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(creature.gsx$image)} />
  	    <div className="left">
          <Name name={creature.gsx$name} /><br />
          <Rarity set={creature.gsx$set} rarity={creature.gsx$rarity} /><br />
          <span><Tribe tribe={creature.gsx$tribe} /> {creature.gsx$tribe} {creature.gsx$types}</span><br />
	        <div>
            <Element element="fire" value={creature.gsx$elements.toLowerCase().indexOf("fire") >=0} />&nbsp;
            <Element element="air" value={creature.gsx$elements.toLowerCase().indexOf("air") >=0} />&nbsp;
            <Element element="earth" value={creature.gsx$elements.toLowerCase().indexOf("earth") >=0} />&nbsp;
            <Element element="water" value={creature.gsx$elements.toLowerCase().indexOf("water") >=0} />
          </div>
          <span>{mugic}</span>
	      </div>
        <br />
        <div className="right" style={{width: 'calc(100% - (100px + 230px + 50px))', 'whiteSpace': 'pre-line'}} >
          <Ability ability={creature.gsx$ability} tribe={creature.gsx$tribe} />
          <Ability type="brainwashed" tribe={creature.gsx$tribe} ability={creature.gsx$brainwashed} />
          <Unique data={{unique: creature.gsx$unique, loyal: creature.gsx$loyal, legendary: creature.gsx$legendary, tribe: creature.gsx$tribe}} />
          <span className="flavortext">{creature.gsx$flavortext}</span>
        </div>
        <br />
	      <div style={{verticalAlign: 'text-top', float: 'left', width: '50px', textAlign: 'right'}}>
	     	  <span>{creature.gsx$courage}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/courage.png"}></img></span><br />
	     	  <span>{creature.gsx$power}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/power.png"}></img></span><br />
	     	  <span>{creature.gsx$wisdom}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/wisdom.png"}></img></span><br />
	     	  <span>{creature.gsx$speed}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/speed.png"}></img></span><br />
          <span style={{fontWeight: 'bold'}}>{creature.gsx$energy}</span>
        </div>
  	  </div>
  	);
  }
}
