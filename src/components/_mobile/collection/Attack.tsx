import { Card, CardContent, CardHeader, CardMedia, Typography, Box } from '@mui/material';
import React from 'react';
import { Attack } from "../../common/definitions";
import { Ability, Name } from '../../Snippets';
import { abilityText } from '../../Snippets/abilityText';
import { uniqueText } from '../../Snippets/uniqueText';
import API from '../../SpreadsheetData';

interface props {
    card: Attack
    ext: boolean
}

export default function AttackCard ({ card, ext }: props) {

  const ability = abilityText({ ability: card.gsx$ability });
  const unique = uniqueText({ data: { unique: card.gsx$unique, loyal: card.gsx$loyal, legendary: card.gsx$legendary }});
  const flavor = card.gsx$flavortext;

  return (
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
}
