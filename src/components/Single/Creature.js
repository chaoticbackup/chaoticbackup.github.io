import React from 'react';
import PropTypes from 'prop-types';
// import {browserHistory} from 'react-router';
import PageNotFound from '../PageNotFound';
import Tribes from '../Category/Tribes';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function SingleCreature() {
  let path = location.pathname.split("/");
  if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

  // ** Process the tribe ** //
  // /portal/Creatures/{Tribe}/{Name}
  // /portal/{Tribe}/Creatures/{Name}
  // The first / gets counted
  if (path.length === 4 && path[2] === "Creatures") {
    // Special case: render tribe
    // return(<Tribe location={location}/>);
  }
  else if ( path.length !== 5 )
  {
    //PageNotFound
    return(<PageNotFound location={location}/>);
    //return(browserHistory.push('/PageNotFound'));
    return(<PageNotFound location={location}/>);
  }

  let Tribe = "";

  //Handle both url layouts
  if (path[2] === "Creatures") Tribe = path[3];
  if (path[3] === "Creatures") Tribe = path[2];

  // TODO
  // Get spreadsheet data based on tribe/name
  switch (Tribe) {
    case 'Overworld':
    case 'Underworld':
    case 'Mipedian':
    case 'Danian':
    case 'Marrillian':
    case 'Generic':
      return(<div>{path[4]}</div>);
      break;
    default:
      return(<PageNotFound location={location}/>);
      break;
  }

  return (<div className={Tribe}>test</div>);
}

SingleCreature.propTypes = propTypes;

export default SingleCreature;
