import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Location extends React.Component {

  render() {
    let location = this.props.location;

    return(
      <div style={{textAlign: 'left', display: 'flex'}}>
        <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (location.gsx$thumb||API.thumb_missing)}></img>
        <div style={{verticalAlign: 'text-top', float: 'left', width: "50%"}}>
          <span>{location.gsx$name}</span><br />
          <span>{API.sets[location.gsx$set]} | {location.gsx$rarity}</span><br />
          <span>{location.gsx$initiative}</span>
        </div>
      </div>
    );
  }

}
