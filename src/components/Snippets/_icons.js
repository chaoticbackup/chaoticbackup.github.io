import React from 'react';

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
  
export function RarityIcon(props) {
  const { set, rarity, size } = props;
  return (<>{!["PE1", "DATA", "PROTO"].includes(set) && 
    <img className={size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/public/img/icons/set/" + set + "/" + rarity + ".png").toLowerCase()} />
  }</>);
}

export function MugicIcon(props) {
  const type = (props.tribe || "generic") + (props.amount != undefined ? `_${props.amount}` : "");
  const src = ("/public/img/icons/mugic/" + type + ".png").toLowerCase();
  return <img className={props.size || "icon20"} src={src} alt={"MC"} />;
}
  
export function ElementIcon(props) {
  if (props.value) {
    return <img className={props.size || "icon20"} src={("/public/img/icons/elements/" + props.element + ".png").toLowerCase()} />;
  }
  else {
    return <img className={props.size || "icon20"} src={("/public/img/icons/elements/" + props.element + "-inactive.png").toLowerCase()} />;
  }
}
  
export function TribeIcon(props) {
  return <img className={props.size || "icon16"} src={("/public/img/icons/tribes/" + props.tribe + ".png").toLowerCase()} />;
}
  
export function DisciplineIcon(props) {
  return <img className={props.size || "icon16"} src={("/public/img/icons/disciplines/" + props.discipline + ".png").toLowerCase()} />;
}

export function InitiativeIcon(props) {
  const { initiative } = props;
  let image = <></>;
  if (["Danian", "Generic", "Mipedian", "OverWorld", "UnderWorld", "M'arrillian"].indexOf(initiative) > -1) {
    image = <img className={props.size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/public/img/icons/tribes/" + initiative + ".png").toLowerCase()} />;
  }
  else if (["courage", "power", "speed", "wisdom"].indexOf(initiative.toLowerCase()) > -1) {
    image = <img className={props.size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/public/img/icons/disciplines/" + initiative + ".png").toLowerCase()} />;
  }
  else if (["fire", "air", "earth", "water"].indexOf(initiative.toLowerCase()) > -1) {
    image = <img className={props.size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/public/img/icons/elements/" + initiative + ".png").toLowerCase()} />;
  }
  else if (initiative.toLowerCase() == "mugic counter") {
    image = <img className={props.size || "icon16"} style={{ verticalAlign: 'middle' }} src={("/public/img/icons/mugic/generic.png").toLowerCase()} />;
  }

  return image;
}
