import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';

function Home() {
  return (
    <div>
      <link rel="stylesheet" href="/src/css/with_love.css" />
      <br />
      <div className="with-love">
        Welcome to the <a href="https://github.com/chaoticbackup" className="name" target="_blank">Chaotic Backup Project</a>.
        <br />
        Built by fans for fans.
        <br /><br />
        Made with <span className="heart">♥</span> by
        <br />Danude Sandstorm
        <br />Chiodosin1
      </div>
    </div>
  );
}

export default Home;
