import React from 'react';

export function Initiative(props) {
  const { initiative } = props;
  let image = null;
  if (["Danian", "Generic", "Mipedian", "OverWorld", "UnderWorld", "M'arrillian"].indexOf(initiative) > -1) {
    image = <img className="icon16" style={{ verticalAlign: 'middle' }} src={("/public/img/icons/tribes/" + initiative + ".png").toLowerCase()} />;
  }
  else if (["courage", "power", "speed", "wisdom"].indexOf(initiative.toLowerCase()) > -1) {
    image = <img className="icon16" style={{ verticalAlign: 'middle' }} src={("/public/img/icons/disciplines/" + initiative + ".png").toLowerCase()} />;
  }
  else if (["fire", "air", "earth", "water"].indexOf(initiative.toLowerCase()) > -1) {
    image = <img className="icon16" style={{ verticalAlign: 'middle' }} src={("/public/img/icons/elements/" + initiative + ".png").toLowerCase()} />;
  }
  else if (initiative.toLowerCase() == "mugic counter") {
    image = <img className="icon16" style={{ verticalAlign: 'middle' }} src={("/public/img/icons/mugic/generic.png").toLowerCase()} />;
  }
  return (<span>{!props.notitle && ("Initiative: ")}{image}&nbsp;{initiative}</span>);
}
