import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Mugic, Ability} from './_Snippets';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
    let mugic = this.props.mugic;

    let mugicCounters = [];
    if (mugic.gsx$cost == 0) {
      mugicCounters.push(<span key={0}>0</span>);
    }
    else if (mugic.gsx$cost.toLowerCase() == 'x') {
      mugicCounters.push(<span key={0}>X</span>);
    }
    else {
      for (let i = 0; i < mugic.gsx$cost; i++) {
        mugicCounters.push(<Mugic tribe={mugic.gsx$tribe} key={i} />);
      }
    }

    return(
      <div className="card">
        <img className="thumb" style={{float: 'left'}} src={API.base_image + (mugic.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(mugic.gsx$image)} />
        <div className="left">
          <Name name={mugic.gsx$name} /><br />
          <Rarity set={mugic.gsx$set} rarity={mugic.gsx$rarity} /> <br />
          <img height="20" className="icon16" src={"/src/img/icons/tribes/"+(mugic.gsx$tribe.toLowerCase()||"generic")+".png"} /> {mugic.gsx$tribe}<br />
          <span>{mugicCounters}</span><br />
        </div>
        <br />
        <div className="right" >
          <Ability ability={mugic.gsx$ability} tribe={mugic.gsx$tribe} /><br />
          <Unique data={{unique: mugic.gsx$unique, loyal: mugic.gsx$loyal, legendary: mugic.gsx$legendary}} /><br />
          <span className="flavortext">{mugic.gsx$flavortext}</span>
        </div>
      </div>
    );
  }

}
