import React from 'react';
import { Route, Link } from 'react-router-dom';
import {Donate} from './Snippets';

export default function Home() {
  return (
    <div>
      <link rel="stylesheet" href="/src/css/with_love.css" />
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
