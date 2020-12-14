export const Tribes = ['Danian', 'Mipedian', "M'arrillian", 'OverWorld', 'UnderWorld'] as const;
export const CreatureTribes = ['Danian', 'Mipedian', "M'arrillian", 'OverWorld', 'UnderWorld', 'Tribeless'] as const;
export const MugicTribes = ['Danian', 'Mipedian', "M'arrillian", 'OverWorld', 'UnderWorld', 'Generic'] as const;

export type Tribe = typeof Tribes[number];
export type CreatureTribe = typeof CreatureTribes[number];
export type MugicTribe = typeof MugicTribes[number];

export const CardTypes = ['Attacks', 'Battlegear', 'Creatures', 'Locations', 'Mugic'] as const;
export type CardType = typeof CardTypes[number];

export function parseTribe(input: string): CreatureTribe | MugicTribe | undefined;
export function parseTribe(input: string, type: 'Mixed'): Tribe | 'Mixed' | undefined;
export function parseTribe(input: string, type: 'Mugic'): MugicTribe | undefined;
export function parseTribe(input: string, type: 'Creatures'): CreatureTribe | undefined;
export function parseTribe(input: string, type: 'Mugic' | 'Creatures'): CreatureTribe | MugicTribe | undefined;
export function parseTribe(
  input: string, type?: 'Mugic' | 'Creatures' | 'Mixed'
): CreatureTribe | MugicTribe | 'Mixed' | undefined {
  switch (input.toLowerCase()) {
    case 'danian':
    case 'danians':
      return 'Danian';
    case 'marrillian':
    case 'marrillians':
    case 'm\'arrillian':
    case 'm\'arrillians':
      return "M'arrillian";
    case 'mipedian':
    case 'mipedians':
      return 'Mipedian';
    case 'overworld':
    case 'overworlders':
      return 'OverWorld';
    case 'underworld':
    case 'underworlders':
      return 'UnderWorld';
    case 'mixed':
      return 'Mixed';
    case 'tribeless':
      if (type === 'Mixed') return 'Mixed';
      if (type === 'Mugic') return 'Generic';
      return 'Tribeless';
    case 'generic':
      if (type === 'Mixed') return 'Mixed';
      if (type === 'Creatures') return 'Tribeless';
      return 'Generic';
  }
}

export function generify(tribe: CreatureTribe | MugicTribe, type: 'Mugic'): MugicTribe;
export function generify(tribe: CreatureTribe | MugicTribe, type: 'Creatures'): CreatureTribe;
export function generify(tribe: CreatureTribe | MugicTribe, type: 'Mugic' | 'Creatures'): MugicTribe | CreatureTribe;
export function generify(tribe: CreatureTribe | MugicTribe, type: 'Mugic' | 'Creatures') {
  if (type === 'Creatures') {
    if (tribe === 'Generic') tribe = 'Tribeless';
    return tribe;
  }
  else if (type === 'Mugic') {
    if (tribe === 'Tribeless') tribe = 'Generic';
    return tribe;
  }
}

export function parseType(input: string): CardType | undefined {
  switch (input.toLowerCase()) {
    case 'attack':
    case 'attacks':
      return 'Attacks';
    case 'battlegear':
      return 'Battlegear';
    case 'creature':
    case 'creatures':
      return 'Creatures';
    case 'location':
    case 'locations':
      return 'Locations';
    case 'mugic':
      return 'Mugic';
  }
}
