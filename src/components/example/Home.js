import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import s from '../../styles/home.style';

function ExampleHome() {
  return (
    <div>
      <div style={s.pageLinkContainer}>
        <Interactive
          as={Link}
          {...s.link}
          to="/example"
        >Example page</Interactive>
      </div>
      <div style={s.pageLinkContainer}>
        <Interactive
          as={Link}
          {...s.link}
          to="/example/two-deep?field1=foo&field2=bar#boom!"
        >Example two deep with query and hash</Interactive>
      </div>
    </div>
  );
}

export default ExampleHome;
