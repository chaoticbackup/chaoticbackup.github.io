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
          <br />Card database contributed by Chiodosin1
          <div>We were unsatisfied with the options on how to search for cards. I took the design of the old Chaotic website and added my own modernizations.
            <br />With an extensive lists of search options in the <a href="/collection">collection</a>, you'll find deck building mores streamlined than ever before.
            <br />Chaotic is full of rich lore, but unfortunately the best database of official lore disapeared when the <a href="/portal">Portal to Perim</a> disapeared along with the site. You can again explore the official lore and information of Creatures!
          </div>
        </div>
        <br />
        <div>Do you like the site? You can donate to support it!</div>
        <Donate />
      </div>
    </div>
  );
}
