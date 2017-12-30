import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import processString from 'react-process-string';
import {Rarity} from './_Snippets';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
  	let creature = this.props.creature;

    const elements = ['fire', 'air', 'earth', 'water'].map((element, i) => {
       if (creature.gsx$elements.toLowerCase().indexOf(element) >=0) {
        return <img className="icon20" src={"/src/img/icons/elements/"+element+".png"} alt={element} key={i}></img>;
      }
      else {
        return <img className="icon20" src={"/src/img/icons/elements/"+element+"-inactive.png"} alt={element} key={i}></img>;
      }
    });

    let mugic = [];
    for (let i = 0; i < creature.gsx$mugicability; i++) {
      mugic.push(<img className="icon20" src={"/src/img/icons/mugic/"+(creature.gsx$tribe.toLowerCase()||"generic")+".png"} alt="MC" key={i} />);
    }

    let mugic_counters = {
      regex: /{{mc}}/i,
      fn: (key, result) => {
        return <img key={key} className="icon16" src={"/src/img/icons/mugic/"+(creature.gsx$tribe.toLowerCase()||"generic")+".png"} alt="MC" />
      }
    }

    const brainwashed = (() => {
      if (creature.gsx$brainwashed) {
        return (<span className="brainwashed">{processString([mugic_counters])(creature.gsx$brainwashed)}<br />
        </span>);
      }
    })();

  	return(
  	  <div className="creature" style={{textAlign: 'left', display: 'flex'}}>
  	    <img className="thumb" style={{float: 'left'}} src={API.base_image + (creature.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(creature.gsx$image)} />
  	    <div style={{verticalAlign: 'text-top', float: 'left', width: '220px'}}>
          <span className="name">{creature.gsx$name}</span><br />
          <Rarity set={creature.gsx$set} rarity={creature.gsx$rarity} /><br />
          <span><img className="icon16" style={{verticalAlign: 'middle'}} src={"/src/img/icons/tribes/"+creature.gsx$tribe.toLowerCase()+".png"} /> {creature.gsx$tribe} {creature.gsx$types}</span><br />
	        <span>{elements}</span><br />
          <span>{mugic}</span>
	      </div>
        <br />
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px + 50px))', borderLeft: '1px solid white', paddingLeft: '10px', 'whiteSpace': 'pre-line'}} >
          <span className="ability">{processString([mugic_counters])(creature.gsx$ability)}</span><br />
          {brainwashed}
          <span className="flavortext">{creature.gsx$flavortext}</span>
        </div>
        <br />
	      <div style={{verticalAlign: 'text-top', float: 'left', width: '50px', textAlign: 'right'}}>
	     	  <span>{creature.gsx$courage}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/courage.png"}></img></span><br />
	     	  <span>{creature.gsx$power}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/power.png"}></img></span><br />
	     	  <span>{creature.gsx$wisdom}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/wisdom.png"}></img></span><br />
	     	  <span>{creature.gsx$speed}&nbsp;<img className="icon16" src={"/src/img/icons/disciplines/speed.png"}></img></span><br />
          <span>{creature.gsx$energy}</span>
        </div>
  	  </div>
  	);
  }
}
