import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';

function Home() {
  return (
    <div>
      <link rel="stylesheet" href="/src/css/with_love.css" />
      <br />
      Welcome to the Chaotic Backup Project.<br />
      Built by fans for fans.<br /><br />
      <div className="with-love">
        Made with <span className="heart">♥</span> by <a href="https://github.com/chaoticbackup" className="name" target="_blank">Danude Sandstorm</a>
      </div>
    </div>
  );
}

export default Home;
