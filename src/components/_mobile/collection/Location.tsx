import { Typography } from '@mui/material';
import React from 'react';
import { Location } from '../../common/definitions';
import { InitiativeIcon, LocationIcon, Name, RarityIcon } from '../../Snippets';
import { abilityText } from '../../Snippets/abilityText';
import { uniqueText } from '../../Snippets/uniqueText';
import { CardBase, CardComponent, Unique, Flavor } from './CardBase';

const LocationCard: CardBase<Location> = (props) => {
  const { card } = props;
  const ability = abilityText({ ability: card.gsx$ability });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  return (
    <CardComponent {...props}
      left={<>
        <Name name={card.gsx$name} />
        <RarityIcon set={card.gsx$set} rarity={card.gsx$rarity} />
        <Typography><LocationIcon /> Location{card.gsx$types.length > 0 ? ` - ${card.gsx$types}` : null}</Typography>
        <Typography>{`Initiative: `}<InitiativeIcon initiative={card.gsx$initiative} />{` ${card.gsx$initiative}`}</Typography>
      </>}
      right={<>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
      </>}
      content={<>
        <Name name={card.gsx$name} />
        <Typography>{`Initiative: `}<InitiativeIcon initiative={card.gsx$initiative} />{` ${card.gsx$initiative}`}</Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
        {unique && <Unique>{unique}</Unique>}
        {flavor && <Flavor>{flavor}</Flavor>}
        <Typography>Art By: {card.gsx$artist}</Typography>
      </>}
    />
  );
};

export default LocationCard;
