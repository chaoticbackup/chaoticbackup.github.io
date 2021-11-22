import { Box, Card, CardMedia, CardContent, Typography, styled } from '@mui/material';
import React from 'react';

import { Card as ChaoticCard } from "../../common/definitions";
import API from '../../SpreadsheetData';

export type statsType = "avg" | "min" | "max";

export interface chaoticCardProps<T extends ChaoticCard> {
  card: T
  ext: boolean
  stats: statsType
  hideStats: boolean
  extend: (card: ChaoticCard | null) => void
}

export interface CardBase<T extends ChaoticCard> {
  (props: chaoticCardProps<T>): JSX.Element
}


type componentProps = chaoticCardProps<ChaoticCard> & {
  left: JSX.Element
  right: JSX.Element
  content: JSX.Element
}

export const CardComponent = (
  { card, ext, extend, left, right, content }: componentProps
) => {
  const loc = card.gsx$type === "Locations";

  return (ext === false)
    ? (
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ height: "100px", width: "96px" }}
          image={API.base_image + (card.gsx$thumb||API.thumb_missing)}
          alt={`${card.gsx$name} thumb`}
          onClick={() => extend(card)}
        />
        <Box sx={{ marginLeft: .5, marginRight: .5, minWidth: "242px" }}>
          {left}
        </Box>
        <Box>
          {right}
        </Box>
      </Card>
    ) : (
      <Card>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: "flex-start" }}>
          <CardMedia
            component="img"
            sx={{ width: (loc ? "350px" : "250px") }}
            height={loc ? "250" : "350"}
            image={API.cardImage(card)}
            alt={`${card.gsx$name} card`}
            onClick={() => extend(null)}
          />
          <CardContent sx={{ 
            flex: '1 0', minWidth: "310px", 
            width: `calc(100% - ${loc ? " 350px" : "250px"})`
          }}>
            {content}
          </CardContent>
        </Box>
      </Card>
    );
};

export const Unique = styled(Typography)(() => ({
  fontWeight: "bold"
}));

export const Flavor = styled(Typography)(() => ({
  fontStyle: "italic"
}));
