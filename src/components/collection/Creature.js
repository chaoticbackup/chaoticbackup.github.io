import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import processString from 'react-process-string';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
  	let creature = this.props.creature;
  	const elements = creature.gsx$elements.split(/[ ,]+/).filter(Boolean).map((item, i) => {
  	  return <img className="icon" src={"/src/img/icons/elements/"+item.toLowerCase()+".png"} alt={item} key={i}></img>;
  	});

    let mugic = [];
    for (let i = 0; i < creature.gsx$mugicability; i++) {
      mugic.push(<img className="icon" src={"/src/img/icons/mugic/"+(creature.gsx$tribe.toLowerCase()||"generic")+".png"} alt="MC" key={i} />);
    }

    let mugic_counters = {
      regex: /{{mc}}/i,
      fn: (key, result) => {
        return <img key={key} className="icon" style={{'height': '16px'}} src={"/src/img/icons/mugic/"+(creature.gsx$tribe.toLowerCase()||"generic")+".png"} alt="MC" />
      }
    }

    let brainwashed = () => {
      if (creature.gsx$brainwashed) {
        return (<span className="brainwashed" style={{'whiteSpace': 'pre-line'}}>{processString([mugic_counters])(creature.gsx$brainwashed)}<br />
        </span>);
      }
    }

  	return(
  	  <div className="creature" style={{textAlign: 'left', display: 'flex'}}>
  	    <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (creature.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(creature.gsx$image)} />
  	    <div style={{verticalAlign: 'text-top', float: 'left', width: '220px'}}>
  	      <span>{creature.gsx$name}</span><br />
          <span>{API.sets[creature.gsx$set]} | {creature.gsx$rarity}</span><br />
          <img height="20" className="icon" src={"/src/img/icons/tribes/"+creature.gsx$tribe.toLowerCase()+".png"}></img>
          <span>{creature.gsx$tribe} {creature.gsx$types}</span><br />
	        <span>{elements}</span><br />
          <span>{mugic}</span>
	      </div>
        <br />
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px + 50px))', borderLeft: '1px solid white', paddingLeft: '10px'}} >
          <span style={{'whiteSpace': 'pre-line'}}>{processString([mugic_counters])(creature.gsx$ability)}</span><br />
          {brainwashed()}
          <span><i>{creature.gsx$flavortext}</i></span>
        </div>
        <br />
	      <div style={{verticalAlign: 'text-top', float: 'left', width: '50px', textAlign: 'right'}}>
	     	  <span>{creature.gsx$courage}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/courage.png"}></img></span><br />
	     	  <span>{creature.gsx$power}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/power.png"}></img></span><br />
	     	  <span>{creature.gsx$wisdom}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/wisdom.png"}></img></span><br />
	     	  <span>{creature.gsx$speed}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/speed.png"}></img></span><br />
          <span>{creature.gsx$energy}</span>
        </div>
  	  </div>
  	);
  }
}
