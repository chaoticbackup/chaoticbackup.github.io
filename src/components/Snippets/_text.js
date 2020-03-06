import React from 'react';

export function Name(props) {
  let name = props.name.split(",");
  return (<span className="name">
    <span className="bigger">{name[0]}</span>
    {name.length > 1 &&
      <>
        <span style={{ opacity: "0" }}>,</span>
        <span className="subname">{name[1]}</span>
      </>
    }
  </span>);
}

export function Mugic(props) {
  let type = (props.tribe || "generic") + (props.amount != undefined ? `_${props.amount}` : "");
  let src = ("/src/img/icons/mugic/" + type + ".png").toLowerCase();
  return <img className={props.size || "icon20"} src={src} alt={"MC"} />
}
  
export function Element(props) {
  if (props.value) {
    return <img className={props.size || "icon20"} src={("/src/img/icons/elements/" + props.element + ".png").toLowerCase()} />
  }
  else {
    return <img className={props.size || "icon20"} src={("/src/img/icons/elements/" + props.element + "-inactive.png").toLowerCase()} />
  }
}
  
export function Tribe(props) {
  return <img className={props.size || "icon16"} src={("/src/img/icons/tribes/" + props.tribe + ".png").toLowerCase()} />
}
  
export function Discipline(props) {
  return <img className={props.size || "icon16"} src={("/src/img/icons/disciplines/" + props.discipline + ".png").toLowerCase()} />
}
