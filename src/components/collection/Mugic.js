import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
    let mugic = this.props.mugic;

    let mugicCounters = [];
    for (let i = 0; i < mugic.gsx$cost; i++) {
      mugicCounters.push(<img className="icon" src={"/src/img/icons/mugic/"+(mugic.gsx$tribe.toLowerCase()||"generic")+".png"} alt={mugic.gsx$tribe.toLowerCase() + " Mugic counter"} key={i} />);
    }

    return(
      <div style={{textAlign: 'left', display: 'flex'}}>
        <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (mugic.gsx$thumb||API.thumb_missing)}></img>
        <div style={{verticalAlign: 'text-top', float: 'left', width: "50%"}}>
          <img height="20" className="icon" src={"/src/img/icons/tribes/"+(mugic.gsx$tribe.toLowerCase()||"generic")+".png"}></img>
          <span>{mugic.gsx$name}</span><br />
          <span>{API.sets[mugic.gsx$set]} | {mugic.gsx$rarity}</span><br />
          <span>Cost: {mugicCounters}</span><br />
        </div>
      </div>
    );
  }

}
