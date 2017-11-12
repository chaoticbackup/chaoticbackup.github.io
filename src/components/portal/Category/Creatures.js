import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../../PageNotFound';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import UnderConstruction from '../../UnderConstruction';

export default class Creatures extends React.Component {

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    return (
      <UnderConstruction location={this.props.location}/>
    );
  }

  fakerender() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    var self = this;

    // If tribe
    if (this.state.tribe !== "All") {
      if (!(API.Creatures).hasOwnProperty(this.state.tribe)) {
        return(
          <PageNotFound location={this.props.location}/>
        );
      }
      else return (
        <div>{list_creatures(this.state.tribe)}</div>
      );
    }
    // No tribe specified
    // Display all creatures
    else {
      const creatures = Object.keys(this.state.creatures).map(function(tribe, i) {
        return (
          <div key={i}>
            <Interactive as={Link} {...s.link}
              to={"/portal/"+tribe}
            ><span style={s.title}>{tribe}</span></Interactive>
            {list_creatures(tribe, "Creatures/"+tribe+"/")}
            <hr />
          </div>
        );
      });
      return (<div>{creatures}</div>);
    }

    // Map creatures of the tribe
    function list_creatures(tribe, path="Creatures/") {
      if (!self.state.creatures[tribe]) {
        return (<span>Loading...</span>);
      }
      else return self.state.creatures[tribe].map((creature, i) => {
        return (
          <div key={i}>
            <Interactive as={Link} {...s.link}
              to={path+creature.gsx$name.$t}
              onClick={self.hacks}
            ><span>{creature.gsx$name.$t}</span></Interactive>
          </div>
        );
      });
    }
  }
}
