import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
  	let attack = this.props.attack;
  	// const elements = attack.gsx$elements.split(/[ ,]+/).filter(Boolean).map((item, i) => {
  	//   return <img className="icon" src={"/src/img/icons/elements/"+item.toLowerCase()+".png"} alt={item} key={i}></img>;
  	// });

  	return(
  	  <div style={{textAlign: 'left', display: 'flex'}}>
	      <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (attack.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(attack.gsx$image)} />
	      <div style={{verticalAlign: 'text-top', float: 'left', width: "220px"}}>
	        <span>{attack.gsx$name}</span><br />
          <span>{API.sets[attack.gsx$set]} | {attack.gsx$rarity}</span><br />
          <span>Build Points: {attack.gsx$bp}</span><br />
          <span>
            Damage: {attack.gsx$base} |&nbsp;
            {attack.gsx$fire}<img height="16" className="icon" src={"/src/img/icons/elements/fire.png"} /> |&nbsp;
            {attack.gsx$air}<img height="16" className="icon" src={"/src/img/icons/elements/air.png"} /> |&nbsp;
            {attack.gsx$earth}<img height="16" className="icon" src={"/src/img/icons/elements/earth.png"} /> |&nbsp;
            {attack.gsx$water}<img height="16" className="icon" src={"/src/img/icons/elements/water.png"} />
          </span>
	      </div>
        <br />
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px))', borderLeft: '1px solid white', paddingLeft: '10px'}} >
          <span>{attack.gsx$ability}</span><br />
          <span><i>{attack.gsx$flavortext}</i></span>
        </div>
  	  </div>
  	);
  }
}
