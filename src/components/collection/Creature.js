import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
  	let creature = this.props.creature;
  	const elements = creature.gsx$elements.split(/[ ,]+/).filter(Boolean).map((item, i) => {
  	  return <img className="icon" src={"/src/img/icons/elements/"+item.toLowerCase()+".png"} alt={item} key={i}></img>;
  	});

    let mugic = [];
    for (let i = 0; i < creature.gsx$mugicability; i++) {
      mugic.push(<img className="icon" src={"/src/img/icons/mugic/"+(creature.gsx$tribe.toLowerCase()||"generic")+".png"} alt={creature.gsx$tribe.toLowerCase() + " Mugic counter"} key={i} />);
    }

  	return(
  	  <div style={{textAlign: 'left', display: 'flex'}}>
  	      <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (creature.gsx$thumb||API.thumb_missing)}></img>
  	      <div style={{verticalAlign: 'text-top', float: 'left', width: "50%"}}>
  	        <img height="20" className="icon" src={"/src/img/icons/tribes/"+creature.gsx$tribe.toLowerCase()+".png"}></img>
  	        <span>{creature.gsx$name}</span><br />
            <span>{API.sets[creature.gsx$set]} | {creature.gsx$rarity}</span><br />
            <span>Creature - {creature.gsx$tribe} {creature.gsx$types}</span><br />
  	        <span>{elements}</span><br />
            <span>{mugic}</span><br />
  	      </div>
  	      <div style={{verticalAlign: 'text-top', float: 'left'}}>
  	     	 <span>{creature.gsx$courage}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/courage.png"}></img></span><br />
  	     	 <span>{creature.gsx$power}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/power.png"}></img></span><br />
  	     	 <span>{creature.gsx$wisdom}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/wisdom.png"}></img></span><br />
  	     	 <span>{creature.gsx$speed}&nbsp;<img height="16" className="icon" src={"/src/img/icons/disciplines/speed.png"}></img></span><br />
	     	 </div>
  	  </div>
  	);
  }

}
