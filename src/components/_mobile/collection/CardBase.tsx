import { Box, Card, CardMedia, CardContent, Typography, styled, useTheme } from '@mui/material';
import React from 'react';

import { Card as ChaoticCard } from "../../common/definitions";
import { RarityIcon } from '../../Snippets';
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
  right2?: JSX.Element
  imageCover?: JSX.Element
}

export const CardComponent = (
  { card, ext, extend, imageCover, left, right, content, right2 }: componentProps
) => {
  const theme = useTheme();

  const loc = card.gsx$type === "Locations";

  return (ext === false)
    ? (
      <Card sx={{ display: 'flex',
        [theme.breakpoints.down('md')]: { flexWrap: 'wrap', alignItems: "flex-start" }
      }} raised>
        <CardMedia
          component="img"
          sx={{ width: "96px" }}
          height="100px"
          image={API.base_image + (card.gsx$thumb||API.thumb_missing)}
          alt={`${card.gsx$name} thumb`}
          onClick={() => extend(card)}
        />
        <Box sx={{ marginLeft: .5, marginRight: .5, minWidth: "242px" }}>
          {left}
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Box sx={{ marginRight: "auto", flexGrow: 1 }}>
            {right}
          </Box>
          {right2 && <Box sx={{ float: "right" }}>
            {right2}
          </Box>}
        </Box>
      </Card>
    ) : (
      <Card raised>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: "flex-start" }}>
          <CardMedia
            component="img"
            sx={{ width: (loc ? "350px" : "250px") }}
            height={loc ? "250" : "350"}
            image={API.cardImage(card)}
            alt={`${card.gsx$name} card`}
            onClick={() => extend(null)}
          />
          {imageCover && 
            <div className="image-cover" onClick={() => extend(null)}>{imageCover}</div>
          }
          <CardContent sx={{ 
            flex: '1 0', minWidth: "310px", 
            width: `calc(100% - ${loc ? " 350px" : "250px"})`,
            paddingTop: "8px",
            paddingBottom: 0,
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

export const Rarity = (props: {card: ChaoticCard, ext: boolean}) => {
  const { card, ext } = props;

  return (!ext) ? (
    <Typography>
      <RarityIcon size="icon20" set={card.gsx$set} rarity={card.gsx$rarity} />
      {` ${API.sets[card.gsx$set]} | ${card.gsx$rarity}`}
    </Typography>
  ) : (
    <Typography>
      <RarityIcon size="icon20" set={card.gsx$set} rarity={card.gsx$rarity} />
      {` ${API.sets[card.gsx$set]} `}<span style={{ fontWeight: 'bold' }}>{`# ${card.gsx$id}`}</span>{` | ${card.gsx$rarity}`}
    </Typography>
  );
};

