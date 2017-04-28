import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function SingleCreature() {
  let path = location.pathname.split("/");
  if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

  // /portal/Creatures/Tribe/Name
  // The first / gets counted
  if( path.length !== 5 )
  {
    //TODO return PageNotFound
    return(<div>not valid</div>);
  }

  return(
    <div>test</div>
  );
}

SingleCreature.propTypes = propTypes;

export default SingleCreature;
