import React from 'react';
import Interactive from 'react-interactive';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique} from './_Snippets';

@inject((stores, props, context) => props) @observer
export default class Attack extends React.Component {

  render() {
    let mugic = this.props.mugic;

    let mugicCounters = [];
    if (mugic.gsx$cost == 0) {
      mugicCounters.push(<span>0</span>);
    }
    else if (mugic.gsx$cost.toLowerCase() == 'x') {
      mugicCounters.push(<span>X</span>);
    }
    else {
      for (let i = 0; i < mugic.gsx$cost; i++) {
        mugicCounters.push(<img className="icon16" src={"/src/img/icons/mugic/"+(mugic.gsx$tribe.toLowerCase()||"generic")+".png"} alt={mugic.gsx$tribe.toLowerCase() + " Mugic counter"} key={i} />);
      }
    }

    return(
      <div style={{textAlign: 'left', display: 'flex'}}>
        <img className="thumb" style={{float: 'left'}} src={API.base_image + (mugic.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(mugic.gsx$image)} />
        <div style={{verticalAlign: 'text-top', float: 'left', width: "220px"}}>
          <span className="name">{mugic.gsx$name}</span><br />
          <Rarity set={mugic.gsx$set} rarity={mugic.gsx$rarity} /> <br />
          <img height="20" className="icon16" src={"/src/img/icons/tribes/"+(mugic.gsx$tribe.toLowerCase()||"generic")+".png"} /> {mugic.gsx$tribe}<br />
          <span>Cost: {mugicCounters}</span><br />
        </div>
        <br />
        <div style={{float: 'left', width: 'calc(100% - (100px + 230px))', borderLeft: '1px solid white', paddingLeft: '10px'}} >
          <span>{mugic.gsx$ability}</span><br />
          <Unique data={{unique: mugic.gsx$unique, loyal: mugic.gsx$loyal, legendary: mugic.gsx$legendary}} /><br />
          <span className="flavortext">{mugic.gsx$flavortext}</span>
        </div>
      </div>
    );
  }

}

function MugicCost(props) {

}
