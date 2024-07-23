import React from 'react';

import { MugicPlayer } from './mugicplayer';
import { debounced } from '../debounce';
const player = MugicPlayer.getInstance();

export default (props: any) => {
  const play = debounced(200, () => { player.play(props.notes) });
  return (
    <input type="button" value="Play" onClick={() => { play() }} />
  );
};
