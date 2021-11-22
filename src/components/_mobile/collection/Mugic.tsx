import { Typography } from "@mui/material";
import React from "react";
import { Mugic } from "../../common/definitions";
import { Name, RarityIcon, TribeIcon, MugicIcon } from "../../Snippets";
import { abilityText } from "../../Snippets/abilityText";
import { uniqueText } from "../../Snippets/uniqueText";
import { CardBase, CardComponent, Unique, Flavor } from "./CardBase";


const MugicCounter = ({ card }: {card:Mugic}) => {
  const mugicCounters = [] as JSX.Element[];
  if (Number(card.gsx$cost) === 0) {
    mugicCounters.push(<MugicIcon tribe={card.gsx$tribe} key={0} amount={"0"}/>);
  }
  else if (card.gsx$cost.toLowerCase() == 'x') {
    mugicCounters.push(<MugicIcon tribe={card.gsx$tribe} key={0} amount={"x"}/>);
  }
  else {
    if (Number(card.gsx$cost) > 5) {
      mugicCounters.push(<MugicIcon tribe={card.gsx$tribe} key={0} amount={card.gsx$cost} />);
    }
    else {
      for (let i = 0; i < Number(card.gsx$cost); i++) {
        mugicCounters.push(<MugicIcon tribe={card.gsx$tribe} key={i} />);
      }
    }
  }

  return <>{mugicCounters}</>;
};

const MugicCard: CardBase<Mugic> = (props) => {
  const { card } = props;
  const ability = abilityText({ ability: card.gsx$ability, size: "icon16" });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  return (
    <CardComponent {...props}
      left={<>
        <Name name={card.gsx$name} />
        <RarityIcon size="icon20" set={card.gsx$set} rarity={card.gsx$rarity} />
        <Typography><TribeIcon size="icon20" tribe={card.gsx$tribe} /> Mugic - {card.gsx$tribe}</Typography>
        <Typography><MugicCounter card={card}/></Typography>
      </>
      }
      right={<>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
      </>}
      content={<>
        <Name name={card.gsx$name} />
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
        <Typography>Art By: {card.gsx$artist}</Typography>
        <Typography>Notes: {card.gsx$notes}</Typography>
      </>}
    />
  );

};

export default MugicCard;
