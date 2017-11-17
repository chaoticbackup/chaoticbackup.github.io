import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

let thumb = "1JYjPzkv74IhzlHTyVh2niTDyui73HSfp";
let card_back = "1_MgWDPsPGf-gPBArn2v6ideJcqOPsSYC";

@inject((stores, props, context) => props) @observer
export default class Creature extends React.Component {

  render() {
  	let creature = this.props.creature;
  	const elements = creature.gsx$elements.split(/[ ,]+/).filter(Boolean).map((item, i) => {
  	  return <img className="icon" src={"/src/img/icons/elements/"+item.toLowerCase()+".png"} alt={item} key={i}></img>;
  	});

  	return(
  	  <div style={{textAlign: 'left', display: 'flex'}}>
  	      <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (creature.gsx$thumb||thumb)}></img>
  	      <div style={{verticalAlign: 'text-top', float: 'left', width: "50%"}}>
  	        <img height="20" className="icon" src={"/src/img/icons/tribes/"+creature.gsx$tribe.toLowerCase()+".png"}></img>
  	        <span>{creature.gsx$name}</span><br />
  	        <span>{elements}</span><br />
  	        <span>Energy: {creature.gsx$energy}</span><br />
  	        <span>{creature.gsx$ability}</span>
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
