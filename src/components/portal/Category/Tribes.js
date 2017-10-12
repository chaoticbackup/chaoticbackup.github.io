import React from 'react';
import UnderConstruction from '../../UnderConstruction';

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
  }

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    return (
      <UnderConstruction location={this.props.location}/>
    );

    // return (<div>
    //   <Interactive as="a" {...s.link} href={"Mugic"}><span>{}</span></Interactive>
    //   <Interactive as="a" {...s.link} href={"Mugic/"+mugic.gsx$name.$t}><span>{mugic.gsx$name.$t}</span></Interactive>
    //   </div>
    // );
  }
}
