import React from 'react';
import PageNotFound from '../PageNotFound';
import URLS from '../Spreadsheet';

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
  children;

  constructor(props) {
    super (props);
    console.log(props);
    this.children = props.children;
    this.state = {creatures: []}
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
      {this.children||
        <div>tribes</div>
      }
      </div>
    );
  }
}
