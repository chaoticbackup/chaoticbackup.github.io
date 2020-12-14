import React from 'react';
import API from '../SpreadsheetData';

export function AttackIcon(props) {
  const attack = "attack" + ((props.bp && props.bp >= 0) ? "_" + props.bp : "");
  return <img className={props.size || "icon16"} src={`/public/img/icons/attack/${attack}.png`} />;
}

export function BattlegearIcon(props) {
  return <img className={props.size || "icon16"} src="/public/img/icons/battlegear.png" />;
}
  
export function LocationIcon(props) {
  return <img className={props.size || "icon16"} src="/public/img/icons/location.png" />;
}
  
export function Rarity(props) {
  const { set, rarity, iconOnly=false } = props;
  return (
    <span>
      {set !== 'PE1' && <img className={props.size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/public/img/icons/set/" + set + "/" + rarity + ".png").toLowerCase()} />}
      {!iconOnly && <>{API.sets[props.set]}&nbsp;|&nbsp;{props.rarity}</>}
    </span>
  );
}
