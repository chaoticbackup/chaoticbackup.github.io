import React from 'react';
import API from './SpreadsheetData';
import {observable} from "mobx";
import {observer, inject, action} from 'mobx-react';
import processString from 'react-process-string';
import s from '../styles/app.style';

export function UnderConstruction(props) {
  return (
    <p style={s.p}>This page is currently under construction</p>
  );
}

export function PageNotFound(props) {
  return (
    <p style={s.p}>
      Page not found - the path, {s.code(props.location.pathname)}, did not match any routes.
    </p>
  );
}

export function Loading(props) {
  return (<span>Loading...</span>);
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
    string = (string) ? ("Legendary, " + string) : "Legendary";
  }
  string = string.replace(/,\s+$/, "");
  return (
    <span style={{fontWeight: "Bold"}}>{string}{string && <br />}</span>
  );
}

export function Name(props) {
  let name = props.name.split(",");
  return (<span className="name">
    <span className="bigger">{name[0]}</span>
    { name.length > 1 &&
      <span>
        <span style={{opacity: "0"}}>,</span>
        <span className="subname">{name[1]}</span>
      </span>
    }
  </span>);
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
    regex: new RegExp(/(\b((fire)|(air)|(earth)|(water)))/i),
    fn: (key, result) => {
      return (<span key={key}><Element element={result[0].replace(/\b/, '')} value="true" size="icon14"/>{result[0]}</span>);
    }
  }

  const disciplines = {
    regex: /(courage)|(power)|(wisdom)|(speed)/i,
    fn: (key, result) => {
      return (<span key={key}><Discipline discipline={result[0]} size="icon14" />{result[0]}</span>);
    }
  }

  const tribes = {
    regex: /(danian)|(generic)|(mipedian)|(overworld)|(underworld)/i,
    fn: (key, result) => {
      return (<span key={key}><Tribe tribe={result[0]} size="icon14" />{result[0]}</span>);
    }
  }

  const filters = [mugic_counters, elements, disciplines, tribes];

  return <div className={props.type||"ability"}>{processString(filters)(props.ability)}</div>
}

export function Initiative(props) {
  let initiative = props.initiative;
  let image = null;
  if (["Danian", "Generic", "Mipedian", "OverWorld", "UnderWorld", "M'arrillian"].indexOf(initiative) > -1) {
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/tribes/"+initiative+".png").toLowerCase()} />
  }
  else if (["courage", "power", "speed", "wisdom"].indexOf(initiative.toLowerCase()) > -1){
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/disciplines/"+initiative+".png").toLowerCase()} />
  }
  else if (["fire", "air", "earth", "water"].indexOf(initiative.toLowerCase()) > -1){
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/elements/"+initiative+".png").toLowerCase()} />
  }
  else if (initiative.toLowerCase() == "mugic counter") {
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/mugic/generic.png").toLowerCase()} />
  }
  return (<span>Initiative: {image} {initiative}</span>);
}

export function Splash(props) {
  let image = props.image;
  return (
    <div style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundImage: 'url(\''+image+'\') no-repeat center', backgroundSize: 'cover'}} />
  );
}

export function Donate(props) {
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" />
      <a href="https://www.paypal.com/cgi-bin/webscr"><input type="image" src="/src/img/btn_donate_SM.gif" border="0" name="submit" alt="PayPal Donate" /></a>
      { /* <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" /> */ }
    </form>
  );
}

export function SearchButton(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="magnifying-glass"><g fillRule="evenodd"><path d="M21.747 20.524l-4.872-4.871a.864.864 0 1 0-1.222 1.222l4.871 4.872a.864.864 0 1 0 1.223-1.223z"></path><path d="M3.848 10.763a6.915 6.915 0 0 1 6.915-6.915 6.915 6.915 0 0 1 6.915 6.915 6.915 6.915 0 0 1-6.915 6.915 6.915 6.915 0 0 1-6.915-6.915zm-1.729 0a8.643 8.643 0 0 0 8.644 8.644 8.643 8.643 0 0 0 8.644-8.644 8.643 8.643 0 0 0-8.644-8.644 8.643 8.643 0 0 0-8.644 8.644z"></path></g>
    </svg>);
}
