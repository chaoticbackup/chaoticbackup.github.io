import React from 'react';
import processString from 'react-process-string';
import { MugicIcon, ElementIcon, DisciplineIcon, TribeIcon } from "./_icons";

export function abilityText(props) {
  const mugic_counters = {
    regex: /([0-9x]*){{mc}}/i,
    fn: (key, result) => {
      if (result.length > 1 && result[1] != "") {
        return (<MugicIcon key={key} tribe={props.tribe} amount={result[1].toLowerCase()} size={props.size || "icon14"} />);
      }
      return (<MugicIcon key={key} tribe={props.tribe} size={props.size || "icon14"} />);
    }
  };
  
  const elements = {
    regex: new RegExp(/(\b((fire)|(air)|(earth)|(water)))/i),
    fn: (key, result) => {
      return (<span key={key}><ElementIcon element={result[0].replace(/\b/, '')} value="true" size={props.size || "icon14"} />{result[0]}</span>);
    }
  };
  
  const disciplines = {
    regex: /(courage)|(power)|(wisdom)|(speed)/i,
    fn: (key, result) => {
      return (<span key={key}><DisciplineIcon discipline={result[0]} size={props.size || "icon14"} />{result[0]}</span>);
    }
  };
  
  const tribes = {
    regex: /(danian)|(generic)|(mipedian)|(overworld)|(underworld)|(m'arrillian)/i,
    fn: (key, result) => {
      return (<span key={key}><TribeIcon tribe={result[0]} size={props.size || "icon14"} />{result[0]}</span>);
    }
  };
  
  const filters = [mugic_counters, elements, disciplines, tribes];

  return processString(filters)(props.ability);
}
