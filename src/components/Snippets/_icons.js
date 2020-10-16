import React from 'react';
import API from '../SpreadsheetData';

export function AttackIcon(props) {
  const attack = "attack" + ((props.bp && props.bp >= 0) ? "_" + props.bp : "");
  return <img className={props.size || "icon16"} src={`/src/img/icons/attack/${attack}.png`} />;
}

export function BattlegearIcon(props) {
  return <img className={props.size || "icon16"} src="/src/img/icons/battlegear.png" />;
}
  
export function LocationIcon(props) {
  return <img className={props.size || "icon16"} src="/src/img/icons/location.png" />;
}
  
export function Rarity(props) {
  const { set, rarity } = props;
  return (
    <span>
      {set !== 'PE1' && <img className={props.size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/src/img/icons/set/" + set + "/" + rarity + ".png").toLowerCase()} />}
      {!props.notext && <>{API.sets[props.set]}&nbsp;|&nbsp;{props.rarity}</>}
    </span>
  );
}
