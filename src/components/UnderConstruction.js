import React, { PropTypes } from 'react';
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
