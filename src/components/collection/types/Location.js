import React from 'react';
import Interactive from 'react-interactive';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Ability, Initiative} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Location extends React.Component {

  render() {
    let location = this.props.location;

    return(
      <div className="card">
        <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (location.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(location.gsx$image)} />
        <div className="left">
          <Name name={location.gsx$name} /><br />
          <Rarity set={location.gsx$set} rarity={location.gsx$rarity} /><br />
          <Initiative initiative={location.gsx$initiative} /><br />
        </div>
        <div className="right">
          <Ability ability={location.gsx$ability} />
          <span className="flavortext">{location.gsx$flavortext}</span>
        </div>
      </div>
    );
  }
}
