import { Typography, styled } from '@mui/material';
import React from 'react';
import { Creature } from "../../common/definitions";
import { Name, TribeIcon, MugicIcon, ElementIcon, DisciplineIcon } from '../../Snippets';
import { abilityText } from '../../Snippets/abilityText';
import { uniqueText } from '../../Snippets/uniqueText';
import { CardBase, CardComponent, Unique, Flavor, Rarity } from "./CardBase";

const TribeLine = ({ card }: {card: Creature}) => {
  let types = card.gsx$types;

  // Moves "Past" in front of tribe due to db entry order
  let past = false;
  if (types.toLowerCase().includes("past")) {
    past = true;
    types = types.replace(/past /i, '');
  }
  const line = ` ${  past ? "Past " : ""  }${types}`;

  return <Typography><TribeIcon tribe={card.gsx$tribe} />{line}</Typography>;
};

const MugicCounter = ({ card }: { card: Creature }) => {
  const mugic = [] as JSX.Element[];
  for (let i = 0; i < Number(card.gsx$mugicability); i++) {
    mugic.push(<MugicIcon key={i} tribe={card.gsx$tribe} />);
  }

  return <>{mugic}</>;
};

const Brainwashed = styled(Typography)(() => ({
  borderRadius: "3px",
  backgroundColor: "#dcdddf",
  color: "black"
}));

const Stat = styled(Typography)(() => ({
  width: "44px",
  lineHeight: "normal",
  textAlign: "right"
}));

const CreatureCard: CardBase<Creature> = (props) => {
  const { card, stats, hideStats } = props;
  const ability = abilityText({ ability: card.gsx$ability, tribe: card.gsx$tribe, size: "icon16" });
  const brainwashed = abilityText({ ability: card.gsx$brainwashed, tribe: card.gsx$tribe, size: "icon16" });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  const stat_range = (stat: string) => {
    const name = card.gsx$name;
    if (name && name == "Aa'une the Oligarch, Avatar") return Number(stat);
    if (stats == "min") return Number(stat) - 10;
    if (stats == "max") return Number(stat) + 10;
    return Number(stat);
  };

  const energy_range = (energy: string) => {
    const name = card.gsx$name;
    if (name && name == "Aa'une the Oligarch, Avatar") return Number(energy);
    if (stats == "min") return Number(energy) - 5;
    if (stats == "max") return Number(energy) + 5;
    return Number(energy);
  };

  const courage = stat_range(card.gsx$courage);
  const power = stat_range(card.gsx$power);
  const wisdom = stat_range(card.gsx$wisdom);
  const speed = stat_range(card.gsx$speed);
  const energy = energy_range(card.gsx$energy);

  return (
    <CardComponent {...props} 
      left={<>
        <Name name={card.gsx$name} />
        <Rarity {...props} />
        <TribeLine card={card} />
        <Typography>
          <ElementIcon element="fire" value={card.gsx$elements.toLowerCase().indexOf("fire") >=0} />&nbsp;
          <ElementIcon element="air" value={card.gsx$elements.toLowerCase().indexOf("air") >=0} />&nbsp;
          <ElementIcon element="earth" value={card.gsx$elements.toLowerCase().indexOf("earth") >=0} />&nbsp;
          <ElementIcon element="water" value={card.gsx$elements.toLowerCase().indexOf("water") >=0} />
        </Typography>
        <MugicCounter card={card} />
      </>}
      right={<>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {brainwashed && <Brainwashed>{brainwashed}</Brainwashed>}
        {unique && <Unique>{unique}</Unique>}
        {card.gsx$types.includes("Chieftain") &&
          <Flavor>(Minions use Brainwashed text. Minions may only play Generic Mugic.)</Flavor>
        }
        {flavor && <Flavor>{flavor}</Flavor>}
      </>}
      right2={<>
        <Stat>{courage}<DisciplineIcon discipline="courage" /></Stat>
        <Stat>{power}<DisciplineIcon discipline="power" /></Stat>
        <Stat>{wisdom}<DisciplineIcon discipline="wisdom" /></Stat>
        <Stat>{speed}<DisciplineIcon discipline="speed" /></Stat>
        <Stat sx={{ fontWeight: "bold" }}>{energy}<span style={{ display: "inline-block", width: "16px" }}></span></Stat>
      </>}
      {...((!hideStats) ? { imageCover: (
        <div>
          <span key="courage" {...(courage >= 100 ? { className: "long" } : null)}>{courage}</span>
          <span key="power" {...(power >= 100 ? { className: "long" } : null)}>{power}</span>
          <span key="wisdom" {...(wisdom >= 100 ? { className: "long" } : null)}>{wisdom}</span>
          <span key="speed" {...(speed >= 100 ? { className: "long" } : null)}>{speed}</span>
          <span key="energy" {...(energy >= 100 ? { className: "long" } : null)}>{energy}</span>
        </div>
      ) } 
        : undefined)}
      content={<>
        <Name name={card.gsx$name} />
        <Rarity {...props} />
        <span>{stat_range(card.gsx$courage)}&nbsp;<DisciplineIcon discipline="courage" /></span>&nbsp;
        <span>{stat_range(card.gsx$power)}&nbsp;<DisciplineIcon discipline="power" /></span>&nbsp;
        <span>{stat_range(card.gsx$wisdom)}&nbsp;<DisciplineIcon discipline="wisdom" /></span>&nbsp;
        <span>{stat_range(card.gsx$speed)}&nbsp;<DisciplineIcon discipline="speed" /></span>&nbsp;
        <span style={{ fontWeight: 'bold' }}>{energy_range(card.gsx$energy)}</span>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {brainwashed && <Brainwashed>{brainwashed}</Brainwashed>}
        {unique && <Unique>{unique}</Unique>}
        {card.gsx$types.includes("Chieftain") &&
          <Flavor>(Minions use Brainwashed text. Minions may only play Generic Mugic.)</Flavor>
        }
        {flavor && <Flavor>{flavor}</Flavor>}
        <Typography>Art By: {card.gsx$artist}</Typography>
      </>}
    />
  );
};

export default CreatureCard;
