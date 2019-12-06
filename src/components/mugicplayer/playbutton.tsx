import React from 'react';
import MugicPlayer from './mugicplayer';

export default (props: any) => (
    <React.Fragment >
        <input type="button" value="Play" onClick={() => {MugicPlayer.play(props.notes)}} />
    </React.Fragment>
);
