import { Typography } from '@mui/material';
import React from 'react';
import { BattlegearIcon, Name, RarityIcon } from '../../Snippets';
import { Battlegear } from '../../common/definitions';
import { abilityText } from '../../Snippets/abilityText';
import { uniqueText } from '../../Snippets/uniqueText';
import { CardBase, CardComponent } from './CardBase';

const BattlegearCard: CardBase<Battlegear> = (props) => {
  const { card } = props;
  const ability = abilityText({ ability: card.gsx$ability });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  return (
    <CardComponent {...props}
      left={<>
        <Name name={card.gsx$name} />
        <RarityIcon set={card.gsx$set} rarity={card.gsx$rarity} />
        <Typography><BattlegearIcon /> Battlegear{card.gsx$types.length > 0 ? ` - ${card.gsx$types}` : null}</Typography>
      </>}
      right={<>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Typography>{unique}</Typography>}
        {flavor && <Typography>{flavor}</Typography>}
      </>}
      content={<>
        <Name name={card.gsx$name} />
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Typography>{unique}</Typography>}
        {flavor && <Typography>{flavor}</Typography>}
        <Typography>Art By: {card.gsx$artist}</Typography>
      </>}
    />
  );

};

export default BattlegearCard;
