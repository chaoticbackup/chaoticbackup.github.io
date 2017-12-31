import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../SpreadsheetData';

export function Rarity(props) {
  return (
    <span>
      <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/set/"+props.set+"/"+props.rarity+".png").toLowerCase()} />
      {API.sets[props.set]}&nbsp;|&nbsp;{props.rarity}
    </span>
  );
}

export function Unique(props) {
  let string = "";
  if (props.data.unique) {
    string+="Unique, ";
  }
  if (props.data.loyal) {
    string+="Loyal";
    if (props.data.tribe == 'M\'arrillian') {
      string +=" - M'arrillian or Minions";
    }
    // Battlegear loyality
    if (props.data.loyal != "1") {
      string +=" - "+props.data.loyal;
    }
  }
  if (props.data.legendary) {
    string+="Legendary";
  }
  string = string.replace(/,\s+$/, "");
  return (
    <span style={{fontWeight: "Bold"}}>{string}</span>
  );
}
