import React from 'react';
import API from '../SpreadsheetData';

export function AttackIcon(props) {
    let attack = "attack" + ((props.bp && props.bp >= 0) ? "_" + props.bp : "");
    return <img className={props.size || "icon16"} src={`/src/img/icons/attack/${attack}.png`} />
}

export function BattlegearIcon(props) {
    return <img className={props.size || "icon16"} src="/src/img/icons/battlegear.png" />
}
  
export function LocationIcon(props) {
    return <img className={props.size || "icon16"} src="/src/img/icons/location.png" />
}
  
export function Rarity(props) {
    let { set, rarity } = props;
    return (
      <span>
        {set !== 'PE1' && <img className={props.size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/src/img/icons/set/" + set + "/" + rarity + ".png").toLowerCase()} />}
        {!props.notext && <React.Fragment>{API.sets[props.set]}&nbsp;|&nbsp;{props.rarity}</React.Fragment>}
      </span>
    );
}
