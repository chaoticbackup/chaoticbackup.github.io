import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../../styles/portal/home.style';

export default function PortalHome() {
  return (
    <div style={s.wrapper}>
      <div style={s.types}>
        <p>Explore Types</p><br />
        <Interactive as={Link} {...s.link}
          to="/portal/Attacks"
        >Attacks</Interactive>
        <br /><br />
        <Interactive as={Link} {...s.link}
          to="/portal/Battlegear"
        >Battlegear</Interactive>
        <br /><br />
        <Interactive as={Link} {...s.link}
          to="/portal/Creatures"
        >Creatures</Interactive>
        <br /><br />
        <Interactive as={Link} {...s.link}
          to="/portal/Mugic"
        >Mugic</Interactive>
        <br /><br />
        <Interactive as={Link} {...s.link}
          to="/portal/Locations"
        >Locations</Interactive>
      </div>
      <div style={s.tribes}>
        <p>Explore Tribes</p><br />
        <Interactive as={Link} {...s.link}
          to="/portal/Danian"
        >Danian</Interactive>
        <br /><br />
        <Interactive as={Link} {...s.link}
          to="/portal/Mipedian"
        >Mipedian</Interactive>
        <br /><br />
        <Interactive as={Link} {...s.link}
          to="/portal/OverWorld"
        >OverWorld</Interactive>
        <br /><br />
        <Interactive as={Link} {...s.link}
          to="/portal/UnderWorld"
        >UnderWorld</Interactive>
      </div>
    </div>
  );
}
