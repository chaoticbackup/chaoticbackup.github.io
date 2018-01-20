import React from 'react';
import PropTypes from 'prop-types';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import s from '../../styles/app.style';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

function ExampleBase({ children, routes }) {

  function generateMapMenu() {
    let path = '';

    function nextPath(route) {
      path += (
        (path.slice(-1) === '/' ? '' : '/') +
        (route.path === '/' ? '' : route.path)
      );
      return path;
    }

    return (
      routes.filter(route => route.mapMenuTitle)
      .map((route, index, array) => (
        <span key={index}>
            <Interactive
              as={Link}
              {...s.link}
              to={nextPath(route)}
            >{route.mapMenuTitle}</Interactive>
            {(index + 1) < array.length && ' / '}
          </span>
      ))
    );
  }

  return (
    <div className="example">
      <nav style={s.mapMenu}>
        {generateMapMenu()}
      </nav>
      {children}
    </div>
  );
}

ExampleBase.propTypes = propTypes;

export default ExampleBase;
