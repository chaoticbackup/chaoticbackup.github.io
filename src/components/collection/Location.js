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
        <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (location.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(location.gsx$image)} />
        <div style={{verticalAlign: 'text-top', float: 'left', width: "220px"}}>
          <span>{location.gsx$name}</span><br />
          <span>{API.sets[location.gsx$set]} | {location.gsx$rarity}</span><br />
          <span>{location.gsx$initiative}</span>
        </div>
        <br />
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px))', borderLeft: '1px solid white', paddingLeft: '10px'}} >
          <span>{location.gsx$ability}</span><br />
          <span><i>{location.gsx$flavortext}</i></span>
        </div>
      </div>
    );
  }

}
