import React from 'react';
import UnderConstruction from '../UnderConstruction';

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

export default class Tribes extends React.Component {

  constructor(props) {
    super (props);
    console.log(props);
  }

  render() {
    return (
      <div>
      {this.props.children||
        <UnderConstruction location={this.props.location}/>
      }
      </div>
    );
  }
}
