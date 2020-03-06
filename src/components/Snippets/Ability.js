import React from 'react';
import processString from 'react-process-string';
import { Mugic, Element, Discipline, Tribe } from "./_text";

export function Ability(props) {
    const mugic_counters = {
      regex: /([0-9x]*){{mc}}/i,
      fn: (key, result) => {
        if (result.length > 1 && result[1] != "") {
          return (<Mugic key={key} tribe={props.tribe} amount={result[1].toLowerCase()} size="icon14" />);
        }
        return (<Mugic key={key} tribe={props.tribe} size="icon14" />);
      }
    }
  
    const elements = {
      regex: new RegExp(/(\b((fire)|(air)|(earth)|(water)))/i),
      fn: (key, result) => {
        return (<span key={key}><Element element={result[0].replace(/\b/, '')} value="true" size="icon14" />{result[0]}</span>);
      }
    }
  
    const disciplines = {
      regex: /(courage)|(power)|(wisdom)|(speed)/i,
      fn: (key, result) => {
        return (<span key={key}><Discipline discipline={result[0]} size="icon14" />{result[0]}</span>);
      }
    }
  
    const tribes = {
      regex: /(danian)|(generic)|(mipedian)|(overworld)|(underworld)|(m'arrillian)/i,
      fn: (key, result) => {
        return (<span key={key}><Tribe tribe={result[0]} size="icon14" />{result[0]}</span>);
      }
    }
  
    const filters = [mugic_counters, elements, disciplines, tribes];
  
    return <div className={props.type || "ability"}>{processString(filters)(props.ability)}</div>
}
