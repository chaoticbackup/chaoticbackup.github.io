import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element,
};

function Creatures({children}) {
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
