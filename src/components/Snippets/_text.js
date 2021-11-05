import React from 'react';
import { abilityText } from './abilityText';
import { uniqueText } from './uniqueText';
import { InitiativeIcon } from './_icons';

export function Name(props) {
  const name = props.name.split(",");
  return (<div>
    <span className="name">
      <span className="bigger">{name[0]}</span>
      {name.length > 1 &&
        <>
          <span style={{ opacity: "0" }}>,</span>
          <span className="subname">{name[1]}</span>
        </>
      }
    </span>
  </div>);
}

export function FlavorText({ flavortext }) {
  return (flavortext) ? <div className="flavortext">{flavortext}</div> : <></>;
}

export function Ability(props) {
  return <div className={props.type || "ability"}>{abilityText(props)}</div>;
}

export function Unique(props) {
  const string = uniqueText(props);

  if (string === "") return <></>;
  else return (
    <div style={{ fontWeight: "Bold" }}>{string}</div>
  );
}

export function Initiative(props) {
  return (<span>{!props.notitle && ("Initiative: ")}{InitiativeIcon(props)}&nbsp;{props.initiative}</span>);
}
