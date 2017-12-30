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
