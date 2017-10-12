import React from 'react';

export const language = "ENG";
export const bkgrnd = "05";

export function ChangePage(asParams) {
  let location = "#";
  switch (asParams) {
    case 'collect':
      location = '/collection/';
      break;
    case 'register':
      break;
    case 'build':
      location = 'http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82';
      break;
    case 'centerOval':
      location = '/';
      break;
    case 'enterTheCode':
      break;
    case 'trade':
      location = 'http://www.tradecardsonline.com/?action=selectCard&goal=&game_id=82';
      break;
    case 'portal':
      location = '/portal/';
      break;
    case 'forum':
      location = 'http://chaoticbackup.forumotion.com';
      break;
    case 'playNow':
      location = 'http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82';
      break;
    default:
      location = '/construction/';
      break;
  }
  return location;
}
