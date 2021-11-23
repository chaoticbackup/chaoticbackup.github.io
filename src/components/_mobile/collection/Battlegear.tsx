import { Typography } from '@mui/material';
import React from 'react';
import { BattlegearIcon, Name } from '../../Snippets';
import { Battlegear } from '../../common/definitions';
import { abilityText } from '../../Snippets/abilityText';
import { uniqueText } from '../../Snippets/uniqueText';
import { CardBase, CardComponent, Unique, Flavor, Rarity } from './CardBase';

const BattlegearCard: CardBase<Battlegear> = (props) => {
  const { card } = props;
  const ability = abilityText({ ability: card.gsx$ability, size: "icon16" });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  return (
    <CardComponent {...props}
      left={<>
        <Name name={card.gsx$name} />
        <Rarity {...props} />
        <Typography><BattlegearIcon size="icon20"/> Battlegear{card.gsx$types.length > 0 ? ` - ${card.gsx$types}` : null}</Typography>
      </>}
      right={<>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
      </>}
      content={<>
        <Name name={card.gsx$name} />
        <Rarity {...props} />
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
        <Typography>Art By: {card.gsx$artist}</Typography>
      </>}
    />
  );
};

export default BattlegearCard;
