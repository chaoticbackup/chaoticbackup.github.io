import React from 'react';

import API from '../../SpreadsheetData';

export function Thumbnail ({ card, setImage }) {

  // If imgur image exists, crop from it instead
  if (card.gsx$ic && card.gsx$ic !== '') {
    const innerStyle = (() => {
      switch (card.gsx$type) {
        case 'Attacks': 
          return {
            height: "206px",
            width: "112px",
            margin: "-22px 0px 0px -6px",
          };
        case 'Battlegear': 
          return {
            height: "204px",
            width: "112px",
            margin: "-22px 0px 0px -6px",
          };
        case 'Creatures': 
          return {
            height: "192px",
            width: "109px",
            margin: "-18px 0px -0px -4px",
          };
        case 'Locations':
          return {
            height: "194px",
            width: "200px",
            margin: "-28px 0px 0px -50px",
          };
        case 'Mugic': 
          return {
            height: "188px",
            width: "100px",
            margin: "-18px 0px 0px 0px",
          };
      }
    })();

    return (<div className='thumb' style={{ overflow: "hidden" }}>
      <img
        src={card.gsx$ic}
        onClick={() => setImage(card.gsx$ic)}
        style={{ ...innerStyle }}
      />
    </div>);
  }

  return <img 
    className="thumb" 
    src={API.base_image + (card.gsx$thumb||API.thumb_missing)} 
    onClick={() => setImage(API.cardImage(card))} 
  />;
}
