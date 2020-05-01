import React from 'react';
import {debounced} from '../debounce';
import {MugicPlayer} from './mugicplayer';
const player = MugicPlayer.getInstance();

export default (props: any) => {
    const play = debounced(200, () => { player.play(props.notes); });
    return (
        <input type="button" value="Play" onClick={() => { play() }} />
    );
};
