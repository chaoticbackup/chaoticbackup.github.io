import { Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import Attack from './Attack';
import Search from './Search';
import { Card as ChaoticCard, Attack as AttackCard } from '../../common/definitions';

import './collection.scss';

type statsType = "avg" | "min" | "max";

export default function Collection (props) {
  const [loaded, setLoaded] = useState(false);
  const [p, sp] = useState(1);
  const [n, sn] = useState(10);
  const [ext, setExt] = useState(false);
  const [stats, setStats] = useState<statsType>("avg");
  const [hideStats, setHideStats] = useState(false);
  const [content, setContent] = useState<ChaoticCard[]>([]);
  const [info, setInfo] = useState<{text?: string}>({});
  
  return (<>
    <Search {...({ setContent, setInfo })} />
    {info.text ? (
      <Typography style={{ textAlign: 'left' }}>{info.text}</Typography>
    ) : (
      <CardList
        cards={content.slice(n * (p-1), n * p)}
        {...({ ext, stats, hideStats })}
      />
    )}
  </>);
    
}

interface listProps {
  cards: ChaoticCard[]
  info?: string
  ext: boolean
  stats: statsType
  hideStats: boolean
}

const CardList = ({ cards, info, ...props }: listProps) => {
  const list = cards.map((card, i) => {
    switch (card.gsx$type) {
      case "Attacks":
        return (<Attack card={card as AttackCard} key={card.gsx$name} {...props}/>);
      // case "Battlegear":
      //   return (<Battlegear card={card} key={i} {...props}/>);
      // case "Creatures":
      //   return (<Creature card={card} key={i} {...props}/>);
      // case "Locations":
      //   return (<Location card={card} key={i} {...props}/>);
      // case "Mugic":
      //   return (<Mugic card={card} key={i} {...props}/>);
      default:
        return (<Card key={i}><Typography>Invalid Card Type</Typography></Card>);
    }
  });

  // Limitation of typescript - error TS2605
  return <>{list}</>;
};
