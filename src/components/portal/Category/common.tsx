import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';

import s from '../../../styles/app.style';

import { Card } from "../../common/definitions";
import API from '../../SpreadsheetData';

export function cleanCardName (card: Card) {
  return card.gsx$name.split(",")[0].replace(/\(Unused\)[ ]/, "");
}

export function sortCardName (a: Card, b: Card) {
  return (a.gsx$name.toLowerCase().replace(/\(unused\)[ ]/, "") > b.gsx$name.toLowerCase().replace(/\(unused\)[ ]/, "") ? 1 : -1);
}

export function text_link (card: Card, i: number) {
  let url;
  if (["Attacks", "Battlegear", "Creatures", "Locations", "Mugic"].includes(card.gsx$type)) {
    url = `/portal/${card.gsx$type}/${card.gsx$name}`;
  }

  if (!url) return (<div key={i} style={{ display: "none" }}></div>);

  return (<div key={i}>
    <Interactive as={Link} {...s.link} to={url}>{card.gsx$name}</Interactive>
    <br />
  </div>);
}

export function thumb_link (portalCard: Card, i: number, url?: string) {
  let collectionCard: Card | null = null;
  if (["Attacks", "Battlegear", "Creatures", "Locations", "Mugic"].includes(portalCard.gsx$type)) {
    if (!url) url = `/portal/${portalCard.gsx$type}/${portalCard.gsx$name}`;
    collectionCard = API.cards[portalCard.gsx$type.toLowerCase()].findOne({ 'gsx$name': portalCard.gsx$name });
  }

  // Prevent site from crashing due to misspelled/missing data
  if (!collectionCard || !url) {
    console.warn(`missing: ${portalCard.gsx$name}`);
    return (<div key={i} style={{ display: "none" }} className="nav_item"></div>);
  }

  return (<div key={i} className="nav_item">
    <Interactive as={Link} to={url} {...s.link}>
      <span>{cleanCardName(collectionCard)}</span><br />
      <img className="thumb" src={API.base_image + (collectionCard.gsx$thumb ? collectionCard.gsx$thumb : API.thumb_missing)}></img>
    </Interactive>
  </div>);
}
