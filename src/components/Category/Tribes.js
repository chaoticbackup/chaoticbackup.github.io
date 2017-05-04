import React from 'react';
import PropTypes from 'prop-types';
import PageNotFound from '../PageNotFound';
import UnderConstruction from '../UnderConstruction';

const propTypes = {
  location: PropTypes.object.isRequired,
};


// This module handles tribe pages and subpages
// Allows for urls such as
// /Creatures/{Tribe}
// /{Tribe}/Creatures}

// /Mugic/{Tribe}
// /{Tribe}/Mugic
// to display the respective subcategories
// (list of tribe's mugic/creatures)

// /{Tribe}
// gives a brief summary and the option of "mugic" or "tribe"
// -> /{Tribe}/Mugic || /{Tribe}/Creatures

function Tribes({location}) {
  return(<UnderConstruction location={location}/>);
}

Tribes.propTypes = propTypes;

export default Tribes;
