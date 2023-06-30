import { CardType } from './card_types';

export interface BaseCard {
  gsx$name: string
  gsx$tags?: string
  gsx$type: CardType
  gsx$set: string
  gsx$rarity: string
  gsx$id: string
  gsx$image: string
  gsx$thumb: string
  gsx$ability: string
  gsx$flavortext: string
  gsx$splash: string
  gsx$types: string
  gsx$unique: string
  gsx$legendary: string
  gsx$loyal: string
  gsx$alt?: string
  gsx$alt2?: string
  gsx$ic?: string // imgur card
  gsx$if?: string // imgur fullart
  gsx$artist?: string
  gsx$exclusive?: string
}

export interface Attack extends BaseCard {
  gsx$fire: string
  gsx$air: string
  gsx$earth: string
  gsx$water: string
  gsx$base: string
  gsx$bp: string
}

export interface Battlegear extends BaseCard {
  gsx$subtype: string
}

export interface Creature extends BaseCard {
  gsx$tribe: string
  gsx$courage: string
  gsx$power: string
  gsx$wisdom: string
  gsx$speed: string
  gsx$energy: string
  gsx$elements: string
  gsx$brainwashed: string
  gsx$mugicability: string
  gsx$avatar?: string
  gsx$subtype: string
  gsx$ia?: string // imgur avatar
}

export interface Location extends BaseCard {
  gsx$initiative: string
  gsx$subtype: string
}

export interface Mugic extends BaseCard {
  gsx$tribe: string
  gsx$cost: string
  gsx$notes: string
  gsx$shownotes: string
}

export type Card = Attack | Battlegear | Creature | Location | Mugic;

export type Code = string;

export function isAttack(card: Card): card is Attack {
  return (card.gsx$type === 'Attacks');
}

export function isBattlegear(card: Card): card is Battlegear {
  return (card.gsx$type === 'Battlegear');
}

export function isCreature(card: Card): card is Creature {
  return (card.gsx$type === 'Creatures');
}

export function isLocation(card: Card): card is Location {
  return (card.gsx$type === 'Locations');
}

export function isMugic(card: Card): card is Mugic {
  return (card.gsx$type === 'Mugic');
}
