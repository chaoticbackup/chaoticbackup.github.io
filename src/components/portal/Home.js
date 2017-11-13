import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../../styles/home.style';

export default function PortalHome() {
  return (
    <div>
      <Interactive as={Link} {...s.link}
        to="/portal/Creatures"
      >Creatures</Interactive>
      <br />
      <Interactive as={Link} {...s.link}
        to="/portal/Mugic"
      >Mugic</Interactive>
    </div>
  );
}
