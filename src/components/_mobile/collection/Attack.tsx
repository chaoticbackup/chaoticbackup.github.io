import { Typography } from '@mui/material';
import React from 'react';
import { Attack } from "../../common/definitions";
import { AttackIcon, ElementIcon, Name, RarityIcon } from '../../Snippets';
import { abilityText } from '../../Snippets/abilityText';
import { uniqueText } from '../../Snippets/uniqueText';
import { CardBase, CardComponent, Flavor, Unique } from './CardBase';

const AttackCard: CardBase<Attack> = (props) => {
  const { card } = props;

  const ability = abilityText({ ability: card.gsx$ability });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  return (
    <CardComponent {...props}
      right={<>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
      </>}
      left={<>
        <Name name={card.gsx$name} />
        <RarityIcon set={card.gsx$set} rarity={card.gsx$rarity} />
        <Typography><AttackIcon bp={card.gsx$bp} /> Attack - {card.gsx$bp}</Typography>
        <Typography>
          {`${card.gsx$base} | `}
          <ElementIcon element="fire" value={card.gsx$fire} />{`${card.gsx$fire} `}
          <ElementIcon element="air" value={card.gsx$air} />{`${card.gsx$air} `}
          <ElementIcon element="earth" value={card.gsx$earth} />{`${card.gsx$earth} `}
          <ElementIcon element="water" value={card.gsx$water} />{`${card.gsx$water}`}
        </Typography>
      </>}
      content={<>
        <Name name={card.gsx$name} />
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
        <Typography>Art By: {card.gsx$artist}</Typography>
      </>}
    />
  );
};

export default AttackCard;
