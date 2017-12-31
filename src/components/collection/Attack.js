import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Element, Ability} from './_Snippets';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
  	let attack = this.props.attack;

  	return(
  	  <div style={{textAlign: 'left', display: 'flex'}}>
	      <img className="thumb" style={{float: 'left'}} src={API.base_image + (attack.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(attack.gsx$image)} />
	      <div style={{verticalAlign: 'text-top', float: 'left', width: "220px"}}>
	        <Name name={attack.gsx$name} /><br />
          <Rarity set={attack.gsx$set} rarity={attack.gsx$rarity} /><br />
          <span>Build Points: {attack.gsx$bp}</span><br />
          <div>
            <span className="bigger">{attack.gsx$base}</span> |&nbsp;
            <Element element="fire" value={attack.gsx$fire} />{attack.gsx$fire}&nbsp;
            <Element element="air" value={attack.gsx$air} />{attack.gsx$air}&nbsp;
            <Element element="earth" value={attack.gsx$earth} />{attack.gsx$earth}&nbsp;
            <Element element="water" value={attack.gsx$water} />{attack.gsx$water}
          </div>
	      </div>
        <br />
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px))', borderLeft: '1px solid white', paddingLeft: '10px'}} >
          <Ability ability={attack.gsx$ability} /><br />
          <Unique data={{unique: attack.gsx$unique, loyal: attack.gsx$loyal, legendary: attack.gsx$legendary}} /><br />
          <span className="flavortext">{attack.gsx$flavortext}</span>
        </div>
  	  </div>
  	);
  }
}

