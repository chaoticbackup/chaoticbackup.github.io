import React from 'react';
import { Route, Link } from 'react-router-dom';
import {Donate} from './Snippets';
import "../scss/with_love.scss";

export default function Home() {
  return (
    <div>
      <br />
      <div className="with-love">
        <div>Welcome to the <a href="https://github.com/chaoticbackup" className="name" target="_blank">Chaotic Backup Project</a>.
        </div>
        <span>Built by fans for fans.</span>
        <br /><br />
        <div>Made with <span className="heart">♥</span> by
        <br />Danude Sandstorm
        <br />Chiodosin1
        </div>
        <br />
        <div>Do you like the site? You can donate to support it!</div>
        <Donate />
      </div>
    </div>
  );
}
