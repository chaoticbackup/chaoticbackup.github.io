import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';

function Home() {
  return (
    <div>
      <Interactive as={Link} {...s.link}
        to="/collection/Creatures"
      >Creatures</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/collection/Danian/Creatures"
      >Danian</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/collection/Overworld/Creatures"
      >Overworld</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/collection/Underworld/Creatures"
      >Underworld</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/collection/Mipedian/Creatures"
      >Mipedian</Interactive>
    </div>
  );
}

export default Home;
