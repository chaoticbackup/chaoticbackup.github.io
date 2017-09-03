import React from 'react';
import PropTypes from 'prop-types';
import URLS from '../URLS';
import 'whatwg-fetch';

const propTypes = {
  children: PropTypes.element,
};

function Creatures({children}) {
  fetch(URLS.Creature_Overworld)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('parsed json', json.feed.entry);
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    })
    return (
      <div>
      {children||
        <div>test</div>
      }
      </div>
    );
}

Creatures.propTypes = propTypes;

export default Creatures;
