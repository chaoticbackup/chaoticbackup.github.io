import React from 'react';
import PropTypes from 'prop-types';
import s from '../styles/pageNotFound.style';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function UnderConstruction({ location }) {
  return (
    <p style={s.p}>This page is currently under construction</p>
  );
}

UnderConstruction.propTypes = propTypes;

export default UnderConstruction;
