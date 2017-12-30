import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Battlegear extends React.Component {

  render() {
    let battlegear = this.props.battlegear;

    return(
      <div style={{textAlign: 'left', display: 'flex'}}>
        <img className="thumb" style={{float: 'left'}} src={API.base_image + (battlegear.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(battlegear.gsx$image)} />
        <div style={{verticalAlign: 'text-top', float: 'left', width: "220px"}}>
          <span>{battlegear.gsx$name}</span><br />
          <span>{API.sets[battlegear.gsx$set]} | {battlegear.gsx$rarity}</span><br />
        </div>
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px))', borderLeft: '1px solid white', paddingLeft: '10px'}} >
          <span>{battlegear.gsx$ability}</span><br />
          <span className="flavortext">{battlegear.gsx$flavortext}</span>
        </div>
      </div>
    );
  }

}
