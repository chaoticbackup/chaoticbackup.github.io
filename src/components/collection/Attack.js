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

  	return(
  	  <div style={{textAlign: 'left', display: 'flex'}}>
	      <img className="thumb" style={{float: 'left'}} src={API.base_image + (attack.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(attack.gsx$image)} />
	      <div style={{verticalAlign: 'text-top', float: 'left', width: "220px"}}>
	        <span>{attack.gsx$name}</span><br />
          <span>{API.sets[attack.gsx$set]} | {attack.gsx$rarity}</span><br />
          <span>Build Points: {attack.gsx$bp}</span><br />
          <div>
            {attack.gsx$base} |&nbsp;
            {attack.gsx$fire}<Element element="fire" value={attack.gsx$fire} /> |&nbsp;
            {attack.gsx$air}<Element element="air" value={attack.gsx$air} /> |&nbsp;
            {attack.gsx$earth}<Element element="earth" value={attack.gsx$earth} /> |&nbsp;
            {attack.gsx$water}<Element element="water" value={attack.gsx$water} />
          </div>
	      </div>
        <br />
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px))', borderLeft: '1px solid white', paddingLeft: '10px'}} >
          <span>{attack.gsx$ability}</span><br />
          <span className="flavortext">{attack.gsx$flavortext}</span>
        </div>
  	  </div>
  	);
  }
}

function Element(props) {
  if (props.value) {
    return <img className="icon20" src={"/src/img/icons/elements/"+props.element+".png"} />
  }
  else {
    return <img className="icon20" src={"/src/img/icons/elements/"+props.element+"-inactive.png"} />
  }
}
