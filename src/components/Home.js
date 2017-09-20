import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';

function Home() {
  return (
    <div>
      <Interactive as={Link} {...s.link}
        to="/portal/Creatures"
      >Creatures</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/portal/Danian/Creatures"
      >Danian</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/portal/Overworld/Creatures"
      >Overworld</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/portal/Underworld/Creatures"
      >Underworld</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/portal/Mipedian/Creatures"
      >Mipedian</Interactive>
      <br />
      <br />
      <br />
      <div style={s.pageLinkContainer}>
        <Interactive
          as={Link}
          {...s.link}
          to="/portal/example"
        >Example page</Interactive>
      </div>
      <div style={s.pageLinkContainer}>
        <Interactive
          as={Link}
          {...s.link}
          to="/portal/example/two-deep?field1=foo&field2=bar#boom!"
        >Example two deep with query and hash</Interactive>
      </div>
    </div>
  );
}

export default Home;
