import React from 'react';
import API from './SpreadsheetData';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import processString from 'react-process-string';
import s from '../styles/pageNotFound.style';

export function UnderConstruction(props) {
  return (
    <p style={s.p}>This page is currently under construction</p>
  );
}

export function PageNotFound(props) {
  return (
    <p style={s.p}>
      Page not found - the path, {s.code(props.location.pathname)},
      did not match any React Router routes.
    </p>
  );
}

export function Rarity(props) {
  return (
    <span>
      <img className={props.size||"icon16"} style={{verticalAlign: 'middle'}} src={("/src/img/icons/set/"+props.set+"/"+props.rarity+".png").toLowerCase()} />
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
    <span style={{fontWeight: "Bold"}}>{string}{string && <br />}</span>
  );
}

export function Name(props) {
  let name = props.name.split(",");
  if (name.length > 1) {
    return (<span>
      <span className="bigger">{name[0]}</span><br />
      &nbsp;&nbsp;<span style={{fontSize: "13px",paddingBottom: "4px", display: "inline-block"}}>{name[1]}</span>
    </span>);
  } else {
    return (<span>
      <span className="bigger">{name[0]}</span>
    </span>);
  }
}

export function Element(props) {
  if (props.value) {
    return <img className={props.size||"icon20"} src={("/src/img/icons/elements/"+props.element+".png").toLowerCase()} />
  }
  else {
    return <img className={props.size||"icon20"} src={("/src/img/icons/elements/"+props.element+"-inactive.png").toLowerCase()} />
  }
}

export function Mugic(props) {
  return <img className={props.size||"icon20"} src={("/src/img/icons/mugic/"+(props.tribe||"generic")+".png").toLowerCase()} alt={"MC"} />
}

export function Discipline(props) {
  return <img className={props.size||"icon16"} src={("/src/img/icons/disciplines/"+props.discipline+".png").toLowerCase()} />
}

export function Tribe(props) {
  return <img className={props.size||"icon16"} src={("/src/img/icons/tribes/"+props.tribe+".png").toLowerCase()} />
}

export function Ability(props) {
  const mugic_counters = {
    regex: /{{mc}}/i,
    fn: (key, result) => {
      return (<Mugic key={key} tribe={props.tribe} size="icon14"/>);
    }
  }

  const elements = {
    regex: /(fire)|(air)|(earth)|(water)/i,
    fn: (key, result) => {
      return (<span key={key}><Element element={result[0]} value="true" size="icon14"/>{result[0]}</span>);
    }
  }

  const disciplines = {
    regex: /(courage)|(power)|(wisdom)|(speed)/i,
    fn: (key, result) => {
      return (<span key={key}><Discipline discipline={result[0]} size="icon14" />{result[0]}</span>);
    }
  }

  const filters = [mugic_counters, elements, disciplines];

  return <div className={props.type||"ability"}>{processString(filters)(props.ability)}</div>
}

export function Splash(props) {
  let image = props.image;
  return (
    <div style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundImage: 'url(\''+image+'\') no-repeat center', backgroundSize: 'cover'}} />
  );
}
