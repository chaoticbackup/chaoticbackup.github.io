import { Card, CardContent, CardHeader, CardMedia, Typography, Box } from '@mui/material';
import React from 'react';
import { Attack } from "../../common/definitions";
import { AttackIcon, ElementIcon, Name, RarityIcon } from '../../Snippets';
import { abilityText } from '../../Snippets/abilityText';
import { uniqueText } from '../../Snippets/uniqueText';
import API from '../../SpreadsheetData';
import { ChaoticCard } from './ChaoticCard';

const AttackCard: ChaoticCard<Attack> = ({ card, ext }) => {

  const ability = abilityText({ ability: card.gsx$ability });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  return (ext === false) 
    ? (
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ height: "100px", width: "96px" }}
          image={API.base_image + (card.gsx$thumb||API.thumb_missing)}
          alt={`${card.gsx$name} thumb`}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1, width: "30%" }}>
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
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
          {unique && <Typography>{unique}</Typography>}
          {flavor && <Typography>{flavor}</Typography>}
        </Box>
      </Card>
    )
    : (
      <Card>
        <CardHeader 
          title={<Name name={card.gsx$name} />}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: "flex-start" }}>
          <CardMedia
            component="img"
            sx={{ width: "250px" }}
            height="350"
            image={API.cardImage(card)}
            alt={`${card.gsx$name} card`}
          />
          <CardContent sx={{ flex: '1 0 auto', minWidth: "310px" }}>
            <Typography sx={{ whiteSpace: "pre-line" }}>{ability}</Typography>
            {unique && <Typography>{unique}</Typography>}
            {flavor && <Typography>{flavor}</Typography>}
            <Typography>Art By: {card.gsx$artist}</Typography>
          </CardContent>
        </Box>
      </Card>
    );
};

export default AttackCard;
