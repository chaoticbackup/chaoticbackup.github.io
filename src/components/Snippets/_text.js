import React from 'react';

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

export function Mugic(props) {
  const type = (props.tribe || "generic") + (props.amount != undefined ? `_${props.amount}` : "");
  const src = ("/public/img/icons/mugic/" + type + ".png").toLowerCase();
  return <img className={props.size || "icon20"} src={src} alt={"MC"} />;
}
  
export function Element(props) {
  if (props.value) {
    return <img className={props.size || "icon20"} src={("/public/img/icons/elements/" + props.element + ".png").toLowerCase()} />;
  }
  else {
    return <img className={props.size || "icon20"} src={("/public/img/icons/elements/" + props.element + "-inactive.png").toLowerCase()} />;
  }
}
  
export function Tribe(props) {
  return <img className={props.size || "icon16"} src={("/public/img/icons/tribes/" + props.tribe + ".png").toLowerCase()} />;
}
  
export function Discipline(props) {
  return <img className={props.size || "icon16"} src={("/public/img/icons/disciplines/" + props.discipline + ".png").toLowerCase()} />;
}

export function FlavorText({ flavortext }) {
  return (flavortext) ? <div className="flavortext">{flavortext}</div> : <></>;
}
